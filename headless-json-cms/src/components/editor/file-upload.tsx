"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Link, Image as ImageIcon, File } from "lucide-react"

interface FileUploadProps {
  onUpload: (file: File) => void
  onUrlUpload: (url: string) => void
  acceptedTypes?: string[]
  maxSize?: number
  className?: string
}

export function FileUpload({ 
  onUpload, 
  onUrlUpload, 
  acceptedTypes = ["image/*", "application/pdf", "text/*"],
  maxSize = 10 * 1024 * 1024, // 10MB
  className 
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFile = (file: File) => {
    // Validate file size
    if (file.size > maxSize) {
      alert(`File too large. Maximum size is ${maxSize / 1024 / 1024}MB`)
      return
    }

    // Validate file type
    const isValidType = acceptedTypes.some(type => {
      if (type.endsWith("/*")) {
        return file.type.startsWith(type.slice(0, -1))
      }
      return file.type === type
    })

    if (!isValidType) {
      alert(`File type not supported. Accepted types: ${acceptedTypes.join(", ")}`)
      return
    }

    setUploading(true)
    onUpload(file)
    setUploading(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onUrlUpload(urlInput.trim())
      setUrlInput("")
      setShowUrlInput(false)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />
    }
    return <File className="h-8 w-8 text-gray-500" />
  }

  return (
    <div className={className}>
      <Card>
        <CardContent className="p-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-primary/50"
            } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={acceptedTypes.join(",")}
              onChange={handleFileInput}
              disabled={uploading}
            />

            <div className="space-y-4">
              <div className="flex justify-center">
                {uploading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
              </div>

              <div>
                <p className="text-lg font-medium">
                  {uploading ? "Uploading..." : "Drop files here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or{" "}
                  <button
                    onClick={openFileDialog}
                    className="text-primary hover:underline"
                    disabled={uploading}
                  >
                    browse files
                  </button>
                </p>
              </div>

              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openFileDialog}
                  disabled={uploading}
                >
                  Choose Files
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  disabled={uploading}
                >
                  <Link className="h-4 w-4 mr-2" />
                  From URL
                </Button>
              </div>

              {showUrlInput && (
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 border border-input bg-background rounded-md text-sm"
                    onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                  />
                  <Button size="sm" onClick={handleUrlSubmit}>
                    Add
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowUrlInput(false)
                      setUrlInput("")
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-xs text-muted-foreground text-center">
            <p>
              Max file size: {maxSize / 1024 / 1024}MB
            </p>
            <p>
              Supported formats: {acceptedTypes.join(", ")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
