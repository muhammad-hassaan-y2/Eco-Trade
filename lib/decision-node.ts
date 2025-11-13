// lib/decision-node.ts

import { ComplianceResult, DocumentAnalysis, RuleResult, SustainabilityResult } from './types';

export type Decision = 'approved' | 'rejected' | 'human_review';

export class DecisionNode {
  public static makeDecision(
    analysis: DocumentAnalysis,
    compliance: ComplianceResult,
    sustainability: SustainabilityResult,
    ruleEngineResults: RuleResult[]
  ): Decision {
    if (analysis.extractedData.totalValue && analysis.extractedData.totalValue > 10000) {
      return 'human_review';
    }

    const allRulesPassed = ruleEngineResults.every(result => result.passed);

    if (
      compliance.compliant &&
      sustainability.score > 50 &&
      allRulesPassed
    ) {
      return 'approved';
    } else if (!compliance.compliant || !allRulesPassed) {
      return 'rejected';
    } else {
      return 'human_review';
    }
  }
}
