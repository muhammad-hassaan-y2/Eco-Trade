"use client"

import { useState } from "react"
import { Upload, Workflow, MessageSquare, Leaf, Search, CheckCircle2 } from "lucide-react"
import Sidebar from "@/components/sidebar"
import UploadInterface from "@/components/upload-interface"
import WorkflowDashboard from "@/components/workflow-dashboard"
import AgentChat from "@/components/agent-chat"
import SustainabilityDashboard from "@/components/sustainability-dashboard"
import AuditTrail from "@/components/audit-trail"
import ReviewWorkflow from "@/components/review-workflow"

interface FileUpload {
  id: string
  name: string
  progress: number
  status: "uploading" | "analyzing" | "complete" | "error"
  confidence: number
}

import { AnalysisResult } from "@/lib/types";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [fileUpload, setFileUpload] = useState<FileUpload[]>([])

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return <UploadInterface setAnalysisResult={setAnalysisResult} setFileUpload={setFileUpload} fileUpload={fileUpload} />
      case "workflow":
        return <WorkflowDashboard analysisResult={analysisResult} />
      case "chat":
        return <AgentChat />
      case "sustainability":
        return <SustainabilityDashboard />
      case "audit":
        return <AuditTrail />
      case "review":
        return <ReviewWorkflow />
      default:
        return <MainDashboard setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}

function MainDashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const dashboards = [
    { id: "upload", name: "File Upload", icon: Upload, color: "from-emerald-500 to-teal-600" },
    { id: "workflow", name: "Workflow Progress", icon: Workflow, color: "from-cyan-500 to-blue-600" },
    { id: "chat", name: "Agent Chat", icon: MessageSquare, color: "from-purple-500 to-pink-600" },
    { id: "sustainability", name: "Sustainability", icon: Leaf, color: "from-green-500 to-emerald-600" },
    { id: "audit", name: "Audit & Search", icon: Search, color: "from-orange-500 to-red-600" },
    { id: "review", name: "Review Queue", icon: CheckCircle2, color: "from-indigo-500 to-purple-600" },
  ]

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Eco-Trade Dashboard</h1>
        <p className="text-muted-foreground">Multi-agent workflow orchestration platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboards.map((dashboard) => {
          const Icon = dashboard.icon
          return (
            <button
              key={dashboard.id}
              onClick={() => setActiveTab(dashboard.id)}
              className="group relative overflow-hidden rounded-lg p-6 text-left transition-all hover:scale-105 hover:glow-accent"
            >
              {/* Background card */}
              <div className="absolute inset-0 bg-card border border-border opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-4 inline-block p-3 rounded-lg bg-muted">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{dashboard.name}</h3>
                <p className="text-sm text-muted-foreground">Access {dashboard.name.toLowerCase()} tools</p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium">Open →</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Active Workflows" value="12" trend="+2" />
        <StatCard label="Files Processed" value="284" trend="+28" />
        <StatCard label="Carbon Saved" value="2.4 T" trend="+0.3T" />
        <StatCard label="Compliance Rate" value="98.5%" trend="+1.2%" />
      </div>
    </div>
  )
}

function StatCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <p className="text-muted-foreground text-sm mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-xs text-primary mt-1">{trend} this week</p>
        </div>
      </div>
    </div>
  )
}
