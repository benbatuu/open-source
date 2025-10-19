'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  Play, 
  Edit, 
  Trash2, 
  FileText,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface TestSuite {
  id: string
  name: string
  description: string | null
  status: string
  createdAt: string
  updatedAt: string
  tests: Array<{
    id: string
    name: string
    method: string
    url: string
    status?: string
  }>
  testRuns: Array<{
    id: string
    status: string
    startTime: string
    summary: string | null
  }>
  _count: {
    tests: number
    testRuns: number
  }
}

export default function TestSuitesPage() {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSuite, setSelectedSuite] = useState<TestSuite | null>(null)
  const [newSuite, setNewSuite] = useState({ name: '', description: '' })
  const [editSuite, setEditSuite] = useState({ name: '', description: '' })

  useEffect(() => {
    fetchTestSuites()
  }, [])

  const fetchTestSuites = async () => {
    try {
      const response = await fetch('/api/test-suites')
      const data = await response.json()
      setTestSuites(data)
    } catch (error) {
      console.error('Error fetching test suites:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTestSuite = async () => {
    try {
      const response = await fetch('/api/test-suites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSuite),
      })

      if (response.ok) {
        setNewSuite({ name: '', description: '' })
        setIsCreateDialogOpen(false)
        fetchTestSuites()
      }
    } catch (error) {
      console.error('Error creating test suite:', error)
    }
  }

  const runTestSuite = async (suiteId: string) => {
    try {
      const response = await fetch(`/api/test-suites/${suiteId}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      if (response.ok) {
        // Refresh the data to show updated status
        fetchTestSuites()
      }
    } catch (error) {
      console.error('Error running test suite:', error)
    }
  }

  const editTestSuite = async () => {
    if (!selectedSuite) return

    try {
      const response = await fetch(`/api/test-suites/${selectedSuite.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editSuite),
      })

      if (response.ok) {
        setEditSuite({ name: '', description: '' })
        setSelectedSuite(null)
        setIsEditDialogOpen(false)
        fetchTestSuites()
      }
    } catch (error) {
      console.error('Error updating test suite:', error)
    }
  }

  const deleteTestSuite = async () => {
    if (!selectedSuite) return

    try {
      const response = await fetch(`/api/test-suites/${selectedSuite.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSelectedSuite(null)
        setIsDeleteDialogOpen(false)
        fetchTestSuites()
      }
    } catch (error) {
      console.error('Error deleting test suite:', error)
    }
  }

  const openEditDialog = (suite: TestSuite) => {
    setSelectedSuite(suite)
    setEditSuite({ name: suite.name, description: suite.description || '' })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (suite: TestSuite) => {
    setSelectedSuite(suite)
    setIsDeleteDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading test suites...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Suites</h1>
          <p className="text-gray-600">Manage your API test suites</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Test Suite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Test Suite</DialogTitle>
              <DialogDescription>
                Create a new test suite to organize your API tests.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newSuite.name}
                  onChange={(e) => setNewSuite({ ...newSuite, name: e.target.value })}
                  placeholder="Enter test suite name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSuite.description}
                  onChange={(e) => setNewSuite({ ...newSuite, description: e.target.value })}
                  placeholder="Enter test suite description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createTestSuite} disabled={!newSuite.name}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Test Suite</DialogTitle>
              <DialogDescription>
                Update the test suite information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editSuite.name}
                  onChange={(e) => setEditSuite({ ...editSuite, name: e.target.value })}
                  placeholder="Enter test suite name"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editSuite.description}
                  onChange={(e) => setEditSuite({ ...editSuite, description: e.target.value })}
                  placeholder="Enter test suite description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={editTestSuite} disabled={!editSuite.name}>
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Test Suite</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedSuite?.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={deleteTestSuite}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Test Suites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testSuites.map((suite) => {
          const lastRun = suite.testRuns[0]
          const summary = lastRun?.summary ? JSON.parse(lastRun.summary) : null
          
          return (
            <Card key={suite.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{suite.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {suite.description || 'No description'}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={suite.status === 'active' ? 'default' : 'secondary'}>
                    {suite.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Tests</p>
                      <p className="font-semibold">{suite._count.tests}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Runs</p>
                      <p className="font-semibold">{suite._count.testRuns}</p>
                    </div>
                  </div>

                  {summary && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Run</span>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{summary.passed}/{summary.total}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(summary.passed / summary.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => runTestSuite(suite.id)}
                      className="flex-1"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Run
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openEditDialog(suite)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openDeleteDialog(suite)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {testSuites.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No test suites found</h3>
            <p className="text-gray-600 mb-4">Create your first test suite to get started</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Test Suite
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
