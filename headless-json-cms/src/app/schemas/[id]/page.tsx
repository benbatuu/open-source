"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RouteGuard } from "@/components/auth/route-guard"
import { ArrowLeft, Edit, Database, FileText, Settings, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Schema } from "@/lib/schemas"

export default function SchemaViewPage() {
  const params = useParams()
  const [schema, setSchema] = useState<Schema | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchSchema(params.id as string)
    }
  }, [params.id])

  const fetchSchema = async (schemaId: string) => {
    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch(`/api/schemas/${schemaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSchema(data)
      } else if (response.status === 401) {
        setMessage({ type: 'error', text: 'Authentication failed. Please login again.' })
      } else if (response.status === 404) {
        setMessage({ type: 'error', text: 'Schema not found.' })
      } else {
        setMessage({ type: 'error', text: 'Failed to load schema' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load schema' })
    } finally {
      setLoading(false)
    }
  }

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

  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'text':
      case 'textarea':
        return 'bg-blue-100 text-blue-800'
      case 'rich':
        return 'bg-purple-100 text-purple-800'
      case 'number':
        return 'bg-green-100 text-green-800'
      case 'boolean':
        return 'bg-yellow-100 text-yellow-800'
      case 'date':
        return 'bg-orange-100 text-orange-800'
      case 'select':
      case 'multiselect':
        return 'bg-pink-100 text-pink-800'
      case 'image':
      case 'file':
        return 'bg-indigo-100 text-indigo-800'
      case 'url':
      case 'email':
        return 'bg-cyan-100 text-cyan-800'
      default:
        return 'bg-gray-100 text-gray-800'
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

  if (!schema) {
    return (
      <RouteGuard allowedRoles={["admin", "editor"]}>
        <DashboardLayout>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Schema not found or failed to load.
            </AlertDescription>
          </Alert>
        </DashboardLayout>
      </RouteGuard>
    )
  }

  return (
    <RouteGuard allowedRoles={["admin", "editor"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{schema.name}</h1>
                <p className="text-muted-foreground">{schema.description}</p>
              </div>
            </div>
            <Button onClick={() => window.location.href = `/schemas/${schema.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Schema
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Schema Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Schema Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">ID</label>
                    <p className="text-sm">{schema.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-sm">{schema.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="text-sm">{schema.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fields Count</label>
                    <p className="text-sm">{schema.fields.length}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                    <p className="text-sm">{new Date(schema.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                    <p className="text-sm">{new Date(schema.updatedAt).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fields List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Fields ({schema.fields.length})</CardTitle>
                  <CardDescription>
                    Define the structure of your content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schema.fields.map((field, index) => (
                      <div key={field.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-muted-foreground">
                              #{index + 1}
                            </span>
                            <h3 className="font-medium">{field.label}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getFieldTypeColor(field.type)}`}>
                              {field.type}
                            </span>
                            {field.required && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                                Required
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <label className="text-muted-foreground">Field Name</label>
                            <p className="font-mono">{field.name}</p>
                          </div>
                          <div>
                            <label className="text-muted-foreground">Field ID</label>
                            <p className="font-mono">{field.id}</p>
                          </div>
                        </div>

                        {field.description && (
                          <div>
                            <label className="text-sm text-muted-foreground">Description</label>
                            <p className="text-sm">{field.description}</p>
                          </div>
                        )}

                        {field.defaultValue !== undefined && (
                          <div>
                            <label className="text-sm text-muted-foreground">Default Value</label>
                            <p className="text-sm font-mono">{String(field.defaultValue)}</p>
                          </div>
                        )}

                        {field.options && field.options.length > 0 && (
                          <div>
                            <label className="text-sm text-muted-foreground">Options</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {field.options.map((option, optionIndex) => (
                                <span key={optionIndex} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {field.validation && (
                          <div>
                            <label className="text-sm text-muted-foreground">Validation Rules</label>
                            <div className="space-y-1 mt-1">
                              {field.validation.min !== undefined && (
                                <p className="text-xs text-muted-foreground">Min: {field.validation.min}</p>
                              )}
                              {field.validation.max !== undefined && (
                                <p className="text-xs text-muted-foreground">Max: {field.validation.max}</p>
                              )}
                              {field.validation.pattern && (
                                <p className="text-xs text-muted-foreground">Pattern: {field.validation.pattern}</p>
                              )}
                              {field.validation.message && (
                                <p className="text-xs text-muted-foreground">Message: {field.validation.message}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RouteGuard>
  )
}
