"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RouteGuard } from "@/components/auth/route-guard"
import { ArrowLeft, Plus, X, GripVertical, Save, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Schema, SchemaField } from "@/lib/schemas"

const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'rich', label: 'Rich Text' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'date', label: 'Date' },
  { value: 'select', label: 'Select' },
  { value: 'multiselect', label: 'Multi Select' },
  { value: 'image', label: 'Image' },
  { value: 'file', label: 'File' },
  { value: 'url', label: 'URL' },
  { value: 'email', label: 'Email' }
]

export default function EditSchemaPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [fields, setFields] = useState<SchemaField[]>([])

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
        const schema: Schema = await response.json()
        setName(schema.name)
        setDescription(schema.description)
        setFields(schema.fields)
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

  const addField = () => {
    const newField: SchemaField = {
      id: `field_${Date.now()}`,
      name: "",
      type: "text",
      label: "",
      description: "",
      required: false
    }
    setFields([...fields, newField])
  }

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const updateField = (index: number, updates: Partial<SchemaField>) => {
    const newFields = [...fields]
    newFields[index] = { ...newFields[index], ...updates }
    setFields(newFields)
  }

  const addOption = (fieldIndex: number) => {
    const newFields = [...fields]
    if (!newFields[fieldIndex].options) {
      newFields[fieldIndex].options = []
    }
    newFields[fieldIndex].options!.push("")
    setFields(newFields)
  }

  const updateOption = (fieldIndex: number, optionIndex: number, value: string) => {
    const newFields = [...fields]
    newFields[fieldIndex].options![optionIndex] = value
    setFields(newFields)
  }

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const newFields = [...fields]
    newFields[fieldIndex].options!.splice(optionIndex, 1)
    setFields(newFields)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !description.trim()) {
      setMessage({ type: 'error', text: 'Name and description are required' })
      return
    }

    setSaving(true)
    setMessage(null)

    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch(`/api/schemas/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          fields: fields.map(field => ({
            ...field,
            id: field.id || field.name.toLowerCase().replace(/\s+/g, '_'),
            name: field.name || field.id
          }))
        })
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Schema updated successfully' })
        setTimeout(() => {
          router.push(`/schemas/${params.id}`)
        }, 1000)
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to update schema' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update schema' })
    } finally {
      setSaving(false)
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
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Schema</h1>
              <p className="text-muted-foreground">
                Update the structure of your content type
              </p>
            </div>
          </div>

          {message && (
            <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schema Information</CardTitle>
                <CardDescription>
                  Basic information about your schema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Schema Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Blog Post"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of this schema"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Fields</CardTitle>
                    <CardDescription>
                      Define the fields for your content type
                    </CardDescription>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addField}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {fields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Field {index + 1}</span>
                        </div>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeField(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Field Name</Label>
                          <Input
                            value={field.name}
                            onChange={(e) => updateField(index, { name: e.target.value })}
                            placeholder="e.g., title"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Field Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(index, { label: e.target.value })}
                            placeholder="e.g., Title"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Field Type</Label>
                          <select
                            value={field.type}
                            onChange={(e) => updateField(index, { type: e.target.value as any })}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          >
                            {FIELD_TYPES.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input
                            value={field.description}
                            onChange={(e) => updateField(index, { description: e.target.value })}
                            placeholder="Field description"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`required-${index}`}
                          checked={field.required}
                          onChange={(e) => updateField(index, { required: e.target.checked })}
                          className="rounded"
                        />
                        <Label htmlFor={`required-${index}`}>Required field</Label>
                      </div>

                      {(field.type === 'select' || field.type === 'multiselect') && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Options</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(index)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Option
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {field.options?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex gap-2">
                                <Input
                                  value={option}
                                  onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                                  placeholder="Option value"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeOption(index, optionIndex)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Schema
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </RouteGuard>
  )
}
