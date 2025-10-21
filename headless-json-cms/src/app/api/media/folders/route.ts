import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import fs from "fs"
import path from "path"

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads")
const FOLDERS_META_FILE = path.join(process.cwd(), "data", "folders.json")

// Ensure data directory exists
if (!fs.existsSync(path.dirname(FOLDERS_META_FILE))) {
  fs.mkdirSync(path.dirname(FOLDERS_META_FILE), { recursive: true })
}

interface FolderMeta {
  id: string
  name: string
  path: string
  icon?: string
  color?: string
  createdAt: string
  createdBy: string
}

function loadFoldersMeta(): FolderMeta[] {
  try {
    if (fs.existsSync(FOLDERS_META_FILE)) {
      const data = fs.readFileSync(FOLDERS_META_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error loading folders meta:", error)
  }
  return []
}

function saveFoldersMeta(folders: FolderMeta[]): void {
  try {
    fs.writeFileSync(FOLDERS_META_FILE, JSON.stringify(folders, null, 2))
  } catch (error) {
    console.error("Error saving folders meta:", error)
    throw error
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

    const body = await request.json()
    const { name, parentFolder = "", icon = "folder", color = "blue" } = body

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 }
      )
    }

    // Sanitize folder name
    const sanitizedName = name.trim().replace(/[^a-zA-Z0-9-_]/g, '_')
    if (sanitizedName !== name.trim()) {
      return NextResponse.json(
        { error: "Folder name contains invalid characters. Only letters, numbers, hyphens, and underscores are allowed." },
        { status: 400 }
      )
    }

    // Create folder path
    const folderPath = parentFolder 
      ? path.join(UPLOADS_DIR, parentFolder, sanitizedName)
      : path.join(UPLOADS_DIR, sanitizedName)

    // Check if folder already exists
    if (fs.existsSync(folderPath)) {
      return NextResponse.json(
        { error: "Folder already exists" },
        { status: 400 }
      )
    }

    // Create the folder
    fs.mkdirSync(folderPath, { recursive: true })

    // Save folder metadata
    const folderId = parentFolder ? `${parentFolder}/${sanitizedName}` : sanitizedName
    const foldersMeta = loadFoldersMeta()
    const newFolderMeta: FolderMeta = {
      id: folderId,
      name: sanitizedName,
      path: folderId,
      icon,
      color,
      createdAt: new Date().toISOString(),
      createdBy: authUser.userId
    }
    foldersMeta.push(newFolderMeta)
    saveFoldersMeta(foldersMeta)

    return NextResponse.json({
      success: true,
      message: "Folder created successfully",
      folder: {
        id: folderId,
        name: sanitizedName,
        path: folderId,
        icon,
        color,
        createdAt: new Date().toISOString(),
        createdBy: authUser.userId,
        fileCount: 0,
        totalSize: 0
      }
    })
  } catch (error) {
    console.error("Folder creation error:", error)
    return NextResponse.json(
      { error: "Failed to create folder" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated and has editor/admin role
    const authUser = getUserFromRequest(request)
    if (!authUser || (authUser.role !== "admin" && authUser.role !== "editor")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { folderId, name, icon, color } = body

    if (!folderId) {
      return NextResponse.json(
        { error: "Folder ID is required" },
        { status: 400 }
      )
    }

    const foldersMeta = loadFoldersMeta()
    const folderIndex = foldersMeta.findIndex(f => f.id === folderId)
    
    if (folderIndex === -1) {
      return NextResponse.json(
        { error: "Folder not found" },
        { status: 404 }
      )
    }

    // Update folder metadata
    if (name !== undefined) {
      foldersMeta[folderIndex].name = name.trim()
    }
    if (icon !== undefined) {
      foldersMeta[folderIndex].icon = icon
    }
    if (color !== undefined) {
      foldersMeta[folderIndex].color = color
    }

    saveFoldersMeta(foldersMeta)

    return NextResponse.json({
      success: true,
      message: "Folder updated successfully",
      folder: foldersMeta[folderIndex]
    })
  } catch (error) {
    console.error("Folder update error:", error)
    return NextResponse.json(
      { error: "Failed to update folder" },
      { status: 500 }
    )
  }
}
