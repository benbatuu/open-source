import { Plugin, PluginConfig, PluginHooks } from '../../types';
import { logger } from '../logger/logger';

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private hooks: Map<string, PluginHooks[]> = new Map();

  async loadPlugin(pluginConfig: PluginConfig): Promise<void> {
    try {
      if (!pluginConfig.enabled) {
        logger.debug(`Plugin ${pluginConfig.name} is disabled, skipping`);
        return;
      }

      // In a real implementation, this would dynamically import the plugin
      // For now, we'll create a placeholder
      const plugin: Plugin = {
        name: pluginConfig.name,
        version: '1.0.0',
        description: `Plugin ${pluginConfig.name}`,
        hooks: {},
        init: async (_config: any) => {
          logger.info(`Initializing plugin: ${pluginConfig.name}`);
        },
        destroy: async () => {
          logger.info(`Destroying plugin: ${pluginConfig.name}`);
        },
      };

      this.plugins.set(pluginConfig.name, plugin);
      this.registerHooks(pluginConfig.name, plugin.hooks);

      if (plugin.init) {
        await plugin.init(pluginConfig.config || {});
      }

      logger.info(`Plugin ${pluginConfig.name} loaded successfully`);
    } catch (error) {
      logger.error(`Failed to load plugin ${pluginConfig.name}:`, error);
      throw error;
    }
  }

  private registerHooks(pluginName: string, hooks?: PluginHooks): void {
    if (!hooks) return;

    const hookTypes: (keyof PluginHooks)[] = [
      'beforeTest',
      'afterTest',
      'beforeSuite',
      'afterSuite',
      'beforeAll',
      'afterAll',
    ];

    for (const hookType of hookTypes) {
      if (hooks[hookType]) {
        if (!this.hooks.has(hookType)) {
          this.hooks.set(hookType, []);
        }
        this.hooks.get(hookType)!.push(hooks);
        logger.debug(`Registered ${hookType} hook for plugin ${pluginName}`);
      }
    }
  }

  async executeHook(hookType: keyof PluginHooks, ...args: any[]): Promise<void> {
    const hooks = this.hooks.get(hookType);
    if (!hooks) return;

    for (const hook of hooks) {
      try {
        const hookFunction = hook[hookType];
        if (hookFunction) {
          await hookFunction(args[0]);
        }
      } catch (error) {
        logger.error(`Error executing ${hookType} hook:`, error);
        throw error;
      }
    }
  }

  async unloadPlugin(pluginName: string): Promise<void> {
    const plugin = this.plugins.get(pluginName);
    if (!plugin) {
      logger.warn(`Plugin ${pluginName} not found`);
      return;
    }

    try {
      if (plugin.destroy) {
        await plugin.destroy();
      }

      // Remove hooks
      for (const [hookType, hooks] of this.hooks.entries()) {
        const filteredHooks = hooks.filter(_hook => {
          // This is a simplified approach - in reality, we'd need to track which hooks belong to which plugin
          return true; // For now, we'll keep all hooks
        });
        this.hooks.set(hookType, filteredHooks);
      }

      this.plugins.delete(pluginName);
      logger.info(`Plugin ${pluginName} unloaded successfully`);
    } catch (error) {
      logger.error(`Failed to unload plugin ${pluginName}:`, error);
      throw error;
    }
  }

  getPlugin(pluginName: string): Plugin | undefined {
    return this.plugins.get(pluginName);
  }

  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  async unloadAllPlugins(): Promise<void> {
    const pluginNames = Array.from(this.plugins.keys());
    for (const pluginName of pluginNames) {
      await this.unloadPlugin(pluginName);
    }
  }
}
