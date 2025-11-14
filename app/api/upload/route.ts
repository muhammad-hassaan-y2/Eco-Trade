
import { NextRequest, NextResponse } from 'next/server';
import { GeminiDocumentAgent } from '@/lib/gemini-agent';
import { RuleEngine } from '@/lib/rule-engine';
import { DecisionNode } from '@/lib/decision-node';
import { generateCustomsDeclaration } from '@/lib/delivery';
import { HumanReviewQueue } from '@/lib/human-review-queue';
import { AuditLog } from '@/lib/audit-log';
import { AnalysisResult } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type;
    let fileContent: string | object;

    if (mimeType === 'application/json') {
      fileContent = JSON.parse(buffer.toString('utf-8'));
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      mimeType === 'application/vnd.ms-excel'
    ) {
      // For Excel, we'll treat it as text for now.
      // A dedicated library (e.g., 'xlsx') would be needed for proper parsing.
      fileContent = buffer.toString('utf-8');
    } else {
      fileContent = buffer.toString('base64');
    }

    const agent = new GeminiDocumentAgent();

    AuditLog.add('File Uploaded', { fileName: file.name, mimeType });

    // 1. Classify Document
    const classification = await agent.classifyDocument(fileContent, mimeType);
    console.log('Document Classification:', classification);
    AuditLog.add('Document Classified', { classification });

    // 2. Analyze Document based on classification
    let analysis;
    switch (classification.documentType) {
      case 'Commercial Invoice':
        analysis = await agent.analyzeCommercialInvoice(fileContent, mimeType);
        break;
      case 'Packing List':
        analysis = await agent.analyzePackingList(fileContent, mimeType);
        break;
      case 'Bill of Lading':
        analysis = await agent.analyzeBillOfLading(fileContent, mimeType);
        break;
      default:
        analysis = await agent.analyzeDocument(fileContent, mimeType);
        break;
    }
    AuditLog.add('Document Analyzed', { analysis });

    // 3. Check Compliance
    const compliance = await agent.checkCompliance(analysis.extractedData);
    AuditLog.add('Compliance Checked', { compliance });

    // 4. Calculate Sustainability
    const sustainability = await agent.calculateSustainability(analysis.extractedData);
    AuditLog.add('Sustainability Calculated', { sustainability });

    // 5. Run Rule Engine
    const ruleEngineResults = RuleEngine.run(analysis.extractedData);
    AuditLog.add('Rule Engine Run', { ruleEngineResults });

    // 6. Make Decision
    const decision = DecisionNode.makeDecision(analysis, compliance, sustainability, ruleEngineResults);
    AuditLog.add('Decision Made', { decision });

    // 7. Delivery
    let deliveryResult = null;
    if (decision === 'approved') {
      const analysisResult: AnalysisResult = {
        fileName: file.name,
        classification,
        analysis,
        compliance,
        sustainability,
        ruleEngineResult: ruleEngineResults,
        decision,
        deliveryResult: null, // Initialize deliveryResult as null
        status: 'Completed',
      };
      deliveryResult = generateCustomsDeclaration(analysisResult);
      AuditLog.add('Delivery Generated', { deliveryResult });
    } else if (decision === 'human_review') {
      const analysisResult: AnalysisResult = {
        fileName: file.name,
        classification,
        analysis,
        compliance,
        sustainability,
        ruleEngineResult: ruleEngineResults,
        decision,
        deliveryResult: null, // Initialize deliveryResult as null
        status: 'Completed',
      };
      HumanReviewQueue.addToQueue(analysisResult);
      AuditLog.add('Added to Human Review Queue', { fileName: file.name });
    }

    const result = {
      fileName: file.name,
      classification,
      analysis,
      compliance,
      sustainability,
      ruleEngineResult: ruleEngineResults,
      decision,
      deliveryResult,
      status: 'Completed',
    };
    AuditLog.add('Workflow Completed', { result });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json({ error: 'Error processing document' }, { status: 500 });
  }
}
