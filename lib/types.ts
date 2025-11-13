// lib/types.ts

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

export interface ComplianceResult {
  compliant: boolean;
  issues: string[];
  severity: 'low' | 'medium' | 'high';
  reasoning: string;
}

export interface SustainabilityResult {
  score: number;
  carbonFootprint: number;
  recommendations: string[];
  certifications: string[];
}

export type Decision = 'approved' | 'rejected' | 'human_review';

export interface RuleResult {
  passed: boolean;
  message: string;
}

export interface AnalysisResult {
  fileName: string;
  classification: {
    documentType: string;
  };
  analysis: DocumentAnalysis;
  compliance: ComplianceResult;
  sustainability: SustainabilityResult;
  ruleEngineResult: RuleResult[];
  decision: Decision;
  deliveryResult: string | null;
  status: string;
}
