"use client"

import { CheckCircle2, XCircle, MessageSquare } from "lucide-react"
import { useState, useEffect } from "react"
import { HumanReviewQueue } from "@/lib/human-review-queue"
import { AnalysisResult } from "@/lib/types"

export default function ReviewWorkflow() {
  const [reviews, setReviews] = useState<AnalysisResult[]>([])

  useEffect(() => {
    setReviews(HumanReviewQueue.getQueue())
  }, [])

  const handleRemove = (fileName: string) => {
    // In a real application, this would update the backend to remove the item from the queue.
    setReviews(reviews.filter((r) => r.fileName !== fileName))
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Review & Approval Queue</h1>
        <p className="text-muted-foreground">Side-by-side comparison and approval management</p>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.fileName} className="bg-card border border-border rounded-lg p-6 glow-accent">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{review.fileName}</h3>
                <p className="text-sm text-muted-foreground">Submitted for human review</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <p className="text-sm font-semibold text-primary mb-3">Details</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Confidence: {review.analysis.confidence}%
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Compliance: {review.compliance.compliant ? "Compliant" : "Not Compliant"}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Sustainability Score: {review.sustainability.score}
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <p className="text-sm font-semibold text-secondary mb-3">Recommendations</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {review.analysis.recommendations.map((rec, i) => (
                    <p key={i}>• {rec}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleRemove(review.fileName)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => handleRemove(review.fileName)}
                className="flex-1 flex items-center justify-center gap-2 bg-destructive text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-muted text-white hover:bg-muted/80 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
