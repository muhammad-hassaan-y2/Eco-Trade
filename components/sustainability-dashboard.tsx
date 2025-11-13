"use client"

import { Leaf, TrendingDown, Award, Route } from "lucide-react"

export default function SustainabilityDashboard() {
  const metrics = [
    { label: "Carbon Footprint", value: "2.4 T", change: "-15%", icon: TrendingDown, trend: "down" },
    { label: "Routes Optimized", value: "284", change: "+28%", icon: Route, trend: "up" },
    { label: "Eco-Certified", value: "98.5%", change: "+2.1%", icon: Award, trend: "up" },
    { label: "Trees Offset", value: "1,240", change: "+240", icon: Leaf, trend: "up" },
  ]

  const routeImpact = [
    { route: "Route A", emissions: 45.2, fuel: 28.4, time: 2.5 },
    { route: "Route B", emissions: 52.1, fuel: 31.2, time: 2.8 },
    { route: "Route C", emissions: 58.9, fuel: 35.6, time: 3.2 },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Sustainability Dashboard</h1>
        <p className="text-muted-foreground">Carbon footprint tracking and eco-certification management</p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, i) => {
          const Icon = metric.icon
          return (
            <div key={i} className="bg-card border border-border rounded-lg p-6 glow-accent">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${metric.trend === "up" ? "text-secondary" : "text-primary"}`} />
                <span className={`text-sm font-semibold ${metric.trend === "up" ? "text-primary" : "text-secondary"}`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          )
        })}
      </div>

      {/* Route Impact Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Route Environmental Impact</h3>
          <div className="space-y-4">
            {routeImpact.map((route, i) => (
              <div
                key={i}
                className="p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="font-medium text-white">{route.route}</p>
                  <span className={`text-sm font-semibold ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                    {i === 0 ? "Recommended" : "Alternative"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">CO2 (kg)</p>
                    <p className="text-lg font-bold text-white">{route.emissions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fuel (L)</p>
                    <p className="text-lg font-bold text-white">{route.fuel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time (h)</p>
                    <p className="text-lg font-bold text-white">{route.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Eco-Certifications</h3>
          <div className="space-y-3">
            {["ISO 14001", "Carbon Trust", "Green Eco-Trade", "EcoTransport", "Net Zero Ready"].map((cert, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <p className="text-white font-medium">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
