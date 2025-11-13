"use client"

import { ArrowUpRight, ArrowDownRight, Ship, Mountain } from "lucide-react"

const kpis = [
  {
    title: "CO₂ Saved",
    value: "1,234 t",
    change: "+12.5%",
    changeType: "increase",
    icon: Mountain,
  },
  {
    title: "Total Shipments",
    value: "8,921",
    change: "+5.2%",
    changeType: "increase",
    icon: Ship,
  },
  {
    title: "Active Workflows",
    value: "12",
    change: "-2.1%",
    changeType: "decrease",
    icon: Ship,
  },
  {
    title: "Compliance Rate",
    value: "98.5%",
    change: "+1.2%",
    changeType: "increase",
    icon: Ship,
  },
]

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className="relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:bg-card/80 hover:glow-accent"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <kpi.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-muted-foreground">{kpi.title}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-bold text-white">{kpi.value}</p>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <div
              className={`flex items-center gap-1 ${
                kpi.changeType === "increase" ? "text-primary" : "text-destructive"
              }`}
            >
              {kpi.changeType === "increase" ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{kpi.change}</span>
            </div>
            <p className="text-muted-foreground">vs last month</p>
          </div>
          <div className="absolute bottom-0 right-0 h-1/2 w-1/2 bg-gradient-to-t from-primary/10 to-transparent rounded-full blur-3xl" />
        </div>
      ))}
    </div>
  )
}
