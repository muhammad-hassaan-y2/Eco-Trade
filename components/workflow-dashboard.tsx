"use client"

import { Activity, AlertCircle, CheckCircle2, Zap } from "lucide-react"
import { AnalysisResult } from "@/lib/types";
import { ElementType } from "react";

interface WorkflowStep {
  id: string
  name: string
  status: "pending" | "active" | "complete" | "blocked"
  progress: number
  agentActivity?: string
}

interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
}

export default function WorkflowDashboard({ analysisResult }: { analysisResult: AnalysisResult | null }) {
  if (!analysisResult) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Live Workflow Dashboard</h1>
        <p className="text-muted-foreground">Upload a file to see the live workflow.</p>
      </div>
    );
  }

  const { fileName, classification, analysis, compliance, sustainability, ruleEngineResult, decision, deliveryResult } = analysisResult;

  const workflows: Workflow[] = [
    {
      id: "1",
      name: `Shipment for ${fileName}`,
      steps: [
        { id: "s1", name: "Document Analysis", status: "complete" as const, progress: 100, agentActivity: "Gemini AI" },
        { id: "s2", name: "Compliance Check", status: compliance.compliant ? "complete" : "blocked" as const, progress: 100, agentActivity: "Compliance Agent" },
        { id: "s3", name: "Sustainability Score", status: "complete" as const, progress: 100, agentActivity: "Sustainability Agent" },
        { id: "s4", name: "Decision", status: decision === 'approved' ? "complete" : decision === 'rejected' ? "blocked" : "pending" as const, progress: 100, agentActivity: "Decision Node" },
      ],
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Live Workflow Dashboard</h1>
        <p className="text-muted-foreground">Real-time agent orchestration for {fileName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main workflow view */}
        <div className="lg:col-span-2 space-y-6">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
          {decision === 'human_review' && (
            <div className="flex justify-end">
              <button
                onClick={() => (window as Window & typeof globalThis & { setActiveTab: (tab: string) => void }).setActiveTab("review")}
                className="group relative overflow-hidden rounded-lg p-4 text-left transition-all hover:scale-105 hover:glow-accent"
              >
                Review
              </button>
            </div>
          )}
        </div>

        {/* Sidebar metrics */}
        <div className="space-y-6">
          <MetricCard icon={Zap} label="Confidence Score" value={`${analysis.confidence}%`} color="text-primary" />
          <MetricCard icon={CheckCircle2} label="Compliance" value={compliance.compliant ? "Compliant" : "Not Compliant"} color={compliance.compliant ? "text-primary" : "text-destructive"} />
          <MetricCard icon={Activity} label="Sustainability Score" value={sustainability.score.toString()} color="text-secondary" />
          <MetricCard icon={AlertCircle} label="Carbon Footprint" value={`${sustainability.carbonFootprint} kg CO2`} color="text-destructive" />
          <MetricCard icon={Activity} label="Document Type" value={classification.documentType} color="text-secondary" />
          {ruleEngineResult.map((result, index) => (
            <MetricCard key={index} icon={CheckCircle2} label={`Rule ${index + 1}`} value={result.passed ? "Passed" : "Failed"} color={result.passed ? "text-primary" : "text-destructive"} />
          ))}
          <MetricCard icon={CheckCircle2} label="Decision" value={decision} color={decision === 'approved' ? "text-primary" : decision === 'rejected' ? "text-destructive" : "text-secondary"} />
          {deliveryResult && <MetricCard icon={CheckCircle2} label="Delivery" value={deliveryResult} color="text-primary" />}
        </div>
      </div>
    </div>
  )
}

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 glow-accent">
      <h3 className="text-lg font-semibold text-white mb-6">{workflow.name}</h3>
      <div className="space-y-4">
        {workflow.steps.map((step: WorkflowStep, index: number) => (
          <div key={step.id}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-muted text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-white">{step.name}</p>
                  <p className="text-xs text-muted-foreground">{step.agentActivity}</p>
                </div>
              </div>
              <StatusBadge status={step.status} />
            </div>
            <div className="w-full bg-muted rounded-full h-2 ml-9">
              <div
                className={`h-2 rounded-full transition-all ${
                  step.status === "complete" ? "bg-primary" : step.status === "blocked" ? "bg-destructive" : "bg-secondary"
                }`}
                style={{ width: `${step.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    complete: "bg-primary/20 text-primary",
    active: "bg-secondary/20 text-secondary",
    pending: "bg-muted/50 text-muted-foreground",
    blocked: "bg-destructive/20 text-destructive",
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function MetricCard({ icon: Icon, label, value, color }: { icon: ElementType; label: string; value: string; color: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}
