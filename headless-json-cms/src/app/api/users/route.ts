import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/users"
import { getUserFromRequest } from "@/lib/auth"

// GET /api/users - Get all users
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
    console.error("Get users error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const authUser = getUserFromRequest(request)
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { name, email, password, role = "admin" } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
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

    // Validate role
    const validRoles = ["admin", "editor"]
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be admin or editor" },
        { status: 400 }
      )
    }

    // Create new user
    const newUser = await userService.create({ name, email, password, role })

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      message: "User created successfully",
      user: userWithoutPassword
    }, { status: 201 })

  } catch (error) {
    console.error("Create user error:", error)
    
    // Handle specific errors
    if (error instanceof Error) {
      if (error.message === "User with this email already exists") {
        return NextResponse.json(
          { error: error.message },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
