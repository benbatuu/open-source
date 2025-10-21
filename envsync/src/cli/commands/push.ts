import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { ConfigManager } from '../../utils/config';
import { EnvManager } from '../../utils/env';
import { CryptoService } from '../../utils/encrypt';

export async function pushCommand(environment: string, options: { remote?: boolean }) {
  const spinner = ora(`Backing up ${environment} environment...`).start();

  try {
    const configManager = new ConfigManager();
    const config = await configManager.load();

    if (!config) {
      spinner.fail('EnvSync not initialized. Run "envsync init" first.');
      return;
    }

    const envManager = new EnvManager(config);

    // Check if environment exists
    const env = await envManager.loadEnvironment(environment);
    if (env.variables.length === 0) {
      spinner.fail(`Environment "${environment}" is empty`);
      return;
    }

    // Create backup directory
    const backupDir = path.resolve(config.storage.path || './env', 'backups');
    await fs.ensureDir(backupDir);

    // Generate backup filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `${environment}-${timestamp}.json`);

    // Encrypt data if encryption is enabled
    let backupData = env;
    if (config.encryption.enabled && config.encryption.key) {
      try {
        const cryptoService = new CryptoService(config.encryption.key);
        const serializedData = JSON.stringify(env);
        const encryptedData = cryptoService.encrypt(serializedData);
        
        backupData = {
          ...env,
          variables: env.variables.map(v => ({
            ...v,
            value: cryptoService.encrypt(v.value),
            encrypted: true
          }))
        };
      } catch (error) {
        spinner.warn('Encryption failed, creating unencrypted backup');
      }
    }

    // Save backup
    await fs.writeJson(backupFile, backupData, { spaces: 2 });

    spinner.succeed(`✅ Environment "${environment}" backed up successfully`);

    console.log(chalk.green(`\n💾 Backup created: ${backupFile}`));
    console.log(chalk.gray(`📊 Variables backed up: ${env.variables.length}`));
    console.log(chalk.gray(`🔒 Encrypted: ${config.encryption.enabled ? 'Yes' : 'No'}`));

    if (options.remote) {
      console.log(chalk.yellow('\n⚠️  Remote backup not yet implemented'));
      console.log(chalk.gray('This feature will be available in a future version'));
    }

  } catch (error) {
    spinner.fail('Failed to backup environment');
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
