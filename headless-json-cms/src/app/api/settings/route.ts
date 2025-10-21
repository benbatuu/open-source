import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { loadSettings, saveSettings } from "@/lib/settings"
import { revalidatePath } from "next/cache"

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

    const settings = loadSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Settings fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const authUser = getUserFromRequest(request)
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { general, database, email, security, ai } = body

    // Validate required fields (ai is optional)
    if (!general || !database || !email || !security) {
      return NextResponse.json(
        { error: "Missing required settings sections" },
        { status: 400 }
      )
    }

    // Validate email format
    if (email.fromEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.fromEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate numeric fields
    if (database.retentionDays && (isNaN(database.retentionDays) || database.retentionDays < 1)) {
      return NextResponse.json(
        { error: "Retention days must be a positive number" },
        { status: 400 }
      )
    }

    if (database.maxFileSize && (isNaN(database.maxFileSize) || database.maxFileSize < 1)) {
      return NextResponse.json(
        { error: "Max file size must be a positive number" },
        { status: 400 }
      )
    }

    if (security.sessionTimeout && (isNaN(security.sessionTimeout) || security.sessionTimeout < 1)) {
      return NextResponse.json(
        { error: "Session timeout must be a positive number" },
        { status: 400 }
      )
    }

    if (security.maxLoginAttempts && (isNaN(security.maxLoginAttempts) || security.maxLoginAttempts < 1)) {
      return NextResponse.json(
        { error: "Max login attempts must be a positive number" },
        { status: 400 }
      )
    }

    if (security.passwordMinLength && (isNaN(security.passwordMinLength) || security.passwordMinLength < 6)) {
      return NextResponse.json(
        { error: "Password minimum length must be at least 6" },
        { status: 400 }
      )
    }

    // Validate AI settings if provided
    if (ai) {
      if (ai.openaiApiKey && !ai.openaiApiKey.startsWith('sk-')) {
        return NextResponse.json(
          { error: "OpenAI API key must start with 'sk-'" },
          { status: 400 }
        )
      }

      if (ai.openaiMaxTokens && (isNaN(ai.openaiMaxTokens) || ai.openaiMaxTokens < 1 || ai.openaiMaxTokens > 4000)) {
        return NextResponse.json(
          { error: "Max tokens must be between 1 and 4000" },
          { status: 400 }
        )
      }

      if (ai.openaiTemperature && (isNaN(ai.openaiTemperature) || ai.openaiTemperature < 0 || ai.openaiTemperature > 2)) {
        return NextResponse.json(
          { error: "Temperature must be between 0 and 2" },
          { status: 400 }
        )
      }

      const validModels = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo']
      if (ai.openaiModel && !validModels.includes(ai.openaiModel)) {
        return NextResponse.json(
          { error: "Invalid OpenAI model" },
          { status: 400 }
        )
      }
    }

    const settings = {
      general,
      database,
      email,
      security,
      ...(ai && { ai }),
      updatedAt: new Date().toISOString(),
      updatedBy: authUser.userId
    }

    saveSettings(settings)

    // Revalidate the homepage to reflect settings changes
    revalidatePath("/")
    revalidatePath("/blog/[slug]", "page")

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      settings
    })
  } catch (error) {
    console.error("Settings update error:", error)
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    )
  }
}