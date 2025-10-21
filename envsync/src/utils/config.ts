import fs from 'fs-extra';
import path from 'path';
import { EnvSyncConfig } from '../types';

const CONFIG_FILE = 'envsync.config.json';
const DEFAULT_CONFIG: EnvSyncConfig = {
  project: 'my-project',
  environments: ['development', 'staging', 'production'],
  storage: {
    type: 'local',
    path: './env'
  },
  encryption: {
    enabled: true,
    key: process.env.ENVSYNC_SECRET_KEY
  },
  version: '1.0.0'
};

export class ConfigManager {
  private configPath: string;

  constructor(projectRoot?: string) {
    this.configPath = path.resolve(projectRoot || process.cwd(), CONFIG_FILE);
  }

  async load(): Promise<EnvSyncConfig | null> {
    try {
      if (await fs.pathExists(this.configPath)) {
        const configData = await fs.readJson(this.configPath);
        return { ...DEFAULT_CONFIG, ...configData };
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to load config: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async save(config: EnvSyncConfig): Promise<void> {
    try {
      await fs.ensureDir(path.dirname(this.configPath));
      await fs.writeJson(this.configPath, config, { spaces: 2 });
    } catch (error) {
      throw new Error(`Failed to save config: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async exists(): Promise<boolean> {
    return fs.pathExists(this.configPath);
  }

  async createDefault(projectName?: string): Promise<EnvSyncConfig> {
    const config = {
      ...DEFAULT_CONFIG,
      project: projectName || DEFAULT_CONFIG.project
    };
    await this.save(config);
    return config;
  }

  getConfigPath(): string {
    return this.configPath;
  }
}
