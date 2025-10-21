import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import fs from "fs"
import path from "path"

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads")

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
    const { fileId, newName } = body

    if (!fileId || !newName) {
      return NextResponse.json(
        { error: "File ID and new name are required" },
        { status: 400 }
      )
    }

    // Sanitize new name
    const sanitizedName = newName.trim().replace(/[^a-zA-Z0-9._-]/g, '_')
    if (sanitizedName !== newName.trim()) {
      return NextResponse.json(
        { error: "File name contains invalid characters. Only letters, numbers, dots, hyphens, and underscores are allowed." },
        { status: 400 }
      )
    }

    // Construct file paths
    const oldFilePath = path.join(UPLOADS_DIR, fileId)
    const directory = path.dirname(oldFilePath)
    const newFilePath = path.join(directory, sanitizedName)

    // Check if old file exists
    if (!fs.existsSync(oldFilePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }

    // Check if new file already exists
    if (fs.existsSync(newFilePath)) {
      return NextResponse.json(
        { error: "A file with this name already exists" },
        { status: 400 }
      )
    }

    // Rename the file
    fs.renameSync(oldFilePath, newFilePath)

    // Get file stats for response
    const stats = fs.statSync(newFilePath)
    const relativePath = path.relative(UPLOADS_DIR, newFilePath)
    const url = `/uploads/${relativePath.replace(/\\/g, '/')}`

    return NextResponse.json({
      success: true,
      message: "File renamed successfully",
      file: {
        id: relativePath.replace(/\\/g, '/'),
        filename: sanitizedName,
        originalName: sanitizedName,
        mimeType: getMimeType(sanitizedName),
        size: stats.size,
        url,
        uploadedAt: stats.birthtime.toISOString(),
        uploadedBy: authUser.userId,
        folder: path.dirname(relativePath).replace(/\\/g, '/') || undefined
      }
    })
  } catch (error) {
    console.error("File rename error:", error)
    return NextResponse.json(
      { error: "Failed to rename file" },
      { status: 500 }
    )
  }
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
