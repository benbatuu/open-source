import { TestSuite, Test, TestRun, Environment, TestResult } from '../contexts/AppContext';

// API Base URL - in production this would come from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Test Suite API
export const testSuiteApi = {
  // Get all test suites
  getAll: async (): Promise<TestSuite[]> => {
    return apiRequest<TestSuite[]>('/test-suites');
  },

  // Get test suite by ID
  getById: async (id: string): Promise<TestSuite> => {
    return apiRequest<TestSuite>(`/test-suites/${id}`);
  },

  // Create new test suite
  create: async (suite: Omit<TestSuite, 'id' | 'createdAt' | 'updatedAt'>): Promise<TestSuite> => {
    return apiRequest<TestSuite>('/test-suites', {
      method: 'POST',
      body: JSON.stringify(suite),
    });
  },

  // Update test suite
  update: async (id: string, suite: Partial<TestSuite>): Promise<TestSuite> => {
    return apiRequest<TestSuite>(`/test-suites/${id}`, {
      method: 'PUT',
      body: JSON.stringify(suite),
    });
  },

  // Delete test suite
  delete: async (id: string): Promise<void> => {
    return apiRequest<void>(`/test-suites/${id}`, {
      method: 'DELETE',
    });
  },

  // Run test suite
  run: async (id: string, environmentId?: string): Promise<TestRun> => {
    return apiRequest<TestRun>(`/test-suites/${id}/run`, {
      method: 'POST',
      body: JSON.stringify({ environmentId }),
    });
  },
};

// Test API
export const testApi = {
  // Get test by ID
  getById: async (suiteId: string, testId: string): Promise<Test> => {
    return apiRequest<Test>(`/test-suites/${suiteId}/tests/${testId}`);
  },

  // Create new test
  create: async (suiteId: string, test: Omit<Test, 'id'>): Promise<Test> => {
    return apiRequest<Test>(`/test-suites/${suiteId}/tests`, {
      method: 'POST',
      body: JSON.stringify(test),
    });
  },

  // Update test
  update: async (suiteId: string, testId: string, test: Partial<Test>): Promise<Test> => {
    return apiRequest<Test>(`/test-suites/${suiteId}/tests/${testId}`, {
      method: 'PUT',
      body: JSON.stringify(test),
    });
  },

  // Delete test
  delete: async (suiteId: string, testId: string): Promise<void> => {
    return apiRequest<void>(`/test-suites/${suiteId}/tests/${testId}`, {
      method: 'DELETE',
    });
  },

  // Run single test
  run: async (suiteId: string, testId: string, environmentId?: string): Promise<TestResult> => {
    return apiRequest<TestResult>(`/test-suites/${suiteId}/tests/${testId}/run`, {
      method: 'POST',
      body: JSON.stringify({ environmentId }),
    });
  },
};

// Test Run API
export const testRunApi = {
  // Get test run by ID
  getById: async (id: string): Promise<TestRun> => {
    return apiRequest<TestRun>(`/test-runs/${id}`);
  },

  // Get all test runs
  getAll: async (limit = 50, offset = 0): Promise<TestRun[]> => {
    return apiRequest<TestRun[]>(`/test-runs?limit=${limit}&offset=${offset}`);
  },

  // Get test run results
  getResults: async (id: string): Promise<TestResult[]> => {
    return apiRequest<TestResult[]>(`/test-runs/${id}/results`);
  },

  // Stop test run
  stop: async (id: string): Promise<void> => {
    return apiRequest<void>(`/test-runs/${id}/stop`, {
      method: 'POST',
    });
  },
};

// Environment API
export const environmentApi = {
  // Get all environments
  getAll: async (): Promise<Environment[]> => {
    return apiRequest<Environment[]>('/environments');
  },

  // Get environment by ID
  getById: async (id: string): Promise<Environment> => {
    return apiRequest<Environment>(`/environments/${id}`);
  },

  // Create new environment
  create: async (environment: Omit<Environment, 'id'>): Promise<Environment> => {
    return apiRequest<Environment>('/environments', {
      method: 'POST',
      body: JSON.stringify(environment),
    });
  },

  // Update environment
  update: async (id: string, environment: Partial<Environment>): Promise<Environment> => {
    return apiRequest<Environment>(`/environments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(environment),
    });
  },

  // Delete environment
  delete: async (id: string): Promise<void> => {
    return apiRequest<void>(`/environments/${id}`, {
      method: 'DELETE',
    });
  },

  // Test environment connection
  testConnection: async (id: string): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>(`/environments/${id}/test`, {
      method: 'POST',
    });
  },
};

// Mock Server API
export const mockServerApi = {
  // Get mock server status
  getStatus: async (): Promise<{ running: boolean; port: number; routes: any[] }> => {
    return apiRequest<{ running: boolean; port: number; routes: any[] }>('/mock-server/status');
  },

  // Start mock server
  start: async (config: { port: number; routes: any[] }): Promise<void> => {
    return apiRequest<void>('/mock-server/start', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  },

  // Stop mock server
  stop: async (): Promise<void> => {
    return apiRequest<void>('/mock-server/stop', {
      method: 'POST',
    });
  },

  // Add mock route
  addRoute: async (route: any): Promise<void> => {
    return apiRequest<void>('/mock-server/routes', {
      method: 'POST',
      body: JSON.stringify(route),
    });
  },

  // Remove mock route
  removeRoute: async (routeId: string): Promise<void> => {
    return apiRequest<void>(`/mock-server/routes/${routeId}`, {
      method: 'DELETE',
    });
  },
};

// Performance Testing API
export const performanceApi = {
  // Start performance test
  startTest: async (config: {
    targetUrl: string;
    concurrentUsers: number;
    duration: number;
    rampUpTime: number;
    testType: string;
  }): Promise<{ testId: string }> => {
    return apiRequest<{ testId: string }>('/performance/start', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  },

  // Get performance test status
  getTestStatus: async (testId: string): Promise<{
    status: 'running' | 'completed' | 'failed';
    metrics: any;
    results: any;
  }> => {
    return apiRequest<{
      status: 'running' | 'completed' | 'failed';
      metrics: any;
      results: any;
    }>(`/performance/tests/${testId}`);
  },

  // Stop performance test
  stopTest: async (testId: string): Promise<void> => {
    return apiRequest<void>(`/performance/tests/${testId}/stop`, {
      method: 'POST',
    });
  },

  // Get performance test history
  getHistory: async (): Promise<any[]> => {
    return apiRequest<any[]>('/performance/history');
  },
};

// Reports API
export const reportsApi = {
  // Get test reports
  getReports: async (filters?: {
    startDate?: string;
    endDate?: string;
    suiteId?: string;
    status?: string;
  }): Promise<any[]> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    return apiRequest<any[]>(`/reports?${params.toString()}`);
  },

  // Export report
  exportReport: async (reportId: string, format: 'json' | 'csv' | 'pdf'): Promise<Blob> => {
    const response = await fetch(`${API_BASE_URL}/reports/${reportId}/export?format=${format}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.blob();
  },

  // Get dashboard metrics
  getDashboardMetrics: async (): Promise<{
    totalTests: number;
    passedTests: number;
    failedTests: number;
    successRate: number;
    avgResponseTime: number;
  }> => {
    return apiRequest<{
      totalTests: number;
      passedTests: number;
      failedTests: number;
      successRate: number;
      avgResponseTime: number;
    }>('/reports/dashboard-metrics');
  },
};

// Data Manager API
export const dataManagerApi = {
  // Get data fixtures
  getFixtures: async (): Promise<any[]> => {
    return apiRequest<any[]>('/data/fixtures');
  },

  // Create data fixture
  createFixture: async (fixture: any): Promise<any> => {
    return apiRequest<any>('/data/fixtures', {
      method: 'POST',
      body: JSON.stringify(fixture),
    });
  },

  // Update data fixture
  updateFixture: async (id: string, fixture: any): Promise<any> => {
    return apiRequest<any>(`/data/fixtures/${id}`, {
      method: 'PUT',
      body: JSON.stringify(fixture),
    });
  },

  // Delete data fixture
  deleteFixture: async (id: string): Promise<void> => {
    return apiRequest<void>(`/data/fixtures/${id}`, {
      method: 'DELETE',
    });
  },

  // Get data factories
  getFactories: async (): Promise<any[]> => {
    return apiRequest<any[]>('/data/factories');
  },

  // Generate test data
  generateData: async (factoryId: string, count: number): Promise<any[]> => {
    return apiRequest<any[]>(`/data/factories/${factoryId}/generate`, {
      method: 'POST',
      body: JSON.stringify({ count }),
    });
  },
};

// Settings API
export const settingsApi = {
  // Get settings
  get: async (): Promise<any> => {
    return apiRequest<any>('/settings');
  },

  // Update settings
  update: async (settings: any): Promise<any> => {
    return apiRequest<any>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },

  // Test email configuration
  testEmail: async (emailConfig: any): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>('/settings/test-email', {
      method: 'POST',
      body: JSON.stringify(emailConfig),
    });
  },

  // Test webhook configuration
  testWebhook: async (webhookConfig: any): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>('/settings/test-webhook', {
      method: 'POST',
      body: JSON.stringify(webhookConfig),
    });
  },
};
