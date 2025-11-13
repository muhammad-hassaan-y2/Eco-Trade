// lib/rule-engine.ts

import { DocumentAnalysis } from './types';

export interface RuleResult {
  passed: boolean;
  message: string;
}

export class RuleEngine {
  public static checkHsCode(extractedData: DocumentAnalysis['extractedData']): RuleResult {
    if (!extractedData.items) {
      return { passed: true, message: 'No items to check' };
    }

    for (const item of extractedData.items) {
      if (item.hsCode && !/^\d{6}$/.test(item.hsCode)) {
        return {
          passed: false,
          message: `Invalid HS code for item "${item.description}": ${item.hsCode}`,
        };
      }
    }

    return { passed: true, message: 'All HS codes are valid' };
  }

  public static checkRequiredFields(extractedData: DocumentAnalysis['extractedData']): RuleResult {
    if (!extractedData.invoiceNumber) {
      return { passed: false, message: 'Missing invoice number' };
    }

    if (!extractedData.date) {
      return { passed: false, message: 'Missing date' };
    }

    return { passed: true, message: 'All required fields are present' };
  }

  public static run(extractedData: DocumentAnalysis['extractedData']): RuleResult[] {
    return [
      this.checkHsCode(extractedData),
      this.checkRequiredFields(extractedData),
    ];
  }
}
