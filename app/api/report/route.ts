// app/api/report/route.ts

import { NextResponse } from 'next/server';
import { PDFReport } from '@/lib/pdf-report';

export async function GET() {
  try {
    const pdfBytes = await PDFReport.generate();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="report.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF report:', error);
    return NextResponse.json({ error: 'Error generating PDF report' }, { status: 500 });
  }
}
