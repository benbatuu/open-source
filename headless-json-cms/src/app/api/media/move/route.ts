import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import fs from "fs"
import path from "path"

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads")

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
    const { fileId, targetFolder } = body

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      )
    }

    // Get current file path
    const currentFilePath = path.join(UPLOADS_DIR, fileId)
    
    if (!fs.existsSync(currentFilePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }

    // Get file info
    const stats = fs.statSync(currentFilePath)
    if (!stats.isFile()) {
      return NextResponse.json(
        { error: "Item is not a file" },
        { status: 400 }
      )
    }

    // Create target directory if it doesn't exist
    const targetDir = targetFolder ? path.join(UPLOADS_DIR, targetFolder) : UPLOADS_DIR
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // Get filename from fileId (remove folder path if exists)
    const filename = path.basename(fileId)
    const newFilePath = path.join(targetDir, filename)

    // Check if file already exists in target location
    if (fs.existsSync(newFilePath)) {
      return NextResponse.json(
        { error: "File already exists in target location" },
        { status: 400 }
      )
    }

    // Move the file
    fs.renameSync(currentFilePath, newFilePath)

    // Calculate new file ID
    const newFileId = targetFolder ? `${targetFolder}/${filename}` : filename

    return NextResponse.json({
      success: true,
      message: "File moved successfully",
      newFileId,
      newUrl: targetFolder ? `/uploads/${targetFolder}/${filename}` : `/uploads/${filename}`
    })
  } catch (error) {
    console.error("File move error:", error)
    return NextResponse.json(
      { error: "Failed to move file" },
      { status: 500 }
    )
  }
}
