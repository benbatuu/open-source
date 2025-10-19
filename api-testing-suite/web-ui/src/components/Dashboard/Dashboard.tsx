import React from 'react';
import {
  Play,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Tests',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: Play,
    },
    {
      name: 'Passed',
      value: '142',
      change: '+8%',
      changeType: 'positive',
      icon: CheckCircle,
    },
    {
      name: 'Failed',
      value: '14',
      change: '-3%',
      changeType: 'negative',
      icon: XCircle,
    },
    {
      name: 'Success Rate',
      value: '91%',
      change: '+2%',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ];

  const recentTests = [
    {
      id: 1,
      name: 'User Authentication',
      status: 'passed',
      duration: '245ms',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      name: 'Create User',
      status: 'passed',
      duration: '189ms',
      timestamp: '5 minutes ago',
    },
    {
      id: 3,
      name: 'Update Profile',
      status: 'failed',
      duration: '1.2s',
      timestamp: '8 minutes ago',
    },
    {
      id: 4,
      name: 'Delete User',
      status: 'passed',
      duration: '156ms',
      timestamp: '12 minutes ago',
    },
  ];

  const performanceData = [
    { name: 'Mon', tests: 24, success: 22 },
    { name: 'Tue', tests: 31, success: 28 },
    { name: 'Wed', tests: 28, success: 26 },
    { name: 'Thu', tests: 35, success: 32 },
    { name: 'Fri', tests: 42, success: 38 },
    { name: 'Sat', tests: 18, success: 16 },
    { name: 'Sun', tests: 22, success: 20 },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Overview of your API testing activities</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="btn btn-primary">
              <Play className="w-4 h-4 mr-2" />
              Run Tests
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div
            key={stat.name}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex flex-col space-y-4">
              {/* Header with Icon and Trend */}
              <div className="flex items-center justify-between">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    stat.changeType === 'positive'
                      ? 'bg-gradient-to-br from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200'
                      : 'bg-gradient-to-br from-red-50 to-red-100 group-hover:from-red-100 group-hover:to-red-200'
                  }`}
                >
                  <stat.icon
                    className={`w-7 h-7 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  />
                </div>
                <div
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    stat.changeType === 'positive'
                      ? 'bg-green-100 text-green-700 group-hover:bg-green-200'
                      : 'bg-red-100 text-red-700 group-hover:bg-red-200'
                  } transition-colors duration-300`}
                >
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>

              {/* Value and Label */}
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                  {stat.name}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    stat.changeType === 'positive'
                      ? 'bg-gradient-to-r from-green-400 to-green-500'
                      : 'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                  style={{
                    width:
                      stat.name === 'Success Rate'
                        ? stat.value.replace('%', '') + '%'
                        : stat.name === 'Total Tests'
                          ? '100%'
                          : stat.name === 'Passed'
                            ? '91%'
                            : '9%',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Tests */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tests</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors">
              <span>View all</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {recentTests.map(test => (
              <div
                key={test.id}
                className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      test.status === 'passed' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {test.name}
                    </p>
                    <p className="text-sm text-gray-500">{test.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{test.duration}</p>
                  <p
                    className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                      test.status === 'passed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {test.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Test Performance</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-600 font-medium">Total Tests</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600 font-medium">Successful</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-3">
            {performanceData.map(day => (
              <div key={day.name} className="flex flex-col items-center space-y-3 flex-1 group">
                <div className="w-full flex flex-col space-y-1 relative">
                  <div
                    className="bg-blue-200 rounded-t-lg transition-all duration-300 group-hover:bg-blue-300"
                    style={{ height: `${(day.tests / 50) * 200}px` }}
                  />
                  <div
                    className="bg-green-200 rounded-b-lg transition-all duration-300 group-hover:bg-green-300"
                    style={{ height: `${(day.success / 50) * 200}px` }}
                  />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded">
                      {day.tests} tests
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-600 font-medium">{day.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-8">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* Run All Tests */}
          <button className="group relative overflow-hidden p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105">
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <Play className="w-6 h-6 text-blue-600" fill="currentColor" />
              <div>
                <p className="font-bold text-white text-base mb-1">Run All Tests</p>
                <p className="text-sm text-blue-100">Execute all test suites</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* View Reports */}
          <button className="group relative overflow-hidden p-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-105">
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
              <div>
                <p className="font-bold text-white text-base mb-1">View Reports</p>
                <p className="text-sm text-emerald-100">Check test results</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Performance Test */}
          <button className="group relative overflow-hidden p-6 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105">
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <Zap className="w-6 h-6 text-purple-600" fill="currentColor" />
              <div>
                <p className="font-bold text-white text-base mb-1">Performance Test</p>
                <p className="text-sm text-purple-100">Run load tests</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};
