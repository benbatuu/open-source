import { NextRequest, NextResponse } from "next/server"
import { writeFile, readFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

const COMMENTS_FILE = join(process.cwd(), "comments.json")

// PUT /api/comments/[id] - Update comment status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await request.json()
    
    if (!id || !status) {
      return NextResponse.json(
        { error: "Comment ID and status are required" },
        { status: 400 }
      )
    }
    
    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be pending, approved, or rejected" },
        { status: 400 }
      )
    }
    
    if (!existsSync(COMMENTS_FILE)) {
      return NextResponse.json(
        { error: "Comments file not found" },
        { status: 404 }
      )
    }
    
    const data = await readFile(COMMENTS_FILE, "utf-8")
    const comments = JSON.parse(data)
    
    const commentIndex = comments.findIndex((comment: any) => comment.id === id)
    if (commentIndex === -1) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      )
    }
    
    comments[commentIndex].status = status
    comments[commentIndex].updatedAt = new Date().toISOString()
    
    await writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2))
    
    return NextResponse.json({
      success: true,
      comment: comments[commentIndex]
    })
  } catch (error) {
    console.error("Failed to update comment:", error)
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    )
  }
}

// DELETE /api/comments/[id] - Delete a comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      )
    }
    
    if (!existsSync(COMMENTS_FILE)) {
      return NextResponse.json(
        { error: "Comments file not found" },
        { status: 404 }
      )
    }
    
    const data = await readFile(COMMENTS_FILE, "utf-8")
    const comments = JSON.parse(data)
    
    const commentIndex = comments.findIndex((comment: any) => comment.id === id)
    if (commentIndex === -1) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      )
    }
    
    comments.splice(commentIndex, 1)
    await writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2))
    
    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully"
    })
  } catch (error) {
    console.error("Failed to delete comment:", error)
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    )
  }
}
