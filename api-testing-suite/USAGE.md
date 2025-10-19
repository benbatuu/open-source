# API Testing Suite - Usage Guide

## 📚 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Test Results](#test-results)
- [Plugins](#plugins)
- [Advanced Usage](#advanced-usage)
- [API Reference](#api-reference)

## 🚀 Installation

```bash
npm install api-testing-suite
# or
yarn add api-testing-suite
```

## ⚡ Quick Start

### 1. Initialize a New Project

```bash
npx api-test init
```

This will create:
- `api-test.config.json` - Configuration file
- `test-suites.json` - Example test suites
- `example-test.js` - Example test file

### 2. Configure Your Tests

Edit `api-test.config.json`:

```json
{
  "name": "My API Tests",
  "baseUrl": "https://api.example.com",
  "timeout": 30000,
  "retries": 3,
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_TOKEN"
  }
}
```

### 3. Create Test Suites

Create or edit `test-suites.json`:

```json
[
  {
    "name": "User API Tests",
    "tests": [
      {
        "name": "Get Users",
        "method": "GET",
        "url": "/users",
        "expectedStatus": 200
      }
    ]
  }
]
```

### 4. Run Tests

```bash
npx api-test run
# or with verbose logging
npx api-test run --verbose
```

## ⚙️ Configuration

### Configuration File

The configuration file supports multiple formats:
- `api-test.config.json`
- `api-test.config.yaml`
- `api-test.config.yml`

### Configuration Options

```typescript
{
  name: string;              // Project name
  description?: string;      // Project description
  baseUrl: string;          // Base URL for API requests
  timeout?: number;         // Request timeout (ms)
  retries?: number;         // Number of retries on failure
  headers?: object;         // Default headers
  auth?: {                  // Authentication config
    type: 'bearer' | 'basic' | 'api-key';
    token?: string;
    username?: string;
    password?: string;
  };
  plugins?: Array<{         // Plugin configuration
    name: string;
    enabled: boolean;
    config?: object;
  }>;
}
```

### Environment Variables

Create a `.env` file:

```env
API_BASE_URL=http://localhost:3000
API_TOKEN=your-token-here
TEST_TIMEOUT=30000
LOG_LEVEL=info
```

## 📝 Writing Tests

### Test Structure

```typescript
{
  name: string;                    // Test name
  description?: string;            // Test description
  type: 'unit' | 'integration' | 'e2e' | 'performance';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;                     // Request URL
  headers?: object;                // Request headers
  body?: any;                      // Request body
  expectedStatus?: number;         // Expected status code
  expectedResponse?: any;          // Expected response
  assertions?: Array<Assertion>;   // Custom assertions
  timeout?: number;                // Test timeout
  retries?: number;                // Test retries
  skip?: boolean;                  // Skip test
  tags?: string[];                 // Test tags
}
```

### Example Test Suite

```json
{
  "name": "User Management Tests",
  "description": "Tests for user CRUD operations",
  "tests": [
    {
      "name": "Create User",
      "description": "Test creating a new user",
      "type": "integration",
      "method": "POST",
      "url": "/users",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "expectedStatus": 201,
      "expectedResponse": {
        "id": "string",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "tags": ["users", "create"]
    },
    {
      "name": "Get User",
      "type": "integration",
      "method": "GET",
      "url": "/users/1",
      "expectedStatus": 200,
      "assertions": [
        {
          "type": "body",
          "path": "id",
          "operator": "equals",
          "expected": 1
        },
        {
          "type": "responseTime",
          "operator": "lessThan",
          "expected": 1000
        }
      ],
      "tags": ["users", "read"]
    }
  ]
}
```

### Assertions

Supported assertion types:

1. **Status Code**
```json
{
  "expectedStatus": 200
}
```

2. **Response Body**
```json
{
  "expectedResponse": {
    "status": "ok",
    "data": {...}
  }
}
```

3. **Custom Assertions**
```json
{
  "assertions": [
    {
      "type": "header",
      "path": "content-type",
      "expected": "application/json"
    },
    {
      "type": "body",
      "path": "users.length",
      "operator": "greaterThan",
      "expected": 0
    },
    {
      "type": "responseTime",
      "operator": "lessThan",
      "expected": 500
    }
  ]
}
```

## 🏃 Running Tests

### CLI Commands

```bash
# Run all tests
api-test run

# Run with specific config
api-test run --config ./custom-config.json

# Run specific test suite
api-test run --suite ./my-tests.json

# Verbose logging
api-test run --verbose

# Validate configuration
api-test validate

# Initialize new project
api-test init
```

### Programmatic Usage

```typescript
import { ApiTestingSuite, TestSuite } from 'api-testing-suite';

async function runTests() {
  const suite = new ApiTestingSuite('./api-test.config.json');
  await suite.initialize();

  const testSuite: TestSuite = {
    name: 'My Tests',
    tests: [
      {
        name: 'Health Check',
        method: 'GET',
        url: '/health',
        expectedStatus: 200,
      },
    ],
  };

  const results = await suite.runTests([testSuite]);
  await suite.cleanup();
  
  return results;
}
```

## 📊 Test Results

### Console Output

```
=== Test Results ===

Suite: User API Tests
Duration: 1234ms
Total: 5
Passed: 4
Failed: 1
Pass Rate: 80.00%

✓ Create User (123ms)
✓ Get User (45ms)
✓ Update User (78ms)
✗ Delete User (234ms)
  Error: Expected status 204, got 500
✓ List Users (98ms)
```

### Result Object

```typescript
{
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    error: number;
    passRate: number;
  };
  results: Array<{
    id: string;
    name: string;
    status: 'passed' | 'failed' | 'skipped' | 'error';
    duration: number;
    startTime: Date;
    endTime: Date;
    error?: Error;
    assertions?: Array<AssertionResult>;
    response?: ApiResponse;
  }>;
  duration: number;
  startTime: Date;
  endTime: Date;
}
```

## 🔌 Plugins

### Built-in Plugins

1. **Performance Monitor**
```json
{
  "plugins": [
    {
      "name": "performance-monitor",
      "enabled": true,
      "config": {
        "thresholds": {
          "responseTime": 1000
        }
      }
    }
  ]
}
```

2. **Reporting**
```json
{
  "plugins": [
    {
      "name": "reporting",
      "enabled": true,
      "config": {
        "formats": ["json", "html"],
        "outputDir": "./test-results"
      }
    }
  ]
}
```

### Creating Custom Plugins

```typescript
import { Plugin } from 'api-testing-suite';

const myPlugin: Plugin = {
  name: 'my-plugin',
  version: '1.0.0',
  hooks: {
    beforeTest: async (test) => {
      console.log(`Running test: ${test.name}`);
    },
    afterTest: async (result) => {
      console.log(`Test ${result.name}: ${result.status}`);
    },
  },
  init: async (config) => {
    // Initialize plugin
  },
  destroy: async () => {
    // Cleanup
  },
};
```

## 🚀 Advanced Usage

### Setup and Teardown

```json
{
  "name": "Advanced Tests",
  "setup": [
    {
      "name": "Create test data",
      "type": "before"
    }
  ],
  "teardown": [
    {
      "name": "Cleanup test data",
      "type": "after"
    }
  ],
  "tests": [...]
}
```

### Test Tags

Filter tests by tags:

```typescript
const results = await suite.runTests(testSuites.filter(suite => 
  suite.tests.some(test => test.tags?.includes('smoke'))
));
```

### Retry Logic

```json
{
  "name": "Flaky Test",
  "method": "GET",
  "url": "/flaky-endpoint",
  "retries": 5,
  "timeout": 10000
}
```

## 📖 API Reference

### ApiTestingSuite

Main class for running tests.

```typescript
class ApiTestingSuite {
  constructor(configPath?: string);
  async initialize(): Promise<void>;
  async runTests(testSuites: TestSuite[]): Promise<TestReport[]>;
  async cleanup(): Promise<void>;
  getConfigManager(): ConfigManager;
  getPluginManager(): PluginManager;
  getTestRunner(): TestRunner;
}
```

### ConfigManager

Manages test configuration.

```typescript
class ConfigManager {
  loadConfig(): TestConfig;
  getConfig(): TestConfig | null;
  updateConfig(updates: Partial<TestConfig>): void;
  resetConfig(): void;
}
```

### PluginManager

Manages plugins.

```typescript
class PluginManager {
  async loadPlugin(config: PluginConfig): Promise<void>;
  async unloadPlugin(name: string): Promise<void>;
  async executeHook(hookType: string, ...args: any[]): Promise<void>;
  getPlugin(name: string): Plugin | undefined;
}
```

### TestRunner

Runs test suites.

```typescript
class TestRunner {
  async runSuite(suite: TestSuite): Promise<TestReport>;
}
```

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
