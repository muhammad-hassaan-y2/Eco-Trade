// lib/audit-log.ts

import { AnalysisResult } from './types';

export class AuditLog {
  private static log: any[] = [];

  public static add(event: any): void {
    this.log.push({
      timestamp: new Date().toISOString(),
      ...event,
    });
  }

  public static getLog(): any[] {
    return this.log;
  }
}
