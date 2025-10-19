import { 
  PerformanceTest, 
  PerformanceResult, 
  PerformanceScenario,
  PerformanceThresholdResult 
} from '../../types';
import { HttpClient } from '../api-client/http-client';
import { logger } from '../../core/logger/logger';

export class PerformanceRunner {
  private httpClient: HttpClient;

  constructor(baseUrl: string) {
    this.httpClient = new HttpClient(baseUrl);
  }

  async runTest(test: PerformanceTest): Promise<PerformanceResult> {
    logger.info(`[Performance] Starting test: ${test.name}`);
    const startTime = Date.now();

    const { duration = 60000, users = 10 } = test.config;
    const results: number[] = [];
    const errors: number[] = [];
    let totalRequests = 0;
    let failedRequests = 0;

    // Run test for specified duration
    const endTime = startTime + duration;
    const userTasks: Promise<void>[] = [];

    for (let i = 0; i < users; i++) {
      userTasks.push(this.simulateUser(test, endTime, results, errors));
    }

    await Promise.all(userTasks);

    totalRequests = results.length + errors.length;
    failedRequests = errors.length;

    const actualDuration = Date.now() - startTime;

    // Calculate metrics
    const avgResponseTime = results.length > 0 
      ? results.reduce((a, b) => a + b, 0) / results.length 
      : 0;

    const sortedResults = [...results].sort((a, b) => a - b);
    const p95Index = Math.floor(sortedResults.length * 0.95);
    const p99Index = Math.floor(sortedResults.length * 0.99);
    
    const p95ResponseTime = sortedResults[p95Index] || 0;
    const p99ResponseTime = sortedResults[p99Index] || 0;

    const throughput = totalRequests / (actualDuration / 1000);
    const errorRate = totalRequests > 0 ? (failedRequests / totalRequests) * 100 : 0;

    // Evaluate thresholds
    const thresholds = this.evaluateThresholds(test, {
      avgResponseTime,
      p95ResponseTime,
      p99ResponseTime,
      throughput,
      errorRate,
    });

    logger.info(`[Performance] Test completed: ${test.name}`);

    return {
      name: test.name,
      duration: actualDuration,
      requests: totalRequests,
      failures: failedRequests,
      avgResponseTime,
      p95ResponseTime,
      p99ResponseTime,
      throughput,
      errorRate,
      thresholds,
    };
  }

  private async simulateUser(
    test: PerformanceTest,
    endTime: number,
    results: number[],
    errors: number[]
  ): Promise<void> {
    while (Date.now() < endTime) {
      // Select random scenario
      const scenario = this.selectRandomScenario(test.scenarios);

      // Execute requests in scenario
      for (const request of scenario.requests) {
        try {
          const startTime = Date.now();
          
          await this.httpClient.request({
            method: request.method,
            url: request.url,
            headers: request.headers || {},
            body: request.body,
          });

          const responseTime = Date.now() - startTime;
          results.push(responseTime);
        } catch (error) {
          errors.push(Date.now());
          logger.debug(`[Performance] Request failed:`, error);
        }
      }

      // Think time between scenarios
      if (scenario.thinkTime) {
        await new Promise(resolve => setTimeout(resolve, scenario.thinkTime));
      }
    }
  }

  private selectRandomScenario(scenarios: PerformanceScenario[]): PerformanceScenario {
    const totalWeight = scenarios.reduce((sum, s) => sum + s.weight, 0);
    let random = Math.random() * totalWeight;

    for (const scenario of scenarios) {
      random -= scenario.weight;
      if (random <= 0) {
        return scenario;
      }
    }

    return scenarios[0]!;
  }

  private evaluateThresholds(
    test: PerformanceTest,
    metrics: Record<string, number>
  ): PerformanceThresholdResult[] {
    if (!test.config.thresholds) {
      return [];
    }

    return test.config.thresholds.map(threshold => {
      const actualValue = metrics[threshold.metric] || 0;
      let passed = false;

      switch (threshold.operator) {
        case 'lessThan':
          passed = actualValue < threshold.threshold;
          break;
        case 'greaterThan':
          passed = actualValue > threshold.threshold;
          break;
        case 'equals':
          passed = actualValue === threshold.threshold;
          break;
      }

      return {
        metric: threshold.metric,
        threshold: threshold.threshold,
        actual: actualValue,
        passed,
      };
    });
  }

  async runLoadTest(
    url: string,
    duration: number,
    users: number
  ): Promise<PerformanceResult> {
    const test: PerformanceTest = {
      name: 'Load Test',
      scenarios: [
        {
          name: 'Default Scenario',
          weight: 1,
          requests: [
            {
              method: 'GET',
              url,
            },
          ],
        },
      ],
      config: {
        duration,
        users,
      },
    };

    return this.runTest(test);
  }
}

export const createPerformanceRunner = (baseUrl: string): PerformanceRunner => {
  return new PerformanceRunner(baseUrl);
};
