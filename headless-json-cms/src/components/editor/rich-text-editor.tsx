"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Quote, Heading1, Heading2 } from "lucide-react"
import { ImagePickerModal } from "@/components/editor/image-picker-modal"
import { ImagePropertiesModal } from "@/components/editor/image-properties-modal"

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  className?: string
}

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showImageProps, setShowImageProps] = useState(false)
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ""
    }
  }, [value])

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const insertLink = () => {
    const url = prompt("Enter URL")
    if (url) exec("createLink", url)
  }

  const insertImage = () => {
    setShowImageModal(true)
  }

  const onEditorClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target && target.tagName === "IMG") {
      setSelectedImage(target as HTMLImageElement)
      setShowImageProps(true)
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 p-2 border rounded-t-md bg-muted/40">
        <Button type="button" variant="outline" size="sm" onClick={() => exec("bold")}> <Bold className="h-4 w-4" /> </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec("italic")}> <Italic className="h-4 w-4" /> </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec("underline")}> <Underline className="h-4 w-4" /> </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button type="button" variant="outline" size="sm" onClick={() => exec("formatBlock", "<h1>")}> <Heading1 className="h-4 w-4" /> </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec("formatBlock", "<h2>")}> <Heading2 className="h-4 w-4" /> </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec("formatBlock", "<blockquote>")}> <Quote className="h-4 w-4" /> </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button type="button" variant="outline" size="sm" onClick={() => exec("insertUnorderedList")}> <List className="h-4 w-4" /> </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec("insertOrderedList")}> <ListOrdered className="h-4 w-4" /> </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button type="button" variant="outline" size="sm" onClick={insertLink}> <LinkIcon className="h-4 w-4" /> </Button>
        <Button type="button" variant="outline" size="sm" onClick={insertImage}> <ImageIcon className="h-4 w-4" /> </Button>
      </div>
      <div
        ref={editorRef}
        className="min-h-[220px] border-x border-b rounded-b-md bg-background p-3 focus:outline-none prose prose-sm max-w-none"
        contentEditable
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        onClick={onEditorClick}
        suppressContentEditableWarning
      />
      <ImagePickerModal
        open={showImageModal}
        onClose={() => setShowImageModal(false)}
        onSelect={(url) => {
          exec("insertImage", url)
          setShowImageModal(false)
        }}
      />
      <ImagePropertiesModal
        open={showImageProps}
        initialUrl={selectedImage?.getAttribute("src") || ""}
        initialAlt={selectedImage?.getAttribute("alt") || ""}
        initialWidth={selectedImage?.width}
        initialHeight={selectedImage?.height}
        onClose={() => setShowImageProps(false)}
        onApply={({ alt, width, height }) => {
          if (!selectedImage) return
          selectedImage.setAttribute("alt", alt || "")
          if (width) selectedImage.setAttribute("width", String(width)); else selectedImage.removeAttribute("width")
          if (height) selectedImage.setAttribute("height", String(height)); else selectedImage.removeAttribute("height")
          if (editorRef.current) onChange(editorRef.current.innerHTML)
          setShowImageProps(false)
        }}
      />
    </div>
  )
}


