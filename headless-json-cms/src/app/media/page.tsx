"use client"

import { useState, useEffect, useRef } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RouteGuard } from "@/components/auth/route-guard"
import { Upload, Search, Image, File, Folder, Trash2, Download, Eye, Loader2, AlertCircle, Plus, ArrowLeft, FolderPlus, Move, Edit, Edit3 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FolderModal } from "@/components/media/folder-modal"
import { RenameModal } from "@/components/media/rename-modal"

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

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [mediaFolders, setMediaFolders] = useState<MediaFolder[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [currentFolder, setCurrentFolder] = useState("")
  const [showFolderModal, setShowFolderModal] = useState(false)
  const [folderModalMode, setFolderModalMode] = useState<'create' | 'edit'>('create')
  const [editingFolder, setEditingFolder] = useState<MediaFolder | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [showMoveModal, setShowMoveModal] = useState(false)
  const [totalStorage, setTotalStorage] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [dragOverFolder, setDragOverFolder] = useState<string | null>(null)
  const [draggedFile, setDraggedFile] = useState<string | null>(null)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [renamingFile, setRenamingFile] = useState<MediaFile | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchMediaFiles()
  }, [currentFolder])

  const fetchMediaFiles = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      const url = currentFolder ? `/api/media?folder=${encodeURIComponent(currentFolder)}` : "/api/media"
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
      const data = await response.json()
        setMediaFiles(Array.isArray(data.files) ? data.files : [])
        setMediaFolders(Array.isArray(data.folders) ? data.folders : [])
        
        // Calculate total storage
        const totalSize = data.folders?.reduce((sum: number, folder: MediaFolder) => sum + folder.totalSize, 0) || 0
        const filesSize = data.files?.reduce((sum: number, file: MediaFile) => sum + file.size, 0) || 0
        setTotalStorage(totalSize + filesSize)
      } else {
        setMessage({ type: 'error', text: 'Failed to load media files' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load media files' })
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setMessage(null)

    try {
      const token = localStorage.getItem("auth_token")
      const formData = new FormData()
      formData.append("file", files[0])
      if (currentFolder) {
        formData.append("folder", currentFolder)
      }

      const response = await fetch("/api/media", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'File uploaded successfully' })
        fetchMediaFiles()
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to upload file' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload file' })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch(`/api/media/${fileId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'File deleted successfully' })
        fetchMediaFiles()
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to delete file' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete file' })
    }
  }

  const handleFolderSubmit = async (data: { name: string; icon: string; color: string }) => {
    try {
      const token = localStorage.getItem("auth_token")
      const url = folderModalMode === 'create' ? "/api/media/folders" : "/api/media/folders"
      const method = folderModalMode === 'create' ? "POST" : "PUT"
      
      const body = folderModalMode === 'create' 
        ? {
            name: data.name,
            parentFolder: currentFolder,
            icon: data.icon,
            color: data.color
          }
        : {
            folderId: editingFolder?.id,
            name: data.name,
            icon: data.icon,
            color: data.color
          }


      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: `Folder ${folderModalMode === 'create' ? 'created' : 'updated'} successfully` })
        setShowFolderModal(false)
        setEditingFolder(null)
        fetchMediaFiles()
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || `Failed to ${folderModalMode} folder` })
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Failed to ${folderModalMode} folder` })
    }
  }

  const handleEditFolder = (folder: MediaFolder) => {
    setEditingFolder(folder)
    setFolderModalMode('edit')
    setShowFolderModal(true)
  }

  const handleMoveFiles = async (targetFolder: string) => {
    if (selectedFiles.length === 0) return

    try {
      const token = localStorage.getItem("auth_token")
      
      for (const fileId of selectedFiles) {
        const response = await fetch("/api/media/move", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            fileId,
            targetFolder
          })
      })

      if (!response.ok) {
        const error = await response.json()
          setMessage({ type: 'error', text: error.error || 'Failed to move file' })
        return
        }
      }

      setMessage({ type: 'success', text: `${selectedFiles.length} file(s) moved successfully` })
      setSelectedFiles([])
      setShowMoveModal(false)
      fetchMediaFiles()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to move files' })
    }
  }

  const navigateToFolder = (folderPath: string) => {
    setCurrentFolder(folderPath)
  }

  const navigateUp = () => {
    if (currentFolder) {
      const pathParts = currentFolder.split('/')
      pathParts.pop()
      setCurrentFolder(pathParts.join('/'))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-8 w-8" />
    if (mimeType.startsWith('video/')) return <File className="h-8 w-8" />
    return <File className="h-8 w-8" />
  }

  const getFolderIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'folder': Folder,
      'folder-open': Folder,
      'image': Image,
      'music': File,
      'video': File,
      'file-text': File,
      'archive': File,
      'heart': File,
      'star': File,
      'home': File,
      'briefcase': File,
      'camera': File,
      'palette': File,
    }
    const IconComponent = iconMap[iconName] || Folder
    return IconComponent
  }

  const getFolderColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': 'bg-blue-50 text-blue-600',
      'green': 'bg-green-50 text-green-600',
      'purple': 'bg-purple-50 text-purple-600',
      'red': 'bg-red-50 text-red-600',
      'yellow': 'bg-yellow-50 text-yellow-600',
      'pink': 'bg-pink-50 text-pink-600',
      'indigo': 'bg-indigo-50 text-indigo-600',
      'gray': 'bg-gray-50 text-gray-600',
    }
    return colorMap[color] || 'bg-blue-50 text-blue-600'
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Only show upload overlay if we're not dragging an existing file
    if (!isDraggingFile) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Only hide upload overlay if we're not dragging an existing file
    if (!isDraggingFile) {
      setIsDragOver(false)
      setDragOverFolder(null)
    }
  }

  const handleDrop = async (e: React.DragEvent, targetFolder?: string) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    setDragOverFolder(null)

    // If we're dragging an existing file, don't handle file upload
    if (isDraggingFile) return

    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return

    setUploading(true)
    setMessage(null)

    try {
      const token = localStorage.getItem("auth_token")
      let successCount = 0
      let errorCount = 0

      for (const file of files) {
        const formData = new FormData()
        formData.append("file", file)
        if (targetFolder !== undefined) {
          formData.append("folder", targetFolder)
        } else if (currentFolder) {
          formData.append("folder", currentFolder)
        }

        const response = await fetch("/api/media", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })

        if (response.ok) {
          successCount++
        } else {
          errorCount++
        }
      }

      if (successCount > 0) {
        setMessage({ type: 'success', text: `${successCount} file(s) uploaded successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}` })
        fetchMediaFiles()
      } else {
        setMessage({ type: 'error', text: 'Failed to upload files' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload files' })
    } finally {
      setUploading(false)
    }
  }

  const handleFolderDragOver = (e: React.DragEvent, folderPath: string) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverFolder(folderPath)
  }

  const handleFolderDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverFolder(null)
  }

  const handleRenameFile = (file: MediaFile) => {
    setRenamingFile(file)
    setShowRenameModal(true)
  }

  const handleRenameSubmit = async (newName: string) => {
    if (!renamingFile) return

    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch("/api/media/rename", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fileId: renamingFile.id,
          newName
        })
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'File renamed successfully' })
        setShowRenameModal(false)
        setRenamingFile(null)
        fetchMediaFiles()
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to rename file' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to rename file' })
    }
  }

  // File drag handlers for moving existing files
  const handleFileDragStart = (e: React.DragEvent, fileId: string) => {
    e.dataTransfer.setData('text/plain', fileId)
    e.dataTransfer.effectAllowed = 'move'
    setDraggedFile(fileId)
    setIsDraggingFile(true)
  }

  const handleFileDragEnd = () => {
    setDraggedFile(null)
    setIsDraggingFile(false)
    setDragOverFolder(null)
  }

  const handleFolderDragOverForFile = (e: React.DragEvent, folderPath: string) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
    setDragOverFolder(folderPath)
  }

  const handleFolderDropForFile = async (e: React.DragEvent, targetFolder: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    const fileId = e.dataTransfer.getData('text/plain')
    if (!fileId || !isDraggingFile) return

    setDragOverFolder(null)
    setDraggedFile(null)
    setIsDraggingFile(false)

    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch("/api/media/move", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fileId,
          targetFolder
        })
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'File moved successfully' })
        fetchMediaFiles()
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to move file' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to move file' })
    }
  }

  const filteredFiles = mediaFiles.filter(file =>
    file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredFolders = mediaFolders.filter(folder =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <RouteGuard allowedRoles={["admin", "editor"]}>
    <DashboardLayout>
        <div 
          className={`space-y-6 relative ${isDragOver && !isDraggingFile ? 'bg-primary/5' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Drag Over Overlay */}
          {isDragOver && !isDraggingFile && (
            <div className="fixed inset-0 bg-primary/10 border-2 border-dashed border-primary z-50 flex items-center justify-center">
              <div className="bg-background p-8 rounded-lg shadow-lg text-center">
                <Upload className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Drop files to upload</h3>
                <p className="text-muted-foreground">
                  {currentFolder ? `Files will be uploaded to: /${currentFolder}` : 'Files will be uploaded to the root folder'}
                </p>
              </div>
            </div>
          )}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
            <p className="text-muted-foreground">
                Manage your media files and assets
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>Total Storage: {formatFileSize(totalStorage)}</span>
                {currentFolder && (
                  <span>Current: /{currentFolder}</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              />
              <Button 
                variant="outline"
                onClick={() => {
                  setFolderModalMode('create')
                  setShowFolderModal(true)
                }}
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
              {selectedFiles.length > 0 && (
                <Button 
                  variant="outline"
                  onClick={() => setShowMoveModal(true)}
                >
                  <Move className="h-4 w-4 mr-2" />
                  Move ({selectedFiles.length})
                </Button>
              )}
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
                    Upload Files
                  </>
                )}
              </Button>
            </div>
          </div>

          {message && (
            <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          {/* Breadcrumb */}
          {currentFolder && (
            <div className="flex items-center gap-2 text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={navigateUp}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">{currentFolder}</span>
        </div>
          )}

          {/* Folder Modal */}
          <FolderModal
            isOpen={showFolderModal}
            onClose={() => {
              setShowFolderModal(false)
              setEditingFolder(null)
            }}
            onSubmit={handleFolderSubmit}
            mode={folderModalMode}
            initialData={editingFolder ? {
              name: editingFolder.name,
              icon: editingFolder.icon || 'folder',
              color: editingFolder.color || 'blue'
            } : undefined}
          />

          {/* Rename Modal */}
          <RenameModal
            isOpen={showRenameModal}
            onClose={() => {
              setShowRenameModal(false)
              setRenamingFile(null)
            }}
            onSubmit={handleRenameSubmit}
            currentName={renamingFile?.originalName || ''}
            fileType={renamingFile?.mimeType || ''}
          />

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
              placeholder="Search media files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (filteredFiles.length === 0 && filteredFolders.length === 0) ? (
            <Card 
              className={`border-2 border-dashed transition-all ${
                isDragOver && !isDraggingFile ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-colors ${
                  isDragOver && !isDraggingFile ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Upload className={`h-12 w-12 transition-colors ${
                    isDragOver && !isDraggingFile ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isDragOver && !isDraggingFile
                    ? "Drop files here to upload" 
                    : searchTerm 
                      ? "No files found" 
                      : "No media files yet"
                  }
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {isDragOver && !isDraggingFile
                    ? currentFolder 
                      ? `Files will be uploaded to: /${currentFolder}`
                      : "Files will be uploaded to the root folder"
                    : searchTerm 
                      ? "Try adjusting your search criteria."
                      : "Drag and drop files here or use the buttons below to get started."
                  }
                </p>
                {!searchTerm && !isDragOver && (
                  <div className="flex gap-2">
                    <Button onClick={() => {
                      setFolderModalMode('create')
                      setShowFolderModal(true)
                    }}>
                      <FolderPlus className="h-4 w-4 mr-2" />
                      Create Folder
                    </Button>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div 
              className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 transition-all ${
                isDragOver && !isDraggingFile ? 'bg-primary/5 rounded-lg p-4' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Folders */}
              {filteredFolders.map((folder) => {
                const IconComponent = getFolderIcon(folder.icon || 'folder')
                const colorClass = getFolderColorClass(folder.color || 'blue')
                
                return (
                  <Card 
                    key={folder.id} 
                    className={`overflow-hidden hover:shadow-md transition-all ${
                      dragOverFolder === folder.path 
                        ? 'ring-2 ring-primary bg-primary/5 scale-105' 
                        : 'hover:shadow-md'
                    }`}
                    onDragOver={(e) => {
                      if (isDraggingFile) {
                        handleFolderDragOverForFile(e, folder.path)
                      } else {
                        handleFolderDragOver(e, folder.path)
                      }
                    }}
                    onDragLeave={handleFolderDragLeave}
                    onDrop={(e) => {
                      if (isDraggingFile) {
                        handleFolderDropForFile(e, folder.path)
                      } else {
                        handleDrop(e, folder.path)
                      }
                    }}
                  >
                    <CardContent className="p-3">
                      <div 
                        className="aspect-square flex items-center justify-center rounded-lg mb-2 cursor-pointer"
                        onClick={() => navigateToFolder(folder.path)}
                      >
                        <div className={`w-full h-full flex items-center justify-center rounded-lg ${colorClass} ${
                          dragOverFolder === folder.path ? 'ring-2 ring-primary' : ''
                        }`}>
                          <IconComponent className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-xs truncate" title={folder.name}>
                            {folder.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditFolder(folder)
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div>{folder.fileCount} files</div>
                          <div>{formatFileSize(folder.totalSize)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
              
              {/* Files */}
              {filteredFiles.map((file) => (
                <Card 
                  key={file.id} 
                  className={`overflow-hidden cursor-pointer transition-all ${
                    selectedFiles.includes(file.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : draggedFile === file.id
                        ? 'opacity-50 scale-95'
                        : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                  draggable
                  onDragStart={(e) => handleFileDragStart(e, file.id)}
                  onDragEnd={handleFileDragEnd}
                >
                  <CardContent className="p-2">
                    {file.mimeType.startsWith('image/') ? (
                      <div className="aspect-square relative mb-2">
                        <img
                          src={file.url}
                          alt={file.originalName}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100 rounded">
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(file.url, '_blank')
                              }}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                        <Button
                          size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                const link = document.createElement('a')
                                link.href = file.url
                                link.download = file.originalName
                                link.click()
                              }}
                            >
                              <Download className="h-3 w-3" />
                        </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRenameFile(file)
                              }}
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFileSelection(file.id)
                              }}
                            >
                              <Move className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteFile(file.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-square flex items-center justify-center bg-muted rounded mb-2 relative">
                        {getFileIcon(file.mimeType)}
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100 rounded">
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(file.url, '_blank')
                              }}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                const link = document.createElement('a')
                                link.href = file.url
                                link.download = file.originalName
                                link.click()
                              }}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRenameFile(file)
                              }}
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFileSelection(file.id)
                              }}
                            >
                              <Move className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteFile(file.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <h3 className="font-medium text-xs truncate" title={file.originalName}>
                        {file.originalName}
                      </h3>
                      <div className="text-xs text-muted-foreground">
                        <div>{formatFileSize(file.size)}</div>
                        <div>{new Date(file.uploadedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
      </div>
    </DashboardLayout>
    </RouteGuard>
  )
}