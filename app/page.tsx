"use client"

import type React from "react"

import { ArrowRight, Zap, BarChart3, Users, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800/50 backdrop-blur-sm">
        <div className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
         Eco-Trade
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-slate-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#about" className="text-slate-300 hover:text-white transition-colors">
            About
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-8 py-24 max-w-6xl mx-auto">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance">
            Multi-Agent{" "}
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Workflow Platform
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto text-balance">
            Streamline your logistics operations with AI-powered agents orchestrating complex workflows in real-time.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
          >
            Enter Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Feature cards */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Lightning Fast"
            description="Real-time agent coordination and workflow execution"
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Full Visibility"
            description="Complete audit trails and sustainability tracking"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Multi-Agent"
            description="Collaborative AI agents working in parallel"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Compliant"
            description="98.5% compliance rate with regulatory standards"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div id="about" className="border-t border-slate-800/50 py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-emerald-400 mb-2">2.4T</p>
            <p className="text-slate-400">Carbon Emissions Saved</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-cyan-400 mb-2">98.5%</p>
            <p className="text-slate-400">Compliance Rate</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-400 mb-2">12x</p>
            <p className="text-slate-400">Faster Processing</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-slate-800/50 py-12 px-8 text-center">
        <p className="text-slate-400 mb-6">Ready to transform your logistics?</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
        >
          Go to Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="group p-6 rounded-lg bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
      <div className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="font-semibold mb-2 text-lg">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  )
}
