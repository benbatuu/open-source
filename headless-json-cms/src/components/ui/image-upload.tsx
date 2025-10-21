"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  X, 
  Search,
  Check,
  Loader2,
  Trash2,
  Eye,
  Folder,
  ArrowLeft,
  FolderOpen
} from "lucide-react"

interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  uploadedAt: string
  uploadedBy: string
  folder?: string
}

interface MediaFolder {
  id: string
  name: string
  path: string
  createdAt: string
  createdBy: string
  fileCount: number
  totalSize: number
  icon?: string
  color?: string
}

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  placeholder?: string
  className?: string
}

export function ImageUpload({ value, onChange, placeholder = "Select or upload an image", className }: ImageUploadProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [files, setFiles] = useState<MediaFile[]>([])
  const [folders, setFolders] = useState<MediaFolder[]>([])
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [currentFolder, setCurrentFolder] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      fetchFiles()
    }
  }, [open])

  const fetchFiles = async (folder: string = "") => {
    setLoading(true)
    try {
      const token = localStorage.getItem("auth_token")
      const url = folder ? `/api/media?folder=${encodeURIComponent(folder)}` : "/api/media"
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setFiles(Array.isArray(data.files) ? data.files : [])
        setFolders(Array.isArray(data.folders) ? data.folders : [])
      } else {
        console.error("Failed to fetch media")
        setFiles([])
        setFolders([])
      }
    } catch (error) {
      console.error("Failed to fetch files:", error)
      setFiles([])
      setFolders([])
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    try {
      const token = localStorage.getItem("auth_token")
      const formData = new FormData()
      formData.append("file", file)
      if (currentFolder) {
        formData.append("folder", currentFolder)
      }

      const response = await fetch("/api/media", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        onChange(result.url)
        setOpen(false)
        fetchFiles(currentFolder)
      } else {
        const error = await response.json()
        alert(error.error || "Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleUrlSelect = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setOpen(false)
      setUrlInput("")
    }
  }

  const handleFileSelect = (file: MediaFile) => {
    onChange(file.url)
    setOpen(false)
  }

  const handleFolderClick = (folder: MediaFolder) => {
    setCurrentFolder(folder.path)
    fetchFiles(folder.path)
  }

  const handleBackClick = () => {
    const parentPath = currentFolder.split('/').slice(0, -1).join('/')
    setCurrentFolder(parentPath)
    fetchFiles(parentPath)
  }

  const handleRemove = () => {
    onChange("")
  }

  const filteredFiles = files.filter(file => 
    file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getImagePreview = (url: string) => {
    if (url.startsWith("http") || url.startsWith("/")) {
      return url
    }
    return null
  }

  return (
    <div className={className}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Cover Image</label>
        
        {value ? (
          <div className="relative group">
            <div className="aspect-video w-full rounded-lg overflow-hidden border bg-muted">
              <img
                src={getImagePreview(value) || value}
                alt="Cover preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.nextElementSibling?.classList.remove('hidden')
                }}
              />
              <div className="hidden w-full h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Invalid image URL</p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle>Change Cover Image</DialogTitle>
                  </DialogHeader>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="upload">Upload New</TabsTrigger>
                      <TabsTrigger value="library">Media Library</TabsTrigger>
                      <TabsTrigger value="url">From URL</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upload" className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-4">
                          Drag and drop an image here, or click to select
                        </p>
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              Select File
                            </>
                          )}
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(file)
                          }}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="library" className="space-y-4">
                      {/* Navigation */}
                      <div className="flex items-center gap-2">
                        {currentFolder && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleBackClick}
                            className="flex items-center gap-2"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                          </Button>
                        )}
                        <div className="flex-1">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search images and folders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Current Path */}
                      {currentFolder && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Current folder:</span> {currentFolder || "Root"}
                        </div>
                      )}
                      
                      {loading ? (
                        <div className="flex items-center justify-center h-32">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                          {/* Folders */}
                          {filteredFolders.map((folder) => (
                            <Card 
                              key={folder.id} 
                              className="cursor-pointer transition-all hover:shadow-md"
                              onClick={() => handleFolderClick(folder)}
                            >
                              <CardContent className="p-2">
                                <div className="aspect-square rounded-md overflow-hidden bg-muted flex items-center justify-center">
                                  <div className="text-center">
                                    <FolderOpen className="h-8 w-8 mx-auto mb-1 text-blue-500" />
                                    <p className="text-xs text-muted-foreground">{folder.fileCount} files</p>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                  {folder.name}
                                </p>
                              </CardContent>
                            </Card>
                          ))}

                          {/* Files */}
                          {filteredFiles.map((file) => (
                            <Card 
                              key={file.id} 
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                selectedFile?.id === file.id ? 'ring-2 ring-primary' : ''
                              }`}
                              onClick={() => setSelectedFile(file)}
                            >
                              <CardContent className="p-2">
                                <div className="aspect-square rounded-md overflow-hidden bg-muted">
                                  <img
                                    src={file.url}
                                    alt={file.originalName}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                  {file.originalName}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                      
                      {selectedFile && (
                        <div className="flex justify-end">
                          <Button onClick={() => handleFileSelect(selectedFile)}>
                            <Check className="h-4 w-4 mr-2" />
                            Select Image
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="url" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Image URL</label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="https://example.com/image.jpg"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUrlSelect()
                              }
                            }}
                          />
                          <Button onClick={handleUrlSelect} disabled={!urlInput.trim()}>
                            <LinkIcon className="h-4 w-4 mr-2" />
                            Use URL
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              
              <Button 
                size="sm" 
                variant="destructive" 
                className="h-8 w-8 p-0"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full h-32 border-dashed">
                <div className="text-center">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{placeholder}</p>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>Select Cover Image</DialogTitle>
              </DialogHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upload">Upload New</TabsTrigger>
                  <TabsTrigger value="library">Media Library</TabsTrigger>
                  <TabsTrigger value="url">From URL</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop an image here, or click to select
                    </p>
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Select File
                        </>
                      )}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file)
                      }}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="library" className="space-y-4">
                  {/* Navigation */}
                  <div className="flex items-center gap-2">
                    {currentFolder && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBackClick}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </Button>
                    )}
                    <div className="flex-1">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search images and folders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Current Path */}
                  {currentFolder && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Current folder:</span> {currentFolder || "Root"}
                    </div>
                  )}
                  
                  {loading ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                      {/* Folders */}
                      {filteredFolders.map((folder) => (
                        <Card 
                          key={folder.id} 
                          className="cursor-pointer transition-all hover:shadow-md"
                          onClick={() => handleFolderClick(folder)}
                        >
                          <CardContent className="p-2">
                            <div className="aspect-square rounded-md overflow-hidden bg-muted flex items-center justify-center">
                              <div className="text-center">
                                <FolderOpen className="h-8 w-8 mx-auto mb-1 text-blue-500" />
                                <p className="text-xs text-muted-foreground">{folder.fileCount} files</p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {folder.name}
                            </p>
                          </CardContent>
                        </Card>
                      ))}

                      {/* Files */}
                      {filteredFiles.map((file) => (
                        <Card 
                          key={file.id} 
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedFile?.id === file.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => setSelectedFile(file)}
                        >
                          <CardContent className="p-2">
                            <div className="aspect-square rounded-md overflow-hidden bg-muted">
                              <img
                                src={file.url}
                                alt={file.originalName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {file.originalName}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {selectedFile && (
                    <div className="flex justify-end">
                      <Button onClick={() => handleFileSelect(selectedFile)}>
                        <Check className="h-4 w-4 mr-2" />
                        Select Image
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="url" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Image URL</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleUrlSelect()
                          }
                        }}
                      />
                      <Button onClick={handleUrlSelect} disabled={!urlInput.trim()}>
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Use URL
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
        
        <p className="text-xs text-muted-foreground">
          Upload an image, select from media library, or enter a URL
        </p>
      </div>
    </div>
  )
}
