"use client"

import { Activity, AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  status: "pending" | "active" | "complete" | "blocked"
  progress: number
  agentActivity?: string
}

export default function WorkflowDashboard() {
  const workflows = [
    {
      id: "1",
      name: "Shipment #2024-001",
      steps: [
        { id: "s1", name: "Document Analysis", status: "complete" as const, progress: 100, agentActivity: "Gemini AI" },
        { id: "s2", name: "Route Optimization", status: "active" as const, progress: 45, agentActivity: "Route Agent" },
        {
          id: "s3",
          name: "Compliance Check",
          status: "pending" as const,
          progress: 0,
          agentActivity: "Compliance Agent",
        },
        { id: "s4", name: "Cost Calculation", status: "pending" as const, progress: 0, agentActivity: "Finance Agent" },
      ],
    },
    {
      id: "2",
      name: "Batch Processing #2024-045",
      steps: [
        { id: "s1", name: "Intake", status: "complete" as const, progress: 100, agentActivity: "Parser" },
        { id: "s2", name: "Validation", status: "complete" as const, progress: 100, agentActivity: "Validator" },
        { id: "s3", name: "Optimization", status: "complete" as const, progress: 100, agentActivity: "Opus" },
        { id: "s4", name: "Approval", status: "active" as const, progress: 60, agentActivity: "Manager" },
      ],
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Live Workflow Dashboard</h1>
        <p className="text-muted-foreground">Real-time Opus agent orchestration with bottleneck detection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main workflow view */}
        <div className="lg:col-span-2 space-y-6">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>

        {/* Sidebar metrics */}
        <div className="space-y-6">
          <MetricCard icon={Activity} label="Active Workflows" value="12" color="text-primary" />
          <MetricCard icon={Clock} label="Avg. Duration" value="2.4h" color="text-secondary" />
          <MetricCard icon={AlertCircle} label="Bottlenecks" value="2" color="text-destructive" />
          <MetricCard icon={CheckCircle2} label="Completed" value="847" color="text-primary" />

          <div className="bg-card border border-border rounded-lg p-6 mt-8">
            <h3 className="text-sm font-semibold text-white mb-4">Agent Activity</h3>
            <div className="space-y-3">
              <ActivityBadge agent="Opus Orchestrator" status="running" />
              <ActivityBadge agent="Route Optimizer" status="idle" />
              <ActivityBadge agent="Compliance Checker" status="queued" />
              <ActivityBadge agent="Cost Calculator" status="idle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkflowCard({ workflow }: { workflow: any }) {
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
                  step.status === "complete" ? "bg-primary" : "bg-secondary"
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

function MetricCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
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

function ActivityBadge({ agent, status }: { agent: string; status: string }) {
  const statusDot: Record<string, string> = {
    running: "bg-primary",
    idle: "bg-muted",
    queued: "bg-secondary",
  }

  return (
    <div className="flex items-center gap-2 p-3 rounded bg-muted/50">
      <div className={`w-2 h-2 rounded-full ${statusDot[status]} animate-pulse`} />
      <p className="text-sm text-white flex-1">{agent}</p>
      <span className="text-xs text-muted-foreground capitalize">{status}</span>
    </div>
  )
}
