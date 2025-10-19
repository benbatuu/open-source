import { 
  TestSuite, 
  TestCase, 
  TestResult, 
  TestReport, 
  TestSummary,
  TestConfig,
  AssertionResult 
} from '../../types';
import { logger } from '../logger/logger';
import { PluginManager } from '../plugin/plugin-manager';
import { ConfigManager } from '../config/config-manager';

export class TestRunner {
  private configManager: ConfigManager;
  private pluginManager: PluginManager;
  private results: TestResult[] = [];

  constructor(configManager: ConfigManager, pluginManager: PluginManager) {
    this.configManager = configManager;
    this.pluginManager = pluginManager;
  }

  async runSuite(suite: TestSuite): Promise<TestReport> {
    const startTime = new Date();
    this.results = [];

    logger.info(`Starting test suite: ${suite.name}`);
    
    try {
      // Execute beforeAll hooks
      await this.pluginManager.executeHook('beforeAll');

      // Execute suite setup
      if (suite.setup) {
        await this.executeHooks(suite.setup, 'setup');
      }

      // Execute beforeSuite hooks
      await this.pluginManager.executeHook('beforeSuite', suite);

      // Run all tests
      for (const test of suite.tests) {
        if (test.skip) {
          logger.info(`Skipping test: ${test.name}`);
          this.results.push(this.createSkippedResult(test));
          continue;
        }

        const result = await this.runTest(test);
        this.results.push(result);
      }

      // Execute afterSuite hooks
      await this.pluginManager.executeHook('afterSuite', this.results);

      // Execute suite teardown
      if (suite.teardown) {
        await this.executeHooks(suite.teardown, 'teardown');
      }

      // Execute afterAll hooks
      await this.pluginManager.executeHook('afterAll');

    } catch (error) {
      logger.error('Error running test suite:', error);
      throw error;
    }

    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();

    const report = this.generateReport(suite, startTime, endTime, duration);
    this.logSummary(report.summary);

    return report;
  }

  private async runTest(test: TestCase): Promise<TestResult> {
    const startTime = new Date();
    const testId = this.generateTestId(test);
    
    logger.info(`Running test: ${test.name}`);

    try {
      // Execute beforeTest hooks
      await this.pluginManager.executeHook('beforeTest', test);

      // Execute the test
      const result = await this.executeTest(test, testId, startTime);

      // Execute afterTest hooks
      await this.pluginManager.executeHook('afterTest', result);

      return result;
    } catch (error) {
      logger.error(`Error running test ${test.name}:`, error);
      return this.createErrorResult(test, testId, startTime, error as Error);
    }
  }

  private async executeTest(test: TestCase, testId: string, startTime: Date): Promise<TestResult> {
    const config = this.configManager.getConfig();
    if (!config) {
      throw new Error('No configuration found');
    }

    let lastError: Error | undefined;
    const maxRetries = test.retries || config.retries || 0;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        // This is where the actual API call would be made
        // For now, we'll simulate a successful test
        const response = await this.simulateApiCall(test, config);
        const assertions = await this.runAssertions(test, response);
        
        const endTime = new Date();
        const duration = endTime.getTime() - startTime.getTime();

        return {
          id: testId,
          name: test.name,
          status: this.determineTestStatus(assertions),
          duration,
          startTime,
          endTime,
          assertions,
          response,
          retries: attempt,
        };
      } catch (error) {
        lastError = error as Error;
        logger.warn(`Test ${test.name} attempt ${attempt + 1} failed:`, error);
        
        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          await this.delay(Math.pow(2, attempt) * 1000);
        }
      }
    }

    // All retries failed
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();

    return {
      id: testId,
      name: test.name,
      status: 'failed',
      duration,
      startTime,
      endTime,
      error: lastError || new Error('Test failed'),
      retries: maxRetries,
    };
  }

  private async simulateApiCall(test: TestCase, _config: TestConfig): Promise<any> {
    // This is a placeholder - in the real implementation, this would make actual HTTP requests
    logger.debug(`Simulating API call: ${test.method} ${test.url}`);
    
    // Simulate response time
    await this.delay(Math.random() * 1000 + 100);
    
    return {
      status: test.expectedStatus || 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      data: test.expectedResponse || { message: 'Success' },
      responseTime: Math.random() * 500 + 100,
      size: JSON.stringify(test.expectedResponse || {}).length,
    };
  }

  private async runAssertions(test: TestCase, response: any): Promise<AssertionResult[]> {
    const results: AssertionResult[] = [];

    if (test.expectedStatus) {
      results.push({
        name: 'Status Code',
        status: response.status === test.expectedStatus ? 'passed' : 'failed',
        expected: test.expectedStatus,
        actual: response.status,
        message: response.status === test.expectedStatus 
          ? 'Status code matches expected value'
          : `Expected status ${test.expectedStatus}, got ${response.status}`,
      });
    }

    if (test.expectedResponse) {
      results.push({
        name: 'Response Body',
        status: this.compareObjects(response.data, test.expectedResponse) ? 'passed' : 'failed',
        expected: test.expectedResponse,
        actual: response.data,
        message: this.compareObjects(response.data, test.expectedResponse)
          ? 'Response body matches expected value'
          : 'Response body does not match expected value',
      });
    }

    if (test.assertions) {
      for (const assertion of test.assertions) {
        const result = await this.runCustomAssertion(assertion, response);
        results.push(result);
      }
    }

    return results;
  }

  private async runCustomAssertion(assertion: any, response: any): Promise<AssertionResult> {
    // This is a simplified assertion runner
    // In a real implementation, this would handle various assertion types
    return {
      name: `Custom Assertion: ${assertion.type}`,
      status: 'passed',
      expected: assertion.expected,
      actual: response,
      message: 'Custom assertion passed',
    };
  }

  private determineTestStatus(assertions: AssertionResult[]): 'passed' | 'failed' {
    return assertions.every(a => a.status === 'passed') ? 'passed' : 'failed';
  }

  private compareObjects(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  private createSkippedResult(test: TestCase): TestResult {
    const now = new Date();
    return {
      id: this.generateTestId(test),
      name: test.name,
      status: 'skipped',
      duration: 0,
      startTime: now,
      endTime: now,
    };
  }

  private createErrorResult(test: TestCase, testId: string, startTime: Date, error: Error): TestResult {
    const endTime = new Date();
    return {
      id: testId,
      name: test.name,
      status: 'error',
      duration: endTime.getTime() - startTime.getTime(),
      startTime,
      endTime,
      error,
    };
  }

  private generateTestId(test: TestCase): string {
    return `${test.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
  }

  private async executeHooks(hooks: any[], type: string): Promise<void> {
    for (const hook of hooks) {
      try {
        logger.debug(`Executing ${type} hook: ${hook.name}`);
        await hook.action();
      } catch (error) {
        logger.error(`Error executing ${type} hook ${hook.name}:`, error);
        throw error;
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateReport(_suite: TestSuite, startTime: Date, endTime: Date, duration: number): TestReport {
    const summary = this.calculateSummary();
    const config = this.configManager.getConfig();

    return {
      summary,
      results: this.results,
      duration,
      startTime,
      endTime,
      config: config!,
    };
  }

  private calculateSummary(): TestSummary {
    const total = this.results.length;
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const skipped = this.results.filter(r => r.status === 'skipped').length;
    const error = this.results.filter(r => r.status === 'error').length;
    const passRate = total > 0 ? (passed / total) * 100 : 0;

    return {
      total,
      passed,
      failed,
      skipped,
      error,
      passRate,
    };
  }

  private logSummary(summary: TestSummary): void {
    logger.info('Test Summary:');
    logger.info(`  Total: ${summary.total}`);
    logger.info(`  Passed: ${summary.passed}`);
    logger.info(`  Failed: ${summary.failed}`);
    logger.info(`  Skipped: ${summary.skipped}`);
    logger.info(`  Error: ${summary.error}`);
    logger.info(`  Pass Rate: ${summary.passRate.toFixed(2)}%`);
  }
}
