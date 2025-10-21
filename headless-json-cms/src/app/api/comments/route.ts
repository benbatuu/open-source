import { NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

const COMMENTS_FILE = join(process.cwd(), "comments.json")

export interface Comment {
  id: string
  postId: string
  postSlug: string
  authorName: string
  authorEmail: string
  content: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  parentId?: string // for replies
}

// Ensure comments file exists
async function ensureCommentsFile() {
  if (!existsSync(COMMENTS_FILE)) {
    await writeFile(COMMENTS_FILE, JSON.stringify([], null, 2))
  }
}

// GET /api/comments - Get comments for a specific post
export async function GET(request: NextRequest) {
  try {
    await ensureCommentsFile()
    
    const { searchParams } = new URL(request.url)
    const postSlug = searchParams.get("postSlug")
    const status = searchParams.get("status")
    
    const data = await readFile(COMMENTS_FILE, "utf-8")
    let comments: Comment[] = JSON.parse(data)
    
    // Filter by post slug
    if (postSlug) {
      comments = comments.filter(comment => comment.postSlug === postSlug)
    }
    
    // Filter by status
    if (status) {
      comments = comments.filter(comment => comment.status === status)
    }
    
    // Sort by creation date (newest first)
    comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return NextResponse.json(comments)
  } catch (error) {
    console.error("Failed to fetch comments:", error)
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    )
  }
}

// POST /api/comments - Create a new comment
export async function POST(request: NextRequest) {
  try {
    await ensureCommentsFile()
    
    const body = await request.json()
    const { postId, postSlug, authorName, authorEmail, content, parentId } = body
    
    // Validate required fields
    if (!postId || !postSlug || !authorName || !authorEmail || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(authorEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }
    
    const data = await readFile(COMMENTS_FILE, "utf-8")
    const comments: Comment[] = JSON.parse(data)
    
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      postId,
      postSlug,
      authorName,
      authorEmail,
      content,
      status: "pending", // All comments start as pending
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: parentId || undefined
    }
    
    comments.push(newComment)
    await writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2))
    
    return NextResponse.json({
      success: true,
      comment: newComment
    })
  } catch (error) {
    console.error("Failed to create comment:", error)
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    )
  }
}
