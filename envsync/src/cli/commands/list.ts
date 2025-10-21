import chalk from 'chalk';
import ora from 'ora';
import { ConfigManager } from '../../utils/config';
import { EnvManager } from '../../utils/env';

export async function listCommand(options: { env?: string }) {
  const spinner = ora('Loading environments...').start();

  try {
    const configManager = new ConfigManager();
    const config = await configManager.load();

    if (!config) {
      spinner.fail('EnvSync not initialized. Run "envsync init" first.');
      return;
    }

    const envManager = new EnvManager(config);
    const environments = await envManager.listEnvironments();

    if (environments.length === 0) {
      spinner.warn('No environments found');
      console.log(chalk.gray('\nCreate your first environment with: envsync add development'));
      return;
    }

    spinner.succeed(`Found ${environments.length} environment(s)`);

    if (options.env) {
      // Show specific environment
      if (!environments.includes(options.env)) {
        console.log(chalk.red(`Environment "${options.env}" not found`));
        console.log(chalk.gray('Available environments:'), environments.join(', '));
        return;
      }

      const env = await envManager.loadEnvironment(options.env);
      console.log(chalk.blue(`\n📋 Environment: ${options.env}`));
      console.log(chalk.gray('─'.repeat(40)));

      if (env.variables.length === 0) {
        console.log(chalk.gray('No variables defined'));
      } else {
        env.variables.forEach(variable => {
          console.log(chalk.green(`  ${variable.key}=${variable.value}`));
        });
      }

      console.log(chalk.gray(`\n📊 Total variables: ${env.variables.length}`));
      console.log(chalk.gray(`📅 Last modified: ${env.lastModified.toLocaleString()}`));
    } else {
      // Show all environments
      console.log(chalk.blue('\n📋 Available Environments'));
      console.log(chalk.gray('─'.repeat(40)));

      for (const envName of environments) {
        const env = await envManager.loadEnvironment(envName);
        const status = env.variables.length > 0 ? 
          chalk.green(`✓ ${env.variables.length} variables`) : 
          chalk.gray('Empty');

        console.log(chalk.cyan(`  ${envName}`));
        console.log(chalk.gray(`    ${status}`));
        console.log(chalk.gray(`    Modified: ${env.lastModified.toLocaleString()}`));
        console.log();
      }

      console.log(chalk.gray('Use "envsync list -e <environment>" to see variables'));
    }

  } catch (error) {
    spinner.fail('Failed to list environments');
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
