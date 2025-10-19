import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Download, 
  Filter,
  Calendar,
  RefreshCw,
  Eye,
  FileText
} from 'lucide-react';

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedSuite, setSelectedSuite] = useState('all');

  const testResults = [
    {
      id: 1,
      name: 'User Authentication API',
      suite: 'Authentication',
      status: 'passed',
      duration: '245ms',
      timestamp: '2024-01-15 10:30:00',
      responseTime: 245,
      statusCode: 200,
      assertions: 5,
      passedAssertions: 5
    },
    {
      id: 2,
      name: 'Create User Endpoint',
      suite: 'User Management',
      status: 'passed',
      duration: '189ms',
      timestamp: '2024-01-15 10:29:45',
      responseTime: 189,
      statusCode: 201,
      assertions: 3,
      passedAssertions: 3
    },
    {
      id: 3,
      name: 'Update Profile API',
      suite: 'User Management',
      status: 'failed',
      duration: '1.2s',
      timestamp: '2024-01-15 10:29:30',
      responseTime: 1200,
      statusCode: 500,
      assertions: 4,
      passedAssertions: 2
    },
    {
      id: 4,
      name: 'Delete User Endpoint',
      suite: 'User Management',
      status: 'passed',
      duration: '156ms',
      timestamp: '2024-01-15 10:29:15',
      responseTime: 156,
      statusCode: 204,
      assertions: 2,
      passedAssertions: 2
    },
    {
      id: 5,
      name: 'Get User List',
      suite: 'User Management',
      status: 'passed',
      duration: '98ms',
      timestamp: '2024-01-15 10:29:00',
      responseTime: 98,
      statusCode: 200,
      assertions: 6,
      passedAssertions: 6
    }
  ];

  const performanceMetrics = [
    { name: 'Mon', tests: 24, success: 22, avgResponse: 180 },
    { name: 'Tue', tests: 31, success: 28, avgResponse: 195 },
    { name: 'Wed', tests: 28, success: 26, avgResponse: 165 },
    { name: 'Thu', tests: 35, success: 32, avgResponse: 220 },
    { name: 'Fri', tests: 42, success: 38, avgResponse: 190 },
    { name: 'Sat', tests: 18, success: 16, avgResponse: 175 },
    { name: 'Sun', tests: 22, success: 20, avgResponse: 185 }
  ];

  const suiteStats = [
    { name: 'Authentication', total: 15, passed: 14, failed: 1, successRate: 93.3 },
    { name: 'User Management', total: 28, passed: 25, failed: 3, successRate: 89.3 },
    { name: 'Payment API', total: 12, passed: 11, failed: 1, successRate: 91.7 },
    { name: 'Notification Service', total: 8, passed: 7, failed: 1, successRate: 87.5 }
  ];

  const totalTests = testResults.length;
  const passedTests = testResults.filter(t => t.status === 'passed').length;
  const failedTests = testResults.filter(t => t.status === 'failed').length;
  const successRate = ((passedTests / totalTests) * 100).toFixed(1);
  const avgResponseTime = Math.round(testResults.reduce((acc, t) => acc + t.responseTime, 0) / totalTests);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Reports</h1>
            <p className="text-gray-600">Comprehensive analysis of your API test results</p>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Tests</p>
              <p className="text-3xl font-bold text-gray-900">{totalTests}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-green-600">{successRate}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Failed Tests</p>
              <p className="text-3xl font-bold text-red-600">{failedTests}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg Response Time</p>
              <p className="text-3xl font-bold text-gray-900">{avgResponseTime}ms</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Trend Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trend</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">Tests</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">Success</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {performanceMetrics.map((day) => (
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
                <span className="text-xs text-gray-500">{day.avgResponse}ms</span>
              </div>
            ))}
          </div>
        </div>

        {/* Test Suite Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Suite Performance</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Details
            </button>
          </div>
          <div className="space-y-4">
            {suiteStats.map((suite) => (
              <div key={suite.name} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{suite.name}</p>
                    <p className="text-sm text-gray-600">{suite.total} tests</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{suite.successRate}%</p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${suite.successRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Test Results */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Test Results</h3>
          <div className="flex items-center space-x-3">
            <select 
              value={selectedSuite}
              onChange={(e) => setSelectedSuite(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Suites</option>
              <option value="Authentication">Authentication</option>
              <option value="User Management">User Management</option>
              <option value="Payment API">Payment API</option>
            </select>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Test Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Suite</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Response Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Assertions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Timestamp</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((test) => (
                <tr key={test.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{test.name}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {test.suite}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      test.status === 'passed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{test.duration}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{test.responseTime}ms</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">
                      {test.passedAssertions}/{test.assertions}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{test.timestamp}</p>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
