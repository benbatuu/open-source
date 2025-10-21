"use client"

import React, { createElement, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Folder, 
  FolderOpen, 
  Image, 
  Music, 
  Video, 
  FileText, 
  Archive, 
  Heart, 
  Star, 
  Home, 
  Briefcase,
  Camera,
  Palette,
  X
} from "lucide-react"

interface FolderModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; icon: string; color: string }) => void
  mode: 'create' | 'edit'
  initialData?: {
    name: string
    icon: string
    color: string
  }
}

const ICONS = [
  { value: 'folder', label: 'Folder', icon: Folder },
  { value: 'folder-open', label: 'Open Folder', icon: FolderOpen },
  { value: 'image', label: 'Images', icon: Image },
  { value: 'music', label: 'Music', icon: Music },
  { value: 'video', label: 'Videos', icon: Video },
  { value: 'file-text', label: 'Documents', icon: FileText },
  { value: 'archive', label: 'Archive', icon: Archive },
  { value: 'heart', label: 'Favorites', icon: Heart },
  { value: 'star', label: 'Important', icon: Star },
  { value: 'home', label: 'Home', icon: Home },
  { value: 'briefcase', label: 'Work', icon: Briefcase },
  { value: 'camera', label: 'Photos', icon: Camera },
  { value: 'palette', label: 'Design', icon: Palette },
]

const COLORS = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-50 text-blue-600' },
  { value: 'green', label: 'Green', class: 'bg-green-50 text-green-600' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-50 text-purple-600' },
  { value: 'red', label: 'Red', class: 'bg-red-50 text-red-600' },
  { value: 'yellow', label: 'Yellow', class: 'bg-yellow-50 text-yellow-600' },
  { value: 'pink', label: 'Pink', class: 'bg-pink-50 text-pink-600' },
  { value: 'indigo', label: 'Indigo', class: 'bg-indigo-50 text-indigo-600' },
  { value: 'gray', label: 'Gray', class: 'bg-gray-50 text-gray-600' },
]

export function FolderModal({ isOpen, onClose, onSubmit, mode, initialData }: FolderModalProps) {
  const [name, setName] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("folder")
  const [selectedColor, setSelectedColor] = useState("blue")

  // Update state when initialData changes
  React.useEffect(() => {
    if (initialData) {
      setName(initialData.name || "")
      setSelectedIcon(initialData.icon || "folder")
      setSelectedColor(initialData.color || "blue")
    } else {
      setName("")
      setSelectedIcon("folder")
      setSelectedColor("blue")
    }
  }, [initialData, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    
    onSubmit({
      name: name.trim(),
      icon: selectedIcon,
      color: selectedColor
    })
    
    // Reset form
    setName("")
    setSelectedIcon("folder")
    setSelectedColor("blue")
  }

  const handleClose = () => {
    onClose()
    // Reset form
    setName("")
    setSelectedIcon("folder")
    setSelectedColor("blue")
  }

  if (!isOpen) return null

  const selectedIconComponent = ICONS.find(i => i.value === selectedIcon)?.icon || Folder

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 h-screen">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {mode === 'create' ? 'Create New Folder' : 'Edit Folder'}
              </CardTitle>
              <CardDescription>
                {mode === 'create' 
                  ? 'Create a new folder with custom icon and color'
                  : 'Update folder settings'
                }
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Folder Name */}
            <div className="space-y-2">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter folder name"
                required
              />
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <div className={`aspect-square w-12 h-12 rounded-lg flex items-center justify-center ${COLORS.find(c => c.value === selectedColor)?.class || 'bg-blue-50 text-blue-600'}`}>
                  {createElement(selectedIconComponent, { className: "h-6 w-6" })}
                </div>
                <div>
                  <div className="font-medium">{name || "Folder Name"}</div>
                  <div className="text-sm text-muted-foreground">0 files</div>
                </div>
              </div>
            </div>

            {/* Icon Selection */}
            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="grid grid-cols-4 gap-2">
                {ICONS.map((icon) => {
                  const IconComponent = icon.icon
                  return (
                    <button
                      key={icon.value}
                      type="button"
                      onClick={() => setSelectedIcon(icon.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedIcon === icon.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <IconComponent className="h-6 w-6 mx-auto" />
                      <div className="text-xs mt-1 text-center">{icon.label}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full mx-auto ${color.class.split(' ')[0]}`} />
                    <div className="text-xs mt-1 text-center">{color.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {mode === 'create' ? 'Create Folder' : 'Update Folder'}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
