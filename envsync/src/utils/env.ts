import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';
import { Environment, EnvironmentVariable, EnvSyncConfig, DiffResult } from '../types';

export class EnvManager {
  private config: EnvSyncConfig;
  private envDir: string;

  constructor(config: EnvSyncConfig) {
    this.config = config;
    this.envDir = path.resolve(config.storage.path || './env');
  }

  async ensureEnvDirectory(): Promise<void> {
    await fs.ensureDir(this.envDir);
  }

  getEnvFilePath(environment: string): string {
    return path.join(this.envDir, `.env.${environment}`);
  }

  async loadEnvironment(environment: string): Promise<Environment> {
    const filePath = this.getEnvFilePath(environment);
    
    if (!(await fs.pathExists(filePath))) {
      return {
        name: environment,
        variables: [],
        lastModified: new Date(),
        checksum: ''
      };
    }

    const content = await fs.readFile(filePath, 'utf8');
    const variables = this.parseEnvContent(content);
    const stats = await fs.stat(filePath);
    const checksum = crypto.createHash('sha256').update(content).digest('hex');

    return {
      name: environment,
      variables,
      lastModified: stats.mtime,
      checksum
    };
  }

  async saveEnvironment(environment: Environment): Promise<void> {
    await this.ensureEnvDirectory();
    const filePath = this.getEnvFilePath(environment.name);
    const content = this.serializeEnvContent(environment.variables);
    await fs.writeFile(filePath, content, 'utf8');
  }

  async deleteEnvironment(environment: string): Promise<void> {
    const filePath = this.getEnvFilePath(environment);
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
    }
  }

  async listEnvironments(): Promise<string[]> {
    await this.ensureEnvDirectory();
    const files = await fs.readdir(this.envDir);
    return files
      .filter(file => file.startsWith('.env.') && file !== '.env')
      .map(file => file.replace('.env.', ''));
  }

  parseEnvContent(content: string): EnvironmentVariable[] {
    const variables: EnvironmentVariable[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      const equalIndex = trimmed.indexOf('=');
      if (equalIndex === -1) {
        continue;
      }

      const key = trimmed.substring(0, equalIndex).trim();
      let value = trimmed.substring(equalIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      variables.push({
        key,
        value,
        encrypted: false
      });
    }

    return variables;
  }

  serializeEnvContent(variables: EnvironmentVariable[]): string {
    return variables
      .map(variable => {
        let line = `${variable.key}=${variable.value}`;
        if (variable.comment) {
          line += ` # ${variable.comment}`;
        }
        return line;
      })
      .join('\n') + '\n';
  }

  diffEnvironments(env1: Environment, env2: Environment): DiffResult {
    const env1Map = new Map(env1.variables.map(v => [v.key, v]));
    const env2Map = new Map(env2.variables.map(v => [v.key, v]));

    const added: EnvironmentVariable[] = [];
    const removed: EnvironmentVariable[] = [];
    const modified: { variable: EnvironmentVariable; oldValue: string; newValue: string }[] = [];
    const unchanged: EnvironmentVariable[] = [];

    // Find added and modified variables
    for (const [key, variable] of env2Map) {
      if (!env1Map.has(key)) {
        added.push(variable);
      } else {
        const oldVariable = env1Map.get(key)!;
        if (oldVariable.value !== variable.value) {
          modified.push({
            variable,
            oldValue: oldVariable.value,
            newValue: variable.value
          });
        } else {
          unchanged.push(variable);
        }
      }
    }

    // Find removed variables
    for (const [key, variable] of env1Map) {
      if (!env2Map.has(key)) {
        removed.push(variable);
      }
    }

    return { added, removed, modified, unchanged };
  }

  async syncEnvironments(
    sourceEnv: string, 
    targetEnv: string, 
    options: { force?: boolean; dryRun?: boolean } = {}
  ): Promise<{ synced: number; skipped: number }> {
    const source = await this.loadEnvironment(sourceEnv);
    const target = await this.loadEnvironment(targetEnv);
    
    const diff = this.diffEnvironments(target, source);
    let synced = 0;
    let skipped = 0;

    const newVariables = [...diff.added];
    
    if (options.force) {
      newVariables.push(...diff.modified.map(m => m.variable));
    }

    if (options.dryRun) {
      console.log(`Would sync ${newVariables.length} variables from ${sourceEnv} to ${targetEnv}`);
      return { synced: newVariables.length, skipped: 0 };
    }

    // Add new variables to target
    target.variables.push(...newVariables);
    target.lastModified = new Date();
    
    await this.saveEnvironment(target);
    
    return { synced: newVariables.length, skipped: diff.modified.length };
  }
}
