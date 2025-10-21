import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/users"
import { resetTokenService } from "@/lib/reset-tokens"

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Validate token
    const validation = resetTokenService.validate(token)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Update user password
    await userService.updatePassword(validation.userId!, password)

    // Remove used token
    resetTokenService.remove(token)

    return NextResponse.json({
      message: "Password reset successfully"
    })

  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
