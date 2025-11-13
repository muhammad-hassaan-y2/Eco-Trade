"use client"

import { useState } from "react"
import { Send } from "lucide-react"

interface Message {
  id: string
  role: "user" | "agent"
  agent: string
  content: string
  timestamp: string
}

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "agent",
      agent: "Route Optimizer",
      content: "I analyzed the shipment and found 3 optimal routes. Route A saves 2.5 hours and $180 in fuel costs.",
      timestamp: "2:30 PM",
    },
    {
      id: "2",
      role: "user",
      agent: "You",
      content: "What about environmental impact?",
      timestamp: "2:31 PM",
    },
    {
      id: "3",
      role: "agent",
      agent: "Sustainability Agent",
      content:
        "Route A reduces carbon emissions by 15kg CO2 equivalent compared to the current route. Perfect for your eco-goals!",
      timestamp: "2:31 PM",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([
      ...messages,
      {
        id: String(messages.length + 1),
        role: "user",
        agent: "You",
        content: input,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setInput("")
  }

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Multi-Agent Chat</h1>
        <p className="text-muted-foreground">Collaborate with specialized agents and see their handoffs</p>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 space-y-4 bg-card border border-border rounded-lg p-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-md rounded-lg p-4 ${
                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted border border-border"
              }`}
            >
              <p className="text-xs font-semibold mb-1 opacity-75">{message.agent}</p>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-50 mt-2">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask the agents anything..."
          className="flex-1 bg-card border border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary"
        />
        <button
          onClick={handleSend}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
