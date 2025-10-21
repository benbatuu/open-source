export interface EnvSyncConfig {
  project: string;
  environments: string[];
  storage: {
    type: 'local' | 'cloud';
    path?: string;
    remote?: {
      provider: 'supabase' | 's3' | 'gcs';
      config: Record<string, any>;
    };
  };
  encryption: {
    enabled: boolean;
    key?: string;
  };
  version: string;
}

export interface EnvironmentVariable {
  key: string;
  value: string;
  encrypted?: boolean;
  comment?: string;
}

export interface Environment {
  name: string;
  variables: EnvironmentVariable[];
  lastModified: Date;
  checksum: string;
}

export interface DiffResult {
  added: EnvironmentVariable[];
  removed: EnvironmentVariable[];
  modified: {
    variable: EnvironmentVariable;
    oldValue: string;
    newValue: string;
  }[];
  unchanged: EnvironmentVariable[];
}

export interface SyncOptions {
  force?: boolean;
  dryRun?: boolean;
  includeComments?: boolean;
}

export interface StorageProvider {
  push(environment: string, data: Environment): Promise<void>;
  pull(environment: string): Promise<Environment>;
  list(): Promise<string[]>;
}

export interface EncryptionService {
  encrypt(data: string): string;
  decrypt(encryptedData: string): string;
  generateKey(): string;
}

export interface EnvFile {
  path: string;
  environment: string;
  variables: EnvironmentVariable[];
  exists: boolean;
}
