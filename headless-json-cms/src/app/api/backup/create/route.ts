import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import fs from "fs"
import path from "path"
import { loadUsers } from "@/lib/file-storage"
import { analyticsService } from "@/lib/analytics"
import archiver from "archiver"

export async function POST(request: NextRequest): Promise<Response> {
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
    const { includeMedia = true, includeAnalytics = true } = body

    const dataDir = path.join(process.cwd(), "data")
    const contentDir = path.join(process.cwd(), "content")
    const publicDir = path.join(process.cwd(), "public")
    const schemasDir = path.join(process.cwd(), "schemas")
    const backupDir = path.join(process.cwd(), "backups")

    // Create backup directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFileName = `backup-${timestamp}.zip`
    const backupPath = path.join(backupDir, backupFileName)

    // Create zip archive
    const output = fs.createWriteStream(backupPath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    return new Promise((resolve, reject) => {
      output.on('close', () => {
        // Read the backup file and send it
        const backupBuffer = fs.readFileSync(backupPath)
        
        // Clean up the temporary file
        fs.unlinkSync(backupPath)
        
        resolve(new NextResponse(backupBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="${backupFileName}"`,
            'Content-Length': backupBuffer.length.toString()
          }
        }))
      })

      archive.on('error', (err) => {
        reject(NextResponse.json(
          { error: "Failed to create backup" },
          { status: 500 }
        ))
      })

      archive.pipe(output)

      // Add data files
      if (fs.existsSync(dataDir)) {
        archive.directory(dataDir, 'data')
      }

      // Add content files
      if (fs.existsSync(contentDir)) {
        archive.directory(contentDir, 'content')
      }

      // Add schemas
      if (fs.existsSync(schemasDir)) {
        archive.directory(schemasDir, 'schemas')
      }

      // Add media files if requested
      if (includeMedia && fs.existsSync(publicDir)) {
        archive.directory(publicDir, 'public')
      }

      // Add analytics if requested
      if (includeAnalytics) {
        const analyticsData = analyticsService.getAllData()
        archive.append(JSON.stringify(analyticsData, null, 2), { name: 'analytics.json' })
      }

      // Add comments
      const commentsFile = path.join(process.cwd(), "comments.json")
      if (fs.existsSync(commentsFile)) {
        archive.file(commentsFile, { name: 'comments.json' })
      }

      // Add components
      const componentsFile = path.join(process.cwd(), "components.json")
      if (fs.existsSync(componentsFile)) {
        archive.file(componentsFile, { name: 'components.json' })
      }

      // Add backup metadata
      const metadata = {
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        createdBy: authUser.email,
        includeMedia,
        includeAnalytics,
        files: {
          data: fs.existsSync(dataDir),
          content: fs.existsSync(contentDir),
          schemas: fs.existsSync(schemasDir),
          media: includeMedia && fs.existsSync(publicDir),
          analytics: includeAnalytics,
          comments: fs.existsSync(commentsFile),
          components: fs.existsSync(componentsFile)
        }
      }

      archive.append(JSON.stringify(metadata, null, 2), { name: 'backup-metadata.json' })

      archive.finalize()
    })

  } catch (error) {
    console.error("Backup creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
