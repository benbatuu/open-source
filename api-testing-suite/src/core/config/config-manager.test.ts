import { ConfigManager } from './config-manager';
import { TestConfig } from '../../types';
import { writeFileSync, unlinkSync } from 'fs';

describe('ConfigManager', () => {
  let configManager: ConfigManager;
  const testConfigPath = 'test-config.json';

  beforeEach(() => {
    configManager = new ConfigManager(testConfigPath);
  });

  afterEach(() => {
    try {
      unlinkSync(testConfigPath);
    } catch (error) {
      // File might not exist, ignore error
    }
  });

  describe('loadConfig', () => {
    it('should load configuration from JSON file', () => {
      const testConfig: TestConfig = {
        name: 'Test Config',
        baseUrl: 'http://test.com',
        timeout: 5000,
        retries: 2,
        headers: { 'Content-Type': 'application/json' },
        plugins: [],
        modules: [],
      };

      writeFileSync(testConfigPath, JSON.stringify(testConfig));

      const config = configManager.loadConfig();

      expect(config).toEqual(testConfig);
    });

    it('should create default config when file does not exist', () => {
      const config = configManager.loadConfig();

      expect(config.name).toBe('API Test Suite');
      expect(config.baseUrl).toBe('http://localhost:3000');
      expect(config.timeout).toBe(30000);
      expect(config.retries).toBe(3);
    });

    it('should use default configuration when file is invalid', () => {
      const invalidConfig = {
        // Missing required fields
        timeout: 500,
      };

      writeFileSync(testConfigPath, JSON.stringify(invalidConfig));

      // Should return default config instead of throwing
      const config = configManager.loadConfig();
      expect(config.name).toBe('API Test Suite');
      expect(config.baseUrl).toBe('http://localhost:3000');
    });
  });

  describe('updateConfig', () => {
    it('should update configuration', () => {
      const initialConfig: TestConfig = {
        name: 'Test Config',
        baseUrl: 'http://test.com',
        timeout: 5000,
        retries: 2,
        headers: {},
        plugins: [],
        modules: [],
      };

      writeFileSync(testConfigPath, JSON.stringify(initialConfig));
      configManager.loadConfig();

      configManager.updateConfig({
        timeout: 10000,
        retries: 5,
      });

      const updatedConfig = configManager.getConfig();
      expect(updatedConfig?.timeout).toBe(10000);
      expect(updatedConfig?.retries).toBe(5);
    });
  });

  describe('resetConfig', () => {
    it('should reset configuration', () => {
      const testConfig: TestConfig = {
        name: 'Test Config',
        baseUrl: 'http://test.com',
        timeout: 5000,
        retries: 2,
        headers: {},
        plugins: [],
        modules: [],
      };

      writeFileSync(testConfigPath, JSON.stringify(testConfig));
      configManager.loadConfig();

      expect(configManager.getConfig()).toBeDefined();

      configManager.resetConfig();

      expect(configManager.getConfig()).toBeNull();
    });
  });
});
