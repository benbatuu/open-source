"use client"

import { useState, useEffect, useRef } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, FileText, Edit, Trash2, Eye, Calendar, EyeOff, Sparkles, Filter, X, Check, ChevronDown } from "lucide-react"
import Link from "next/link"
import { ContentItem, Schema } from "@/lib/file-system"
// Kept inline create editor simple: redirect to full editor page for complex edits
import { AiGenerateModal } from "@/components/editor/ai-generate-modal"
import { RouteGuard } from "@/components/auth/route-guard"

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [schemas, setSchemas] = useState<Schema[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSchema, setSelectedSchema] = useState<string>("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [editorTitle, setEditorTitle] = useState("")
  const [editorSchema, setEditorSchema] = useState<string>("")
  const [editorHtml, setEditorHtml] = useState("")
  const [showAiModal, setShowAiModal] = useState(false)
  const categoryDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchContent()
    fetchSchemas()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryFilter(false)
      }
    }

    if (showCategoryFilter) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCategoryFilter])

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content")
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error("Failed to fetch content:", error)
    }
  }

  const fetchSchemas = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch("/api/schemas", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        // Ensure data is an array
        setSchemas(Array.isArray(data) ? data : [])
      } else {
        console.error("Failed to fetch schemas:", response.status)
        setSchemas([])
      }
    } catch (error) {
      console.error("Failed to fetch schemas:", error)
      setSchemas([])
    }
  }

  const openCreate = () => {
    setEditorTitle("")
    setEditorSchema("")
    setEditorHtml("")
    setPreviewMode(false)
    setShowEditor(true)
  }

  const saveContent = async () => {
    if (!editorTitle || !editorSchema) {
      alert("Title and schema are required")
      return
    }
    try {
      const body = {
        title: editorTitle,
        slug: editorTitle.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        content: { body: editorHtml },
        schema: editorSchema,
        status: "draft",
        author: "Admin",
      }
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setShowEditor(false)
        fetchContent()
      } else {
        const err = await res.json()
        alert(err?.error || "Failed to save content")
      }
    } catch (e) {
      console.error(e)
      alert("Failed to save content")
    }
  }

  const handleDeleteContent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return

    try {
      const response = await fetch(`/api/content/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchContent()
      }
    } catch (error) {
      console.error("Failed to delete content:", error)
    }
  }

  const filteredContent = content.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSchema = !selectedSchema || item.schema === selectedSchema
    const matchesCategories = selectedCategories.length === 0 || 
                             selectedCategories.some(category => item.metadata?.tags?.includes(category))
    return matchesSearch && matchesSchema && matchesCategories
  })

  const getSchemaName = (schemaId: string) => {
    const schema = schemas.find(s => s.id === schemaId)
    return schema?.name || schemaId
  }

  const allCategories = Array.from(new Set(content.flatMap(item => item.metadata?.tags || [])))

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearAllCategories = () => {
    setSelectedCategories([])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500"
      case "draft":
        return "bg-yellow-500"
      case "archived":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <RouteGuard allowedRoles={["admin", "editor"]}>
      <DashboardLayout>
        <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content</h1>
            <p className="text-muted-foreground">
              Manage your content items
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAiModal(true)}>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate with AI
            </Button>
            <Link href="/content/editor" className="inline-flex">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Content
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          
          {/* Category Filter Dropdown */}
          {allCategories.length > 0 && (
            <div className="relative" ref={categoryDropdownRef}>
              <Button
                variant="outline"
                onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                className="flex items-center gap-2 min-w-[180px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Categories</span>
                  {selectedCategories.length > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                      {selectedCategories.length}
                    </span>
                  )}
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {showCategoryFilter && (
                <div className="absolute top-full left-0 mt-1 w-full bg-background border border-input rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    {selectedCategories.length > 0 && (
                      <div className="flex items-center justify-between mb-2 pb-2 border-b">
                        <span className="text-sm text-muted-foreground">
                          {selectedCategories.length} selected
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAllCategories}
                          className="h-6 px-2 text-xs"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Clear
                        </Button>
                      </div>
                    )}
                    <div className="space-y-1">
                      {allCategories.map((category) => {
                        const isSelected = selectedCategories.includes(category)
                        return (
                          <Button
                            key={category}
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCategory(category)}
                            className="w-full justify-start h-8 px-2"
                          >
                            <div className="flex items-center gap-2 w-full">
                              <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                                isSelected ? 'bg-primary border-primary' : 'border-input'
                              }`}>
                                {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                              </div>
                              <span className="text-sm">{category}</span>
                            </div>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <select
            value={selectedSchema}
            onChange={(e) => setSelectedSchema(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="">All Schemas</option>
            {Array.isArray(schemas) && schemas.map((schema) => (
              <option key={schema.id} value={schema.id}>
                {schema.name}
              </option>
            ))}
          </select>
        </div>

        {showEditor && (
          <Card>
            <CardHeader>
              <CardTitle>New Content</CardTitle>
              <CardDescription>Write with rich editor, toggle preview, and save</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm">Title</label>
                <Input value={editorTitle} onChange={(e) => setEditorTitle(e.target.value)} placeholder="Title" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm">Schema</label>
                <select
                  value={editorSchema}
                  onChange={(e) => setEditorSchema(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="">Select schema</option>
                  {Array.isArray(schemas) && schemas.map((schema) => (
                    <option key={schema.id} value={schema.id}>{schema.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Rich Text Editor</div>
                <Button variant="ghost" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                  {previewMode ? <><EyeOff className="h-4 w-4 mr-1" /> Hide Preview</> : <><Eye className="h-4 w-4 mr-1" /> Preview</>}
                </Button>
              </div>

              {!previewMode ? (
                <div className="text-sm text-muted-foreground">Use the full editor page for rich editing.</div>
              ) : (
                <div className="prose max-w-none border rounded-md p-4" dangerouslySetInnerHTML={{ __html: editorHtml }} />
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditor(false)}>Cancel</Button>
                <Button onClick={saveContent}>Save</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <AiGenerateModal
          open={showAiModal}
          schemas={Array.isArray(schemas) ? schemas : []}
          onClose={() => setShowAiModal(false)}
          onGenerate={(html) => {
            setShowAiModal(false)
            setEditorHtml(html)
            setPreviewMode(true)
            setShowEditor(true)
          }}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContent.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0 flex-1">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg leading-tight line-clamp-2 break-words" title={item.title}>
                        {item.title}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                <Link href={`/blog/${item.slug}`} className="inline-flex" target="_blank">
                  <Button variant="ghost" size="sm" title="View on website">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/content/editor?id=${item.id}`} className="inline-flex">
                  <Button variant="ghost" size="sm" title="Edit content">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteContent(item.id)}
                      className="text-destructive hover:text-destructive"
                      title="Delete content"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Schema: {getSchemaName(item.schema)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${getStatusColor(item.status)}`} />
                  <span className="text-sm capitalize">{item.status}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Updated {new Date(item.updatedAt).toLocaleDateString()}</span>
                </div>

                {item.metadata?.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.metadata.description}
                  </p>
                )}

                {item.metadata?.tags && item.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.metadata.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.metadata.tags.length > 3 && (
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                        +{item.metadata.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm || selectedSchema || selectedCategories.length > 0 ? "No content found" : "No content created yet"}
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm || selectedSchema || selectedCategories.length > 0
                  ? "Try adjusting your search criteria or filters."
                  : "Create your first content item to get started."
                }
              </p>
              {!searchTerm && !selectedSchema && selectedCategories.length === 0 && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Content
                </Button>
              )}
            </CardContent>
          </Card>
        )}
        </div>
      </DashboardLayout>
    </RouteGuard>
  )
}
