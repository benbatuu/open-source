'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Zap, 
  Play, 
  Pause, 
  StopCircle, 
  BarChart2, 
  Clock, 
  TrendingUp,
  Activity,
  Users,
  Timer,
  Plus,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface PerformanceTest {
  id: string
  name: string
  url: string
  method: string
  concurrentUsers: number
  duration: number
  status: 'idle' | 'running' | 'completed' | 'failed'
  results?: {
    totalRequests: number
    successfulRequests: number
    failedRequests: number
    avgResponseTime: number
    minResponseTime: number
    maxResponseTime: number
    requestsPerSecond: number
  }
}

export default function PerformancePage() {
  const [tests, setTests] = useState<PerformanceTest[]>([])
  const [loading, setLoading] = useState(true)
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<PerformanceTest | null>(null)
  const [newTest, setNewTest] = useState({
    name: '',
    url: '',
    method: 'GET',
    concurrentUsers: 10,
    duration: 60
  })

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    try {
      // Mock data for now
      const mockTests: PerformanceTest[] = [
        {
          id: '1',
          name: 'API Load Test',
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'GET',
          concurrentUsers: 50,
          duration: 120,
          status: 'completed',
          results: {
            totalRequests: 6000,
            successfulRequests: 5950,
            failedRequests: 50,
            avgResponseTime: 245,
            minResponseTime: 120,
            maxResponseTime: 1200,
            requestsPerSecond: 50
          }
        },
        {
          id: '2',
          name: 'User Creation Stress Test',
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'POST',
          concurrentUsers: 25,
          duration: 60,
          status: 'completed',
          results: {
            totalRequests: 1500,
            successfulRequests: 1480,
            failedRequests: 20,
            avgResponseTime: 380,
            minResponseTime: 200,
            maxResponseTime: 800,
            requestsPerSecond: 25
          }
        }
      ]
      setTests(mockTests)
    } catch (error) {
      console.error('Error fetching performance tests:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTest = async () => {
    try {
      const newTestData: PerformanceTest = {
        id: Date.now().toString(),
        name: newTest.name,
        url: newTest.url,
        method: newTest.method,
        concurrentUsers: newTest.concurrentUsers,
        duration: newTest.duration,
        status: 'idle'
      }
      
      setTests(prev => [...prev, newTestData])
      setNewTest({
        name: '',
        url: '',
        method: 'GET',
        concurrentUsers: 10,
        duration: 60
      })
    } catch (error) {
      console.error('Error creating test:', error)
    }
  }

  const runTest = async (test: PerformanceTest) => {
    try {
      setIsTestRunning(true)
      setCurrentTest(test)
      
      // Update test status to running
      setTests(prev => prev.map(t => 
        t.id === test.id ? { ...t, status: 'running' } : t
      ))

      // Simulate test execution
      await new Promise(resolve => setTimeout(resolve, test.duration * 1000))

      // Generate mock results
      const results = {
        totalRequests: test.concurrentUsers * test.duration,
        successfulRequests: Math.floor(test.concurrentUsers * test.duration * 0.95),
        failedRequests: Math.floor(test.concurrentUsers * test.duration * 0.05),
        avgResponseTime: Math.floor(Math.random() * 500) + 100,
        minResponseTime: Math.floor(Math.random() * 100) + 50,
        maxResponseTime: Math.floor(Math.random() * 1000) + 500,
        requestsPerSecond: test.concurrentUsers
      }

      // Update test with results
      setTests(prev => prev.map(t => 
        t.id === test.id ? { ...t, status: 'completed', results } : t
      ))

      setIsTestRunning(false)
      setCurrentTest(null)
    } catch (error) {
      console.error('Error running test:', error)
      setTests(prev => prev.map(t => 
        t.id === test.id ? { ...t, status: 'failed' } : t
      ))
      setIsTestRunning(false)
      setCurrentTest(null)
    }
  }

  const stopTest = async (test: PerformanceTest) => {
    try {
      setTests(prev => prev.map(t => 
        t.id === test.id ? { ...t, status: 'idle' } : t
      ))
      setIsTestRunning(false)
      setCurrentTest(null)
    } catch (error) {
      console.error('Error stopping test:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading performance tests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Performance Testing</h1>
        <p className="text-gray-600">Simulate load and analyze API performance</p>
      </div>

      {/* Current Test Status */}
      {currentTest && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Activity className="h-8 w-8 text-blue-600 animate-pulse" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    Running: {currentTest.name}
                  </h3>
                  <p className="text-blue-700">
                    {currentTest.concurrentUsers} concurrent users for {currentTest.duration}s
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => stopTest(currentTest)}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <StopCircle className="mr-2 h-4 w-4" />
                Stop Test
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create New Test */}
      <Card>
        <CardHeader>
          <CardTitle>Create Performance Test</CardTitle>
          <CardDescription>Configure a new load test</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="test-name">Test Name</Label>
              <Input
                id="test-name"
                value={newTest.name}
                onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                placeholder="Load Test"
              />
            </div>
            <div>
              <Label htmlFor="test-url">URL</Label>
              <Input
                id="test-url"
                value={newTest.url}
                onChange={(e) => setNewTest({ ...newTest, url: e.target.value })}
                placeholder="https://api.example.com"
              />
            </div>
            <div>
              <Label htmlFor="test-method">Method</Label>
              <Select value={newTest.method} onValueChange={(value) => setNewTest({ ...newTest, method: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="concurrent-users">Concurrent Users</Label>
              <Input
                id="concurrent-users"
                type="number"
                value={newTest.concurrentUsers}
                onChange={(e) => setNewTest({ ...newTest, concurrentUsers: parseInt(e.target.value) })}
                min="1"
                max="1000"
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (s)</Label>
              <Input
                id="duration"
                type="number"
                value={newTest.duration}
                onChange={(e) => setNewTest({ ...newTest, duration: parseInt(e.target.value) })}
                min="10"
                max="3600"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button 
              onClick={createTest} 
              disabled={!newTest.name || !newTest.url || isTestRunning}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Test
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Tests</CardTitle>
          <CardDescription>Manage and execute load tests</CardDescription>
        </CardHeader>
        <CardContent>
          {tests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Results</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{test.url}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{test.method}</Badge>
                    </TableCell>
                    <TableCell>{test.concurrentUsers}</TableCell>
                    <TableCell>{test.duration}s</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(test.status)}
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {test.results ? (
                        <div className="text-sm">
                          <div>RPS: {test.results.requestsPerSecond}</div>
                          <div>Avg: {test.results.avgResponseTime}ms</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {test.status === 'running' ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => stopTest(test)}
                          >
                            <StopCircle className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => runTest(test)}
                            disabled={isTestRunning}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No performance tests found</h3>
              <p className="text-gray-600 mb-4">Create your first performance test to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results */}
      {tests.some(test => test.results) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tests.filter(test => test.results).map((test) => (
            <Card key={test.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart2 className="h-5 w-5" />
                  <span>{test.name} Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {test.results?.totalRequests}
                    </div>
                    <div className="text-sm text-gray-600">Total Requests</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {test.results?.successfulRequests}
                    </div>
                    <div className="text-sm text-gray-600">Successful</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {test.results?.failedRequests}
                    </div>
                    <div className="text-sm text-gray-600">Failed</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {test.results?.avgResponseTime}ms
                    </div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Min Response Time:</span> {test.results?.minResponseTime}ms
                  </div>
                  <div>
                    <span className="font-medium">Max Response Time:</span> {test.results?.maxResponseTime}ms
                  </div>
                  <div>
                    <span className="font-medium">Requests/Second:</span> {test.results?.requestsPerSecond}
                  </div>
                  <div>
                    <span className="font-medium">Success Rate:</span> {Math.round((test.results?.successfulRequests! / test.results?.totalRequests!) * 100)}%
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
