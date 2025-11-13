"use client"

import { CheckCircle2, XCircle, MessageSquare } from "lucide-react"
import { useState } from "react"

interface ReviewItem {
  id: string
  title: string
  type: "shipment" | "route" | "compliance"
  status: "pending" | "approved" | "rejected"
  priority: "low" | "medium" | "high"
  agent: string
  details: string[]
}

export default function ReviewWorkflow() {
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: "1",
      title: "Shipment #2024-001 Approval",
      type: "shipment",
      status: "pending",
      priority: "high",
      agent: "Opus Orchestrator",
      details: ["All documents verified", "Route optimized", "Cost calculated"],
    },
    {
      id: "2",
      title: "Route Optimization Review",
      type: "route",
      status: "pending",
      priority: "medium",
      agent: "Route Optimizer",
      details: ["Distance: 245 km", "Time: 4.5h", "Cost: $892"],
    },
  ])

  const handleApprove = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "approved" } : r)))
  }

  const handleReject = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)))
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Review & Approval Queue</h1>
        <p className="text-muted-foreground">Side-by-side comparison and approval management</p>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card border border-border rounded-lg p-6 glow-accent">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{review.title}</h3>
                <p className="text-sm text-muted-foreground">Submitted by {review.agent}</p>
              </div>
              <div className="flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    review.priority === "high"
                      ? "bg-destructive/20 text-destructive"
                      : review.priority === "medium"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-primary/20 text-primary"
                  }`}
                >
                  {review.priority.charAt(0).toUpperCase() + review.priority.slice(1)}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <p className="text-sm font-semibold text-primary mb-3">Details</p>
                <ul className="space-y-2">
                  {review.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <p className="text-sm font-semibold text-secondary mb-3">Comparisons</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• vs. Last Similar Shipment</p>
                  <p>• vs. Estimated Cost</p>
                  <p>• vs. Route Best Practices</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {review.status === "pending" ? (
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(review.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(review.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-destructive text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-muted text-white hover:bg-muted/80 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                className={`p-3 rounded-lg text-center font-medium ${
                  review.status === "approved" ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
                }`}
              >
                {review.status === "approved" ? "✓ Approved" : "✗ Rejected"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
