import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/users"
import { resetTokenService } from "@/lib/reset-tokens"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Find user by email
    const user = userService.findByEmail(email)
    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        message: "If the email exists, a password reset link has been sent"
      })
    }

    // Generate reset token
    const resetToken = resetTokenService.generate(user.id)

    // In production, send email with reset link
    // For now, we'll just log it to console
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3003'}/auth/reset-password?token=${resetToken}`
    console.log(`Password reset link for ${email}: ${resetLink}`)

    // TODO: Send email with reset link
    // await sendPasswordResetEmail(email, resetLink)

    return NextResponse.json({
      message: "If the email exists, a password reset link has been sent"
    })

  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
