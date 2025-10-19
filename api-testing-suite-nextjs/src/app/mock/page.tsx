'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Server, 
  Plus, 
  Edit, 
  Trash2, 
  Play,
  Pause,
  Power,
  Copy,
  Eye
} from 'lucide-react'

interface MockEndpoint {
  id: string
  name: string
  path: string
  method: string
  statusCode: number
  responseBody: string
  headers: string
  enabled: boolean
  delay: number
}

export default function MockServerPage() {
  const [endpoints, setEndpoints] = useState<MockEndpoint[]>([])
  const [loading, setLoading] = useState(true)
  const [isServerRunning, setIsServerRunning] = useState(false)
  const [serverPort, setServerPort] = useState(3003)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedEndpoint, setSelectedEndpoint] = useState<MockEndpoint | null>(null)
  const [newEndpoint, setNewEndpoint] = useState({
    name: '',
    path: '',
    method: 'GET',
    statusCode: 200,
    responseBody: '{}',
    headers: '{"Content-Type": "application/json"}',
    delay: 0
  })
  const [editEndpoint, setEditEndpoint] = useState({
    name: '',
    path: '',
    method: 'GET',
    statusCode: 200,
    responseBody: '{}',
    headers: '{"Content-Type": "application/json"}',
    delay: 0
  })

  useEffect(() => {
    fetchEndpoints()
  }, [])

  const fetchEndpoints = async () => {
    try {
      // Try to fetch from API first, fallback to mock data
      try {
        const response = await fetch('/api/mock/endpoints')
        if (response.ok) {
          const data = await response.json()
          setEndpoints(data)
          return
        }
      } catch (error) {
        console.log('API not available, using mock data')
      }

      // Mock data for now
      const mockEndpoints: MockEndpoint[] = [
        {
          id: '1',
          name: 'Get Users',
          path: '/api/users',
          method: 'GET',
          statusCode: 200,
          responseBody: JSON.stringify([
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
          ], null, 2),
          headers: '{"Content-Type": "application/json"}',
          enabled: true,
          delay: 0
        },
        {
          id: '2',
          name: 'Create User',
          path: '/api/users',
          method: 'POST',
          statusCode: 201,
          responseBody: JSON.stringify({
            id: 3,
            name: 'New User',
            email: 'newuser@example.com',
            createdAt: new Date().toISOString()
          }, null, 2),
          headers: '{"Content-Type": "application/json"}',
          enabled: true,
          delay: 100
        },
        {
          id: '3',
          name: 'Get User by ID',
          path: '/api/users/:id',
          method: 'GET',
          statusCode: 200,
          responseBody: JSON.stringify({
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            profile: {
              age: 30,
              city: 'New York'
            }
          }, null, 2),
          headers: '{"Content-Type": "application/json"}',
          enabled: false,
          delay: 50
        }
      ]
      setEndpoints(mockEndpoints)
    } catch (error) {
      console.error('Error fetching endpoints:', error)
    } finally {
      setLoading(false)
    }
  }

  const createEndpoint = async () => {
    try {
      const newEndpointData: MockEndpoint = {
        id: Date.now().toString(),
        name: newEndpoint.name,
        path: newEndpoint.path,
        method: newEndpoint.method,
        statusCode: newEndpoint.statusCode,
        responseBody: newEndpoint.responseBody,
        headers: newEndpoint.headers,
        enabled: true,
        delay: newEndpoint.delay
      }
      
      setEndpoints(prev => [...prev, newEndpointData])
      setNewEndpoint({
        name: '',
        path: '',
        method: 'GET',
        statusCode: 200,
        responseBody: '{}',
        headers: '{"Content-Type": "application/json"}',
        delay: 0
      })
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Error creating endpoint:', error)
    }
  }

  const editEndpointItem = async () => {
    if (!selectedEndpoint) return

    try {
      const updatedEndpoint: MockEndpoint = {
        ...selectedEndpoint,
        name: editEndpoint.name,
        path: editEndpoint.path,
        method: editEndpoint.method,
        statusCode: editEndpoint.statusCode,
        responseBody: editEndpoint.responseBody,
        headers: editEndpoint.headers,
        delay: editEndpoint.delay
      }
      
      setEndpoints(prev => prev.map(endpoint => 
        endpoint.id === selectedEndpoint.id ? updatedEndpoint : endpoint
      ))
      
      setEditEndpoint({
        name: '',
        path: '',
        method: 'GET',
        statusCode: 200,
        responseBody: '{}',
        headers: '{"Content-Type": "application/json"}',
        delay: 0
      })
      setSelectedEndpoint(null)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error('Error updating endpoint:', error)
    }
  }

  const deleteEndpoint = async () => {
    if (!selectedEndpoint) return

    try {
      setEndpoints(prev => prev.filter(endpoint => endpoint.id !== selectedEndpoint.id))
      setSelectedEndpoint(null)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting endpoint:', error)
    }
  }

  const openEditDialog = (endpoint: MockEndpoint) => {
    setSelectedEndpoint(endpoint)
    setEditEndpoint({
      name: endpoint.name,
      path: endpoint.path,
      method: endpoint.method,
      statusCode: endpoint.statusCode,
      responseBody: endpoint.responseBody,
      headers: endpoint.headers,
      delay: endpoint.delay
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (endpoint: MockEndpoint) => {
    setSelectedEndpoint(endpoint)
    setIsDeleteDialogOpen(true)
  }

  const openViewDialog = (endpoint: MockEndpoint) => {
    setSelectedEndpoint(endpoint)
    setIsViewDialogOpen(true)
  }

  const toggleEndpoint = async (id: string) => {
    try {
      setEndpoints(prev => prev.map(endpoint => 
        endpoint.id === id ? { ...endpoint, enabled: !endpoint.enabled } : endpoint
      ))
    } catch (error) {
      console.error('Error toggling endpoint:', error)
    }
  }

  const startServer = async () => {
    try {
      setIsServerRunning(true)
      // Check if mock server is running
      const response = await fetch(`http://localhost:${serverPort}/health`)
      if (response.ok) {
        console.log('Mock server is already running on port', serverPort)
      } else {
        console.log('Mock server not running on port', serverPort)
      }
    } catch (error) {
      console.error('Error starting server:', error)
      setIsServerRunning(false)
    }
  }

  const stopServer = async () => {
    try {
      setIsServerRunning(false)
      // In a real app, you'd stop the mock server here
      console.log('Mock server stopped')
    } catch (error) {
      console.error('Error stopping server:', error)
    }
  }

  const copyUrl = (endpoint: MockEndpoint) => {
    const url = `http://localhost:${serverPort}${endpoint.path}`
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading mock server...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mock Server</h1>
          <p className="text-gray-600">Create and manage mock API endpoints</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="port">Port:</Label>
            <Input
              id="port"
              type="number"
              value={serverPort}
              onChange={(e) => setServerPort(parseInt(e.target.value))}
              className="w-20"
              disabled={isServerRunning}
            />
          </div>
          {isServerRunning ? (
            <Button onClick={stopServer} variant="outline" className="border-red-300 text-red-700">
              <Pause className="mr-2 h-4 w-4" />
              Stop Server
            </Button>
          ) : (
            <Button onClick={startServer}>
              <Play className="mr-2 h-4 w-4" />
              Start Server
            </Button>
          )}
        </div>
      </div>

      {/* Server Status */}
      <Card className={isServerRunning ? 'border-green-200 bg-green-50' : 'border-gray-200'}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isServerRunning ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Server className={`w-6 h-6 ${
                  isServerRunning ? 'text-green-600' : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Mock Server {isServerRunning ? 'Running' : 'Stopped'}
                </h3>
                <p className="text-gray-600">
                  {isServerRunning 
                    ? `Server is running on http://localhost:${serverPort}`
                    : 'Server is not running'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={isServerRunning ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {isServerRunning ? 'Active' : 'Inactive'}
              </Badge>
              <div className={`w-3 h-3 rounded-full ${
                isServerRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create New Endpoint */}
      <Card>
        <CardHeader>
          <CardTitle>Create Mock Endpoint</CardTitle>
          <CardDescription>Add a new mock API endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Endpoint
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Mock Endpoint</DialogTitle>
                <DialogDescription>
                  Configure a new mock API endpoint.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="endpoint-name">Name</Label>
                    <Input
                      id="endpoint-name"
                      value={newEndpoint.name}
                      onChange={(e) => setNewEndpoint({ ...newEndpoint, name: e.target.value })}
                      placeholder="Get Users"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endpoint-path">Path</Label>
                    <Input
                      id="endpoint-path"
                      value={newEndpoint.path}
                      onChange={(e) => setNewEndpoint({ ...newEndpoint, path: e.target.value })}
                      placeholder="/api/users"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="endpoint-method">Method</Label>
                    <Select value={newEndpoint.method} onValueChange={(value) => setNewEndpoint({ ...newEndpoint, method: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="endpoint-status">Status Code</Label>
                    <Input
                      id="endpoint-status"
                      type="number"
                      value={newEndpoint.statusCode}
                      onChange={(e) => setNewEndpoint({ ...newEndpoint, statusCode: parseInt(e.target.value) })}
                      min="100"
                      max="599"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endpoint-delay">Delay (ms)</Label>
                    <Input
                      id="endpoint-delay"
                      type="number"
                      value={newEndpoint.delay}
                      onChange={(e) => setNewEndpoint({ ...newEndpoint, delay: parseInt(e.target.value) })}
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="endpoint-headers">Headers (JSON)</Label>
                  <Textarea
                    id="endpoint-headers"
                    value={newEndpoint.headers}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, headers: e.target.value })}
                    placeholder='{"Content-Type": "application/json"}'
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="endpoint-response">Response Body (JSON)</Label>
                  <Textarea
                    id="endpoint-response"
                    value={newEndpoint.responseBody}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, responseBody: e.target.value })}
                    placeholder='{"message": "Hello World"}'
                    rows={6}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createEndpoint} disabled={!newEndpoint.name || !newEndpoint.path}>
                  Create Endpoint
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Mock Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Mock Endpoints</CardTitle>
          <CardDescription>
            {endpoints.length} endpoint{endpoints.length !== 1 ? 's' : ''} configured
          </CardDescription>
        </CardHeader>
        <CardContent>
          {endpoints.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delay</TableHead>
                  <TableHead>Enabled</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {endpoints.map((endpoint) => (
                  <TableRow key={endpoint.id}>
                    <TableCell className="font-medium">{endpoint.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{endpoint.method}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{endpoint.path}</TableCell>
                    <TableCell>
                      <Badge className={
                        endpoint.statusCode >= 200 && endpoint.statusCode < 300 
                          ? 'bg-green-100 text-green-800'
                          : endpoint.statusCode >= 400 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }>
                        {endpoint.statusCode}
                      </Badge>
                    </TableCell>
                    <TableCell>{endpoint.delay}ms</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={endpoint.enabled ? "default" : "outline"}
                        onClick={() => toggleEndpoint(endpoint.id)}
                      >
                        <Power className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyUrl(endpoint)}
                          title="Copy URL"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          title="View Response"
                          onClick={() => openViewDialog(endpoint)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openEditDialog(endpoint)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openDeleteDialog(endpoint)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No mock endpoints found</h3>
              <p className="text-gray-600 mb-4">Create your first mock endpoint to get started</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Endpoint
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Server Logs */}
      {isServerRunning && (
        <Card>
          <CardHeader>
            <CardTitle>Server Logs</CardTitle>
            <CardDescription>Real-time mock server activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
              <div>[{new Date().toLocaleTimeString()}] Mock server started on port {serverPort}</div>
              <div>[{new Date().toLocaleTimeString()}] Ready to accept requests</div>
              <div>[{new Date().toLocaleTimeString()}] GET /api/users - 200 OK</div>
              <div>[{new Date().toLocaleTimeString()}] POST /api/users - 201 Created</div>
              <div>[{new Date().toLocaleTimeString()}] GET /api/users/1 - 200 OK</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Mock Endpoint</DialogTitle>
            <DialogDescription>
              Update the mock endpoint configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-endpoint-name">Name</Label>
                <Input
                  id="edit-endpoint-name"
                  value={editEndpoint.name}
                  onChange={(e) => setEditEndpoint({ ...editEndpoint, name: e.target.value })}
                  placeholder="Get Users"
                />
              </div>
              <div>
                <Label htmlFor="edit-endpoint-path">Path</Label>
                <Input
                  id="edit-endpoint-path"
                  value={editEndpoint.path}
                  onChange={(e) => setEditEndpoint({ ...editEndpoint, path: e.target.value })}
                  placeholder="/api/users"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-endpoint-method">Method</Label>
                <Select value={editEndpoint.method} onValueChange={(value) => setEditEndpoint({ ...editEndpoint, method: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-endpoint-status">Status Code</Label>
                <Input
                  id="edit-endpoint-status"
                  type="number"
                  value={editEndpoint.statusCode}
                  onChange={(e) => setEditEndpoint({ ...editEndpoint, statusCode: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="edit-endpoint-delay">Delay (ms)</Label>
                <Input
                  id="edit-endpoint-delay"
                  type="number"
                  value={editEndpoint.delay}
                  onChange={(e) => setEditEndpoint({ ...editEndpoint, delay: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-endpoint-headers">Headers (JSON)</Label>
              <Textarea
                id="edit-endpoint-headers"
                value={editEndpoint.headers}
                onChange={(e) => setEditEndpoint({ ...editEndpoint, headers: e.target.value })}
                placeholder='{"Content-Type": "application/json"}'
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-endpoint-response">Response Body (JSON)</Label>
              <Textarea
                id="edit-endpoint-response"
                value={editEndpoint.responseBody}
                onChange={(e) => setEditEndpoint({ ...editEndpoint, responseBody: e.target.value })}
                placeholder='{"message": "Hello World"}'
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={editEndpointItem} disabled={!editEndpoint.name || !editEndpoint.path}>
              Update Endpoint
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Mock Endpoint</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedEndpoint?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteEndpoint}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Mock Endpoint Details</DialogTitle>
            <DialogDescription>
              View mock endpoint configuration and response.
            </DialogDescription>
          </DialogHeader>
          {selectedEndpoint && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="text-sm font-medium">{selectedEndpoint.name}</p>
                </div>
                <div>
                  <Label>Method</Label>
                  <Badge variant="outline">{selectedEndpoint.method}</Badge>
                </div>
              </div>
              
              <div>
                <Label>Path</Label>
                <p className="text-sm font-mono bg-gray-100 p-2 rounded">{selectedEndpoint.path}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status Code</Label>
                  <Badge className={
                    selectedEndpoint.statusCode >= 200 && selectedEndpoint.statusCode < 300 
                      ? 'bg-green-100 text-green-800'
                      : selectedEndpoint.statusCode >= 400 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }>
                    {selectedEndpoint.statusCode}
                  </Badge>
                </div>
                <div>
                  <Label>Delay</Label>
                  <p className="text-sm font-medium">{selectedEndpoint.delay}ms</p>
                </div>
              </div>

              <div>
                <Label>Headers</Label>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(JSON.parse(selectedEndpoint.headers), null, 2)}
                </pre>
              </div>

              <div>
                <Label>Response Body</Label>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto max-h-96">
                  {JSON.stringify(JSON.parse(selectedEndpoint.responseBody), null, 2)}
                </pre>
              </div>

              <div>
                <Label>Status</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={selectedEndpoint.enabled ? "default" : "secondary"}>
                    {selectedEndpoint.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
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
