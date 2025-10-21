import fs from 'fs'
import path from 'path'

export interface ContentItem {
  id: string
  title: string
  slug: string
  content: any
  schema: string
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
  author: string
  metadata?: {
    description?: string
    tags?: string[]
    featured?: boolean
    cover?: string
    category?: string
    "seo-title"?: string
    "seo-description"?: string
    "seo-keywords"?: string
    "seo-image"?: string
    "canonical-url"?: string
  }
}

export interface Schema {
  id: string
  name: string
  slug: string
  fields: SchemaField[]
  createdAt: string
  updatedAt: string
}

export interface SchemaField {
  id: string
  name: string
  type: 'text' | 'number' | 'boolean' | 'image' | 'date' | 'select' | 'textarea' | 'rich-text'
  required: boolean
  options?: string[] // for select type
  placeholder?: string
  description?: string
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

const CONTENT_DIR = path.join(process.cwd(), 'content')
const SCHEMAS_DIR = path.join(process.cwd(), 'schemas')

// Ensure directories exist
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true })
}
if (!fs.existsSync(SCHEMAS_DIR)) {
  fs.mkdirSync(SCHEMAS_DIR, { recursive: true })
}

// Content Management
export function loadContent(): ContentItem[] {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return []
    }
    
    const files = fs.readdirSync(CONTENT_DIR)
    const content: ContentItem[] = []

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(CONTENT_DIR, file)
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        content.push(data)
      }
    }

    return content.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  } catch (error) {
    console.error('Error loading content:', error)
    return []
  }
}

export class ContentManager {
  static async getAllContent(): Promise<ContentItem[]> {
    const files = fs.readdirSync(CONTENT_DIR)
    const content: ContentItem[] = []

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(CONTENT_DIR, file)
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        content.push(data)
      }
    }

    return content.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }

  static async getContentById(id: string): Promise<ContentItem | null> {
    try {
      const filePath = path.join(CONTENT_DIR, `${id}.json`)
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      return data
    } catch {
      return null
    }
  }

  static async createContent(content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContentItem> {
    const id = Math.random().toString(36).substr(2, 9)
    const now = new Date().toISOString()
    
    const newContent: ContentItem = {
      ...content,
      id,
      createdAt: now,
      updatedAt: now,
    }

    const filePath = path.join(CONTENT_DIR, `${id}.json`)
    fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2))

    return newContent
  }

  static async updateContent(id: string, updates: Partial<ContentItem>): Promise<ContentItem | null> {
    try {
      const filePath = path.join(CONTENT_DIR, `${id}.json`)
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      
      const updated: ContentItem = {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2))
      return updated
    } catch {
      return null
    }
  }

  static async deleteContent(id: string): Promise<boolean> {
    try {
      const filePath = path.join(CONTENT_DIR, `${id}.json`)
      fs.unlinkSync(filePath)
      return true
    } catch {
      return false
    }
  }

  static async getContentBySchema(schemaId: string): Promise<ContentItem[]> {
    const allContent = await this.getAllContent()
    return allContent.filter(item => item.schema === schemaId)
  }
}

// Schema Management
export class SchemaManager {
  static async getAllSchemas(): Promise<Schema[]> {
    const files = fs.readdirSync(SCHEMAS_DIR)
    const schemas: Schema[] = []

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(SCHEMAS_DIR, file)
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        schemas.push(data)
      }
    }

    return schemas.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }

  static async getSchemaById(id: string): Promise<Schema | null> {
    try {
      const filePath = path.join(SCHEMAS_DIR, `${id}.json`)
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      return data
    } catch {
      return null
    }
  }

  static async createSchema(schema: Omit<Schema, 'id' | 'createdAt' | 'updatedAt'>): Promise<Schema> {
    const id = Math.random().toString(36).substr(2, 9)
    const now = new Date().toISOString()
    
    const newSchema: Schema = {
      ...schema,
      id,
      createdAt: now,
      updatedAt: now,
    }

    const filePath = path.join(SCHEMAS_DIR, `${id}.json`)
    fs.writeFileSync(filePath, JSON.stringify(newSchema, null, 2))

    return newSchema
  }

  static async updateSchema(id: string, updates: Partial<Schema>): Promise<Schema | null> {
    try {
      const filePath = path.join(SCHEMAS_DIR, `${id}.json`)
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      
      const updated: Schema = {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2))
      return updated
    } catch {
      return null
    }
  }

  static async deleteSchema(id: string): Promise<boolean> {
    try {
      const filePath = path.join(SCHEMAS_DIR, `${id}.json`)
      fs.unlinkSync(filePath)
      return true
    } catch {
      return false
    }
  }
}
