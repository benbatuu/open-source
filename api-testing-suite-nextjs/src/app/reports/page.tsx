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
  BarChart2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Download,
  Filter,
  Calendar
} from 'lucide-react'

interface TestRun {
  id: string
  status: string
  startTime: string
  endTime: string | null
  summary: string | null
  testSuite: {
    name: string
  }
}

interface TestResult {
  id: string
  status: string
  duration: number
  test: {
    name: string
  }
  testRun: {
    testSuite: {
      name: string
    }
  }
  createdAt: string
}

export default function ReportsPage() {
  const [testRuns, setTestRuns] = useState<TestRun[]>([])
  const [recentResults, setRecentResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      // Mock data for now - in a real app, you'd fetch from API
      const mockTestRuns: TestRun[] = [
        {
          id: '1',
          status: 'completed',
          startTime: new Date(Date.now() - 3600000).toISOString(),
          endTime: new Date(Date.now() - 3500000).toISOString(),
          summary: JSON.stringify({ total: 5, passed: 4, failed: 1, skipped: 0 }),
          testSuite: { name: 'JSONPlaceholder API Tests' }
        },
        {
          id: '2',
          status: 'failed',
          startTime: new Date(Date.now() - 7200000).toISOString(),
          endTime: new Date(Date.now() - 7100000).toISOString(),
          summary: JSON.stringify({ total: 3, passed: 1, failed: 2, skipped: 0 }),
          testSuite: { name: 'HTTPBin API Tests' }
        }
      ]

      const mockResults: TestResult[] = [
        {
          id: '1',
          status: 'passed',
          duration: 245,
          test: { name: 'Get Users' },
          testRun: { testSuite: { name: 'JSONPlaceholder API Tests' } },
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '2',
          status: 'failed',
          duration: 1200,
          test: { name: 'Create Post' },
          testRun: { testSuite: { name: 'JSONPlaceholder API Tests' } },
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '3',
          status: 'passed',
          duration: 180,
          test: 'HTTP GET Test',
          testRun: { testSuite: { name: 'HTTPBin API Tests' } },
          createdAt: new Date(Date.now() - 7200000).toISOString()
        }
      ]

      setTestRuns(mockTestRuns)
      setRecentResults(mockResults)
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
      case 'completed':
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
          <p className="mt-2 text-gray-600">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Reports</h1>
          <p className="text-gray-600">Detailed insights into your API test executions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BarChart2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Test Runs</p>
                <p className="text-2xl font-bold text-gray-900">{testRuns.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {testRuns.length > 0 
                    ? Math.round((testRuns.filter(run => run.status === 'completed').length / testRuns.length) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Runs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {testRuns.filter(run => run.status === 'failed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Duration</p>
                <p className="text-2xl font-bold text-gray-900">
                  {testRuns.length > 0 
                    ? Math.round(testRuns.reduce((acc, run) => {
                        const start = new Date(run.startTime).getTime()
                        const end = run.endTime ? new Date(run.endTime).getTime() : Date.now()
                        return acc + (end - start)
                      }, 0) / testRuns.length / 1000)
                    : 0}s
                  </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Test Runs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Runs</CardTitle>
            <CardDescription>Latest test suite executions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testRuns.map((run) => {
                const summary = run.summary ? JSON.parse(run.summary) : { total: 0, passed: 0, failed: 0 }
                const duration = run.endTime 
                  ? Math.round((new Date(run.endTime).getTime() - new Date(run.startTime).getTime()) / 1000)
                  : 0

                return (
                  <div key={run.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(run.status)}
                      <div>
                        <p className="font-medium text-gray-900">{run.testSuite.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(run.startTime).toLocaleDateString()} at {new Date(run.startTime).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{duration}s</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(run.status)}>
                          {run.status}
                        </Badge>
                        <span className="text-xs text-gray-600">
                          {summary.passed}/{summary.total}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
            <CardDescription>Individual test execution results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <p className="font-medium text-gray-900">{result.test.name}</p>
                      <p className="text-sm text-gray-600">{result.testRun.testSuite.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{result.duration}ms</p>
                    <Badge className={getStatusColor(result.status)}>
                      {result.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Test Results</CardTitle>
          <CardDescription>Complete test execution history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Suite</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Executed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.test.name}</TableCell>
                  <TableCell>{result.testRun.testSuite.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(result.status)}
                      <Badge className={getStatusColor(result.status)}>
                        {result.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{result.duration}ms</TableCell>
                  <TableCell>
                    {new Date(result.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
