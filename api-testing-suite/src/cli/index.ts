#!/usr/bin/env node

import { Command } from 'commander';
import { ApiTestingSuite } from '../index';
import { logger } from '../core/logger/logger';
import { readFileSync, existsSync } from 'fs';

const program = new Command();

program
  .name('api-test')
  .description('API Testing Suite - Comprehensive API testing tool')
  .version('1.0.0');

program
  .command('run')
  .description('Run API tests')
  .option('-c, --config <path>', 'Path to configuration file')
  .option('-s, --suite <path>', 'Path to test suite file')
  .option('-v, --verbose', 'Enable verbose logging')
  .option('--no-color', 'Disable colored output')
  .action(async (options) => {
    try {
      if (options.verbose) {
        logger.setLevel('debug');
      }

      logger.info('Starting API Testing Suite...');

      const suite = new ApiTestingSuite(options.config);
      await suite.initialize();

      // Load test suites
      const testSuites = await loadTestSuites(options.suite);
      
      // Run tests
      const results = await suite.runTests(testSuites);
      
      // Display results
      displayResults(results);

      await suite.cleanup();
      
      // Exit with appropriate code
      const hasFailures = results.some(result => 
        result.summary.failed > 0 || result.summary.error > 0
      );
      process.exit(hasFailures ? 1 : 0);

    } catch (error) {
      logger.error('Failed to run tests:', error);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize a new API test project')
  .option('-d, --dir <directory>', 'Directory to initialize in', '.')
  .action(async (options) => {
    try {
      logger.info('Initializing API test project...');
      await initializeProject(options.dir);
      logger.info('Project initialized successfully!');
    } catch (error) {
      logger.error('Failed to initialize project:', error);
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate test configuration and suites')
  .option('-c, --config <path>', 'Path to configuration file')
  .option('-s, --suite <path>', 'Path to test suite file')
  .action(async (options) => {
    try {
      logger.info('Validating configuration...');
      
      const suite = new ApiTestingSuite(options.config);
      await suite.initialize();
      
      if (options.suite) {
        const testSuites = await loadTestSuites(options.suite);
        logger.info(`Found ${testSuites.length} test suites`);
      }
      
      logger.info('Validation completed successfully!');
    } catch (error) {
      logger.error('Validation failed:', error);
      process.exit(1);
    }
  });

async function loadTestSuites(suitePath?: string): Promise<any[]> {
  const defaultPaths = [
    'test-suites.json',
    'test-suites.yaml',
    'test-suites.yml',
    'tests.json',
    'tests.yaml',
    'tests.yml',
  ];

  let path = suitePath;
  if (!path) {
    for (const defaultPath of defaultPaths) {
      if (existsSync(defaultPath)) {
        path = defaultPath;
        break;
      }
    }
  }

  if (!path || !existsSync(path)) {
    throw new Error('No test suite file found. Please specify with --suite option or create a test suite file.');
  }

  const content = readFileSync(path, 'utf-8');
  
  if (path.endsWith('.json')) {
    return JSON.parse(content);
  } else if (path.endsWith('.yaml') || path.endsWith('.yml')) {
    // YAML parsing would be implemented here
    throw new Error('YAML support not yet implemented');
  } else {
    throw new Error('Unsupported file format. Please use JSON, YAML, or YML.');
  }
}

function displayResults(results: any[]): void {
  logger.info('\n=== Test Results ===');
  
  for (const result of results) {
    logger.info(`\nSuite: ${result.config.name}`);
    logger.info(`Duration: ${result.duration}ms`);
    logger.info(`Total: ${result.summary.total}`);
    logger.info(`Passed: ${result.summary.passed}`);
    logger.info(`Failed: ${result.summary.failed}`);
    logger.info(`Skipped: ${result.summary.skipped}`);
    logger.info(`Error: ${result.summary.error}`);
    logger.info(`Pass Rate: ${result.summary.passRate.toFixed(2)}%`);
    
    // Show failed tests
    const failedTests = result.results.filter((r: any) => r.status === 'failed' || r.status === 'error');
    if (failedTests.length > 0) {
      logger.info('\nFailed Tests:');
      for (const test of failedTests) {
        logger.error(`  - ${test.name}: ${test.error?.message || 'Test failed'}`);
      }
    }
  }
}

async function initializeProject(directory: string): Promise<void> {
  const configContent = {
    name: 'My API Test Suite',
    description: 'API test configuration',
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
    retries: 3,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'API-Testing-Suite/1.0.0',
    },
    plugins: [],
    modules: [],
  };

  const testSuiteContent = {
    name: 'Example Test Suite',
    description: 'Example API tests',
    tests: [
      {
        name: 'Health Check',
        description: 'Test API health endpoint',
        type: 'integration',
        method: 'GET',
        url: '/health',
        expectedStatus: 200,
        expectedResponse: { status: 'ok' },
      },
      {
        name: 'Get Users',
        description: 'Test getting users list',
        type: 'integration',
        method: 'GET',
        url: '/users',
        expectedStatus: 200,
        assertions: [
          {
            type: 'body',
            path: 'users',
            operator: 'contains',
          },
        ],
      },
    ],
  };

  // Write config file
  const fs = require('fs');
  const path = require('path');
  
  fs.writeFileSync(
    path.join(directory, 'api-test.config.json'),
    JSON.stringify(configContent, null, 2)
  );

  // Write test suite file
  fs.writeFileSync(
    path.join(directory, 'test-suites.json'),
    JSON.stringify([testSuiteContent], null, 2)
  );

  // Write example test file
  fs.writeFileSync(
    path.join(directory, 'example-test.js'),
    `// Example API test
const { ApiTestingSuite } = require('api-testing-suite');

async function runExampleTest() {
  const suite = new ApiTestingSuite();
  await suite.initialize();
  
  const testSuite = {
    name: 'Example Test Suite',
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
  console.log('Test results:', results);
  
  await suite.cleanup();
}

runExampleTest().catch(console.error);
`
  );
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

program.parse();
