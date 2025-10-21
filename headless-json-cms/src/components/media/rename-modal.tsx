"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, File, Image, Video } from "lucide-react"

interface RenameModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (newName: string) => void
  currentName: string
  fileType: string
}

export function RenameModal({ isOpen, onClose, onSubmit, currentName, fileType }: RenameModalProps) {
  const [newName, setNewName] = useState("")

  useEffect(() => {
    if (isOpen && currentName) {
      // Remove file extension for editing
      const nameWithoutExt = currentName.replace(/\.[^/.]+$/, "")
      setNewName(nameWithoutExt)
    }
  }, [isOpen, currentName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return

    // Get the original file extension
    const extension = currentName.match(/\.[^/.]+$/)?.[0] || ""
    const finalName = newName.trim() + extension

    onSubmit(finalName)
  }

  const getFileIcon = () => {
    if (fileType.startsWith('image/')) return <Image className="h-8 w-8" />
    if (fileType.startsWith('video/')) return <Video className="h-8 w-8" />
    return <File className="h-8 w-8" />
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Rename File</CardTitle>
              <CardDescription>
                Change the name of your file
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File Preview */}
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
              <div className="flex-shrink-0">
                {getFileIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" title={currentName}>
                  {currentName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {fileType}
                </p>
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="newName">New Name</Label>
              <Input
                id="newName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new file name"
                autoFocus
                required
              />
              <p className="text-xs text-muted-foreground">
                File extension will be preserved automatically
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!newName.trim() || newName.trim() === currentName.replace(/\.[^/.]+$/, "")}
              >
                Rename
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}