import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/users"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Find user
    const user = userService.findByEmail(email)
    if (!user) {
      return NextResponse.json({
        found: false,
        message: "User not found"
      })
    }

    // Test password verification
    const isValid = await userService.verifyPassword(password, user.password)

    return NextResponse.json({
      found: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      passwordHash: user.password,
      passwordValid: isValid,
      testPassword: password
    })

  } catch (error) {
    console.error("Password test error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
