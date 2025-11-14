// lib/audit-log.ts

export interface AuditLogEntry {
  timestamp: string;
  event: string;
  data?: Record<string, unknown>; // Allow for additional properties
}

export class AuditLog {
  private static log: AuditLogEntry[] = [];

  public static add(event: string, data?: Record<string, unknown>): void {
    this.log.push({
      timestamp: new Date().toISOString(),
      event,
      data,
    });
  }

  public static getLog(): AuditLogEntry[] {
    return this.log;
  }
}
