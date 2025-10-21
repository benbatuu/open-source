"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RouteGuard } from "@/components/auth/route-guard"
import { 
  Download, 
  Upload, 
  Database, 
  FileText, 
  Users, 
  BarChart3, 
  Image, 
  Settings,
  Archive,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BackupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [restoreType, setRestoreType] = useState("all")
  const [includeMedia, setIncludeMedia] = useState(true)
  const [includeAnalytics, setIncludeAnalytics] = useState(true)

  const handleExport = async (type: string) => {
    try {
      setLoading(true)
      setMessage(null)

      const token = localStorage.getItem("auth_token")
      const response = await fetch(`/api/backup/export?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `backup-${type}-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        setMessage({ type: 'success', text: `${type} data exported successfully!` })
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Export failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Export failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleBackup = async () => {
    try {
      setLoading(true)
      setMessage(null)

      const token = localStorage.getItem("auth_token")
      const response = await fetch('/api/backup/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          includeMedia,
          includeAnalytics
        })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `backup-${new Date().toISOString().replace(/[:.]/g, '-')}.zip`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        setMessage({ type: 'success', text: 'Full backup created successfully!' })
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Backup failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Backup failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select a file to import' })
      return
    }

    try {
      setLoading(true)
      setMessage(null)

      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('type', restoreType)

      const token = localStorage.getItem("auth_token")
      const response = await fetch('/api/backup/import', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      const result = await response.json()

      if (response.ok) {
        let messageText = 'Import completed successfully!'
        if (result.restored.length > 0) {
          messageText += ` Restored: ${result.restored.join(', ')}.`
        }
        if (result.errors.length > 0) {
          messageText += ` Errors: ${result.errors.join(', ')}.`
        }
        setMessage({ type: 'success', text: messageText })
      } else {
        setMessage({ type: 'error', text: result.error || 'Import failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Import failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setSelectedFile(file || null)
  }

  return (
    <RouteGuard allowedRoles={["admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Backup & Export</h1>
            <p className="text-muted-foreground">
              Manage your data backups, exports, and imports
            </p>
          </div>

          {message && (
            <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              {message.type === 'error' ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          {/* Export Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Data
              </CardTitle>
              <CardDescription>
                Export specific data types as JSON files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  onClick={() => handleExport('all')}
                  disabled={loading}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Database className="h-6 w-6" />
                  <span>Export All</span>
                  <span className="text-xs opacity-70">Complete data export</span>
                </Button>

                <Button
                  onClick={() => handleExport('content')}
                  disabled={loading}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <FileText className="h-6 w-6" />
                  <span>Export Content</span>
                  <span className="text-xs opacity-70">Blog posts & pages</span>
                </Button>

                <Button
                  onClick={() => handleExport('users')}
                  disabled={loading}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Users className="h-6 w-6" />
                  <span>Export Users</span>
                  <span className="text-xs opacity-70">User accounts</span>
                </Button>

                <Button
                  onClick={() => handleExport('analytics')}
                  disabled={loading}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <BarChart3 className="h-6 w-6" />
                  <span>Export Analytics</span>
                  <span className="text-xs opacity-70">View & comment data</span>
                </Button>

                <Button
                  onClick={() => handleExport('schemas')}
                  disabled={loading}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Settings className="h-6 w-6" />
                  <span>Export Schemas</span>
                  <span className="text-xs opacity-70">Content schemas</span>
                </Button>

                <Button
                  onClick={() => handleExport('comments')}
                  disabled={loading}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <FileText className="h-6 w-6" />
                  <span>Export Comments</span>
                  <span className="text-xs opacity-70">User comments</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Full Backup Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Create Full Backup
              </CardTitle>
              <CardDescription>
                Create a complete backup including all files and media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-media"
                  checked={includeMedia}
                  onCheckedChange={(checked) => setIncludeMedia(checked as boolean)}
                />
                <Label htmlFor="include-media">Include media files (images, videos)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-analytics"
                  checked={includeAnalytics}
                  onCheckedChange={(checked) => setIncludeAnalytics(checked as boolean)}
                />
                <Label htmlFor="include-analytics">Include analytics data</Label>
              </div>

              <Button
                onClick={handleBackup}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Backup...
                  </>
                ) : (
                  <>
                    <Archive className="mr-2 h-4 w-4" />
                    Create Full Backup
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Import Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import Data
              </CardTitle>
              <CardDescription>
                Restore data from exported JSON files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="import-file">Select JSON file to import</Label>
                <Input
                  id="import-file"
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="restore-type">Restore type</Label>
                <Select value={restoreType} onValueChange={setRestoreType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All data</SelectItem>
                    <SelectItem value="content">Content only</SelectItem>
                    <SelectItem value="users">Users only</SelectItem>
                    <SelectItem value="analytics">Analytics only</SelectItem>
                    <SelectItem value="schemas">Schemas only</SelectItem>
                    <SelectItem value="comments">Comments only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Warning:</strong> Importing data will overwrite existing data. 
                  Make sure to create a backup before importing.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleImport}
                disabled={loading || !selectedFile}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Backup Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Export Types:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• <strong>All:</strong> Complete data export</li>
                    <li>• <strong>Content:</strong> Blog posts and pages</li>
                    <li>• <strong>Users:</strong> User accounts (passwords redacted)</li>
                    <li>• <strong>Analytics:</strong> View and comment statistics</li>
                    <li>• <strong>Schemas:</strong> Content structure definitions</li>
                    <li>• <strong>Comments:</strong> User comments and replies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Backup Features:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• <strong>Full Backup:</strong> ZIP archive with all files</li>
                    <li>• <strong>Selective Import:</strong> Choose what to restore</li>
                    <li>• <strong>Media Support:</strong> Include/exclude media files</li>
                    <li>• <strong>Analytics:</strong> Optional analytics data</li>
                    <li>• <strong>Metadata:</strong> Backup creation information</li>
                    <li>• <strong>Version Control:</strong> Backup version tracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </RouteGuard>
  )
}