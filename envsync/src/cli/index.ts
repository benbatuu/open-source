#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { diffCommand } from './commands/diff';
import { syncCommand } from './commands/sync';
import { pushCommand } from './commands/push';
import { pullCommand } from './commands/pull';
import { studioCommand } from './commands/studio';
import { listCommand } from './commands/list';

const program = new Command();

program
  .name('envsync')
  .description('Effortless Environment Variable Management for Developers')
  .version('1.0.0');

// Initialize command
program
  .command('init')
  .description('Initialize EnvSync in your project')
  .option('-p, --project <name>', 'Project name')
  .option('-e, --environments <envs>', 'Comma-separated list of environments')
  .action(initCommand);

// Add environment command
program
  .command('add <environment>')
  .description('Add a new environment')
  .option('-f, --file <path>', 'Path to existing .env file')
  .action(addCommand);

// Diff command
program
  .command('diff <env1> <env2>')
  .description('Compare two environments')
  .option('-v, --verbose', 'Show detailed differences')
  .action(diffCommand);

// Sync command
program
  .command('sync <source> <target>')
  .description('Sync variables from source to target environment')
  .option('-f, --force', 'Overwrite existing variables')
  .option('-d, --dry-run', 'Show what would be synced without making changes')
  .action(syncCommand);

// Push command
program
  .command('push <environment>')
  .description('Backup environment to storage')
  .option('-r, --remote', 'Push to remote storage')
  .action(pushCommand);

// Pull command
program
  .command('pull <environment>')
  .description('Restore environment from storage')
  .option('-r, --remote', 'Pull from remote storage')
  .action(pullCommand);

// List command
program
  .command('list')
  .description('List all environments and their variables')
  .option('-e, --env <environment>', 'Show specific environment')
  .action(listCommand);

// Studio command
program
  .command('studio')
  .description('Launch EnvSync Studio web interface')
  .option('-p, --port <port>', 'Port to run studio on', '3001')
  .option('-h, --host <host>', 'Host to bind to', 'localhost')
  .action(studioCommand);

// Global error handling
program.exitOverride();

try {
  program.parse();
} catch (err) {
  console.error(chalk.red('Error:'), err instanceof Error ? err.message : 'Unknown error');
  process.exit(1);
}
