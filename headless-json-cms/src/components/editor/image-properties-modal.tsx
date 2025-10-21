"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ImagePropertiesModalProps {
  open: boolean
  initialUrl: string
  initialAlt?: string
  initialWidth?: number
  initialHeight?: number
  onClose: () => void
  onApply: (props: { alt: string; width?: number; height?: number }) => void
}

export function ImagePropertiesModal({ open, initialUrl, initialAlt, initialWidth, initialHeight, onClose, onApply }: ImagePropertiesModalProps) {
  const [alt, setAlt] = useState(initialAlt || "")
  const [width, setWidth] = useState<number | "">(initialWidth || "")
  const [height, setHeight] = useState<number | "">(initialHeight || "")

  useEffect(() => {
    if (open) {
      setAlt(initialAlt || "")
      setWidth(initialWidth || "")
      setHeight(initialHeight || "")
    }
  }, [open, initialAlt, initialWidth, initialHeight])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Edit Image Properties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            {/* preview */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={initialUrl} alt={alt} className="max-h-40 rounded border" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm">Alt text</label>
            <Input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe this image" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <label className="text-sm">Width (px)</label>
              <Input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="auto"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Height (px)</label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="auto"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={() => onApply({ alt, width: width === "" ? undefined : width, height: height === "" ? undefined : height })}>Apply</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


