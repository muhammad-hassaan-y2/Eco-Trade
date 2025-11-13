// lib/human-review-queue.ts

import { AnalysisResult } from './types';

export class HumanReviewQueue {
  private static queue: AnalysisResult[] = [];

  public static addToQueue(analysisResult: AnalysisResult): void {
    this.queue.push(analysisResult);
  }

  public static getQueue(): AnalysisResult[] {
    return this.queue;
  }
}
