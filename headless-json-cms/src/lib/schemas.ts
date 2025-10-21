import fs from "fs"
import path from "path"

const SCHEMAS_DIR = path.join(process.cwd(), "schemas")

export interface SchemaField {
  id: string
  name: string
  type: 'text' | 'textarea' | 'rich' | 'number' | 'boolean' | 'date' | 'select' | 'multiselect' | 'image' | 'file' | 'url' | 'email'
  label: string
  description?: string
  required: boolean
  defaultValue?: any
  options?: string[] // For select/multiselect fields
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

export interface Schema {
  id: string
  name: string
  description: string
  fields: SchemaField[]
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export function loadSchemas(): Schema[] {
  try {
    if (!fs.existsSync(SCHEMAS_DIR)) {
      fs.mkdirSync(SCHEMAS_DIR, { recursive: true })
      // Create default blog schema
      createDefaultSchemas()
      return loadSchemas()
    }

    const files = fs.readdirSync(SCHEMAS_DIR).filter(file => file.endsWith('.json'))
    const schemas: Schema[] = []

    for (const file of files) {
      try {
        const filePath = path.join(SCHEMAS_DIR, file)
        const data = fs.readFileSync(filePath, 'utf8')
        const schema = JSON.parse(data)
        schemas.push(schema)
      } catch (error) {
        console.error(`Error loading schema file ${file}:`, error)
      }
    }

    return schemas.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  } catch (error) {
    console.error("Error loading schemas:", error)
    return []
  }
}

export function saveSchema(schema: Schema): void {
  try {
    if (!fs.existsSync(SCHEMAS_DIR)) {
      fs.mkdirSync(SCHEMAS_DIR, { recursive: true })
    }

    const filePath = path.join(SCHEMAS_DIR, `${schema.id}.json`)
    fs.writeFileSync(filePath, JSON.stringify(schema, null, 2))
  } catch (error) {
    console.error("Error saving schema:", error)
    throw error
  }
}

export function deleteSchema(schemaId: string): void {
  try {
    const filePath = path.join(SCHEMAS_DIR, `${schemaId}.json`)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  } catch (error) {
    console.error("Error deleting schema:", error)
    throw error
  }
}

export function getSchema(schemaId: string): Schema | null {
  try {
    const filePath = path.join(SCHEMAS_DIR, `${schemaId}.json`)
    if (!fs.existsSync(filePath)) {
      return null
    }

    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error("Error getting schema:", error)
    return null
  }
}

function createDefaultSchemas(): void {
  const defaultBlogSchema: Schema = {
    id: "blog",
    name: "Blog Post",
    description: "Article content structure",
    fields: [
      {
        id: "title",
        name: "title",
        type: "text",
        label: "Title",
        description: "The title of the blog post",
        required: true,
        validation: {
          min: 1,
          max: 200,
          message: "Title must be between 1 and 200 characters"
        }
      },
      {
        id: "slug",
        name: "slug",
        type: "text",
        label: "Slug",
        description: "URL-friendly version of the title",
        required: true,
        validation: {
          pattern: "^[a-z0-9-]+$",
          message: "Slug must contain only lowercase letters, numbers, and hyphens"
        }
      },
      {
        id: "content",
        name: "content",
        type: "rich",
        label: "Content",
        description: "The main content of the blog post",
        required: true
      },
      {
        id: "excerpt",
        name: "excerpt",
        type: "textarea",
        label: "Excerpt",
        description: "Short description of the blog post",
        required: false,
        validation: {
          max: 500,
          message: "Excerpt must be less than 500 characters"
        }
      },
      {
        id: "cover",
        name: "cover",
        type: "image",
        label: "Cover Image",
        description: "Featured image for the blog post",
        required: false
      },
      {
        id: "tags",
        name: "tags",
        type: "multiselect",
        label: "Tags",
        description: "Tags to categorize the blog post",
        required: false,
        options: ["Technology", "AI", "Web Development", "Design", "Business"]
      },
      {
        id: "featured",
        name: "featured",
        type: "boolean",
        label: "Featured",
        description: "Mark this post as featured",
        required: false,
        defaultValue: false
      },
      {
        id: "status",
        name: "status",
        type: "select",
        label: "Status",
        description: "Publication status",
        required: true,
        options: ["draft", "published", "archived"],
        defaultValue: "draft"
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    updatedBy: "system"
  }

  const defaultPageSchema: Schema = {
    id: "page",
    name: "Page",
    description: "Static page structure",
    fields: [
      {
        id: "title",
        name: "title",
        type: "text",
        label: "Title",
        description: "The title of the page",
        required: true
      },
      {
        id: "slug",
        name: "slug",
        type: "text",
        label: "Slug",
        description: "URL-friendly version of the title",
        required: true
      },
      {
        id: "content",
        name: "content",
        type: "rich",
        label: "Content",
        description: "The main content of the page",
        required: true
      },
      {
        id: "meta_title",
        name: "meta_title",
        type: "text",
        label: "Meta Title",
        description: "SEO title for search engines",
        required: false
      },
      {
        id: "meta_description",
        name: "meta_description",
        type: "textarea",
        label: "Meta Description",
        description: "SEO description for search engines",
        required: false
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    updatedBy: "system"
  }

  saveSchema(defaultBlogSchema)
  saveSchema(defaultPageSchema)
}

export function validateSchema(schema: Omit<Schema, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>): string[] {
  const errors: string[] = []

  if (!schema.name || schema.name.trim().length === 0) {
    errors.push("Schema name is required")
  }

  if (!schema.description || schema.description.trim().length === 0) {
    errors.push("Schema description is required")
  }

  if (!schema.fields || schema.fields.length === 0) {
    errors.push("Schema must have at least one field")
  }

  if (schema.fields) {
    const fieldIds = new Set<string>()
    const fieldNames = new Set<string>()

    for (let i = 0; i < schema.fields.length; i++) {
      const field = schema.fields[i]
      
      if (!field.id || field.id.trim().length === 0) {
        errors.push(`Field ${i + 1}: ID is required`)
      } else if (fieldIds.has(field.id)) {
        errors.push(`Field ${i + 1}: Duplicate field ID "${field.id}"`)
      } else {
        fieldIds.add(field.id)
      }

      if (!field.name || field.name.trim().length === 0) {
        errors.push(`Field ${i + 1}: Name is required`)
      } else if (fieldNames.has(field.name)) {
        errors.push(`Field ${i + 1}: Duplicate field name "${field.name}"`)
      } else {
        fieldNames.add(field.name)
      }

      if (!field.label || field.label.trim().length === 0) {
        errors.push(`Field ${i + 1}: Label is required`)
      }

      if (!field.type) {
        errors.push(`Field ${i + 1}: Type is required`)
      }

      if (field.type === 'select' || field.type === 'multiselect') {
        if (!field.options || field.options.length === 0) {
          errors.push(`Field ${i + 1}: Options are required for select/multiselect fields`)
        }
      }
    }
  }

  return errors
}
