"use client"

import { useEffect, useMemo, useRef, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ContentItem, Schema } from "@/lib/file-system"
import { EditorJSClient, EditorJSPreview, EditorJSHandle } from "@/components/editor/editorjs"
import { AiGenerateModal } from "@/components/editor/ai-generate-modal"
import { ImageUpload } from "@/components/ui/image-upload"
import { Eye, EyeOff, Smartphone, Tablet, Monitor, Save, ArrowLeft, Trash2, Sparkles, Loader2 } from "lucide-react"

function ContentEditorForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const contentId = searchParams.get("id")

  const [schemas, setSchemas] = useState<Schema[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showAiModal, setShowAiModal] = useState(false)

  const [title, setTitle] = useState("")
  const [schemaId, setSchemaId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [status, setStatus] = useState<ContentItem["status"]>("draft")
  const [author, setAuthor] = useState("Admin")
  const [editorData, setEditorData] = useState<any>({ blocks: [] })
  const editorRef = useRef<EditorJSHandle | null>(null)

  // SEO fields
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [seoKeywords, setSeoKeywords] = useState("")
  const [seoImage, setSeoImage] = useState("")
  const [canonicalUrl, setCanonicalUrl] = useState("")
  
  // Blog specific fields
  const [coverImage, setCoverImage] = useState("")
  const [excerpt, setExcerpt] = useState("")

  useEffect(() => {
    fetchSchemas()
    fetchCategories()
  }, [])

  useEffect(() => {
    if (contentId) fetchContent(contentId)
  }, [contentId])

  const fetchSchemas = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      const res = await fetch("/api/schemas", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      setSchemas(Array.isArray(data) ? data : [])
    } catch {
      setSchemas([])
    }
  }

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      const res = await fetch("/api/categories", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch {
      setCategories([])
    }
  }

  const fetchContent = async (id: string) => {
    try {
      const res = await fetch(`/api/content/${id}`)
      if (!res.ok) return
      const data: ContentItem = await res.json()
      setTitle(data.title)
      setSchemaId(data.schema)
      setCategoryId(data.metadata?.category || "")
      setStatus(data.status)
      setAuthor(data.author)
      setEditorData(data.content?.blocks ? { blocks: data.content.blocks } : { blocks: [] })
      
      // Load SEO fields
      setSeoTitle(data.metadata?.["seo-title"] || "")
      setSeoDescription(data.metadata?.["seo-description"] || "")
      setSeoKeywords(data.metadata?.["seo-keywords"] || "")
      setSeoImage(data.metadata?.["seo-image"] || "")
      setCanonicalUrl(data.metadata?.["canonical-url"] || "")
      
      // Load blog specific fields
      setCoverImage((data.metadata as any)?.["cover"] || "")
      setExcerpt((data.metadata as any)?.["excerpt"] || "")
    } catch {}
  }

  const togglePreview = async () => {
    if (!previewMode) {
      // going to preview: capture current editor data first
      try {
        if (editorRef.current?.isReady()) {
          const latest = await editorRef.current.save()
          setEditorData(latest)
        }
      } catch {}
      setPreviewMode(true)
    } else {
      // back to editor
      setPreviewMode(false)
    }
  }

  const frameClass = useMemo(() => {
    switch (device) {
      case "mobile":
        return "max-w-[390px]"
      case "tablet":
        return "max-w-[768px]"
      default:
        return "max-w-[100%]"
    }
  }, [device])

  const save = async () => {
    if (!title || !schemaId) {
      alert("Title and schema are required")
      return
    }
    setLoading(true)
    try {
      // pull latest blocks from editor instance (no auto save)
      let latest = editorData
      try {
        if (editorRef.current?.isReady()) {
          latest = await editorRef.current.save()
          setEditorData(latest)
        }
      } catch {}

      const body = {
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        content: { blocks: latest?.blocks || [] },
        schema: schemaId,
        status,
        author,
        metadata: {
          "seo-title": seoTitle,
          "seo-description": seoDescription,
          "seo-keywords": seoKeywords,
          "seo-image": seoImage,
          "canonical-url": canonicalUrl,
          "cover": coverImage,
          "excerpt": excerpt,
          "category": categoryId,
        },
      }
      const res = await fetch(`/api/content${contentId ? "/" + contentId : ""}`, {
        method: contentId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const err = await res.json()
        alert(err?.error || "Failed to save")
      } else {
        alert("Saved")
        router.push("/content")
      }
    } catch (e) {
      alert("Failed to save")
    } finally {
      setLoading(false)
    }
  }

  const remove = async () => {
    if (!contentId) return
    if (!confirm("Delete this content?")) return
    setLoading(true)
    try {
      const res = await fetch(`/api/content/${contentId}`, { method: "DELETE" })
      if (!res.ok) {
        const err = await res.json()
        alert(err?.error || "Failed to delete")
      } else {
        router.push("/content")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Editor</h1>
            <p className="text-muted-foreground">Create or update content with device previews</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push("/content")}> <ArrowLeft className="h-4 w-4 mr-2" /> Back</Button>
            <Button variant="outline" onClick={() => setShowAiModal(true)}> <Sparkles className="h-4 w-4 mr-2" /> Generate with AI</Button>
            <Button variant="outline" onClick={togglePreview}>
              {previewMode ? <><EyeOff className="h-4 w-4 mr-2" /> Hide Preview</> : <><Eye className="h-4 w-4 mr-2" /> Preview</>}
            </Button>
            <div className="flex rounded-md border overflow-hidden">
              <Button variant={device === "mobile" ? "default" : "ghost"} onClick={() => setDevice("mobile")}> <Smartphone className="h-4 w-4" /> </Button>
              <Button variant={device === "tablet" ? "default" : "ghost"} onClick={() => setDevice("tablet")}> <Tablet className="h-4 w-4" /> </Button>
              <Button variant={device === "desktop" ? "default" : "ghost"} onClick={() => setDevice("desktop")}> <Monitor className="h-4 w-4" /> </Button>
            </div>
            {contentId && (
              <Button variant="destructive" onClick={remove}> <Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
            )}
            <Button onClick={save} disabled={loading}> <Save className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save"}</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Title, schema, status and author</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Schema</label>
              <select
                value={schemaId}
                onChange={(e) => setSchemaId(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="">Select schema</option>
                {Array.isArray(schemas) && schemas.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="">Select Category</option>
                {Array.isArray(categories) && categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContentItem["status"])}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Author</label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Excerpt</label>
              <Textarea 
                value={excerpt} 
                onChange={(e) => setExcerpt(e.target.value)} 
                placeholder="Brief description of the post" 
                rows={3}
              />
            </div>
            <ImageUpload
              value={coverImage}
              onChange={setCoverImage}
              placeholder="Select or upload a cover image"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Editor</CardTitle>
            <CardDescription>Write content and preview across devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className={`w-full ${frameClass}`}>
                {!previewMode ? (
                  <EditorJSClient ref={editorRef} holderId="editorjs" initialData={editorData} onChange={setEditorData} autoSave={false} />
                ) : (
                  <div className="prose max-w-none border rounded-md p-4">
                    <EditorJSPreview data={editorData} />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Optimize your content for search engines and social media</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">SEO Title</label>
              <Input 
                value={seoTitle} 
                onChange={(e) => setSeoTitle(e.target.value)} 
                placeholder="SEO optimized title (max 60 chars)" 
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground">
                {seoTitle.length}/60 characters. Leave empty to use the main title.
              </p>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">SEO Description</label>
              <Textarea 
                value={seoDescription} 
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSeoDescription(e.target.value)} 
                placeholder="SEO description (max 160 chars)" 
                maxLength={160}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {seoDescription.length}/160 characters. This appears in search results.
              </p>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">SEO Keywords</label>
              <Input 
                value={seoKeywords} 
                onChange={(e) => setSeoKeywords(e.target.value)} 
                placeholder="keyword1, keyword2, keyword3" 
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated keywords for SEO optimization.
              </p>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">SEO Image</label>
              <Input 
                value={seoImage} 
                onChange={(e) => setSeoImage(e.target.value)} 
                placeholder="https://example.com/seo-image.jpg" 
              />
              <p className="text-xs text-muted-foreground">
                Image for social media sharing (1200x630px recommended).
              </p>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Canonical URL</label>
              <Input 
                value={canonicalUrl} 
                onChange={(e) => setCanonicalUrl(e.target.value)} 
                placeholder="https://example.com/blog/post-url" 
              />
              <p className="text-xs text-muted-foreground">
                Canonical URL for this content to avoid duplicate content issues.
              </p>
            </div>
          </CardContent>
        </Card>

        <AiGenerateModal
          open={showAiModal}
          schemas={schemas}
          onClose={() => setShowAiModal(false)}
          onGenerate={(generatedHtml) => {
            setEditorData({ blocks: [ { type: "paragraph", data: { text: generatedHtml } } ] })
            setPreviewMode(true)
            setShowAiModal(false)
          }}
        />
      </div>
    </DashboardLayout>
  )
}

export default function ContentEditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <ContentEditorForm />
    </Suspense>
  )
}


