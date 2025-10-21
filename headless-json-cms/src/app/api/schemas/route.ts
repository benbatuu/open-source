import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { loadSchemas, saveSchema, validateSchema } from "@/lib/schemas"

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const authUser = getUserFromRequest(request)
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const schemas = loadSchemas()
    return NextResponse.json(schemas)
  } catch (error) {
    console.error("Schemas fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch schemas" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and has editor/admin role
    const authUser = getUserFromRequest(request)
    if (!authUser || (authUser.role !== "admin" && authUser.role !== "editor")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
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

    // Generate schema ID from name
    const id = name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    
    // Check if schema with this ID already exists
    const existingSchemas = loadSchemas()
    if (existingSchemas.some(s => s.id === id)) {
      return NextResponse.json(
        { error: "A schema with this name already exists" },
        { status: 400 }
      )
    }

    const schema = {
      id,
      name,
      description,
      fields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: authUser.userId,
      updatedBy: authUser.userId
    }

    saveSchema(schema)

    return NextResponse.json({
      success: true,
      message: "Schema created successfully",
      schema
    })
  } catch (error) {
    console.error("Schema creation error:", error)
    return NextResponse.json(
      { error: "Failed to create schema" },
      { status: 500 }
    )
  }
}