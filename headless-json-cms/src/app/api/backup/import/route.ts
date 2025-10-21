import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import fs from "fs"
import path from "path"
import { saveUsers, saveAnalytics } from "@/lib/file-storage"

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

    const formData = await request.formData()
    const file = formData.get('file') as File
    const restoreType = formData.get('type') as string || 'all'

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Check file type
    if (!file.name.endsWith('.json')) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JSON file." },
        { status: 400 }
      )
    }

    // Read and parse the file
    const fileContent = await file.text()
    let importData: Record<string, unknown>

    try {
      importData = JSON.parse(fileContent)
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON file" },
        { status: 400 }
      )
    }

    const results: { success: boolean; restored: string[]; errors: string[] } = {
      success: true,
      restored: [],
      errors: []
    }

    // Restore users
    if ((restoreType === 'all' || restoreType === 'users') && importData.users) {
      try {
        // Don't restore users with redacted passwords
        const validUsers = importData.users.filter((user: { password?: string }) => 
          user.password && user.password !== '[REDACTED]'
        )
        
        if (validUsers.length > 0) {
          saveUsers(validUsers)
          results.restored.push(`users (${validUsers.length} users)`)
        } else {
          results.errors.push("No valid users found (passwords are redacted)")
        }
      } catch (error) {
        results.errors.push(`Failed to restore users: ${error}`)
      }
    }

    // Restore analytics
    if ((restoreType === 'all' || restoreType === 'analytics') && importData.analytics) {
      try {
        saveAnalytics(importData.analytics)
        results.restored.push('analytics data')
      } catch (error) {
        results.errors.push(`Failed to restore analytics: ${error}`)
      }
    }

    // Restore content
    if (restoreType === 'all' || restoreType === 'content') {
      try {
        const contentDir = path.join(process.cwd(), "content")
        if (!fs.existsSync(contentDir)) {
          fs.mkdirSync(contentDir, { recursive: true })
        }

        let contentCount = 0
        
        // Check if it's a direct content object (has id and title)
        if (importData.id && importData.title) {
          // Direct content object format
          const filename = `${importData.id}.json`
          const filePath = path.join(contentDir, filename)
          fs.writeFileSync(filePath, JSON.stringify(importData, null, 2))
          contentCount++
        } else if (importData.content && typeof importData.content === 'object' && !Array.isArray(importData.content)) {
          // Backup format: { content: { "filename.json": contentObject } }
          for (const [filename, content] of Object.entries(importData.content)) {
            const filePath = path.join(contentDir, filename)
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
            contentCount++
          }
        }
        
        if (contentCount > 0) {
          results.restored.push(`content (${contentCount} files)`)
        }
      } catch (error) {
        results.errors.push(`Failed to restore content: ${error}`)
      }
    }

    // Restore schemas
    if ((restoreType === 'all' || restoreType === 'schemas') && importData.schemas) {
      try {
        const schemasDir = path.join(process.cwd(), "schemas")
        if (!fs.existsSync(schemasDir)) {
          fs.mkdirSync(schemasDir, { recursive: true })
        }

        let schemaCount = 0
        for (const [filename, schema] of Object.entries(importData.schemas)) {
          const filePath = path.join(schemasDir, filename)
          fs.writeFileSync(filePath, JSON.stringify(schema, null, 2))
          schemaCount++
        }
        results.restored.push(`schemas (${schemaCount} files)`)
      } catch (error) {
        results.errors.push(`Failed to restore schemas: ${error}`)
      }
    }

    // Restore comments
    if ((restoreType === 'all' || restoreType === 'comments') && importData.comments) {
      try {
        const commentsFile = path.join(process.cwd(), "comments.json")
        fs.writeFileSync(commentsFile, JSON.stringify(importData.comments, null, 2))
        results.restored.push('comments')
      } catch (error) {
        results.errors.push(`Failed to restore comments: ${error}`)
      }
    }

    // Restore components
    if ((restoreType === 'all' || restoreType === 'components') && importData.components) {
      try {
        const componentsFile = path.join(process.cwd(), "components.json")
        fs.writeFileSync(componentsFile, JSON.stringify(importData.components, null, 2))
        results.restored.push('components')
      } catch (error) {
        results.errors.push(`Failed to restore components: ${error}`)
      }
    }

    if (results.restored.length === 0 && results.errors.length === 0) {
      results.errors.push("No data found to restore")
    }

    return NextResponse.json(results)

  } catch (error) {
    console.error("Import error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
