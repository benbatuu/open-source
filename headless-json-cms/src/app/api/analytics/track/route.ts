import { NextRequest, NextResponse } from "next/server"
import { analyticsService } from "@/lib/analytics"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(',')[0] : "127.0.0.1"
    
    // Get user agent
    const userAgent = request.headers.get("user-agent") || "Unknown"
    
    // Get referrer
    const referrer = request.headers.get("referer") || undefined

    if (type === "view") {
      analyticsService.trackView({
        ...data,
        ip,
        userAgent,
        referrer
      })
    } else if (type === "comment") {
      analyticsService.trackComment({
        ...data,
        ip,
        userAgent
      })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Analytics tracking error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
