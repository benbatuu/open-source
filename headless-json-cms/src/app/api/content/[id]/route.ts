import { NextRequest, NextResponse } from "next/server"
import { ContentManager } from "@/lib/file-system"
import { revalidatePath } from "next/cache"

// GET /api/content/[id] - Get content by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const content = await ContentManager.getContentById(id)
    
    if (!content) {
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    )
  }
}

// PUT /api/content/[id] - Update content
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedContent = await ContentManager.updateContent(id, body)
    
    if (!updatedContent) {
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      )
    }
    
    // Revalidate pages when content is updated
    revalidatePath("/")
    if (updatedContent.status === "published") {
      revalidatePath(`/blog/${updatedContent.slug}`)
    }
    
    return NextResponse.json(updatedContent)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    )
  }
}

// DELETE /api/content/[id] - Delete content
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Get content before deleting to know which pages to revalidate
    const content = await ContentManager.getContentById(id)
    
    const success = await ContentManager.deleteContent(id)
    
    if (!success) {
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      )
    }
    
    // Revalidate pages when content is deleted
    revalidatePath("/")
    if (content?.status === "published" && content?.slug) {
      revalidatePath(`/blog/${content.slug}`)
    }
    
    return NextResponse.json({ message: "Content deleted successfully" })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete content" },
      { status: 500 }
    )
  }
}
