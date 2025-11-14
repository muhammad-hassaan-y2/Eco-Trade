// lib/pdf-report.ts

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { AuditLog } from './audit-log';

export class PDFReport {
  public static async generate(): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    let y = height - 40;
    const log = AuditLog.getLog();

    for (const event of log) {
      const text = `${event.timestamp}: ${event.event}`;
      page.drawText(text, {
        x: 50,
        y,
        font,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      y -= 20;
    }

    return pdfDoc.save();
  }
}
