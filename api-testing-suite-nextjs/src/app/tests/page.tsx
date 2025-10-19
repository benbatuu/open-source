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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Plus, 
  Play, 
  Edit, 
  Trash2, 
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye
} from 'lucide-react'

interface Test {
  id: string
  name: string
  method: string
  url: string
  headers: string | null
  body: string | null
  expectedStatus: number
  timeout: number
  testSuiteId: string
  assertions: Array<{
    id: string
    type: string
    expected: string
    jsonPath?: string
    headerName?: string
  }>
}

interface TestResult {
  testId: string
  status: 'passed' | 'failed' | 'skipped'
  duration: number
  response?: {
    status: number
    headers: Record<string, string>
    body: any
  }
  error?: string
  assertions: Array<{
    assertionId: string
    passed: boolean
    actual?: any
    message?: string
  }>
}

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedTest, setSelectedTest] = useState<Test | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [newTest, setNewTest] = useState({
    name: '',
    method: 'GET',
    url: '',
    headers: '{}',
    body: '',
    expectedStatus: 200,
    timeout: 30000,
    testSuiteId: '',
    assertions: []
  })
  const [editTest, setEditTest] = useState({
    name: '',
    method: 'GET',
    url: '',
    headers: '{}',
    body: '',
    expectedStatus: 200,
    timeout: 30000,
    testSuiteId: '',
    assertions: []
  })

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    try {
      // For now, we'll fetch from a specific test suite
      // In a real app, you'd have a way to select which suite to view
      const response = await fetch('/api/test-suites')
      const suites = await response.json()
      
      if (suites.length > 0) {
        const suiteId = suites[0].id
        const testsResponse = await fetch(`/api/test-suites/${suiteId}/tests`)
        const testsData = await testsResponse.json()
        setTests(testsData)
        setNewTest(prev => ({ ...prev, testSuiteId: suiteId }))
      }
    } catch (error) {
      console.error('Error fetching tests:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTest = async () => {
    try {
      const response = await fetch(`/api/test-suites/${newTest.testSuiteId}/tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTest),
      })

      if (response.ok) {
        setNewTest({
          name: '',
          method: 'GET',
          url: '',
          headers: '{}',
          body: '',
          expectedStatus: 200,
          timeout: 30000,
          testSuiteId: newTest.testSuiteId,
          assertions: []
        })
        setIsCreateDialogOpen(false)
        fetchTests()
      }
    } catch (error) {
      console.error('Error creating test:', error)
    }
  }

  const runTest = async (test: Test) => {
    try {
      setIsRunning(true)
      console.log(`Running test: ${test.name} (${test.method} ${test.url})`)
      
      const response = await fetch(`/api/test-suites/${test.testSuiteId}/tests/${test.id}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Test result:', result)
        setTestResults(prev => [...prev.filter(r => r.testId !== test.id), result])
      } else {
        console.error('Test execution failed:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error running test:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const runAllTests = async () => {
    try {
      setIsRunning(true)
      setTestResults([])
      
      for (const test of tests) {
        await runTest(test)
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    } catch (error) {
      console.error('Error running all tests:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const getTestResult = (testId: string) => {
    return testResults.find(r => r.testId === testId)
  }

  const editTestItem = async () => {
    if (!selectedTest) return

    try {
      const response = await fetch(`/api/test-suites/${selectedTest.testSuiteId}/tests/${selectedTest.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editTest),
      })

      if (response.ok) {
        setEditTest({
          name: '',
          method: 'GET',
          url: '',
          headers: '{}',
          body: '',
          expectedStatus: 200,
          timeout: 30000,
          testSuiteId: '',
          assertions: []
        })
        setSelectedTest(null)
        setIsEditDialogOpen(false)
        fetchTests()
      }
    } catch (error) {
      console.error('Error updating test:', error)
    }
  }

  const deleteTestItem = async () => {
    if (!selectedTest) return

    try {
      const response = await fetch(`/api/test-suites/${selectedTest.testSuiteId}/tests/${selectedTest.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSelectedTest(null)
        setIsDeleteDialogOpen(false)
        fetchTests()
      }
    } catch (error) {
      console.error('Error deleting test:', error)
    }
  }

  const openEditDialog = (test: Test) => {
    setSelectedTest(test)
    setEditTest({
      name: test.name,
      method: test.method,
      url: test.url,
      headers: test.headers || '{}',
      body: test.body || '',
      expectedStatus: test.expectedStatus,
      timeout: test.timeout,
      testSuiteId: test.testSuiteId,
      assertions: test.assertions
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (test: Test) => {
    setSelectedTest(test)
    setIsDeleteDialogOpen(true)
  }

  const openViewDialog = (test: Test) => {
    setSelectedTest(test)
    setIsViewDialogOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'running':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading tests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Tests</h1>
          <p className="text-gray-600">Create and execute API tests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={runAllTests} 
            disabled={isRunning || tests.length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="mr-2 h-4 w-4" />
            {isRunning ? 'Running...' : 'Run All Tests'}
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Test
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New API Test</DialogTitle>
                <DialogDescription>
                  Create a new API test with assertions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Test Name</Label>
                    <Input
                      id="name"
                      value={newTest.name}
                      onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                      placeholder="Enter test name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="method">HTTP Method</Label>
                    <Select value={newTest.method} onValueChange={(value) => setNewTest({ ...newTest, method: value })}>
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
                </div>
                
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={newTest.url}
                    onChange={(e) => setNewTest({ ...newTest, url: e.target.value })}
                    placeholder="https://api.example.com/users"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expectedStatus">Expected Status</Label>
                    <Input
                      id="expectedStatus"
                      type="number"
                      value={newTest.expectedStatus}
                      onChange={(e) => setNewTest({ ...newTest, expectedStatus: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeout">Timeout (ms)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={newTest.timeout}
                      onChange={(e) => setNewTest({ ...newTest, timeout: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="headers">Headers (JSON)</Label>
                  <Textarea
                    id="headers"
                    value={newTest.headers}
                    onChange={(e) => setNewTest({ ...newTest, headers: e.target.value })}
                    placeholder='{"Content-Type": "application/json"}'
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="body">Request Body (JSON)</Label>
                  <Textarea
                    id="body"
                    value={newTest.body}
                    onChange={(e) => setNewTest({ ...newTest, body: e.target.value })}
                    placeholder='{"name": "John Doe", "email": "john@example.com"}'
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createTest} disabled={!newTest.name || !newTest.url}>
                  Create Test
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle>API Tests</CardTitle>
          <CardDescription>
            {tests.length} test{tests.length !== 1 ? 's' : ''} available
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tests.map((test) => {
                  const result = getTestResult(test.id)
                  return (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{test.method}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{test.url}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(result?.status || 'pending')}
                          <Badge className={getStatusColor(result?.status || 'pending')}>
                            {result?.status || 'pending'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {result?.duration ? `${result.duration}ms` : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => runTest(test)}
                            disabled={isRunning}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openViewDialog(test)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openEditDialog(test)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openDeleteDialog(test)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tests found</h3>
              <p className="text-gray-600 mb-4">Create your first API test to get started</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Test
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              Latest test execution results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result) => {
                const test = tests.find(t => t.id === result.testId)
                return (
                  <div key={result.testId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(result.status)}
                        <span className="font-medium">{test?.name}</span>
                        <Badge className={getStatusColor(result.status)}>
                          {result.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-600">{result.duration}ms</span>
                    </div>
                    
                    {result.error && (
                      <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                        <p className="text-sm text-red-800">{result.error}</p>
                      </div>
                    )}
                    
                    {result.response && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4 text-sm">
                          <span>Status: <Badge variant="outline">{result.response.status}</Badge></span>
                          <span>Headers: {Object.keys(result.response.headers).length}</span>
                        </div>
                        {result.response.body && (
                          <details className="text-sm">
                            <summary className="cursor-pointer text-gray-600">Response Body</summary>
                            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                              {JSON.stringify(result.response.body, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Test</DialogTitle>
            <DialogDescription>
              Update the test configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Test Name</Label>
              <Input
                id="edit-name"
                value={editTest.name}
                onChange={(e) => setEditTest({ ...editTest, name: e.target.value })}
                placeholder="Enter test name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-method">Method</Label>
                <Select value={editTest.method} onValueChange={(value) => setEditTest({ ...editTest, method: value })}>
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
                <Label htmlFor="edit-url">URL</Label>
                <Input
                  id="edit-url"
                  value={editTest.url}
                  onChange={(e) => setEditTest({ ...editTest, url: e.target.value })}
                  placeholder="https://api.example.com/users"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-expectedStatus">Expected Status</Label>
                <Input
                  id="edit-expectedStatus"
                  type="number"
                  value={editTest.expectedStatus}
                  onChange={(e) => setEditTest({ ...editTest, expectedStatus: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="edit-timeout">Timeout (ms)</Label>
                <Input
                  id="edit-timeout"
                  type="number"
                  value={editTest.timeout}
                  onChange={(e) => setEditTest({ ...editTest, timeout: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-headers">Headers (JSON)</Label>
              <Textarea
                id="edit-headers"
                value={editTest.headers}
                onChange={(e) => setEditTest({ ...editTest, headers: e.target.value })}
                placeholder='{"Content-Type": "application/json"}'
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-body">Request Body (JSON)</Label>
              <Textarea
                id="edit-body"
                value={editTest.body}
                onChange={(e) => setEditTest({ ...editTest, body: e.target.value })}
                placeholder='{"name": "John Doe", "email": "john@example.com"}'
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={editTestItem} disabled={!editTest.name || !editTest.url}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Test</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedTest?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteTestItem}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Test Details</DialogTitle>
            <DialogDescription>
              View test configuration and details.
            </DialogDescription>
          </DialogHeader>
          {selectedTest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="text-sm font-medium">{selectedTest.name}</p>
                </div>
                <div>
                  <Label>Method</Label>
                  <Badge variant="outline">{selectedTest.method}</Badge>
                </div>
              </div>
              
              <div>
                <Label>URL</Label>
                <p className="text-sm font-mono bg-gray-100 p-2 rounded">{selectedTest.url}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expected Status</Label>
                  <p className="text-sm font-medium">{selectedTest.expectedStatus}</p>
                </div>
                <div>
                  <Label>Timeout</Label>
                  <p className="text-sm font-medium">{selectedTest.timeout}ms</p>
                </div>
              </div>

              {selectedTest.headers && (
                <div>
                  <Label>Headers</Label>
                  <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(JSON.parse(selectedTest.headers), null, 2)}
                  </pre>
                </div>
              )}

              {selectedTest.body && (
                <div>
                  <Label>Request Body</Label>
                  <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(JSON.parse(selectedTest.body), null, 2)}
                  </pre>
                </div>
              )}

              {selectedTest.assertions.length > 0 && (
                <div>
                  <Label>Assertions</Label>
                  <div className="space-y-2">
                    {selectedTest.assertions.map((assertion, index) => (
                      <div key={index} className="text-sm bg-gray-100 p-2 rounded">
                        <strong>{assertion.type}</strong>: {assertion.expected}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
