"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Code, FileText, Download } from "lucide-react"

interface JsonPreviewProps {
  data: any
  schema?: any
  className?: string
}

export function JsonPreview({ data, schema, className }: JsonPreviewProps) {
  const [viewMode, setViewMode] = useState<"json" | "markdown" | "formatted">("formatted")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatValue = (value: any, fieldType?: string) => {
    if (value === null || value === undefined) return "—"
    
    switch (fieldType) {
      case "date":
        return formatDate(value)
      case "boolean":
        return value ? "Yes" : "No"
      case "image":
        return value ? (
          <img src={value} alt="Content image" className="max-w-full h-auto rounded" />
        ) : "No image"
      case "number":
        return typeof value === "number" ? value.toLocaleString() : value
      default:
        if (Array.isArray(value)) {
          return value.join(", ")
        }
        if (typeof value === "object") {
          return JSON.stringify(value, null, 2)
        }
        return String(value)
    }
  }

  const generateMarkdown = () => {
    let markdown = ""
    
    // Add title
    if (data.title) {
      markdown += `# ${data.title}\n\n`
    }

    // Add metadata
    if (data.metadata?.description) {
      markdown += `${data.metadata.description}\n\n`
    }

    // Add content fields
    if (data.content && typeof data.content === "object") {
      Object.entries(data.content).forEach(([key, value]) => {
        const field = schema?.fields?.find((f: any) => f.name === key)
        const fieldType = field?.type || "text"
        
        if (value !== null && value !== undefined && value !== "") {
          markdown += `## ${key.charAt(0).toUpperCase() + key.slice(1)}\n\n`
          
          if (fieldType === "image" && value) {
            markdown += `![${key}](${value})\n\n`
          } else if (fieldType === "rich-text") {
            markdown += `${value}\n\n`
          } else {
            markdown += `${formatValue(value, fieldType)}\n\n`
          }
        }
      })
    }

    // Add tags if available
    if (data.metadata?.tags && data.metadata.tags.length > 0) {
      markdown += `**Tags:** ${data.metadata.tags.join(", ")}\n\n`
    }

    // Add status and dates
    markdown += `---\n\n`
    markdown += `**Status:** ${data.status}\n\n`
    markdown += `**Created:** ${formatDate(data.createdAt)}\n\n`
    markdown += `**Updated:** ${formatDate(data.updatedAt)}\n\n`
    markdown += `**Author:** ${data.author}\n\n`

    return markdown
  }

  const renderFormattedView = () => {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold">{data.title || "Untitled"}</h1>
          {data.metadata?.description && (
            <p className="text-muted-foreground mt-2">{data.metadata.description}</p>
          )}
        </div>

        {/* Content Fields */}
        {data.content && typeof data.content === "object" && (
          <div className="space-y-4">
            {Object.entries(data.content).map(([key, value]) => {
              const field = schema?.fields?.find((f: any) => f.name === key)
              const fieldType = field?.type || "text"
              
              if (value === null || value === undefined || value === "") return null
              
              return (
                <div key={key} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <div className="text-sm">
                    {formatValue(value, fieldType)}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Metadata */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Status:</span> {data.status}
            </div>
            <div>
              <span className="font-medium">Author:</span> {data.author}
            </div>
            <div>
              <span className="font-medium">Created:</span> {formatDate(data.createdAt)}
            </div>
            <div>
              <span className="font-medium">Updated:</span> {formatDate(data.updatedAt)}
            </div>
          </div>
          
          {data.metadata?.tags && data.metadata.tags.length > 0 && (
            <div className="mt-4">
              <span className="font-medium text-sm">Tags:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.metadata.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderJsonView = () => {
    return (
      <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    )
  }

  const renderMarkdownView = () => {
    const markdown = generateMarkdown()
    return (
      <div className="prose prose-sm max-w-none">
        <pre className="whitespace-pre-wrap text-sm">{markdown}</pre>
      </div>
    )
  }

  const downloadMarkdown = () => {
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${data.title || "content"}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${data.title || "content"}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Content Preview
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "formatted" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("formatted")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Formatted
            </Button>
            <Button
              variant={viewMode === "json" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("json")}
            >
              <Code className="h-4 w-4 mr-2" />
              JSON
            </Button>
            <Button
              variant={viewMode === "markdown" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("markdown")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Markdown
            </Button>
            <div className="border-l pl-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadMarkdown}
                title="Download as Markdown"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadJson}
                title="Download as JSON"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === "formatted" && renderFormattedView()}
        {viewMode === "json" && renderJsonView()}
        {viewMode === "markdown" && renderMarkdownView()}
      </CardContent>
    </Card>
  )
}
