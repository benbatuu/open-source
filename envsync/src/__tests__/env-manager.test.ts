import { EnvManager } from '../utils/env';
import { EnvSyncConfig } from '../types';

describe('EnvManager', () => {
  const mockConfig: EnvSyncConfig = {
    project: 'test-project',
    environments: ['development', 'staging'],
    storage: {
      type: 'local',
      path: './test-env'
    },
    encryption: {
      enabled: false
    },
    version: '1.0.0'
  };

  let envManager: EnvManager;

  beforeEach(() => {
    envManager = new EnvManager(mockConfig);
  });

  describe('parseEnvContent', () => {
    it('should parse environment variables correctly', () => {
      const content = `
# This is a comment
DATABASE_URL=postgresql://localhost:5432/test
API_KEY=test-key-123
EMPTY_VAR=
# Another comment
NODE_ENV=development
      `;

      const variables = envManager.parseEnvContent(content);

      expect(variables).toHaveLength(4);
      expect(variables[0]).toEqual({
        key: 'DATABASE_URL',
        value: 'postgresql://localhost:5432/test',
        encrypted: false
      });
      expect(variables[1]).toEqual({
        key: 'API_KEY',
        value: 'test-key-123',
        encrypted: false
      });
      expect(variables[2]).toEqual({
        key: 'EMPTY_VAR',
        value: '',
        encrypted: false
      });
      expect(variables[3]).toEqual({
        key: 'NODE_ENV',
        value: 'development',
        encrypted: false
      });
    });

    it('should handle quoted values', () => {
      const content = `
DATABASE_URL="postgresql://localhost:5432/test"
API_KEY='test-key-123'
      `;

      const variables = envManager.parseEnvContent(content);

      expect(variables).toHaveLength(2);
      expect(variables[0].value).toBe('postgresql://localhost:5432/test');
      expect(variables[1].value).toBe('test-key-123');
    });
  });

  describe('serializeEnvContent', () => {
    it('should serialize variables to env format', () => {
      const variables = [
        { key: 'DATABASE_URL', value: 'postgresql://localhost:5432/test', encrypted: false },
        { key: 'API_KEY', value: 'test-key-123', encrypted: false }
      ];

      const content = envManager.serializeEnvContent(variables);

      expect(content).toBe('DATABASE_URL=postgresql://localhost:5432/test\nAPI_KEY=test-key-123\n');
    });

    it('should include comments when provided', () => {
      const variables = [
        { key: 'DATABASE_URL', value: 'postgresql://localhost:5432/test', encrypted: false, comment: 'Database connection string' }
      ];

      const content = envManager.serializeEnvContent(variables);

      expect(content).toBe('DATABASE_URL=postgresql://localhost:5432/test # Database connection string\n');
    });
  });

  describe('diffEnvironments', () => {
    it('should detect added variables', () => {
      const env1 = {
        name: 'env1',
        variables: [
          { key: 'VAR1', value: 'value1', encrypted: false }
        ],
        lastModified: new Date(),
        checksum: ''
      };

      const env2 = {
        name: 'env2',
        variables: [
          { key: 'VAR1', value: 'value1', encrypted: false },
          { key: 'VAR2', value: 'value2', encrypted: false }
        ],
        lastModified: new Date(),
        checksum: ''
      };

      const diff = envManager.diffEnvironments(env1, env2);

      expect(diff.added).toHaveLength(1);
      expect(diff.added[0].key).toBe('VAR2');
      expect(diff.removed).toHaveLength(0);
      expect(diff.modified).toHaveLength(0);
      expect(diff.unchanged).toHaveLength(1);
    });

    it('should detect removed variables', () => {
      const env1 = {
        name: 'env1',
        variables: [
          { key: 'VAR1', value: 'value1', encrypted: false },
          { key: 'VAR2', value: 'value2', encrypted: false }
        ],
        lastModified: new Date(),
        checksum: ''
      };

      const env2 = {
        name: 'env2',
        variables: [
          { key: 'VAR1', value: 'value1', encrypted: false }
        ],
        lastModified: new Date(),
        checksum: ''
      };

      const diff = envManager.diffEnvironments(env1, env2);

      expect(diff.removed).toHaveLength(1);
      expect(diff.removed[0].key).toBe('VAR2');
      expect(diff.added).toHaveLength(0);
      expect(diff.modified).toHaveLength(0);
      expect(diff.unchanged).toHaveLength(1);
    });

    it('should detect modified variables', () => {
      const env1 = {
        name: 'env1',
        variables: [
          { key: 'VAR1', value: 'value1', encrypted: false }
        ],
        lastModified: new Date(),
        checksum: ''
      };

      const env2 = {
        name: 'env2',
        variables: [
          { key: 'VAR1', value: 'value2', encrypted: false }
        ],
        lastModified: new Date(),
        checksum: ''
      };

      const diff = envManager.diffEnvironments(env1, env2);

      expect(diff.modified).toHaveLength(1);
      expect(diff.modified[0].variable.key).toBe('VAR1');
      expect(diff.modified[0].oldValue).toBe('value1');
      expect(diff.modified[0].newValue).toBe('value2');
      expect(diff.added).toHaveLength(0);
      expect(diff.removed).toHaveLength(0);
      expect(diff.unchanged).toHaveLength(0);
    });
  });
});
