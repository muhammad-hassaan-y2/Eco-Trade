"use client"

import { useState } from "react"
import { Upload, Check, AlertCircle, Zap } from "lucide-react"

interface FileUpload {
  id: string
  name: string
  progress: number
  status: "uploading" | "analyzing" | "complete" | "error"
  confidence: number
}

export default function UploadInterface() {
  const [files, setFiles] = useState<FileUpload[]>([
    { id: "1", name: "shipment-2024-001.pdf", progress: 100, status: "complete", confidence: 98.5 },
    { id: "2", name: "compliance-check.pdf", progress: 65, status: "analyzing", confidence: 0 },
    { id: "3", name: "invoice-bundle.zip", progress: 30, status: "uploading", confidence: 0 },
  ])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">File Upload & Analysis</h1>
        <p className="text-muted-foreground">Drag-drop files for Gemini AI analysis with real-time confidence scores</p>
      </div>

      {/* Upload Zone */}
      <div className="mb-8 border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary hover:bg-card/50 transition-all cursor-pointer glow-accent">
        <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Drop files here</h3>
        <p className="text-muted-foreground mb-4">or click to browse</p>
        <div className="flex justify-center gap-2 text-xs">
          <span className="px-3 py-1 rounded bg-muted text-muted-foreground">PDF</span>
          <span className="px-3 py-1 rounded bg-muted text-muted-foreground">ZIP</span>
          <span className="px-3 py-1 rounded bg-muted text-muted-foreground">Image</span>
        </div>
      </div>

      {/* File List */}
      <div className="space-y-3">
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </div>

      {/* Suggested Corrections */}
      <div className="mt-8 bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Suggested Corrections</h3>
        <div className="space-y-3">
          <CorrectionItem title="Missing Certificate" description="Add HSE certificate for compliance" />
          <CorrectionItem title="Invalid Route" description="Suggested optimal route saves 2.5 hours" />
          <CorrectionItem title="Weight Variance" description="Declared weight exceeds by 150kg" />
        </div>
      </div>
    </div>
  )
}

function FileItem({ file }: { file: FileUpload }) {
  const getStatusIcon = () => {
    if (file.status === "complete") return <Check className="w-5 h-5 text-primary" />
    if (file.status === "error") return <AlertCircle className="w-5 h-5 text-destructive" />
    return <Zap className="w-5 h-5 text-primary animate-pulse" />
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          {getStatusIcon()}
          <div>
            <p className="font-medium text-white">{file.name}</p>
            <p className="text-xs text-muted-foreground">{file.progress}% complete</p>
          </div>
        </div>
        {file.status === "complete" && (
          <div className="text-right">
            <p className="text-primary font-semibold">{file.confidence}%</p>
            <p className="text-xs text-muted-foreground">confidence</p>
          </div>
        )}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${file.progress}%` }} />
      </div>
    </div>
  )
}

function CorrectionItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border hover:border-secondary transition-colors">
      <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-1" />
      <div className="flex-1">
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
