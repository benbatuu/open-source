import { readFileSync, existsSync } from 'fs';
import { TestConfig } from '../../types';
import { logger } from '../logger/logger';

export class ConfigManager {
  private config: TestConfig | null = null;
  private configPath: string;

  constructor(configPath?: string) {
    this.configPath = configPath || this.findConfigFile();
  }

  private findConfigFile(): string {
    const possiblePaths = [
      'api-test.config.json',
      'api-test.config.yaml',
      'api-test.config.yml',
      'api-test.config.js',
      'api-test.config.ts',
      '.api-test.json',
      '.api-test.yaml',
      '.api-test.yml',
    ];

    for (const path of possiblePaths) {
      if (existsSync(path)) {
        return path;
      }
    }

    return 'api-test.config.json'; // Default fallback
  }

  loadConfig(): TestConfig {
    if (this.config) {
      return this.config;
    }

    try {
      if (existsSync(this.configPath)) {
        const configContent = readFileSync(this.configPath, 'utf-8');
        
        if (this.configPath.endsWith('.json')) {
          this.config = JSON.parse(configContent);
        } else if (this.configPath.endsWith('.yaml') || this.configPath.endsWith('.yml')) {
          // YAML parsing will be implemented when yaml dependency is added
          throw new Error('YAML config support not yet implemented');
        } else if (this.configPath.endsWith('.js') || this.configPath.endsWith('.ts')) {
          // Dynamic import for JS/TS config files
          throw new Error('JS/TS config support not yet implemented');
        }
      } else {
        // Create default config
        this.config = this.createDefaultConfig();
        logger.warn(`Config file not found at ${this.configPath}, using default configuration`);
      }

      this.validateConfig(this.config!);
      return this.config!;
    } catch (error) {
      logger.error(`Failed to load config from ${this.configPath}:`, error);
      this.config = this.createDefaultConfig();
      return this.config;
    }
  }

  public createDefaultConfig(): TestConfig {
    return {
      name: 'API Test Suite',
      description: 'Default API test configuration',
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
  }

  private validateConfig(config: TestConfig): void {
    if (!config.name) {
      throw new Error('Config must have a name');
    }
    if (!config.baseUrl) {
      throw new Error('Config must have a baseUrl');
    }
    if (config.timeout && config.timeout < 1000) {
      throw new Error('Timeout must be at least 1000ms');
    }
    if (config.retries && config.retries < 0) {
      throw new Error('Retries must be a non-negative number');
    }
  }

  getConfig(): TestConfig | null {
    return this.config;
  }

  updateConfig(updates: Partial<TestConfig>): void {
    if (this.config) {
      this.config = { ...this.config, ...updates };
      this.validateConfig(this.config);
    }
  }

  resetConfig(): void {
    this.config = null;
  }
}
