import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/users"
import { getUserFromRequest } from "@/lib/auth"

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if user is authenticated and is admin
    const authUser = getUserFromRequest(request)
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const user = userService.findById(id)
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword
    })

  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if user is authenticated and is admin
    const authUser = getUserFromRequest(request)
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { name, email, role } = await request.json()

    if (!name && !email && !role) {
      return NextResponse.json(
        { error: "At least one field (name, email, role) is required" },
        { status: 400 }
      )
    }

    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        )
      }
    }

    // Validate role if provided
    if (role) {
      const validRoles = ["admin", "editor"]
      if (!validRoles.includes(role)) {
        return NextResponse.json(
          { error: "Invalid role. Must be admin or editor" },
          { status: 400 }
        )
      }
    }

    // Update user
    const updatedUser = await userService.update(id, { name, email, role })

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = updatedUser

    return NextResponse.json({
      message: "User updated successfully",
      user: userWithoutPassword
    })

  } catch (error) {
    console.error("Update user error:", error)
    
    // Handle specific errors
    if (error instanceof Error) {
      if (error.message === "User not found") {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        )
      }
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

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if user is authenticated and is admin
    const authUser = getUserFromRequest(request)
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Don't allow users to delete themselves
    if (authUser.userId === id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      )
    }

    // Delete user
    userService.delete(id)

    return NextResponse.json({
      message: "User deleted successfully"
    })

  } catch (error) {
    console.error("Delete user error:", error)
    
    // Handle specific errors
    if (error instanceof Error) {
      if (error.message === "User not found") {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        )
      }
      if (error.message === "Cannot delete the last admin user") {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
