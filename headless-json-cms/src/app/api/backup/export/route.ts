import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import fs from "fs"
import path from "path"
import { loadUsers } from "@/lib/file-storage"
import { analyticsService } from "@/lib/analytics"

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

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "all"

    const dataDir = path.join(process.cwd(), "data")
    const contentDir = path.join(process.cwd(), "content")
    const publicDir = path.join(process.cwd(), "public")

    const exportData: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      type: type
    }

    // Export users
    if (type === "all" || type === "users") {
      const users = loadUsers()
      exportData.users = users.map(user => ({
        ...user,
        password: "[REDACTED]" // Don't export actual passwords
      }))
    }

    // Export analytics
    if (type === "all" || type === "analytics") {
      const analyticsData = analyticsService.getAllData()
      exportData.analytics = analyticsData
    }

    // Export content files
    if (type === "all" || type === "content") {
      const contentFiles: Record<string, string> = {}
      
      if (fs.existsSync(contentDir)) {
        const files = fs.readdirSync(contentDir)
        files.forEach(file => {
          if (file.endsWith('.json')) {
            const filePath = path.join(contentDir, file)
            const content = fs.readFileSync(filePath, 'utf8')
            contentFiles[file] = JSON.parse(content)
          }
        })
      }
      exportData.content = contentFiles
    }

    // Export media files info
    if (type === "all" || type === "media") {
      const mediaFiles: Record<string, string> = {}
      
      if (fs.existsSync(publicDir)) {
        const uploadsDir = path.join(publicDir, "uploads")
        if (fs.existsSync(uploadsDir)) {
          const files = fs.readdirSync(uploadsDir)
          mediaFiles.uploads = files.map(file => ({
            name: file,
            path: `/uploads/${file}`,
            size: fs.statSync(path.join(uploadsDir, file)).size,
            modified: fs.statSync(path.join(uploadsDir, file)).mtime.toISOString()
          }))
        }
      }
      exportData.media = mediaFiles
    }

    // Export schemas
    if (type === "all" || type === "schemas") {
      const schemasDir = path.join(process.cwd(), "schemas")
      const schemaFiles: Record<string, string> = {}
      
      if (fs.existsSync(schemasDir)) {
        const files = fs.readdirSync(schemasDir)
        files.forEach(file => {
          if (file.endsWith('.json')) {
            const filePath = path.join(schemasDir, file)
            const content = fs.readFileSync(filePath, 'utf8')
            schemaFiles[file] = JSON.parse(content)
          }
        })
      }
      exportData.schemas = schemaFiles
    }

    // Export comments
    if (type === "all" || type === "comments") {
      const commentsFile = path.join(process.cwd(), "comments.json")
      if (fs.existsSync(commentsFile)) {
        const content = fs.readFileSync(commentsFile, 'utf8')
        exportData.comments = JSON.parse(content)
      }
    }

    // Export components
    if (type === "all" || type === "components") {
      const componentsFile = path.join(process.cwd(), "components.json")
      if (fs.existsSync(componentsFile)) {
        const content = fs.readFileSync(componentsFile, 'utf8')
        exportData.components = JSON.parse(content)
      }
    }

    return NextResponse.json(exportData, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="backup-${type}-${new Date().toISOString().split('T')[0]}.json"`
      }
    })

  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
