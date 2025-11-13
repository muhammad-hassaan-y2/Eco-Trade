// lib/agentic-review.ts

import { DocumentAnalysis } from './types';
import { GeminiDocumentAgent } from './gemini-agent';

export class AgenticReview {
  public static async review(analysis: DocumentAnalysis): Promise<any> {
    const agent = new GeminiDocumentAgent();
    const prompt = `You are a trade compliance expert. Review the following document analysis and check for any violations of trade policies, sanctions lists, and sustainability guidelines.

    Document Analysis:
    ${JSON.stringify(analysis, null, 2)}

    Return a JSON object with a list of any violations found.
    `;
    const result = await agent.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    
    return JSON.parse(jsonMatch[0]);
  }
}
