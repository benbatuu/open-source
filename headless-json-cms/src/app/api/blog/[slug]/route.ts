import { NextRequest, NextResponse } from "next/server"
import { ContentManager } from "@/lib/file-system"

// GET /api/blog/[slug] - Get a specific blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      )
    }

    const allContent = await ContentManager.getAllContent()
    
    // Find the blog post by slug
    const post = allContent.find(p => 
      p.slug === slug && p.status === "published" && p.schema === "blog"
    )

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    // Get related posts (same tags, excluding current post)
    const relatedPosts = allContent
      .filter(p => 
        p.id !== post.id && 
        p.status === "published" && 
        p.schema === "blog" &&
        p.metadata?.tags?.some(tag => post.metadata?.tags?.includes(tag))
      )
      .slice(0, 3)

    return NextResponse.json({
      post,
      relatedPosts
    })
  } catch (error) {
    console.error("Failed to fetch blog post:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    )
  }
}
