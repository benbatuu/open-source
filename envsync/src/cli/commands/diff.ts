import chalk from 'chalk';
import ora from 'ora';
import { ConfigManager } from '../../utils/config';
import { EnvManager } from '../../utils/env';

export async function diffCommand(env1: string, env2: string, options: { verbose?: boolean }) {
  const spinner = ora(`Comparing ${env1} and ${env2}...`).start();

  try {
    const configManager = new ConfigManager();
    const config = await configManager.load();

    if (!config) {
      spinner.fail('EnvSync not initialized. Run "envsync init" first.');
      return;
    }

    const envManager = new EnvManager(config);

    // Load both environments
    const environment1 = await envManager.loadEnvironment(env1);
    const environment2 = await envManager.loadEnvironment(env2);

    // Check if environments exist
    if (environment1.variables.length === 0 && environment2.variables.length === 0) {
      spinner.warn(`Both environments "${env1}" and "${env2}" are empty`);
      return;
    }

    if (environment1.variables.length === 0) {
      spinner.warn(`Environment "${env1}" is empty`);
      return;
    }

    if (environment2.variables.length === 0) {
      spinner.warn(`Environment "${env2}" is empty`);
      return;
    }

    // Calculate differences
    const diff = envManager.diffEnvironments(environment1, environment2);

    spinner.succeed(`✅ Comparison complete`);

    // Display results
    console.log(chalk.blue(`\n📊 Environment Comparison: ${env1} vs ${env2}`));
    console.log(chalk.gray('─'.repeat(50)));

    if (diff.added.length > 0) {
      console.log(chalk.green(`\n➕ Variables in ${env2} but not in ${env1} (${diff.added.length}):`));
      diff.added.forEach(variable => {
        console.log(chalk.green(`  + ${variable.key}=${options.verbose ? variable.value : '***'}`));
      });
    }

    if (diff.removed.length > 0) {
      console.log(chalk.red(`\n➖ Variables in ${env1} but not in ${env2} (${diff.removed.length}):`));
      diff.removed.forEach(variable => {
        console.log(chalk.red(`  - ${variable.key}=${options.verbose ? variable.value : '***'}`));
      });
    }

    if (diff.modified.length > 0) {
      console.log(chalk.yellow(`\n🔄 Variables with different values (${diff.modified.length}):`));
      diff.modified.forEach(({ variable, oldValue, newValue }) => {
        console.log(chalk.yellow(`  ~ ${variable.key}:`));
        console.log(chalk.red(`    ${env1}: ${options.verbose ? oldValue : '***'}`));
        console.log(chalk.green(`    ${env2}: ${options.verbose ? newValue : '***'}`));
      });
    }

    if (diff.unchanged.length > 0) {
      console.log(chalk.gray(`\n✅ Identical variables (${diff.unchanged.length})`));
      if (options.verbose) {
        diff.unchanged.forEach(variable => {
          console.log(chalk.gray(`  = ${variable.key}=${variable.value}`));
        });
      }
    }

    // Summary
    const totalChanges = diff.added.length + diff.removed.length + diff.modified.length;
    if (totalChanges === 0) {
      console.log(chalk.green('\n🎉 Environments are identical!'));
    } else {
      console.log(chalk.blue(`\n📈 Summary: ${totalChanges} differences found`));
      console.log(chalk.gray('Use "envsync sync" to synchronize environments'));
    }

  } catch (error) {
    spinner.fail('Failed to compare environments');
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
