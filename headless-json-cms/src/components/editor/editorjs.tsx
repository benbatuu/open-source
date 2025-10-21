"use client"

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"

type EditorJSInstance = any

interface EditorJSProps {
  holderId: string
  initialData?: any
  onChange?: (data: any) => void
  autoSave?: boolean
}

export interface EditorJSHandle {
  save: () => Promise<any>
  isReady: () => boolean
}

// Dynamic import Editor.js and tools from npm packages (client-only)
async function loadEditorAndTools() {
  const [{ default: EditorJS }, headerMod, listMod, paragraphMod, imageMod] = await Promise.all([
    import("@editorjs/editorjs"),
    import("@editorjs/header").catch(() => null),
    import("@editorjs/list").catch(() => null),
    import("@editorjs/paragraph").catch(() => null),
    import("@editorjs/image").catch(() => null),
  ])

  const Header = headerMod ? (headerMod as any).default || (headerMod as any) : null
  const List = listMod ? (listMod as any).default || (listMod as any) : null
  const Paragraph = paragraphMod ? (paragraphMod as any).default || (paragraphMod as any) : null
  const ImageTool = imageMod ? (imageMod as any).default || (imageMod as any) : null

  return { EditorJS, Header, List, Paragraph, ImageTool }
}

export const EditorJSClient = forwardRef<EditorJSHandle, EditorJSProps>(function EditorJSClient(
  { holderId, initialData, onChange, autoSave = false },
  ref
) {
  const editorRef = useRef<EditorJSInstance | null>(null)
  const [ready, setReady] = useState(false)

  const ensureLoaded = useCallback(async () => {
    return await loadEditorAndTools()
  }, [])

  useEffect(() => {
    let destroyed = false
    ;(async () => {
      try {
        const { EditorJS, Header, List, Paragraph, ImageTool } = await ensureLoaded()
        if (destroyed) return

        const tools: Record<string, any> = {}
        if (Header) tools.header = { class: Header, inlineToolbar: true, config: { levels: [2,3,4], defaultLevel: 2 } }
        if (Paragraph) tools.paragraph = { class: Paragraph, inlineToolbar: true }
        if (List) tools.list = { class: List, inlineToolbar: true }
        if (ImageTool) tools.image = {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                const form = new FormData()
                form.append("file", file)
                const res = await fetch("/api/upload", { method: "POST", body: form })
                const json = await res.json()
                if (!res.ok) throw new Error(json?.error || "Upload failed")
                return { success: 1, file: { url: json.url, alt: file.name } }
              },
              async uploadByUrl(url: string) {
                return { success: 1, file: { url } }
              },
            },
          },
        }

        editorRef.current = new EditorJS({
          holder: holderId,
          data: initialData || { blocks: [] },
          autofocus: true,
          tools,
          onChange: async () => {
            if (!autoSave || !onChange || !editorRef.current) return
            const saved = await editorRef.current.save()
            onChange(saved)
          },
        })
        setReady(true)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("EditorJS load/init error", e)
      }
    })()
    return () => {
      destroyed = true
      if (editorRef.current && editorRef.current.destroy) editorRef.current.destroy()
      editorRef.current = null
    }
  }, [ensureLoaded, holderId, initialData, onChange])

  useImperativeHandle(ref, () => ({
    save: async () => {
      if (!editorRef.current) return { blocks: [] }
      return await editorRef.current.save()
    },
    isReady: () => !!editorRef.current,
  }))

  return (
    <div className="border rounded-md">
      <div id={holderId} className="min-h-[260px] bg-background"></div>
      {!ready && (
        <div className="p-3 text-sm text-muted-foreground">Loading editor...</div>
      )}
    </div>
  )
})

export function EditorJSPreview({ data }: { data: any }) {
  // minimal blocks-to-HTML renderer
  const blocks = data?.blocks || []
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed prose-li:text-foreground prose-li:leading-relaxed prose-img:rounded-lg prose-img:shadow-md">
      {blocks.map((b: any, idx: number) => {
        switch (b.type) {
          case "header": {
            const level = Math.min(Math.max(Number(b.data.level) || 2, 1), 6)
            const tagName = `h${level}` as keyof HTMLElementTagNameMap
            const className = level === 1 ? "text-4xl font-bold mb-6 mt-8" :
                             level === 2 ? "text-3xl font-bold mb-5 mt-7" :
                             level === 3 ? "text-2xl font-semibold mb-4 mt-6" :
                             level === 4 ? "text-xl font-semibold mb-3 mt-5" :
                             level === 5 ? "text-lg font-semibold mb-3 mt-4" :
                             "text-base font-semibold mb-2 mt-3"
            return React.createElement(tagName, { 
              key: idx, 
              className: className,
              id: b.data.text?.toLowerCase().replace(/[^a-z0-9]+/g, "-")
            }, b.data.text)
          }
          case "paragraph":
            return (
              <p 
                key={idx} 
                className="mb-4 leading-relaxed text-foreground"
                dangerouslySetInnerHTML={{ __html: b.data.text }} 
              />
            )
          case "list": {
            const items = (b.data.items || [])
            const listClassName = "mb-6 space-y-2"
            if (b.data.style === "ordered") {
              return (
                <ol key={idx} className={`list-decimal list-inside ${listClassName}`}>
                  {items.map((it: any, i: number) => {
                    // Handle both string and object formats
                    const content = typeof it === 'string' ? it : it.content || it
                    return (
                      <li 
                        key={i} 
                        className="leading-relaxed text-foreground"
                        dangerouslySetInnerHTML={{ __html: content }} 
                      />
                    )
                  })}
                </ol>
              )
            }
            return (
              <ul key={idx} className={`list-disc list-inside ${listClassName}`}>
                {items.map((it: any, i: number) => {
                  // Handle both string and object formats
                  const content = typeof it === 'string' ? it : it.content || it
                  return (
                    <li 
                      key={i} 
                      className="leading-relaxed text-foreground"
                      dangerouslySetInnerHTML={{ __html: content }} 
                    />
                  )
                })}
              </ul>
            )
          }
          case "image":
            return (
              <div key={idx} className="my-8">
                <img 
                  src={b.data.file?.url || b.data.url} 
                  alt={b.data.caption || ""} 
                  className="w-full h-auto rounded-lg shadow-md"
                />
                {b.data.caption && (
                  <p className="text-sm text-muted-foreground text-center mt-2 italic">
                    {b.data.caption}
                  </p>
                )}
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}


