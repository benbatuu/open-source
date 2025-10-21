import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const USERS_FILE = path.join(DATA_DIR, "users.json")
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  createdAt: string
}

export interface ResetToken {
  userId: string
  expiresAt: string
}

export interface ViewEvent {
  id: string
  page: string
  postId?: string
  category?: string
  ip: string
  userAgent: string
  country?: string
  city?: string
  referrer?: string
  timestamp: string
  sessionId: string
}

export interface CommentEvent {
  id: string
  postId: string
  commentId: string
  ip: string
  userAgent: string
  country?: string
  city?: string
  timestamp: string
  sessionId: string
}

export interface AnalyticsData {
  views: ViewEvent[]
  comments: CommentEvent[]
  lastUpdated: string
}

// Load users from file
export function loadUsers(): User[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error loading users:", error)
  }
  
  // Return default admin user if file doesn't exist
  return [
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
      role: "admin",
      createdAt: new Date().toISOString()
    }
  ]
}

// Save users to file
export function saveUsers(users: User[]): void {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error("Error saving users:", error)
  }
}

// Load reset tokens from file
export function loadResetTokens(): { [key: string]: ResetToken } {
  try {
    const tokensFile = path.join(DATA_DIR, "reset-tokens.json")
    if (fs.existsSync(tokensFile)) {
      const data = fs.readFileSync(tokensFile, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error loading reset tokens:", error)
  }
  
  return {}
}

// Save reset tokens to file
export function saveResetTokens(tokens: { [key: string]: ResetToken }): void {
  try {
    const tokensFile = path.join(DATA_DIR, "reset-tokens.json")
    fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2))
  } catch (error) {
    console.error("Error saving reset tokens:", error)
  }
}

// Load analytics from file
export function loadAnalytics(): AnalyticsData {
  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      const data = fs.readFileSync(ANALYTICS_FILE, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error loading analytics:", error)
  }
  
  // Return empty analytics data if file doesn't exist
  return {
    views: [],
    comments: [],
    lastUpdated: new Date().toISOString()
  }
}

// Save analytics to file
export function saveAnalytics(analytics: AnalyticsData): void {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2))
  } catch (error) {
    console.error("Error saving analytics:", error)
  }
}
