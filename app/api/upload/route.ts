
import { NextRequest, NextResponse } from 'next/server';
import { GeminiDocumentAgent } from '@/lib/gemini-agent';
import { RuleEngine } from '@/lib/rule-engine';
import { DecisionNode } from '@/lib/decision-node';
import { generateCustomsDeclaration } from '@/lib/delivery';
import { HumanReviewQueue } from '@/lib/human-review-queue';
import { AuditLog } from '@/lib/audit-log';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const documentType = file.type;

    const agent = new GeminiDocumentAgent();

    AuditLog.add({ event: 'File Uploaded', fileName: file.name });

    // 1. Classify Document
    const classification = await agent.classifyDocument(buffer.toString('base64'), documentType);
    console.log('Document Classification:', classification);
    AuditLog.add({ event: 'Document Classified', classification });

    // 2. Analyze Document based on classification
    let analysis;
    switch (classification.documentType) {
      case 'Commercial Invoice':
        analysis = await agent.analyzeCommercialInvoice(buffer.toString('base64'), documentType);
        break;
      case 'Packing List':
        analysis = await agent.analyzePackingList(buffer.toString('base64'), documentType);
        break;
      case 'Bill of Lading':
        analysis = await agent.analyzeBillOfLading(buffer.toString('base64'), documentType);
        break;
      default:
        analysis = await agent.analyzeDocument(buffer.toString('base64'), documentType);
        break;
    }
    AuditLog.add({ event: 'Document Analyzed', analysis });

    // 3. Check Compliance
    const compliance = await agent.checkCompliance(analysis.extractedData);
    AuditLog.add({ event: 'Compliance Checked', compliance });

    // 4. Calculate Sustainability
    const sustainability = await agent.calculateSustainability(analysis.extractedData);
    AuditLog.add({ event: 'Sustainability Calculated', sustainability });

    // 5. Run Rule Engine
    const ruleEngineResults = RuleEngine.run(analysis.extractedData);
    AuditLog.add({ event: 'Rule Engine Run', ruleEngineResults });

    // 6. Make Decision
    const decision = DecisionNode.makeDecision(analysis, compliance, sustainability, ruleEngineResults);
    AuditLog.add({ event: 'Decision Made', decision });

    // 7. Delivery
    let deliveryResult = null;
    if (decision === 'approved') {
      const analysisResult: any = {
        fileName: file.name,
        classification,
        analysis,
        compliance,
        sustainability,
        ruleEngineResult: ruleEngineResults,
        decision,
        status: 'Completed',
      };
      deliveryResult = generateCustomsDeclaration(analysisResult);
      AuditLog.add({ event: 'Delivery Generated', deliveryResult });
    } else if (decision === 'human_review') {
      const analysisResult: any = {
        fileName: file.name,
        classification,
        analysis,
        compliance,
        sustainability,
        ruleEngineResult: ruleEngineResults,
        decision,
        status: 'Completed',
      };
      HumanReviewQueue.addToQueue(analysisResult);
      AuditLog.add({ event: 'Added to Human Review Queue' });
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
    AuditLog.add({ event: 'Workflow Completed', result });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json({ error: 'Error processing document' }, { status: 500 });
  }
}
