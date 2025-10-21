import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { ConfigManager } from '../../utils/config';
import { EnvManager } from '../../utils/env';

export async function syncCommand(source: string, target: string, options: { force?: boolean; dryRun?: boolean }) {
  const spinner = ora(`Syncing ${source} → ${target}...`).start();

  try {
    const configManager = new ConfigManager();
    const config = await configManager.load();

    if (!config) {
      spinner.fail('EnvSync not initialized. Run "envsync init" first.');
      return;
    }

    const envManager = new EnvManager(config);

    // Check if source environment exists
    const sourceEnv = await envManager.loadEnvironment(source);
    if (sourceEnv.variables.length === 0) {
      spinner.fail(`Source environment "${source}" is empty`);
      return;
    }

    // Check if target environment exists
    const targetEnv = await envManager.loadEnvironment(target);
    if (targetEnv.variables.length === 0) {
      spinner.warn(`Target environment "${target}" is empty`);
    }

    // Calculate what would be synced
    const diff = envManager.diffEnvironments(targetEnv, sourceEnv);
    const newVariables = diff.added;
    const conflictingVariables = diff.modified;

    if (newVariables.length === 0 && conflictingVariables.length === 0) {
      spinner.succeed('✅ Environments are already in sync');
      return;
    }

    // Show what will be synced
    console.log(chalk.blue(`\n📋 Sync Preview: ${source} → ${target}`));
    console.log(chalk.gray('─'.repeat(40)));

    if (newVariables.length > 0) {
      console.log(chalk.green(`\n➕ New variables to add (${newVariables.length}):`));
      newVariables.forEach(variable => {
        console.log(chalk.green(`  + ${variable.key}`));
      });
    }

    if (conflictingVariables.length > 0) {
      console.log(chalk.yellow(`\n🔄 Conflicting variables (${conflictingVariables.length}):`));
      conflictingVariables.forEach(({ variable, oldValue, newValue }) => {
        console.log(chalk.yellow(`  ~ ${variable.key}`));
        console.log(chalk.red(`    Current: ${oldValue}`));
        console.log(chalk.green(`    New: ${newValue}`));
      });

      if (!options.force) {
        console.log(chalk.gray('\nUse --force to overwrite conflicting variables'));
      }
    }

    // Confirm sync if not dry run
    if (!options.dryRun) {
      if (conflictingVariables.length > 0 && !options.force) {
        const answers = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'proceed',
            message: `Found ${conflictingVariables.length} conflicting variables. Continue without overwriting?`,
            default: true
          }
        ]);

        if (!answers.proceed) {
          spinner.info('Sync cancelled');
          return;
        }
      } else if (options.force && conflictingVariables.length > 0) {
        const answers = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'proceed',
            message: `This will overwrite ${conflictingVariables.length} existing variables. Continue?`,
            default: false
          }
        ]);

        if (!answers.proceed) {
          spinner.info('Sync cancelled');
          return;
        }
      }
    }

    // Perform sync
    const result = await envManager.syncEnvironments(source, target, {
      force: options.force,
      dryRun: options.dryRun
    });

    if (options.dryRun) {
      spinner.succeed(`✅ Dry run complete: ${result.synced} variables would be synced`);
    } else {
      spinner.succeed(`✅ Sync complete: ${result.synced} variables synced`);
      
      if (result.skipped > 0) {
        console.log(chalk.yellow(`⚠️  ${result.skipped} variables skipped (use --force to overwrite)`));
      }
    }

    console.log(chalk.green(`\n🎉 ${target} environment updated successfully!`));

  } catch (error) {
    spinner.fail('Failed to sync environments');
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
