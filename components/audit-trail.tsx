"use client"

import { Clock, Download, Search } from "lucide-react"
import { useState } from "react"

interface AuditEntry {
  id: string
  timestamp: string
  action: string
  agent: string
  details: string
  hash: string
}

export default function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState("")

  const entries: AuditEntry[] = [
    {
      id: "1",
      timestamp: "2024-01-15 14:32:15",
      action: "Document Upload",
      agent: "Gemini Parser",
      details: "Shipment document analyzed with 98.5% confidence",
      hash: "7F3A9E2B...",
    },
    {
      id: "2",
      timestamp: "2024-01-15 14:33:42",
      action: "Route Optimization",
      agent: "Route Optimizer",
      details: "Optimal route selected: 245km, 4.5h, $892",
      hash: "4C8D1F5B...",
    },
    {
      id: "3",
      timestamp: "2024-01-15 14:35:20",
      action: "Compliance Check",
      agent: "Compliance Agent",
      details: "All regulatory requirements verified and passed",
      hash: "A2E7C9F1...",
    },
    {
      id: "4",
      timestamp: "2024-01-15 14:36:58",
      action: "Approval",
      agent: "Manager Review",
      details: "Shipment approved for dispatch",
      hash: "5D3B2A8C...",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Audit Trail & Search</h1>
        <p className="text-muted-foreground">Blockchain-verified compliance history with timeline visualization</p>
      </div>

      {/* Search & Download */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit entries..."
            className="w-full bg-card border border-border rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border" />

          {/* Entries */}
          <div className="space-y-6">
            {entries.map((entry) => (
              <div key={entry.id} className="relative pl-20">
                {/* Timeline dot */}
                <div className="absolute -left-3.5 top-2 w-7 h-7 bg-primary rounded-full border-4 border-background flex items-center justify-center">
                  <div className="w-2 h-2 bg-background rounded-full" />
                </div>

                {/* Content */}
                <div className="bg-muted/50 rounded-lg p-4 border border-border hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-white">{entry.action}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        {entry.timestamp}
                      </p>
                    </div>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded font-medium">
                      {entry.agent}
                    </span>
                  </div>
                  <p className="text-sm text-white mb-2">{entry.details}</p>
                  <p className="text-xs text-muted-foreground font-mono">Hash: {entry.hash}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Report */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Operations</p>
          <p className="text-3xl font-bold text-white">2,847</p>
          <p className="text-xs text-primary mt-2">All verified ✓</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Compliance Rate</p>
          <p className="text-3xl font-bold text-white">100%</p>
          <p className="text-xs text-primary mt-2">Blockchain verified</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Last Verified</p>
          <p className="text-3xl font-bold text-white">Now</p>
          <p className="text-xs text-primary mt-2">Real-time sync</p>
        </div>
      </div>
    </div>
  )
}
