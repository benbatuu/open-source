import chalk from 'chalk';
import ora from 'ora';
import { spawn } from 'child_process';
import path from 'path';
import { ConfigManager } from '../../utils/config';

export async function studioCommand(options: { port?: string; host?: string }) {
  const spinner = ora('Starting EnvSync Studio...').start();

  try {
    const configManager = new ConfigManager();
    const config = await configManager.load();

    if (!config) {
      spinner.fail('EnvSync not initialized. Run "envsync init" first.');
      return;
    }

    const port = options.port || '3001';
    const host = options.host || 'localhost';

    // Check if studio directory exists
    const studioPath = path.join(__dirname, '../../../studio');
    
    // For now, we'll start a simple Express server
    // In a real implementation, this would launch the Next.js studio
    spinner.succeed('✅ EnvSync Studio starting...');

    console.log(chalk.green('\n🌐 EnvSync Studio'));
    console.log(chalk.gray('─'.repeat(30)));
    console.log(chalk.cyan(`URL: http://${host}:${port}`));
    console.log(chalk.gray('Press Ctrl+C to stop'));

    // Start the studio server
    const studioServer = require('../../studio/server').createStudioServer(config, {
      port: parseInt(port),
      host
    });

    studioServer.listen(parseInt(port), host, () => {
      console.log(chalk.green(`\n🎉 Studio is running at http://${host}:${port}`));
      console.log(chalk.gray('\nFeatures:'));
      console.log(chalk.gray('  • Visual environment management'));
      console.log(chalk.gray('  • Variable editing and comparison'));
      console.log(chalk.gray('  • Export and import functionality'));
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log(chalk.yellow('\n\n👋 Shutting down EnvSync Studio...'));
      studioServer.close(() => {
        console.log(chalk.green('✅ Studio stopped'));
        process.exit(0);
      });
    });

  } catch (error) {
    spinner.fail('Failed to start EnvSync Studio');
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
