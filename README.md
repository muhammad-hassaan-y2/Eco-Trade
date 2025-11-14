This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Integrations and Future Enhancements

This project has been enhanced with several key integrations and features to create a robust trade document processing dashboard.

### Implemented Integrations:

*   **Gemini Multimodal AI for Document Processing:**
    *   **File Upload Handler:** The system now accepts various document types including images, PDFs, JSON, and Excel files.
    *   **AI Classification:** Documents are automatically classified (e.g., Commercial Invoice, Packing List) using the `gemini-pro-vision` model.
    *   **Data Extraction:** Structured data (HS Codes, values, quantities, origin) is extracted from documents.
    *   **Specialized Agents:** Documents are routed to specialized AI agents based on their classified type for tailored analysis.
*   **Decisioning and Routing:**
    *   **Rule Engine:** A rule engine checks extracted data against trade regulations and validates required fields (e.g., HS Code format, presence of invoice number and date).
    *   **Threshold Checks:** High-value shipments (e.g., over $10,000) are automatically flagged for human review.
    *   **Decision Node:** An automated decision node approves, rejects, or flags documents for human review based on compliance, sustainability scores, and rule engine results.
*   **Review and Audit:**
    *   **Human Review Queue:** Documents requiring manual inspection are added to a dedicated queue.
    *   **Review Interface:** A basic interface allows human reviewers to see document details and make approval/rejection decisions.
    *   **JSON Audit Log:** A comprehensive log records all workflow events, including timestamps, document IDs, and decisions.
    *   **PDF Report Generation:** A service to generate PDF reports of the audit log.

### What's Left to Make the Dashboard Complete:

*   **Vector Memory for AI Agents:** Integrate a vector database (e.g., Qdrant, Pinecone) to provide AI agents with long-term memory and context for more accurate and consistent analysis across multiple documents or sessions. This would allow agents to "remember" past interactions, trade policies, and specific client requirements.
*   **Integration with Public Trade APIs:** Fully integrate with external trade APIs (e.g., UN Comtrade, WTO, U.S. Census Bureau, Middle Eastern trade data providers) to enrich document data with real-time trade statistics, tariff information, and regulatory updates. Currently, placeholders for U.S. Census data and Middle Eastern trade data fetching exist.
*   **`CENSUS_API_KEY`**: (Future Integration) If you plan to integrate with the U.S. Census Bureau International Trade API, you will need an API key from their developer portal.
*   **`MIDDLE_EAST_TRADE_API_KEY`**: (Future Integration) If you plan to integrate with a specific Middle Eastern trade data provider, you will need an API key from their developer portal.

Please add these API keys to your `.env` file in the root directory of the project.