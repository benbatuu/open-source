'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  Plus, 
  Edit, 
  Trash2, 
  Database,
  FileText,
  Download,
  Upload,
  Eye
} from 'lucide-react'

interface DataFixture {
  id: string
  name: string
  description: string | null
  data: string
  type: string
  createdAt: string
  updatedAt: string
}

export default function DataManagerPage() {
  const [fixtures, setFixtures] = useState<DataFixture[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedFixture, setSelectedFixture] = useState<DataFixture | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [newFixture, setNewFixture] = useState({
    name: '',
    description: '',
    data: '{}',
    type: 'json'
  })
  const [editFixture, setEditFixture] = useState({
    name: '',
    description: '',
    data: '{}',
    type: 'json'
  })

  useEffect(() => {
    fetchFixtures()
  }, [])

  const fetchFixtures = async () => {
    try {
      // Mock data for now - in a real app, you'd fetch from API
      const mockFixtures: DataFixture[] = [
        {
          id: '1',
          name: 'User Data',
          description: 'Sample user data for testing',
          data: JSON.stringify([
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
          ], null, 2),
          type: 'json',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Product Catalog',
          description: 'Sample product data',
          data: JSON.stringify([
            { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
            { id: 2, name: 'Phone', price: 699.99, category: 'Electronics' }
          ], null, 2),
          type: 'json',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      setFixtures(mockFixtures)
    } catch (error) {
      console.error('Error fetching fixtures:', error)
    } finally {
      setLoading(false)
    }
  }

  const createFixture = async () => {
    try {
      // In a real app, you'd make an API call here
      const newFixtureData: DataFixture = {
        id: Date.now().toString(),
        name: newFixture.name,
        description: newFixture.description,
        data: newFixture.data,
        type: newFixture.type,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      setFixtures(prev => [...prev, newFixtureData])
      setNewFixture({
        name: '',
        description: '',
        data: '{}',
        type: 'json'
      })
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Error creating fixture:', error)
    }
  }

  const editFixtureItem = async () => {
    if (!selectedFixture) return

    try {
      const updatedFixture: DataFixture = {
        ...selectedFixture,
        name: editFixture.name,
        description: editFixture.description,
        data: editFixture.data,
        type: editFixture.type,
        updatedAt: new Date().toISOString()
      }
      
      setFixtures(prev => prev.map(fixture => 
        fixture.id === selectedFixture.id ? updatedFixture : fixture
      ))
      
      setEditFixture({
        name: '',
        description: '',
        data: '{}',
        type: 'json'
      })
      setSelectedFixture(null)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error('Error updating fixture:', error)
    }
  }

  const deleteFixture = async () => {
    if (!selectedFixture) return

    try {
      setFixtures(prev => prev.filter(fixture => fixture.id !== selectedFixture.id))
      setSelectedFixture(null)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting fixture:', error)
    }
  }

  const openEditDialog = (fixture: DataFixture) => {
    setSelectedFixture(fixture)
    setEditFixture({
      name: fixture.name,
      description: fixture.description || '',
      data: fixture.data,
      type: fixture.type
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (fixture: DataFixture) => {
    setSelectedFixture(fixture)
    setIsDeleteDialogOpen(true)
  }

  const openViewDialog = (fixture: DataFixture) => {
    setSelectedFixture(fixture)
    setIsViewDialogOpen(true)
  }

  const filteredFixtures = fixtures.filter(fixture =>
    fixture.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fixture.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fixture.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading data fixtures...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Manager</h1>
          <p className="text-gray-600">Manage your test data fixtures and factories</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Fixture
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Data Fixture</DialogTitle>
                <DialogDescription>
                  Create a new data fixture for your tests.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fixture-name">Name</Label>
                    <Input
                      id="fixture-name"
                      value={newFixture.name}
                      onChange={(e) => setNewFixture({ ...newFixture, name: e.target.value })}
                      placeholder="User Data"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fixture-type">Type</Label>
                    <select
                      id="fixture-type"
                      value={newFixture.type}
                      onChange={(e) => setNewFixture({ ...newFixture, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="json">JSON</option>
                      <option value="csv">CSV</option>
                      <option value="xml">XML</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="fixture-description">Description</Label>
                  <Input
                    id="fixture-description"
                    value={newFixture.description}
                    onChange={(e) => setNewFixture({ ...newFixture, description: e.target.value })}
                    placeholder="Description of the data fixture"
                  />
                </div>
                <div>
                  <Label htmlFor="fixture-data">Data</Label>
                  <Textarea
                    id="fixture-data"
                    value={newFixture.data}
                    onChange={(e) => setNewFixture({ ...newFixture, data: e.target.value })}
                    placeholder='{"key": "value"}'
                    rows={8}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createFixture} disabled={!newFixture.name || !newFixture.data}>
                  Create Fixture
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search data fixtures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Database className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Fixtures Table */}
      <Card>
        <CardHeader>
          <CardTitle>Data Fixtures</CardTitle>
          <CardDescription>
            {filteredFixtures.length} fixture{filteredFixtures.length !== 1 ? 's' : ''} available
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFixtures.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFixtures.map((fixture) => (
                  <TableRow key={fixture.id}>
                    <TableCell className="font-medium">{fixture.name}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {fixture.type.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>{fixture.description || '-'}</TableCell>
                    <TableCell>{Math.round(fixture.data.length / 1024)} KB</TableCell>
                    <TableCell>
                      {new Date(fixture.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openViewDialog(fixture)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openEditDialog(fixture)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openDeleteDialog(fixture)}
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
              <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No data fixtures found</h3>
              <p className="text-gray-600 mb-4">Create your first data fixture to get started</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Fixture
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Factories */}
      <Card>
        <CardHeader>
          <CardTitle>Data Factories</CardTitle>
          <CardDescription>Generate dynamic test data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No data factories yet</h3>
            <p className="text-gray-600 mb-4">Create data factories to generate dynamic test data</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Factory
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Data Fixture</DialogTitle>
            <DialogDescription>
              Update the data fixture information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-fixture-name">Name</Label>
                <Input
                  id="edit-fixture-name"
                  value={editFixture.name}
                  onChange={(e) => setEditFixture({ ...editFixture, name: e.target.value })}
                  placeholder="User Data"
                />
              </div>
              <div>
                <Label htmlFor="edit-fixture-type">Type</Label>
                <select
                  id="edit-fixture-type"
                  value={editFixture.type}
                  onChange={(e) => setEditFixture({ ...editFixture, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="xml">XML</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-fixture-description">Description</Label>
              <Input
                id="edit-fixture-description"
                value={editFixture.description}
                onChange={(e) => setEditFixture({ ...editFixture, description: e.target.value })}
                placeholder="Description of the data fixture"
              />
            </div>
            <div>
              <Label htmlFor="edit-fixture-data">Data</Label>
              <Textarea
                id="edit-fixture-data"
                value={editFixture.data}
                onChange={(e) => setEditFixture({ ...editFixture, data: e.target.value })}
                placeholder='{"key": "value"}'
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={editFixtureItem} disabled={!editFixture.name || !editFixture.data}>
              Update Fixture
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Data Fixture</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedFixture?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteFixture}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Data Fixture Details</DialogTitle>
            <DialogDescription>
              View data fixture information and content.
            </DialogDescription>
          </DialogHeader>
          {selectedFixture && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="text-sm font-medium">{selectedFixture.name}</p>
                </div>
                <div>
                  <Label>Type</Label>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {selectedFixture.type.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <p className="text-sm">{selectedFixture.description || 'No description'}</p>
              </div>

              <div>
                <Label>Data Content</Label>
                <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto max-h-96">
                  {selectedFixture.data}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <Label>Created</Label>
                  <p>{new Date(selectedFixture.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <Label>Last Updated</Label>
                  <p>{new Date(selectedFixture.updatedAt).toLocaleString()}</p>
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
