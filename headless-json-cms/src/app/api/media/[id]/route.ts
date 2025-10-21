import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import fs from "fs"
import path from "path"

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads")

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const filename = id
    const filePath = path.join(UPLOADS_DIR, filename)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }

    // Get file stats
    const stats = fs.statSync(filePath)
    const fileBuffer = fs.readFileSync(filePath)

    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase()
    let contentType = "application/octet-stream"
    
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg"
    else if (ext === ".png") contentType = "image/png"
    else if (ext === ".gif") contentType = "image/gif"
    else if (ext === ".webp") contentType = "image/webp"
    else if (ext === ".svg") contentType = "image/svg+xml"
    else if (ext === ".pdf") contentType = "application/pdf"
    else if (ext === ".txt") contentType = "text/plain"
    else if (ext === ".json") contentType = "application/json"

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": stats.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    })
  } catch (error) {
    console.error("Media retrieval error:", error)
    return NextResponse.json(
      { error: "Failed to retrieve file" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if user is authenticated and has editor/admin role
    const authUser = getUserFromRequest(request)
    if (!authUser || (authUser.role !== "admin" && authUser.role !== "editor")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const filename = id
    const filePath = path.join(UPLOADS_DIR, filename)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }

    // Delete the file
    fs.unlinkSync(filePath)

    return NextResponse.json({
      success: true,
      message: "File deleted successfully"
    })
  } catch (error) {
    console.error("Media deletion error:", error)
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    )
  }
}
