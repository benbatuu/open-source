// Core exports
export { TestRunner } from './core/runner/test-runner';
export { ConfigManager } from './core/config/config-manager';
export { PluginManager } from './core/plugin/plugin-manager';
export { TestLogger, logger } from './core/logger/logger';

// Module exports
export { HttpClient, GraphqlClient, WebsocketClient } from './modules/api-client';
export { ReportGenerator } from './modules/reporting';
export { FixtureManager, DataFactory, UserFactory, ProductFactory, OrderFactory } from './modules/data-manager';
export { JestExecutor, SupertestExecutor, createSupertestExecutor } from './modules/test-executor';
export { MockHandler, MockServer, createMockServer } from './modules/mock-server';
export { PerformanceRunner, createPerformanceRunner } from './modules/performance';

// Type exports
export * from './types';

// Import types for internal use
import { TestRunner } from './core/runner/test-runner';
import { ConfigManager } from './core/config/config-manager';
import { PluginManager } from './core/plugin/plugin-manager';
import { logger } from './core/logger/logger';

// Main API Testing Suite class
export class ApiTestingSuite {
  private configManager: ConfigManager;
  private pluginManager: PluginManager;
  private testRunner: TestRunner;

  constructor(configPath?: string) {
    this.configManager = new ConfigManager(configPath);
    this.pluginManager = new PluginManager();
    this.testRunner = new TestRunner(this.configManager, this.pluginManager);
  }

  async initialize(): Promise<void> {
    const config = this.configManager.loadConfig();
    
    // Load plugins
    if (config.plugins) {
      for (const pluginConfig of config.plugins) {
        await this.pluginManager.loadPlugin(pluginConfig);
      }
    }

    logger.info('API Testing Suite initialized successfully');
  }

  async runTests(testSuites: any[]): Promise<any[]> {
    const results = [];
    
    for (const suite of testSuites) {
      const result = await this.testRunner.runSuite(suite);
      results.push(result);
    }

    return results;
  }

  async cleanup(): Promise<void> {
    await this.pluginManager.unloadAllPlugins();
    logger.info('API Testing Suite cleanup completed');
  }

  getConfigManager(): ConfigManager {
    return this.configManager;
  }

  getPluginManager(): PluginManager {
    return this.pluginManager;
  }

  getTestRunner(): TestRunner {
    return this.testRunner;
  }
}
