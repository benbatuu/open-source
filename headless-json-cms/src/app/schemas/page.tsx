"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RouteGuard } from "@/components/auth/route-guard"
import { Plus, Database, FileText, Settings, Search, Edit, Trash2, Eye, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
// import { CreateSchemaDialog } from "@/components/schemas/create-schema-dialog"
import { Schema } from "@/lib/schemas"

export default function SchemasPage() {
  const [schemas, setSchemas] = useState<Schema[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchSchemas()
  }, [])

  const fetchSchemas = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch("/api/schemas", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSchemas(data)
      } else if (response.status === 401) {
        setMessage({ type: 'error', text: 'Authentication failed. Please login again.' })
      } else {
        setMessage({ type: 'error', text: 'Failed to load schemas' })
      }
    } catch (error) {
      console.error('Schemas fetch error:', error)
      setMessage({ type: 'error', text: 'Failed to load schemas' })
    } finally {
      setLoading(false)
    }
  }

  const handleSchemaCreated = (newSchema: Schema) => {
    setSchemas([newSchema, ...schemas])
    setMessage({ type: 'success', text: 'Schema created successfully' })
  }

  const handleDeleteSchema = async (schemaId: string) => {
    if (!confirm("Are you sure you want to delete this schema? This action cannot be undone.")) {
      return
    }

    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch(`/api/schemas/${schemaId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setSchemas(schemas.filter(s => s.id !== schemaId))
        setMessage({ type: 'success', text: 'Schema deleted successfully' })
      } else if (response.status === 401) {
        setMessage({ type: 'error', text: 'Authentication failed. Please login again.' })
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to delete schema' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete schema' })
    }
  }

  const handleViewSchema = (schema: Schema) => {
    // Navigate to schema view page or open modal
    window.open(`/schemas/${schema.id}`, '_blank')
  }

  const handleEditSchema = (schema: Schema) => {
    // Navigate to schema edit page
    window.location.href = `/schemas/${schema.id}/edit`
  }

  const filteredSchemas = schemas.filter(schema =>
    schema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schema.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getFieldTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'textarea':
        return <FileText className="h-4 w-4" />
      case 'rich':
        return <Settings className="h-4 w-4" />
      case 'number':
        return <Database className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }
  if (loading) {
    return (
      <RouteGuard allowedRoles={["admin", "editor"]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </DashboardLayout>
      </RouteGuard>
    )
  }

  return (
    <RouteGuard allowedRoles={["admin", "editor"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Content Schemas</h1>
              <p className="text-muted-foreground">
                Define the structure of your content types
              </p>
            </div>
            <Button onClick={() => window.location.href = '/schemas/create'}>
              <Plus className="h-4 w-4 mr-2" />
              Create Schema
            </Button>
          </div>

          {message && (
            <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search schemas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {filteredSchemas.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Database className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchTerm ? "No schemas found" : "No schemas created yet"}
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchTerm 
                    ? "Try adjusting your search criteria."
                    : "Create your first schema to define content structures."
                  }
                </p>
                {!searchTerm && (
                  <Button onClick={() => window.location.href = '/schemas/create'}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Schema
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemas.map((schema) => (
                <Card key={schema.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{schema.name}</CardTitle>
                        <CardDescription className="truncate">{schema.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Fields:</span>
                        <span className="font-medium">{schema.fields.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Updated:</span>
                        <span className="font-medium">
                          {new Date(schema.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="text-sm text-muted-foreground">Field Types:</div>
                      <div className="flex flex-wrap gap-1">
                        {schema.fields.slice(0, 3).map((field) => (
                          <div key={field.id} className="flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                            {getFieldTypeIcon(field.type)}
                            <span>{field.type}</span>
                          </div>
                        ))}
                        {schema.fields.length > 3 && (
                          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                            +{schema.fields.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewSchema(schema)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditSchema(schema)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteSchema(schema.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </RouteGuard>
  )
}