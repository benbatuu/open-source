import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import fs from "fs"
import path from "path"

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads")

export interface MediaFile {
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

export interface MediaFolder {
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

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const authUser = getUserFromRequest(request)
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const url = new URL(request.url)
    const folder = url.searchParams.get('folder') || ''

    const { folders, files } = await getMediaData(folder)

    return NextResponse.json({
      folders,
      files,
      currentFolder: folder
    })
  } catch (error) {
    console.error("Media fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch media files" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and has editor/admin role
    const authUser = getUserFromRequest(request)
    if (!authUser || (authUser.role !== "admin" && authUser.role !== "editor")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string || ""

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size too large. Maximum size is 10MB." },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "video/mp4",
      "video/webm",
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not allowed" },
        { status: 400 }
      )
    }

    // Create folder if it doesn't exist
    const targetDir = folder ? path.join(UPLOADS_DIR, folder) : UPLOADS_DIR
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const baseName = path.basename(file.name, extension)
    const safeBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, '_')
    const filename = `${safeBaseName}_${timestamp}${extension}`
    const filePath = path.join(targetDir, filename)

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    fs.writeFileSync(filePath, buffer)

    const mediaFile: MediaFile = {
      id: folder ? `${folder}/${filename}` : filename,
      filename: filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      url: folder ? `/uploads/${folder}/${filename}` : `/uploads/${filename}`,
      uploadedAt: new Date().toISOString(),
      uploadedBy: authUser.userId,
      folder: folder || undefined
    }

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      file: mediaFile
    })
  } catch (error) {
    console.error("Media upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}

async function getMediaData(currentFolder: string = '') {
  const targetDir = currentFolder ? path.join(UPLOADS_DIR, currentFolder) : UPLOADS_DIR
  
  if (!fs.existsSync(targetDir)) {
    return { folders: [], files: [] }
  }

  // Load folder metadata
  const foldersMeta = loadFoldersMeta()

  const items = fs.readdirSync(targetDir)
  const folders: MediaFolder[] = []
  const files: MediaFile[] = []

  for (const item of items) {
    const itemPath = path.join(targetDir, item)
    const stats = fs.statSync(itemPath)
    
    if (stats.isDirectory()) {
      const folderId = currentFolder ? `${currentFolder}/${item}` : item
      const folderStats = await getFolderStats(itemPath)
      const folderMeta = foldersMeta.find(f => f.id === folderId)
      
      folders.push({
        id: folderId,
        name: folderMeta?.name || item,
        path: folderId,
        createdAt: folderMeta?.createdAt || stats.birthtime.toISOString(),
        createdBy: folderMeta?.createdBy || "system",
        fileCount: folderStats.fileCount,
        totalSize: folderStats.totalSize,
        icon: folderMeta?.icon || "folder",
        color: folderMeta?.color || "blue"
      })
    } else if (stats.isFile()) {
      files.push({
        id: currentFolder ? `${currentFolder}/${item}` : item,
        filename: item,
        originalName: item,
        mimeType: getMimeType(item),
        size: stats.size,
        url: currentFolder ? `/uploads/${currentFolder}/${item}` : `/uploads/${item}`,
        uploadedAt: stats.birthtime.toISOString(),
        uploadedBy: "system",
        folder: currentFolder || undefined
      })
    }
  }

  // Sort folders by name, files by upload date
  folders.sort((a, b) => a.name.localeCompare(b.name))
  files.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

  return { folders, files }
}

function loadFoldersMeta(): any[] {
  try {
    const metaFile = path.join(process.cwd(), "data", "folders.json")
    if (fs.existsSync(metaFile)) {
      const data = fs.readFileSync(metaFile, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error loading folders meta:", error)
  }
  return []
}

async function getFolderStats(folderPath: string) {
  let fileCount = 0
  let totalSize = 0

  const scanDirectory = (dir: string) => {
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const itemPath = path.join(dir, item)
      const stats = fs.statSync(itemPath)
      
      if (stats.isDirectory()) {
        scanDirectory(itemPath)
      } else if (stats.isFile()) {
        fileCount++
        totalSize += stats.size
      }
    }
  }

  scanDirectory(folderPath)
  return { fileCount, totalSize }
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const mimeTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }
  return mimeTypes[ext] || 'application/octet-stream'
}
