import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { ConfigManager } from '../../utils/config';
import { EnvManager } from '../../utils/env';

export async function addCommand(environment: string, options: { file?: string }) {
  const spinner = ora(`Adding environment: ${environment}`).start();

  try {
    const configManager = new ConfigManager();
    const config = await configManager.load();

    if (!config) {
      spinner.fail('EnvSync not initialized. Run "envsync init" first.');
      return;
    }

    const envManager = new EnvManager(config);

    // Check if environment already exists
    const existingEnvs = await envManager.listEnvironments();
    if (existingEnvs.includes(environment)) {
      spinner.fail(`Environment "${environment}" already exists`);
      return;
    }

    // If file option is provided, copy from existing file
    if (options.file) {
      const sourcePath = path.resolve(options.file);
      if (!(await fs.pathExists(sourcePath))) {
        spinner.fail(`Source file not found: ${sourcePath}`);
        return;
      }

      const content = await fs.readFile(sourcePath, 'utf8');
      const envPath = envManager.getEnvFilePath(environment);
      await fs.writeFile(envPath, content, 'utf8');
      
      spinner.succeed(`✅ Environment "${environment}" created from ${options.file}`);
    } else {
      // Create empty environment file
      const envPath = envManager.getEnvFilePath(environment);
      await fs.writeFile(envPath, `# ${environment} environment variables\n`, 'utf8');
      
      spinner.succeed(`✅ Environment "${environment}" created`);
    }

    // Add to config if not already present
    if (!config.environments.includes(environment)) {
      config.environments.push(environment);
      await configManager.save(config);
    }

    console.log(chalk.green(`\n📄 Created ${envManager.getEnvFilePath(environment)}`));
    console.log(chalk.gray('You can now edit this file or use the studio interface.'));

  } catch (error) {
    spinner.fail('Failed to add environment');
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
