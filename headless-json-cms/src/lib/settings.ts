import fs from "fs"
import path from "path"

const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json")

export interface GeneralSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  favicon?: string
  logo?: string
}

export interface DatabaseSettings {
  backupFrequency: string
  retentionDays: number
  maxFileSize: number
}

export interface EmailSettings {
  smtpHost: string
  smtpPort: number
  fromEmail: string
  smtpUsername?: string
  smtpPassword?: string
}

export interface SecuritySettings {
  sessionTimeout: number
  maxLoginAttempts: number
  passwordMinLength: number
  requireTwoFactor?: boolean
}

export interface AISettings {
  enabled: boolean
  openaiApiKey: string
  openaiModel: string
  openaiMaxTokens: number
  openaiTemperature: number
}

export interface Settings {
  general: GeneralSettings
  database: DatabaseSettings
  email: EmailSettings
  security: SecuritySettings
  ai?: AISettings
  updatedAt: string
  updatedBy: string
}

const defaultSettings: Settings = {
  general: {
    siteName: "Dev Portfolio CMS",
    siteDescription: "Headless Content Management System",
    siteUrl: "https://your-site.com",
    favicon: "",
    logo: ""
  },
  database: {
    backupFrequency: "Daily",
    retentionDays: 30,
    maxFileSize: 10
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    fromEmail: "noreply@your-site.com"
  },
  security: {
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireTwoFactor: false
  },
  ai: {
    enabled: false,
    openaiApiKey: "",
    openaiModel: "gpt-3.5-turbo",
    openaiMaxTokens: 1000,
    openaiTemperature: 0.7
  },
  updatedAt: new Date().toISOString(),
  updatedBy: "system"
}

export function loadSettings(): Settings {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) {
      // Create default settings file
      const dataDir = path.dirname(SETTINGS_FILE)
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      saveSettings(defaultSettings)
      return defaultSettings
    }

    const data = fs.readFileSync(SETTINGS_FILE, "utf8")
    const settings = JSON.parse(data)
    
    // Merge with defaults to ensure all fields exist
    return {
      ...defaultSettings,
      ...settings,
      general: { ...defaultSettings.general, ...settings.general },
      database: { ...defaultSettings.database, ...settings.database },
      email: { ...defaultSettings.email, ...settings.email },
      security: { ...defaultSettings.security, ...settings.security },
      ai: settings.ai ? { ...defaultSettings.ai, ...settings.ai } : defaultSettings.ai
    }
  } catch (error) {
    console.error("Error loading settings:", error)
    return defaultSettings
  }
}

export function saveSettings(settings: Settings): void {
  try {
    const dataDir = path.dirname(SETTINGS_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2))
  } catch (error) {
    console.error("Error saving settings:", error)
    throw error
  }
}

export function getSettings(): Settings {
  return loadSettings()
}
