import { NextRequest, NextResponse } from "next/server"
import { resetTokenService } from "@/lib/reset-tokens"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      )
    }

    // Validate token using resetTokenService
    const validation = resetTokenService.validate(token)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: "Token is valid"
    })

  } catch (error) {
    console.error("Validate token error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
