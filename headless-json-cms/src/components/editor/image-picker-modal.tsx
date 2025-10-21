"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/editor/file-upload"

interface MediaFile {
  filename: string
  url: string
  size: number
  createdAt: string
  modifiedAt: string
}

interface ImagePickerModalProps {
  open: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

export function ImagePickerModal({ open, onClose, onSelect }: ImagePickerModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [search, setSearch] = useState("")
  const [urlInput, setUrlInput] = useState("")

  useEffect(() => {
    if (open) fetchFiles()
  }, [open])

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/upload")
      const data = await res.json()
      setFiles(Array.isArray(data) ? data : [])
    } catch {
      setFiles([])
    }
  }

  const onUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: formData })
    if (res.ok) fetchFiles()
  }

  const onUrlUpload = async (url: string) => {
    // No separate endpoint; allow selecting URL directly
    if (url) onSelect(url)
  }

  if (!open) return null

  const filtered = files.filter((f) => f.filename.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Insert Image</CardTitle>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-3">
              <div className="relative">
                <Input
                  placeholder="Search uploaded images..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-3"
                />
              </div>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-3 max-h-[320px] overflow-auto">
                {filtered.map((f) => (
                  <button key={f.filename} className="border rounded-md overflow-hidden group" onClick={() => onSelect(f.url)}>
                    <img src={f.url} alt={f.filename} className="w-full h-28 object-cover" />
                    <div className="p-2 text-xs truncate text-muted-foreground group-hover:text-foreground">{f.filename}</div>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className="text-sm text-muted-foreground">No images</div>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-medium">Upload from computer</div>
              <FileUpload onUpload={onUpload} onUrlUpload={onUrlUpload} acceptedTypes={["image/*"]} />

              <div className="text-sm font-medium mt-4">Insert by URL</div>
              <div className="flex gap-2">
                <Input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="https://..." />
                <Button onClick={() => urlInput && onSelect(urlInput)}>Insert</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


