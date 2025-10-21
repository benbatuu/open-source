import fs from "fs"
import path from "path"

const CATEGORIES_FILE = path.join(process.cwd(), "data", "categories.json")

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  icon?: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

const defaultCategories: Category[] = [
  {
    id: "tech",
    name: "Technology",
    slug: "technology",
    description: "Latest technology news and insights",
    color: "#3B82F6",
    icon: "💻",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system"
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description: "AI developments and machine learning",
    color: "#8B5CF6",
    icon: "🤖",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system"
  },
  {
    id: "web-dev",
    name: "Web Development",
    slug: "web-development",
    description: "Web development tutorials and tips",
    color: "#10B981",
    icon: "🌐",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system"
  }
]

export function loadCategories(): Category[] {
  try {
    if (!fs.existsSync(CATEGORIES_FILE)) {
      const dataDir = path.dirname(CATEGORIES_FILE)
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      saveCategories(defaultCategories)
      return defaultCategories
    }

    const data = fs.readFileSync(CATEGORIES_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error loading categories:", error)
    return defaultCategories
  }
}

export function saveCategories(categories: Category[]): void {
  try {
    const dataDir = path.dirname(CATEGORIES_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2))
  } catch (error) {
    console.error("Error saving categories:", error)
    throw error
  }
}

export function getCategoryById(id: string): Category | null {
  const categories = loadCategories()
  return categories.find(cat => cat.id === id) || null
}

export function getCategoryBySlug(slug: string): Category | null {
  const categories = loadCategories()
  return categories.find(cat => cat.slug === slug) || null
}

export function createCategory(category: Omit<Category, "id" | "createdAt" | "updatedAt">): Category {
  const categories = loadCategories()
  
  // Check if slug already exists
  if (categories.find(cat => cat.slug === category.slug)) {
    throw new Error("Category with this slug already exists")
  }

  const newCategory: Category = {
    ...category,
    id: category.slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  categories.push(newCategory)
  saveCategories(categories)
  return newCategory
}

export function updateCategory(id: string, updates: Partial<Omit<Category, "id" | "createdAt" | "createdBy">>): Category | null {
  const categories = loadCategories()
  const index = categories.findIndex(cat => cat.id === id)
  
  if (index === -1) {
    return null
  }

  // Check if slug already exists (excluding current category)
  if (updates.slug && categories.find(cat => cat.slug === updates.slug && cat.id !== id)) {
    throw new Error("Category with this slug already exists")
  }

  categories[index] = {
    ...categories[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }

  saveCategories(categories)
  return categories[index]
}

export function deleteCategory(id: string): boolean {
  const categories = loadCategories()
  const index = categories.findIndex(cat => cat.id === id)
  
  if (index === -1) {
    return false
  }

  categories.splice(index, 1)
  saveCategories(categories)
  return true
}
