"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code, Database, Upload, Download } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground">
            Complete guide to using the Dev Portfolio CMS
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">What is Dev Portfolio CMS?</h3>
                  <p className="text-sm text-muted-foreground">
                    Dev Portfolio CMS is a headless content management system built with Next.js and TypeScript.
                    It allows you to create custom content types and manage your portfolio content without writing code.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• File-based JSON storage</li>
                    <li>• Custom schema builder</li>
                    <li>• Real-time preview</li>
                    <li>• Media management</li>
                    <li>• Backup and export</li>
                    <li>• Dark/Light theme</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* API Documentation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content API */}
                <div>
                  <h3 className="font-semibold mb-3">Content API</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">GET /api/content</div>
                      <div className="text-muted-foreground">Get all content items</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">GET /api/content?schema=id</div>
                      <div className="text-muted-foreground">Get content by schema</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">POST /api/content</div>
                      <div className="text-muted-foreground">Create new content</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">GET /api/content/[id]</div>
                      <div className="text-muted-foreground">Get content by ID</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">PUT /api/content/[id]</div>
                      <div className="text-muted-foreground">Update content</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">DELETE /api/content/[id]</div>
                      <div className="text-muted-foreground">Delete content</div>
                    </div>
                  </div>
                </div>

                {/* Schema API */}
                <div>
                  <h3 className="font-semibold mb-3">Schema API</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">GET /api/schemas</div>
                      <div className="text-muted-foreground">Get all schemas</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">POST /api/schemas</div>
                      <div className="text-muted-foreground">Create new schema</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">GET /api/schemas/[id]</div>
                      <div className="text-muted-foreground">Get schema by ID</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">PUT /api/schemas/[id]</div>
                      <div className="text-muted-foreground">Update schema</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">DELETE /api/schemas/[id]</div>
                      <div className="text-muted-foreground">Delete schema</div>
                    </div>
                  </div>
                </div>

                {/* Upload API */}
                <div>
                  <h3 className="font-semibold mb-3">Upload API</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">POST /api/upload</div>
                      <div className="text-muted-foreground">Upload file (multipart/form-data)</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">GET /api/upload</div>
                      <div className="text-muted-foreground">Get uploaded files list</div>
                    </div>
                  </div>
                </div>

                {/* Backup API */}
                <div>
                  <h3 className="font-semibold mb-3">Backup API</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">GET /api/backup</div>
                      <div className="text-muted-foreground">Download backup file</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-mono text-primary">POST /api/backup</div>
                      <div className="text-muted-foreground">Restore from backup</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schema Builder Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Schema Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Field Types</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded">text - Single line text</div>
                    <div className="bg-muted p-2 rounded">textarea - Multi-line text</div>
                    <div className="bg-muted p-2 rounded">number - Numeric values</div>
                    <div className="bg-muted p-2 rounded">boolean - True/False</div>
                    <div className="bg-muted p-2 rounded">image - Image upload</div>
                    <div className="bg-muted p-2 rounded">date - Date picker</div>
                    <div className="bg-muted p-2 rounded">select - Dropdown options</div>
                    <div className="bg-muted p-2 rounded">rich-text - Rich text editor</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Creating a Schema</h3>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Go to the Schemas page</li>
                    <li>Click "Create Schema"</li>
                    <li>Enter schema name and slug</li>
                    <li>Add fields with desired types</li>
                    <li>Configure field properties (required, validation, etc.)</li>
                    <li>Save the schema</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/schemas" className="block p-2 rounded hover:bg-accent transition-colors">
                  <div className="font-medium">Create Schema</div>
                  <div className="text-sm text-muted-foreground">Build content types</div>
                </Link>
                <a href="/content" className="block p-2 rounded hover:bg-accent transition-colors">
                  <div className="font-medium">Add Content</div>
                  <div className="text-sm text-muted-foreground">Create content items</div>
                </a>
                <a href="/media" className="block p-2 rounded hover:bg-accent transition-colors">
                  <div className="font-medium">Upload Media</div>
                  <div className="text-sm text-muted-foreground">Manage files</div>
                </a>
                <a href="/backup" className="block p-2 rounded hover:bg-accent transition-colors">
                  <div className="font-medium">Backup Data</div>
                  <div className="text-sm text-muted-foreground">Export/Import</div>
                </a>
              </CardContent>
            </Card>

            {/* System Info */}
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Framework:</span>
                  <span className="font-mono">Next.js</span>
                </div>
                <div className="flex justify-between">
                  <span>Language:</span>
                  <span className="font-mono">TypeScript</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage:</span>
                  <span className="font-mono">File-based JSON</span>
                </div>
                <div className="flex justify-between">
                  <span>Styling:</span>
                  <span className="font-mono">Tailwind CSS</span>
                </div>
                <div className="flex justify-between">
                  <span>UI Components:</span>
                  <span className="font-mono">Radix UI</span>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips & Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-medium mb-1">Schema Design</div>
                  <div className="text-muted-foreground">
                    Keep schemas simple and focused. Use clear field names.
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Content Organization</div>
                  <div className="text-muted-foreground">
                    Use tags and metadata to organize your content effectively.
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Regular Backups</div>
                  <div className="text-muted-foreground">
                    Export your data regularly to prevent data loss.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
