import { NextRequest, NextResponse } from "next/server"
import { rename, unlink } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

const UPLOAD_DIR = join(process.cwd(), "public", "uploads")

// PUT /api/upload/[filename] - Rename file
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params
    const { newName } = await request.json()
    
    if (!newName || !filename) {
      return NextResponse.json(
        { error: "Filename and new name are required" },
        { status: 400 }
      )
    }
    
    // Validate new filename
    if (!/^[a-zA-Z0-9._-]+$/.test(newName)) {
      return NextResponse.json(
        { error: "Invalid filename. Only letters, numbers, dots, underscores, and hyphens are allowed" },
        { status: 400 }
      )
    }
    
    const oldPath = join(UPLOAD_DIR, filename)
    const newPath = join(UPLOAD_DIR, newName)
    
    // Check if old file exists
    if (!existsSync(oldPath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }
    
    // Check if new filename already exists
    if (existsSync(newPath)) {
      return NextResponse.json(
        { error: "A file with this name already exists" },
        { status: 409 }
      )
    }
    
    await rename(oldPath, newPath)
    
    return NextResponse.json({
      success: true,
      oldFilename: filename,
      newFilename: newName,
      newUrl: `/uploads/${newName}`
    })
  } catch (error) {
    console.error("Rename error:", error)
    return NextResponse.json(
      { error: "Failed to rename file" },
      { status: 500 }
    )
  }
}

// DELETE /api/upload/[filename] - Delete file
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params
    
    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      )
    }
    
    const filePath = join(UPLOAD_DIR, filename)
    
    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }
    
    await unlink(filePath)
    
    return NextResponse.json({
      success: true,
      deletedFilename: filename
    })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    )
  }
}
