import { NextRequest, NextResponse } from "next/server"
import { ContentManager } from "@/lib/file-system"

// GET /api/blog - Get all published blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = parseInt(searchParams.get("offset") || "0")
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")

    const allContent = await ContentManager.getAllContent()
    
    // Filter only published blog posts
    let blogPosts = allContent.filter(post => 
      post.status === "published" && post.schema === "blog"
    )

    // Apply filters
    if (tag) {
      blogPosts = blogPosts.filter(post => 
        post.metadata?.tags?.includes(tag)
      )
    }

    if (search) {
      const searchLower = search.toLowerCase()
      blogPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.metadata?.description?.toLowerCase().includes(searchLower) ||
        post.metadata?.["seo-keywords"]?.toLowerCase().includes(searchLower)
      )
    }

    if (featured === "true") {
      blogPosts = blogPosts.filter(post => post.metadata?.featured)
    }

    // Sort by creation date (newest first)
    blogPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Apply pagination
    const total = blogPosts.length
    const paginatedPosts = blogPosts.slice(offset, offset + limit)

    // Get all unique tags
    const allTags = Array.from(new Set(
      allContent
        .filter(post => post.status === "published" && post.schema === "blog")
        .flatMap(post => post.metadata?.tags || [])
    ))

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      tags: allTags
    })
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}
