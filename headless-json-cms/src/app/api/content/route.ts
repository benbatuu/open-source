import { NextRequest, NextResponse } from "next/server"
import { ContentManager, ContentItem } from "@/lib/file-system"
import { revalidatePath } from "next/cache"

// GET /api/content - Get all content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const schema = searchParams.get("schema")
    
    let content: ContentItem[]
    
    if (schema) {
      content = await ContentManager.getContentBySchema(schema)
    } else {
      content = await ContentManager.getAllContent()
    }
    
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    )
  }
}

// POST /api/content - Create new content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.schema) {
      return NextResponse.json(
        { error: "Title and schema are required" },
        { status: 400 }
      )
    }
    
    const newContent = await ContentManager.createContent({
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-"),
      content: body.content || {},
      schema: body.schema,
      status: body.status || "draft",
      author: body.author || "admin",
      metadata: body.metadata || {},
    })
    
    // Revalidate pages when content is created
    revalidatePath("/")
    if (newContent.status === "published") {
      revalidatePath(`/blog/${newContent.slug}`)
    }
    
    return NextResponse.json(newContent, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 }
    )
  }
}
