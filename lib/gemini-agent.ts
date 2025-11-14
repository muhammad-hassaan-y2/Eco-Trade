// lib/gemini-agent.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface DocumentAnalysis {
  extractedData: {
    invoiceNumber?: string;
    date?: string;
    seller?: string;
    buyer?: string;
    items?: Array<{
      description: string;
      hsCode?: string;
      quantity?: number;
      value?: number;
    }>;
    totalValue?: number;
    currency?: string;
  };
  confidence: number;
  flags: string[];
  recommendations: string[];
}

export class GeminiDocumentAgent {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async analyzeDocument(fileContent: string | object, mimeType: string): Promise<DocumentAnalysis> {
    const prompt = `You are a customs document analysis AI agent. Analyze this document and extract structured data.

Extract and return ONLY valid JSON (no markdown, no explanation) with this structure:
{
  "extractedData": {
    "invoiceNumber": "string or null",
    "date": "YYYY-MM-DD or null",
    "seller": "company name and country or null",
    "buyer": "company name and country or null", 
    "items": [
      {
        "description": "string",
        "hsCode": "6-digit code or null",
        "quantity": number or null,
        "value": number or null
      }
    ],
    "totalValue": number or null,
    "currency": "USD/EUR/etc or null"
  },
  "confidence": 0-100,
  "flags": ["array of issues found like 'missing_hs_code', 'high_value', 'dangerous_goods'"],
  "recommendations": ["array of actions needed"]
}`;

    const parts: (string | { inlineData: { data: string; mimeType: string } })[] = [prompt];

    if (typeof fileContent === 'string') {
      parts.push({
        inlineData: {
          data: fileContent,
          mimeType,
        },
      });
    } else {
      parts.push(`Document: ${JSON.stringify(fileContent, null, 2)}`);
    }

    try {
      const result = await this.model.generateContent(parts);
      const response = await result.response;
      const text = response.text();
      
      // Clean JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found in response');
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Gemini analysis error:', error);
      throw error;
    }
  }

  async checkCompliance(shipmentData: DocumentAnalysis['extractedData']): Promise<{
    compliant: boolean;
    issues: string[];
    severity: 'low' | 'medium' | 'high';
    reasoning: string;
  }> {
    const prompt = `You are a trade compliance AI agent. Review this shipment for regulatory compliance.

Shipment Data:
${JSON.stringify(shipmentData, null, 2)}

Check for:
1. Required documents present
2. Correct HS codes
3. Value declarations reasonable
4. Origin country restrictions
5. Dangerous goods handling
6. Sanctions compliance

Return ONLY valid JSON:
{
  "compliant": true/false,
  "issues": ["list of specific issues"],
  "severity": "low/medium/high",
  "reasoning": "brief explanation"
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const text = (await result.response).text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Compliance check error:', error);
      throw error;
    }
  }

  async calculateSustainability(shipmentData: DocumentAnalysis['extractedData']): Promise<{
    score: number;
    carbonFootprint: number;
    recommendations: string[];
    certifications: string[];
  }> {
    const prompt = `You are a sustainability analysis AI agent. Evaluate this shipment's environmental impact.

Shipment:
${JSON.stringify(shipmentData, null, 2)}

Calculate sustainability considering:
- Transport distance and method
- Product type environmental impact
- Packaging materials
- Certifications present
- Carbon footprint estimate

Return ONLY valid JSON:
{
  "score": 0-100,
  "carbonFootprint": estimated_kg_co2,
  "recommendations": ["ways to improve"],
  "certifications": ["list any eco certs found"]
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const text = (await result.response).text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Sustainability check error:', error);
      throw error;
    }
  }

  async classifyDocument(fileContent: string | object, mimeType: string): Promise<{ documentType: string }> {
    const prompt = `You are an AI document classifier. Your task is to identify the type of the document from the following list:
- Commercial Invoice
- Packing List
- Bill of Lading
- Certificate of Origin
- Other

Analyze the document and return ONLY a valid JSON object with the key "documentType" and the value as one of the types from the list. For example:
{
  "documentType": "Commercial Invoice"
}`;

    const parts: (string | { inlineData: { data: string; mimeType: string } })[] = [prompt];

    if (typeof fileContent === 'string') {
      parts.push({
        inlineData: {
          data: fileContent,
          mimeType,
        },
      });
    } else {
      parts.push(`Document: ${JSON.stringify(fileContent, null, 2)}`);
    }

    try {
      const result = await this.model.generateContent(parts);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found in response');
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Gemini classification error:', error);
      throw error;
    }
  }

  async analyzeCommercialInvoice(fileContent: string | object, mimeType: string): Promise<DocumentAnalysis> {
    // const prompt = `You are a customs document analysis AI agent specialized in Commercial Invoices. Analyze this document and extract structured data.`;
    return this.analyzeDocument(fileContent, mimeType);
  }

  async analyzePackingList(fileContent: string | object, mimeType: string): Promise<DocumentAnalysis> {
    // const prompt = `You are a customs document analysis AI agent specialized in Packing Lists. Analyze this document and extract structured data.`;
    return this.analyzeDocument(fileContent, mimeType);
  }

  async analyzeBillOfLading(fileContent: string | object, mimeType: string): Promise<DocumentAnalysis> {
    // const prompt = `You are a customs document analysis AI agent specialized in Bills of Lading. Analyze this document and extract structured data.`;
    return this.analyzeDocument(fileContent, mimeType);
  }

  generateContent(prompt: string | (string | { inlineData: { data: string; mimeType: string; }; })[]): Promise<Awaited<ReturnType<typeof this.model.generateContent>>> {
    return this.model.generateContent(prompt);
  }
}

export const geminiAgent = new GeminiDocumentAgent();