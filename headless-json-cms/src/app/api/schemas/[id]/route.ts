import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { getSchema, saveSchema, deleteSchema, validateSchema } from "@/lib/schemas"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if user is authenticated
    const authUser = getUserFromRequest(request)
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const schema = getSchema(id)
    if (!schema) {
      return NextResponse.json(
        { error: "Schema not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(schema)
  } catch (error) {
    console.error("Schema fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch schema" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if user is authenticated and has editor/admin role
    const authUser = getUserFromRequest(request)
    if (!authUser || (authUser.role !== "admin" && authUser.role !== "editor")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const existingSchema = getSchema(id)
    if (!existingSchema) {
      return NextResponse.json(
        { error: "Schema not found" },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { name, description, fields } = body

    // Validate required fields
    if (!name || !description || !fields) {
      return NextResponse.json(
        { error: "Name, description, and fields are required" },
        { status: 400 }
      )
    }

    // Validate schema structure
    const validationErrors = validateSchema({ name, description, fields })
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: validationErrors },
        { status: 400 }
      )
    }

    const updatedSchema = {
      ...existingSchema,
      name,
      description,
      fields,
      updatedAt: new Date().toISOString(),
      updatedBy: authUser.userId
    }

    saveSchema(updatedSchema)

    return NextResponse.json({
      success: true,
      message: "Schema updated successfully",
      schema: updatedSchema
    })
  } catch (error) {
    console.error("Schema update error:", error)
    return NextResponse.json(
      { error: "Failed to update schema" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if user is authenticated and has admin role
    const authUser = getUserFromRequest(request)
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const schema = getSchema(id)
    if (!schema) {
      return NextResponse.json(
        { error: "Schema not found" },
        { status: 404 }
      )
    }

    // Check if schema is being used by any content
    // TODO: Add content usage check here
    
    deleteSchema(id)

    return NextResponse.json({
      success: true,
      message: "Schema deleted successfully"
    })
  } catch (error) {
    console.error("Schema deletion error:", error)
    return NextResponse.json(
      { error: "Failed to delete schema" },
      { status: 500 }
    )
  }
}