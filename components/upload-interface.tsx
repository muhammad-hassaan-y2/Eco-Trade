"use client"

import { ChangeEvent } from "react"
import { Upload, Check, AlertCircle, Zap } from "lucide-react"

interface FileUpload {
  id: string
  name: string
  progress: number
  status: "uploading" | "analyzing" | "complete" | "error"
  confidence: number
}

import { AnalysisResult } from "@/lib/types";

interface UploadInterfaceProps {
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setFileUpload: (files: FileUpload[]) => void;
  fileUpload: FileUpload[];
}

export default function UploadInterface({ setAnalysisResult, setFileUpload, fileUpload }: UploadInterfaceProps) {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const newFile: FileUpload = {
      id: Date.now().toString(),
      name: file.name,
      progress: 0,
      status: "uploading",
      confidence: 0,
    }
    setFileUpload([newFile])

    const formData = new FormData()
    formData.append("file", file)

    try {
      // Update status to analyzing
      setFileUpload(
        fileUpload.map((f) =>
          f.id === newFile.id ? { ...f, status: "analyzing", progress: 50 } : f
        )
      )

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result: AnalysisResult = await response.json()
      setAnalysisResult(result)

      // Update file status to complete
      setFileUpload(
        fileUpload.map((f) =>
          f.id === newFile.id
            ? {
                ...f,
                status: "complete",
                progress: 100,
                confidence: result.analysis.confidence,
              }
            : f
        )
      )
    } catch (error) {
      console.error(error)
      setFileUpload(
        fileUpload.map((f) =>
          f.id === newFile.id ? { ...f, status: "error" } : f
        )
      )
    }
  }

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
        <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex justify-center gap-2 text-xs">
            <span className="px-3 py-1 rounded bg-muted text-muted-foreground">PDF</span>
            <span className="px-3 py-1 rounded bg-muted text-muted-foreground">ZIP</span>
            <span className="px-3 py-1 rounded bg-muted text-muted-foreground">Image</span>
          </div>
        </label>
      </div>

      {/* File List */}
      <div className="space-y-3">
        {fileUpload.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </div>

      {/* Suggested Corrections */}
      <div className="mt-8 bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Suggested Corrections</h3>
        <div className="space-y-3">
          {/* This section will be updated when analysisResult is available in the parent component */}
          <p className="text-muted-foreground">Upload a file to see suggestions.</p>
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
