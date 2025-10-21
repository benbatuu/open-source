import { NextRequest, NextResponse } from "next/server"
import { analyticsService } from "@/lib/analytics"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const authUser = getUserFromRequest(request)
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get("days") || "30")

    const stats = analyticsService.getStats(days)

    return NextResponse.json({
      stats,
      period: `${days} days`
    })

  } catch (error) {
    console.error("Get analytics stats error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
