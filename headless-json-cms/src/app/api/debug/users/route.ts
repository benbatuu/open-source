import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/users"

export async function GET(request: NextRequest) {
  try {
    const users = userService.getAll()
    
    // Remove passwords from response for security
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return NextResponse.json({
      users: usersWithoutPasswords,
      count: users.length
    })

  } catch (error) {
    console.error("Debug users error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
