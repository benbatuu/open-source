import { ApiTestingSuite, TestSuite } from '../../src';

async function runSimpleTest() {
  // Initialize the testing suite
  const suite = new ApiTestingSuite('./api-test.config.json');
  await suite.initialize();

  // Define a simple test suite
  const testSuite: TestSuite = {
    name: 'Simple API Test',
    description: 'Basic example of API testing',
    tests: [
      {
        name: 'Health Check Test',
        description: 'Test if the API health endpoint is working',
        type: 'integration',
        method: 'GET',
        url: '/health',
        expectedStatus: 200,
        expectedResponse: {
          status: 'ok',
          timestamp: 'string',
        },
        tags: ['health', 'smoke'],
      },
      {
        name: 'Get Users List',
        description: 'Test retrieving users list',
        type: 'integration',
        method: 'GET',
        url: '/users',
        headers: {
          Authorization: 'Bearer test-token',
        },
        expectedStatus: 200,
        tags: ['users', 'read'],
      },
      {
        name: 'Create New User',
        description: 'Test creating a new user',
        type: 'integration',
        method: 'POST',
        url: '/users',
        headers: {
          Authorization: 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          age: 30,
        },
        expectedStatus: 201,
        tags: ['users', 'create'],
      },
    ],
  };

  // Run the test suite
  console.log('Starting test execution...\n');
  const results = await suite.runTests([testSuite]);

  // Display results
  console.log('\n=== Test Results ===\n');
  results.forEach(result => {
    console.log(`Suite: ${result.config.name}`);
    console.log(`Duration: ${result.duration}ms`);
    console.log(`Total Tests: ${result.summary.total}`);
    console.log(`Passed: ${result.summary.passed}`);
    console.log(`Failed: ${result.summary.failed}`);
    console.log(`Pass Rate: ${result.summary.passRate.toFixed(2)}%\n`);

    // Show individual test results
    result.results.forEach(test => {
      const statusIcon = test.status === 'passed' ? '✓' : '✗';
      console.log(`${statusIcon} ${test.name} (${test.duration}ms)`);
      if (test.status === 'failed' && test.error) {
        console.log(`  Error: ${test.error.message}`);
      }
    });
  });

  // Cleanup
  await suite.cleanup();
  
  // Exit with appropriate code
  const hasFailures = results.some(result => 
    result.summary.failed > 0 || result.summary.error > 0
  );
  process.exit(hasFailures ? 1 : 0);
}

// Run the test
runSimpleTest().catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
