"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { SchemaField } from "@/lib/file-system"

interface SchemaBuilderProps {
  fields: SchemaField[]
  onChange: (fields: SchemaField[]) => void
}

const fieldTypes = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Textarea" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "image", label: "Image" },
  { value: "date", label: "Date" },
  { value: "select", label: "Select" },
  { value: "rich-text", label: "Rich Text" },
]

export function SchemaBuilder({ fields, onChange }: SchemaBuilderProps) {
  const addField = () => {
    const newField: SchemaField = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      type: "text",
      required: false,
      placeholder: "",
      description: "",
    }
    onChange([...fields, newField])
  }

  const updateField = (index: number, updates: Partial<SchemaField>) => {
    const newFields = [...fields]
    newFields[index] = { ...newFields[index], ...updates }
    onChange(newFields)
  }

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index)
    onChange(newFields)
  }

  const moveField = (fromIndex: number, toIndex: number) => {
    const newFields = [...fields]
    const [movedField] = newFields.splice(fromIndex, 1)
    newFields.splice(toIndex, 0, movedField)
    onChange(newFields)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Schema Fields</h3>
        <Button onClick={addField} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm">Field {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeField(index)}
                  className="ml-auto text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Field Name</label>
                  <Input
                    value={field.name}
                    onChange={(e) => updateField(index, { name: e.target.value })}
                    placeholder="e.g., title, description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Field Type</label>
                  <select
                    value={field.type}
                    onChange={(e) => updateField(index, { type: e.target.value as any })}
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    {fieldTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Placeholder</label>
                  <Input
                    value={field.placeholder || ""}
                    onChange={(e) => updateField(index, { placeholder: e.target.value })}
                    placeholder="Enter placeholder text"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`required-${field.id}`}
                    checked={field.required}
                    onChange={(e) => updateField(index, { required: e.target.checked })}
                    className="rounded border-input"
                  />
                  <label htmlFor={`required-${field.id}`} className="text-sm font-medium">
                    Required field
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={field.description || ""}
                  onChange={(e) => updateField(index, { description: e.target.value })}
                  placeholder="Field description (optional)"
                />
              </div>

              {field.type === "select" && (
                <div>
                  <label className="text-sm font-medium">Options (one per line)</label>
                  <textarea
                    value={field.options?.join("\n") || ""}
                    onChange={(e) => updateField(index, { 
                      options: e.target.value.split("\n").filter(opt => opt.trim()) 
                    })}
                    placeholder="Option 1&#10;Option 2&#10;Option 3"
                    className="w-full h-20 px-3 py-2 border border-input bg-background rounded-md text-sm resize-none"
                  />
                </div>
              )}

              {field.type === "number" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Min Value</label>
                    <Input
                      type="number"
                      value={field.validation?.min || ""}
                      onChange={(e) => updateField(index, { 
                        validation: { 
                          ...field.validation, 
                          min: e.target.value ? Number(e.target.value) : undefined 
                        } 
                      })}
                      placeholder="Minimum value"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Max Value</label>
                    <Input
                      type="number"
                      value={field.validation?.max || ""}
                      onChange={(e) => updateField(index, { 
                        validation: { 
                          ...field.validation, 
                          max: e.target.value ? Number(e.target.value) : undefined 
                        } 
                      })}
                      placeholder="Maximum value"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {fields.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No fields added yet</p>
            <Button onClick={addField}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Field
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
