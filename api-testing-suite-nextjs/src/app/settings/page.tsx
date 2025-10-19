'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings as SettingsIcon, 
  Globe, 
  Key, 
  Bell, 
  Save, 
  Plus,
  Trash2,
  Edit,
  Eye
} from 'lucide-react'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Environment {
  id: string
  name: string
  baseUrl: string
  headers: string | null
  variables: string | null
  active: boolean
}

export default function SettingsPage() {
  const [environments, setEnvironments] = useState<Environment[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('general')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null)
  const [newEnvironment, setNewEnvironment] = useState({
    name: '',
    baseUrl: '',
    headers: '{}',
    variables: '{}',
    active: false
  })
  const [editEnvironment, setEditEnvironment] = useState({
    name: '',
    baseUrl: '',
    headers: '{}',
    variables: '{}',
    active: false
  })

  useEffect(() => {
    fetchEnvironments()
  }, [])

  const fetchEnvironments = async () => {
    try {
      const response = await fetch('/api/environments')
      const data = await response.json()
      setEnvironments(data)
    } catch (error) {
      console.error('Error fetching environments:', error)
    } finally {
      setLoading(false)
    }
  }

  const createEnvironment = async () => {
    try {
      const response = await fetch('/api/environments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEnvironment),
      })

      if (response.ok) {
        setNewEnvironment({
          name: '',
          baseUrl: '',
          headers: '{}',
          variables: '{}',
          active: false
        })
        fetchEnvironments()
      }
    } catch (error) {
      console.error('Error creating environment:', error)
    }
  }

  const editEnvironmentItem = async () => {
    if (!selectedEnvironment) return

    try {
      const response = await fetch(`/api/environments/${selectedEnvironment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editEnvironment),
      })

      if (response.ok) {
        setEditEnvironment({
          name: '',
          baseUrl: '',
          headers: '{}',
          variables: '{}',
          active: false
        })
        setSelectedEnvironment(null)
        setIsEditDialogOpen(false)
        fetchEnvironments()
      }
    } catch (error) {
      console.error('Error updating environment:', error)
    }
  }

  const deleteEnvironment = async () => {
    if (!selectedEnvironment) return

    try {
      const response = await fetch(`/api/environments/${selectedEnvironment.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSelectedEnvironment(null)
        setIsDeleteDialogOpen(false)
        fetchEnvironments()
      }
    } catch (error) {
      console.error('Error deleting environment:', error)
    }
  }

  const openEditDialog = (environment: Environment) => {
    setSelectedEnvironment(environment)
    setEditEnvironment({
      name: environment.name,
      baseUrl: environment.baseUrl,
      headers: environment.headers || '{}',
      variables: environment.variables || '{}',
      active: environment.active
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (environment: Environment) => {
    setSelectedEnvironment(environment)
    setIsDeleteDialogOpen(true)
  }

  const openViewDialog = (environment: Environment) => {
    setSelectedEnvironment(environment)
    setIsViewDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your application preferences and configurations</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="environments">Environments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your general application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="tr">Türkçe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeout">Default Timeout (ms)</Label>
                <Input
                  id="timeout"
                  type="number"
                  defaultValue="30000"
                  placeholder="30000"
                />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Environments</CardTitle>
              <CardDescription>Manage your testing environments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="env-name">Name</Label>
                    <Input
                      id="env-name"
                      value={newEnvironment.name}
                      onChange={(e) => setNewEnvironment({ ...newEnvironment, name: e.target.value })}
                      placeholder="Development"
                    />
                  </div>
                  <div>
                    <Label htmlFor="env-url">Base URL</Label>
                    <Input
                      id="env-url"
                      value={newEnvironment.baseUrl}
                      onChange={(e) => setNewEnvironment({ ...newEnvironment, baseUrl: e.target.value })}
                      placeholder="https://api.example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="env-headers">Headers (JSON)</Label>
                  <Textarea
                    id="env-headers"
                    value={newEnvironment.headers}
                    onChange={(e) => setNewEnvironment({ ...newEnvironment, headers: e.target.value })}
                    placeholder='{"Content-Type": "application/json"}'
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="env-variables">Variables (JSON)</Label>
                  <Textarea
                    id="env-variables"
                    value={newEnvironment.variables}
                    onChange={(e) => setNewEnvironment({ ...newEnvironment, variables: e.target.value })}
                    placeholder='{"apiKey": "your-key", "version": "v1"}'
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="env-active"
                    checked={newEnvironment.active}
                    onChange={(e) => setNewEnvironment({ ...newEnvironment, active: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="env-active">Set as active environment</Label>
                </div>
                <Button onClick={createEnvironment} disabled={!newEnvironment.name || !newEnvironment.baseUrl}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Environment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Existing Environments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {environments.map((env) => (
              <Card key={env.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{env.name}</CardTitle>
                      <CardDescription>{env.baseUrl}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {env.active && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Active
                        </span>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openViewDialog(env)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openEditDialog(env)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openDeleteDialog(env)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Headers:</span>
                      <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto">
                        {env.headers || '{}'}
                      </pre>
                    </div>
                    <div>
                      <span className="font-medium">Variables:</span>
                      <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto">
                        {env.variables || '{}'}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive email updates on test failures</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Browser Notifications</Label>
                  <p className="text-sm text-gray-600">Show browser notifications for test results</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Slack Integration</Label>
                  <p className="text-sm text-gray-600">Send test results to Slack channels</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Environment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Environment</DialogTitle>
            <DialogDescription>
              Update the environment configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-env-name">Name</Label>
                <Input
                  id="edit-env-name"
                  value={editEnvironment.name}
                  onChange={(e) => setEditEnvironment({ ...editEnvironment, name: e.target.value })}
                  placeholder="Development"
                />
              </div>
              <div>
                <Label htmlFor="edit-env-url">Base URL</Label>
                <Input
                  id="edit-env-url"
                  value={editEnvironment.baseUrl}
                  onChange={(e) => setEditEnvironment({ ...editEnvironment, baseUrl: e.target.value })}
                  placeholder="https://api.example.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-env-headers">Headers (JSON)</Label>
              <Textarea
                id="edit-env-headers"
                value={editEnvironment.headers}
                onChange={(e) => setEditEnvironment({ ...editEnvironment, headers: e.target.value })}
                placeholder='{"Content-Type": "application/json"}'
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-env-variables">Variables (JSON)</Label>
              <Textarea
                id="edit-env-variables"
                value={editEnvironment.variables}
                onChange={(e) => setEditEnvironment({ ...editEnvironment, variables: e.target.value })}
                placeholder='{"apiKey": "your-key", "version": "v1"}'
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-env-active"
                checked={editEnvironment.active}
                onChange={(e) => setEditEnvironment({ ...editEnvironment, active: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="edit-env-active">Set as active environment</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={editEnvironmentItem} disabled={!editEnvironment.name || !editEnvironment.baseUrl}>
              Update Environment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Environment Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Environment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedEnvironment?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteEnvironment}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Environment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Environment Details</DialogTitle>
            <DialogDescription>
              View environment configuration and details.
            </DialogDescription>
          </DialogHeader>
          {selectedEnvironment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="text-sm font-medium">{selectedEnvironment.name}</p>
                </div>
                <div>
                  <Label>Base URL</Label>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">{selectedEnvironment.baseUrl}</p>
                </div>
              </div>
              
              <div>
                <Label>Status</Label>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedEnvironment.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedEnvironment.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div>
                <Label>Headers</Label>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(JSON.parse(selectedEnvironment.headers || '{}'), null, 2)}
                </pre>
              </div>

              <div>
                <Label>Variables</Label>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(JSON.parse(selectedEnvironment.variables || '{}'), null, 2)}
                </pre>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
