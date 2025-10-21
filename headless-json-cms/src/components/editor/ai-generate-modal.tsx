"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

interface AiGenerateModalProps {
  open: boolean
  schemas: Array<{ id: string; name: string; slug: string }>
  onClose: () => void
  onGenerate: (html: string) => void
}

export function AiGenerateModal({ open, schemas, onClose, onGenerate }: AiGenerateModalProps) {
  const [schemaId, setSchemaId] = useState("")
  const [topic, setTopic] = useState("")
  const [language, setLanguage] = useState("tr")
  const [instructions, setInstructions] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) {
      setSchemaId("")
      setTopic("")
      setLanguage("tr")
      setInstructions("")
      setLoading(false)
    }
  }, [open])

  if (!open) return null

  const submit = async () => {
    if (!schemaId || !topic) return
    setLoading(true)
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schemaId, topic, language, instructions }),
      })
      const data = await res.json()
      if (res.ok && data?.html) {
        onGenerate(data.html)
        onClose()
      } else {
        alert(data?.error || "Failed to generate content")
      }
    } catch (e) {
      alert("AI generation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-xl">
        <CardContent className="p-6 space-y-4">
          <div className="text-lg font-semibold">Generate with AI</div>
          <div className="grid gap-3">
            <label className="text-sm">Schema</label>
            <select
              value={schemaId}
              onChange={(e) => setSchemaId(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">Select schema</option>
              {schemas.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Topic</label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Modern React Patterns" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="tr">Turkish</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Additional Instructions (optional)</label>
            <Input value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="tone, outline, keywords..." />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button onClick={submit} disabled={loading || !schemaId || !topic}>
              {loading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


