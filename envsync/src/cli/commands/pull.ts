import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { ConfigManager } from '../../utils/config';
import { EnvManager } from '../../utils/env';
import { CryptoService } from '../../utils/encrypt';
import { Environment } from '../../types';

export async function pullCommand(environment: string, options: { remote?: boolean }) {
  const spinner = ora(`Restoring ${environment} environment...`).start();

  try {
    const configManager = new ConfigManager();
    const config = await configManager.load();

    if (!config) {
      spinner.fail('EnvSync not initialized. Run "envsync init" first.');
      return;
    }

    const envManager = new EnvManager(config);

    if (options.remote) {
      console.log(chalk.yellow('\n⚠️  Remote restore not yet implemented'));
      console.log(chalk.gray('This feature will be available in a future version'));
      return;
    }

    // Look for backup files
    const backupDir = path.resolve(config.storage.path || './env', 'backups');
    
    if (!(await fs.pathExists(backupDir))) {
      spinner.fail('No backup directory found');
      return;
    }

    const backupFiles = (await fs.readdir(backupDir))
      .filter(file => file.startsWith(`${environment}-`) && file.endsWith('.json'))
      .sort()
      .reverse(); // Most recent first

    if (backupFiles.length === 0) {
      spinner.fail(`No backups found for environment "${environment}"`);
      return;
    }

    // If multiple backups, let user choose
    let selectedBackup = backupFiles[0];
    if (backupFiles.length > 1) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'backup',
          message: 'Select backup to restore:',
          choices: backupFiles.map(file => ({
            name: `${file} (${new Date(file.split('-').slice(1).join('-').replace('.json', '')).toLocaleString()})`,
            value: file
          }))
        }
      ]);
      selectedBackup = answers.backup;
    }

    const backupPath = path.join(backupDir, selectedBackup);
    const backupData: Environment = await fs.readJson(backupPath);

    // Decrypt data if encrypted
    let restoredEnv = backupData;
    if (config.encryption.enabled && config.encryption.key && backupData.variables.some(v => v.encrypted)) {
      try {
        const cryptoService = new CryptoService(config.encryption.key);
        restoredEnv = {
          ...backupData,
          variables: backupData.variables.map(v => ({
            ...v,
            value: v.encrypted ? cryptoService.decrypt(v.value) : v.value,
            encrypted: false
          }))
        };
      } catch (error) {
        spinner.fail('Failed to decrypt backup data');
        console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
        return;
      }
    }

    // Check if target environment already exists
    const existingEnv = await envManager.loadEnvironment(environment);
    if (existingEnv.variables.length > 0) {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Environment "${environment}" already exists with ${existingEnv.variables.length} variables. Overwrite?`,
          default: false
        }
      ]);

      if (!answers.overwrite) {
        spinner.info('Restore cancelled');
        return;
      }
    }

    // Restore environment
    await envManager.saveEnvironment(restoredEnv);

    spinner.succeed(`✅ Environment "${environment}" restored successfully`);

    console.log(chalk.green(`\n🔄 Restored from: ${selectedBackup}`));
    console.log(chalk.gray(`📊 Variables restored: ${restoredEnv.variables.length}`));
    console.log(chalk.gray(`📅 Backup date: ${new Date(selectedBackup.split('-').slice(1).join('-').replace('.json', '')).toLocaleString()}`));

  } catch (error) {
    spinner.fail('Failed to restore environment');
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
