import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Play, 
  Pause, 
  Square, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Settings,
  Target,
  Gauge
} from 'lucide-react';

export const Performance: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeUsers: 0,
    requestsPerSecond: 0,
    averageResponseTime: 0,
    errorRate: 0,
    throughput: 0
  });

  const [testConfig, setTestConfig] = useState({
    targetUrl: 'https://api.example.com',
    concurrentUsers: 100,
    duration: 300, // seconds
    rampUpTime: 60, // seconds
    testType: 'load'
  });

  const performanceTests = [
    {
      id: 1,
      name: 'Load Test - User API',
      type: 'load',
      status: 'completed',
      duration: '5m 30s',
      users: 100,
      requests: 15000,
      avgResponseTime: 245,
      errorRate: 0.2,
      throughput: 45.5,
      timestamp: '2024-01-15 14:30:00'
    },
    {
      id: 2,
      name: 'Stress Test - Payment API',
      type: 'stress',
      status: 'failed',
      duration: '3m 15s',
      users: 500,
      requests: 25000,
      avgResponseTime: 1200,
      errorRate: 15.8,
      throughput: 125.3,
      timestamp: '2024-01-15 13:45:00'
    },
    {
      id: 3,
      name: 'Spike Test - Auth Service',
      type: 'spike',
      status: 'completed',
      duration: '2m 45s',
      users: 200,
      requests: 8000,
      avgResponseTime: 180,
      errorRate: 0.1,
      throughput: 48.2,
      timestamp: '2024-01-15 12:20:00'
    }
  ];

  const realTimeData = [
    { time: '00:00', users: 0, rps: 0, responseTime: 0 },
    { time: '00:30', users: 25, rps: 12, responseTime: 180 },
    { time: '01:00', users: 50, rps: 25, responseTime: 195 },
    { time: '01:30', users: 75, rps: 38, responseTime: 220 },
    { time: '02:00', users: 100, rps: 50, responseTime: 245 },
    { time: '02:30', users: 100, rps: 48, responseTime: 250 },
    { time: '03:00', users: 100, rps: 52, responseTime: 240 },
    { time: '03:30', users: 75, rps: 35, responseTime: 210 },
    { time: '04:00', users: 50, rps: 22, responseTime: 190 },
    { time: '04:30', users: 25, rps: 10, responseTime: 175 },
    { time: '05:00', users: 0, rps: 0, responseTime: 0 }
  ];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setRealTimeMetrics(prev => ({
          activeUsers: Math.floor(Math.random() * 100) + 50,
          requestsPerSecond: Math.floor(Math.random() * 50) + 25,
          averageResponseTime: Math.floor(Math.random() * 200) + 150,
          errorRate: Math.random() * 2,
          throughput: Math.floor(Math.random() * 30) + 20
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTest = () => {
    setIsRunning(true);
    setCurrentTest({
      id: Date.now(),
      name: `${testConfig.testType} Test`,
      startTime: new Date().toISOString()
    });
  };

  const stopTest = () => {
    setIsRunning(false);
    setCurrentTest(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTestTypeColor = (type) => {
    switch (type) {
      case 'load': return 'text-blue-600 bg-blue-100';
      case 'stress': return 'text-red-600 bg-red-100';
      case 'spike': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Testing</h1>
            <p className="text-gray-600">Load testing and performance monitoring</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Test Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target URL
            </label>
            <input
              type="url"
              value={testConfig.targetUrl}
              onChange={(e) => setTestConfig({...testConfig, targetUrl: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Concurrent Users
            </label>
            <input
              type="number"
              value={testConfig.concurrentUsers}
              onChange={(e) => setTestConfig({...testConfig, concurrentUsers: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (seconds)
            </label>
            <input
              type="number"
              value={testConfig.duration}
              onChange={(e) => setTestConfig({...testConfig, duration: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Type
            </label>
            <select
              value={testConfig.testType}
              onChange={(e) => setTestConfig({...testConfig, testType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
            >
              <option value="load">Load Test</option>
              <option value="stress">Stress Test</option>
              <option value="spike">Spike Test</option>
              <option value="volume">Volume Test</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-center mt-6 space-x-4">
          {!isRunning ? (
            <button
              onClick={startTest}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-200"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Test
            </button>
          ) : (
            <button
              onClick={stopTest}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-200"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop Test
            </button>
          )}
        </div>
      </div>

      {/* Real-time Metrics */}
      {isRunning && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{realTimeMetrics.activeUsers}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Requests/sec</p>
                <p className="text-2xl font-bold text-gray-900">{realTimeMetrics.requestsPerSecond}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg Response</p>
                <p className="text-2xl font-bold text-gray-900">{realTimeMetrics.averageResponseTime}ms</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Error Rate</p>
                <p className="text-2xl font-bold text-red-600">{realTimeMetrics.errorRate.toFixed(1)}%</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Throughput</p>
                <p className="text-2xl font-bold text-gray-900">{realTimeMetrics.throughput} MB/s</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Gauge className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Real-time Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Real-time Performance</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">Users</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">RPS</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {realTimeData.map((point, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1 group">
                <div className="w-full flex flex-col space-y-1">
                  <div 
                    className="bg-blue-200 rounded-t-lg transition-all duration-300 group-hover:bg-blue-300"
                    style={{ height: `${(point.users / 100) * 200}px` }}
                  />
                  <div 
                    className="bg-green-200 rounded-b-lg transition-all duration-300 group-hover:bg-green-300"
                    style={{ height: `${(point.rps / 50) * 200}px` }}
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium">{point.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Test History */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Test History</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {performanceTests.map((test) => (
              <div key={test.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      test.status === 'completed' ? 'bg-green-100' : 
                      test.status === 'failed' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {test.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : test.status === 'failed' ? (
                        <XCircle className="w-4 h-4 text-red-600" />
                      ) : (
                        <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{test.name}</p>
                      <p className="text-sm text-gray-600">{test.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{test.duration}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Users</p>
                    <p className="font-semibold text-gray-900">{test.users}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Requests</p>
                    <p className="font-semibold text-gray-900">{test.requests.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg Response</p>
                    <p className="font-semibold text-gray-900">{test.avgResponseTime}ms</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Error Rate</p>
                    <p className="font-semibold text-gray-900">{test.errorRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Thresholds */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Thresholds</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">Response Time</h4>
                <p className="text-sm text-green-700">Target: &lt; 500ms</p>
                <p className="text-sm text-green-700">Current: 245ms ✓</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">Error Rate</h4>
                <p className="text-sm text-green-700">Target: &lt; 1%</p>
                <p className="text-sm text-green-700">Current: 0.2% ✓</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <h4 className="font-medium text-yellow-900">Throughput</h4>
                <p className="text-sm text-yellow-700">Target: &gt; 100 req/s</p>
                <p className="text-sm text-yellow-700">Current: 45.5 req/s ⚠</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
