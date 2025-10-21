import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { ConfigManager } from '../../utils/config';
import { CryptoService } from '../../utils/encrypt';
import { EnvManager } from '../../utils/env';

export async function initCommand(options: { project?: string; environments?: string }) {
  const spinner = ora('Initializing EnvSync...').start();

  try {
    const configManager = new ConfigManager();
    
    // Check if already initialized
    if (await configManager.exists()) {
      spinner.fail('EnvSync is already initialized in this project');
      return;
    }

    // Get project name
    let projectName = options.project || 'my-project';

    // Get environments
    let environments = ['development', 'staging', 'production'];
    if (options.environments) {
      environments = options.environments.split(',').map(env => env.trim());
    }

    // Generate encryption key if not provided
    let encryptionKey = process.env.ENVSYNC_SECRET_KEY;
    if (!encryptionKey) {
      encryptionKey = CryptoService.generateSecretKey();
      console.log(chalk.yellow('\n⚠️  Generated encryption key. Add this to your environment:'));
      console.log(chalk.cyan(`export ENVSYNC_SECRET_KEY="${encryptionKey}"`));
    }

    // Create config
    const config = await configManager.createDefault(projectName);
    config.environments = environments;
    config.encryption.key = encryptionKey;

    await configManager.save(config);

    // Initialize environment manager and create directories
    const envManager = new EnvManager(config);
    await envManager.ensureEnvDirectory();

    // Create initial environment files
    for (const env of environments) {
      const envPath = envManager.getEnvFilePath(env);
      if (!(await require('fs-extra').pathExists(envPath))) {
        await require('fs-extra').writeFile(envPath, `# ${env} environment variables\n`, 'utf8');
      }
    }

    spinner.succeed(`✅ Project initialized: ${projectName}`);
    
    console.log(chalk.green('\n🎉 EnvSync is ready!'));
    console.log(chalk.gray('\nNext steps:'));
    console.log(chalk.gray('  • Add variables: envsync add development'));
    console.log(chalk.gray('  • Compare environments: envsync diff development production'));
    console.log(chalk.gray('  • Sync variables: envsync sync development staging'));
    console.log(chalk.gray('  • Launch studio: envsync studio'));

  } catch (error) {
    spinner.fail('Failed to initialize EnvSync');
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
