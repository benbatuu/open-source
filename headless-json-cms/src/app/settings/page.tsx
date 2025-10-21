"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RouteGuard } from "@/components/auth/route-guard"
import { Save, Settings, Database, Mail, Shield, Loader2, CheckCircle, AlertCircle, Bot, Key, Globe } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "@/components/ui/image-upload"
import { Settings as SettingsType } from "@/lib/settings"
import { useAuth } from "@/hooks/useAuth"

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const [settings, setSettings] = useState<SettingsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  
  // AI Configuration states
  const [aiConfig, setAiConfig] = useState({
    openaiApiKey: '',
    openaiModel: 'gpt-3.5-turbo',
    openaiMaxTokens: 1000,
    openaiTemperature: 0.7,
    enabled: false
  })

  useEffect(() => {
    if (!authLoading && user) {
      fetchSettings()
    }
  }, [authLoading, user])

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        setMessage({ type: 'error', text: 'No authentication token found' })
        setLoading(false)
        return
      }

      const response = await fetch("/api/settings", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
        
        // Set AI configuration from settings
        if (data.ai) {
          setAiConfig({
            openaiApiKey: data.ai.openaiApiKey || '',
            openaiModel: data.ai.openaiModel || 'gpt-3.5-turbo',
            openaiMaxTokens: data.ai.openaiMaxTokens || 1000,
            openaiTemperature: data.ai.openaiTemperature || 0.7,
            enabled: data.ai.enabled || false
          })
        }
      } else if (response.status === 401) {
        setMessage({ type: 'error', text: 'Authentication failed. Please login again.' })
      } else {
        setMessage({ type: 'error', text: 'Failed to load settings' })
      }
    } catch (error) {
      console.error('Settings fetch error:', error)
      setMessage({ type: 'error', text: 'Failed to load settings' })
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (section: string, sectionData: any) => {
    if (!settings) return

    setSaving(true)
    setActiveSection(section)
    setMessage(null)

    try {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        setMessage({ type: 'error', text: 'No authentication token found' })
        setSaving(false)
        setActiveSection(null)
        return
      }

      const updatedSettings = {
        ...settings,
        [section]: sectionData,
        updatedAt: new Date().toISOString()
      }

      // If updating AI settings, include AI config
      if (section === 'ai') {
        updatedSettings.ai = {
          ...aiConfig,
          ...sectionData
        }
      }

      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedSettings),
      })

      if (response.ok) {
        const result = await response.json()
        setSettings(result.settings)
        setMessage({ type: 'success', text: `${section} settings saved successfully` })
      } else if (response.status === 401) {
        setMessage({ type: 'error', text: 'Authentication failed. Please login again.' })
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to save settings' })
      }
    } catch (error) {
      console.error('Settings update error:', error)
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setSaving(false)
      setActiveSection(null)
    }
  }

  const handleAiConfigChange = (field: string, value: any) => {
    setAiConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const saveAiConfig = async () => {
    await updateSettings('ai', aiConfig)
  }

  const handleGeneralSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const generalData = {
      siteName: formData.get("siteName") as string,
      siteDescription: formData.get("siteDescription") as string,
      siteUrl: formData.get("siteUrl") as string,
      favicon: formData.get("favicon") as string,
      logo: formData.get("logo") as string,
    }
    updateSettings("general", generalData)
  }

  const handleDatabaseSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const databaseData = {
      backupFrequency: formData.get("backupFrequency") as string,
      retentionDays: parseInt(formData.get("retentionDays") as string),
      maxFileSize: parseInt(formData.get("maxFileSize") as string),
    }
    updateSettings("database", databaseData)
  }

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const emailData = {
      smtpHost: formData.get("smtpHost") as string,
      smtpPort: parseInt(formData.get("smtpPort") as string),
      fromEmail: formData.get("fromEmail") as string,
    }
    updateSettings("email", emailData)
  }

  const handleSecuritySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const securityData = {
      sessionTimeout: parseInt(formData.get("sessionTimeout") as string),
      maxLoginAttempts: parseInt(formData.get("maxLoginAttempts") as string),
      passwordMinLength: parseInt(formData.get("passwordMinLength") as string),
    }
    updateSettings("security", securityData)
  }

  if (authLoading || loading) {
    return (
      <RouteGuard allowedRoles={["admin"]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </DashboardLayout>
      </RouteGuard>
    )
  }

  if (!settings) {
    return (
      <RouteGuard allowedRoles={["admin"]}>
        <DashboardLayout>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load settings. Please try again.
            </AlertDescription>
          </Alert>
        </DashboardLayout>
      </RouteGuard>
    )
  }
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Configure your CMS settings and preferences
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

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI Configuration
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic configuration for your CMS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGeneralSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName" 
                      name="siteName"
                      defaultValue={settings.general.siteName}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input 
                      id="siteDescription" 
                      name="siteDescription"
                      defaultValue={settings.general.siteDescription}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input 
                      id="siteUrl" 
                      name="siteUrl"
                      type="url"
                      defaultValue={settings.general.siteUrl}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon</Label>
                    <ImageUpload
                      value={settings.general.favicon || ""}
                      onChange={(url) => {
                        if (settings) {
                          const updatedSettings = {
                            ...settings,
                            general: {
                              ...settings.general,
                              favicon: url
                            }
                          }
                          setSettings(updatedSettings)
                        }
                      }}
                      placeholder="Select or upload a favicon (16x16 or 32x32 pixels)"
                      className="w-full"
                    />
                    <input type="hidden" name="favicon" value={settings.general.favicon || ""} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Site Logo</Label>
                    <ImageUpload
                      value={settings.general.logo || ""}
                      onChange={(url) => {
                        if (settings) {
                          const updatedSettings = {
                            ...settings,
                            general: {
                              ...settings.general,
                              logo: url
                            }
                          }
                          setSettings(updatedSettings)
                        }
                      }}
                      placeholder="Select or upload a logo"
                      className="w-full"
                    />
                    <input type="hidden" name="logo" value={settings.general.logo || ""} />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={saving && activeSection === 'general'}
                  >
                    {saving && activeSection === 'general' ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save General Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure OpenAI settings for AI-powered content generation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => { e.preventDefault(); saveAiConfig(); }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="aiEnabled">Enable AI Features</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="aiEnabled"
                          checked={aiConfig.enabled}
                          onChange={(e) => handleAiConfigChange('enabled', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="aiEnabled" className="text-sm">
                          Enable AI-powered content generation
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="openaiApiKey">OpenAI API Key</Label>
                      <Input
                        id="openaiApiKey"
                        type="password"
                        value={aiConfig.openaiApiKey}
                        onChange={(e) => handleAiConfigChange('openaiApiKey', e.target.value)}
                        placeholder="sk-..."
                        className="font-mono"
                      />
                      <p className="text-sm text-muted-foreground">
                        Your OpenAI API key for content generation
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="openaiModel">Model</Label>
                        <select
                          id="openaiModel"
                          value={aiConfig.openaiModel}
                          onChange={(e) => handleAiConfigChange('openaiModel', e.target.value)}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                        >
                          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                          <option value="gpt-4">GPT-4</option>
                          <option value="gpt-4-turbo">GPT-4 Turbo</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="openaiMaxTokens">Max Tokens</Label>
                        <Input
                          id="openaiMaxTokens"
                          type="number"
                          value={aiConfig.openaiMaxTokens}
                          onChange={(e) => handleAiConfigChange('openaiMaxTokens', parseInt(e.target.value))}
                          placeholder="1000"
                          min="1"
                          max="4000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="openaiTemperature">Temperature</Label>
                      <div className="space-y-2">
                        <Input
                          id="openaiTemperature"
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={aiConfig.openaiTemperature}
                          onChange={(e) => handleAiConfigChange('openaiTemperature', parseFloat(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>0 (Focused)</span>
                          <span className="font-medium">{aiConfig.openaiTemperature}</span>
                          <span>2 (Creative)</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={saving && activeSection === 'ai'}
                      className="w-full"
                    >
                      {saving && activeSection === 'ai' ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save AI Configuration
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email">
              <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Settings
                </CardTitle>
                <CardDescription>
                  Configure email notifications and SMTP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input 
                      id="smtpHost" 
                      name="smtpHost"
                      defaultValue={settings.email.smtpHost}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input 
                      id="smtpPort" 
                      name="smtpPort"
                      type="number" 
                      min="1"
                      max="65535"
                      defaultValue={settings.email.smtpPort}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input 
                      id="fromEmail" 
                      name="fromEmail"
                      type="email" 
                      defaultValue={settings.email.fromEmail}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={saving && activeSection === 'email'}
                  >
                    {saving && activeSection === 'email' ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Email Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSecuritySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (Minutes)</Label>
                    <Input 
                      id="sessionTimeout" 
                      name="sessionTimeout"
                      type="number" 
                      min="1"
                      defaultValue={settings.security.sessionTimeout}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input 
                      id="maxLoginAttempts" 
                      name="maxLoginAttempts"
                      type="number" 
                      min="1"
                      defaultValue={settings.security.maxLoginAttempts}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Password Min Length</Label>
                    <Input 
                      id="passwordMinLength" 
                      name="passwordMinLength"
                      type="number" 
                      min="6"
                      defaultValue={settings.security.passwordMinLength}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={saving && activeSection === 'security'}
                  >
                    {saving && activeSection === 'security' ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Security Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </RouteGuard>
  )
}