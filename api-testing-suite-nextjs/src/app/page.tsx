'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  BarChart3, 
  TrendingUp,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface DashboardMetrics {
  totalTestSuites: number
  totalTests: number
  totalTestRuns: number
  successRate: number
  avgResponseTime: number
  performanceData: Array<{
    name: string
    tests: number
    success: number
  }>
  recentTests: Array<{
    id: string
    name: string
    suite: string
    status: 'passed' | 'failed' | 'skipped'
    duration: number
    timestamp: string
  }>
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/dashboard/metrics')
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error('Error fetching metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
  return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Failed to load dashboard metrics</p>
          <Button onClick={fetchMetrics} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  const stats = [
    {
      name: 'Total Test Suites',
      value: metrics.totalTestSuites.toString(),
      change: '+12%',
      changeType: 'positive' as const,
      icon: BarChart3,
    },
    {
      name: 'Total Tests',
      value: metrics.totalTests.toString(),
      change: '+8%',
      changeType: 'positive' as const,
      icon: Play,
    },
    {
      name: 'Success Rate',
      value: `${metrics.successRate}%`,
      change: '+2%',
      changeType: 'positive' as const,
      icon: CheckCircle,
    },
    {
      name: 'Avg Response Time',
      value: `${metrics.avgResponseTime}ms`,
      change: '-5%',
      changeType: 'positive' as const,
      icon: Clock,
    },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your API testing activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    stat.changeType === 'positive' 
                      ? 'bg-green-100 group-hover:bg-green-200' 
                      : 'bg-red-100 group-hover:bg-red-200'
                  }`}>
                    <stat.icon className={`w-6 h-6 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.changeType === 'positive' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Test Performance</CardTitle>
            <CardDescription>Test execution over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {metrics.performanceData.map((day, index) => (
                <div key={day.name} className="flex flex-col items-center space-y-2 flex-1 group">
                  <div className="w-full flex flex-col space-y-1">
                    <div 
                      className="bg-blue-200 rounded-t-lg transition-all duration-300 group-hover:bg-blue-300"
                      style={{ height: `${(day.tests / 50) * 200}px` }}
                    />
                    <div 
                      className="bg-green-200 rounded-b-lg transition-all duration-300 group-hover:bg-green-300"
                      style={{ height: `${(day.success / 50) * 200}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{day.name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">Total Tests</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">Successful</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
            <CardDescription>Latest test execution results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      test.status === 'passed' ? 'bg-green-500' : 
                      test.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{test.name}</p>
                      <p className="text-sm text-gray-600">{test.suite}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{test.duration}ms</p>
                    <Badge 
                      variant={test.status === 'passed' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {test.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common testing operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              <Play className="h-6 w-6" />
              <span>Run All Tests</span>
            </Button>

            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>View Reports</span>
            </Button>

            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Zap className="h-6 w-6" />
              <span>Performance Test</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}