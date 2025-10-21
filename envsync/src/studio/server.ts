import express from 'express';
import cors from 'cors';
import path from 'path';
import { ConfigManager } from '../utils/config';
import { EnvManager } from '../utils/env';
import { Environment, EnvironmentVariable } from '../types';

export function createStudioServer(config: any, options: { port: number; host: string }) {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../studio/public')));

  // API Routes
  app.get('/api/environments', async (req, res) => {
    try {
      const envManager = new EnvManager(config);
      const environments = await envManager.listEnvironments();
      const envData = await Promise.all(
        environments.map(async (name) => {
          const env = await envManager.loadEnvironment(name);
          return {
            name: env.name,
            variableCount: env.variables.length,
            lastModified: env.lastModified,
            checksum: env.checksum
          };
        })
      );
      res.json(envData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load environments' });
    }
  });

  app.get('/api/environments/:name', async (req, res) => {
    try {
      const envManager = new EnvManager(config);
      const environment = await envManager.loadEnvironment(req.params.name);
      res.json(environment);
    } catch (error) {
      res.status(404).json({ error: 'Environment not found' });
    }
  });

  app.put('/api/environments/:name', async (req, res) => {
    try {
      const envManager = new EnvManager(config);
      const environment: Environment = {
        name: req.params.name,
        variables: req.body.variables || [],
        lastModified: new Date(),
        checksum: ''
      };
      
      await envManager.saveEnvironment(environment);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save environment' });
    }
  });

  app.get('/api/environments/:env1/diff/:env2', async (req, res) => {
    try {
      const envManager = new EnvManager(config);
      const env1 = await envManager.loadEnvironment(req.params.env1);
      const env2 = await envManager.loadEnvironment(req.params.env2);
      const diff = envManager.diffEnvironments(env1, env2);
      res.json(diff);
    } catch (error) {
      res.status(500).json({ error: 'Failed to compare environments' });
    }
  });

  app.post('/api/environments/:source/sync/:target', async (req, res) => {
    try {
      const envManager = new EnvManager(config);
      const { force = false } = req.body;
      
      const result = await envManager.syncEnvironments(
        req.params.source,
        req.params.target,
        { force }
      );
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to sync environments' });
    }
  });

    // Serve the studio interface
  app.get('*', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en" x-data="{ darkMode: localStorage.getItem('darkMode') === 'true' }" :class="{ 'dark': darkMode }">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EnvSync Studio</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            darkMode: 'class',
            theme: {
              extend: {
                colors: {
                  primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                  }
                }
              }
            }
          }
        </script>
        <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          .gradient-bg {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #6366f1 75%, #8b5cf6 100%);
          }
          .dark .gradient-bg {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 75%, #475569 100%);
          }
          .glass-effect {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .dark .glass-effect {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .card-hover {
            transition: all 0.3s ease;
          }
          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          .dark .card-hover:hover {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
          }
        </style>
      </head>
      <body class="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div id="app" x-data="envSyncStudio()">
          <!-- Header -->
          <header class="gradient-bg shadow-lg">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center py-6">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <i class="fas fa-sync-alt text-white text-xl"></i>
                    </div>
                    <div>
                      <h1 class="text-2xl font-bold text-white">EnvSync Studio</h1>
                      <p class="text-white/80 text-sm">Environment Variable Manager</p>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-2 text-white/90">
                    <i class="fas fa-project-diagram"></i>
                    <span class="text-sm font-medium">${config.project}</span>
                  </div>
                  <button @click="toggleDarkMode()" class="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                    <i class="fas fa-moon text-white" x-show="!darkMode"></i>
                    <i class="fas fa-sun text-white" x-show="darkMode"></i>
                  </button>
                  <button @click="refreshEnvironments()" class="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
                    <i class="fas fa-sync-alt"></i>
                    <span>Refresh</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <!-- Main Content -->
          <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg card-hover">
                <div class="flex items-center">
                  <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <i class="fas fa-layer-group text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Environments</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white" x-text="environments.length"></p>
                  </div>
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg card-hover">
                <div class="flex items-center">
                  <div class="p-3 rounded-full bg-green-100 dark:bg-green-900">
                    <i class="fas fa-key text-green-600 dark:text-green-400"></i>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Variables</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white" x-text="environments.reduce((sum, env) => sum + env.variableCount, 0)"></p>
                  </div>
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg card-hover">
                <div class="flex items-center">
                  <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                    <i class="fas fa-shield-alt text-purple-600 dark:text-purple-400"></i>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Encryption</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">AES-256</p>
                  </div>
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg card-hover">
                <div class="flex items-center">
                  <div class="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                    <i class="fas fa-clock text-orange-600 dark:text-orange-400"></i>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</p>
                    <p class="text-sm font-bold text-gray-900 dark:text-white" x-text="new Date().toLocaleDateString()"></p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Environment Cards -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Environments</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <template x-for="env in environments" :key="env.name">
                  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg card-hover cursor-pointer border border-gray-200 dark:border-gray-700" 
                       @click="selectEnvironment(env.name)"
                       :class="{ 'ring-2 ring-blue-500': selectedEnvironment === env.name }">
                    <div class="p-6">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                               :class="{
                                 'bg-gradient-to-r from-blue-500 to-blue-600': env.name === 'development',
                                 'bg-gradient-to-r from-yellow-500 to-yellow-600': env.name === 'staging',
                                 'bg-gradient-to-r from-red-500 to-red-600': env.name === 'production',
                                 'bg-gradient-to-r from-gray-500 to-gray-600': !['development', 'staging', 'production'].includes(env.name)
                               }">
                            <span x-text="env.name.charAt(0).toUpperCase()"></span>
                          </div>
                          <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white capitalize" x-text="env.name"></h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Environment</p>
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <span class="px-2 py-1 text-xs font-medium rounded-full"
                                :class="env.variableCount > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'">
                            <span x-text="env.variableCount"></span> vars
                          </span>
                        </div>
                      </div>
                      <div class="space-y-2">
                        <div class="flex items-center justify-between text-sm">
                          <span class="text-gray-500 dark:text-gray-400">Variables</span>
                          <span class="font-medium text-gray-900 dark:text-white" x-text="env.variableCount"></span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                          <span class="text-gray-500 dark:text-gray-400">Modified</span>
                          <span class="font-medium text-gray-900 dark:text-white" x-text="new Date(env.lastModified).toLocaleDateString()"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- Environment Details -->
            <div x-show="selectedEnvironment" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <i class="fas fa-cog text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <div>
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white capitalize" x-text="selectedEnvironment"></h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Environment Variables</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="exportEnvironment()" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                      <i class="fas fa-download mr-2"></i>Export
                    </button>
                    <button @click="showAddForm = !showAddForm" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      <i class="fas fa-plus mr-2"></i>Add Variable
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="p-6">
                <!-- Variables Table -->
                <div x-show="currentVariables.length > 0" class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr class="border-b border-gray-200 dark:border-gray-700">
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Key</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                      <template x-for="(variable, index) in currentVariables" :key="variable.key">
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <i class="fas fa-key text-gray-400 mr-2"></i>
                              <span class="text-sm font-medium text-gray-900 dark:text-white" x-text="variable.key"></span>
                            </div>
                          </td>
                          <td class="px-6 py-4">
                            <div class="flex items-center">
                              <span class="text-sm text-gray-600 dark:text-gray-300 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded" x-text="variable.value"></span>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex items-center space-x-2">
                              <button @click="editVariable(index)" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                <i class="fas fa-edit"></i>
                              </button>
                              <button @click="deleteVariable(index)" class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                                <i class="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>

                <!-- Empty State -->
                <div x-show="currentVariables.length === 0" class="text-center py-12">
                  <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <i class="fas fa-key text-gray-400 text-2xl"></i>
                  </div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No variables found</h3>
                  <p class="text-gray-500 dark:text-gray-400 mb-4">Get started by adding your first environment variable.</p>
                  <button @click="showAddForm = true" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <i class="fas fa-plus mr-2"></i>Add Variable
                  </button>
                </div>

                <!-- Add Variable Form -->
                <div x-show="showAddForm" class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                    <span x-show="editingIndex === null">Add New Variable</span>
                    <span x-show="editingIndex !== null">Edit Variable</span>
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key</label>
                      <input type="text" x-model="newVariable.key" placeholder="DATABASE_URL" 
                             class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Value</label>
                      <input type="text" x-model="newVariable.value" placeholder="postgresql://localhost:5432/db" 
                             class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <div class="flex items-end space-x-2">
                      <button @click="addVariable()" 
                              class="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                        <i class="fas fa-plus mr-2" x-show="editingIndex === null"></i>
                        <i class="fas fa-save mr-2" x-show="editingIndex !== null"></i>
                        <span x-show="editingIndex === null">Add</span>
                        <span x-show="editingIndex !== null">Save</span>
                      </button>
                      <button @click="cancelEdit()" 
                              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <script>
          function envSyncStudio() {
            return {
              environments: [],
              selectedEnvironment: null,
              currentVariables: [],
              newVariable: { key: '', value: '' },
              showAddForm: false,
              editingIndex: null,
              darkMode: localStorage.getItem('darkMode') === 'true',

              async init() {
                await this.refreshEnvironments();
                this.applyDarkMode();
              },

              toggleDarkMode() {
                this.darkMode = !this.darkMode;
                localStorage.setItem('darkMode', this.darkMode);
                this.applyDarkMode();
              },

              applyDarkMode() {
                if (this.darkMode) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              },

              async refreshEnvironments() {
                try {
                  const response = await fetch('/api/environments');
                  this.environments = await response.json();
                } catch (error) {
                  console.error('Failed to load environments:', error);
                }
              },

              async selectEnvironment(envName) {
                this.selectedEnvironment = envName;
                this.showAddForm = false;
                this.editingIndex = null;
                this.newVariable = { key: '', value: '' };
                try {
                  const response = await fetch(\`/api/environments/\${envName}\`);
                  const env = await response.json();
                  this.currentVariables = env.variables || [];
                } catch (error) {
                  console.error('Failed to load environment:', error);
                }
              },

              async addVariable() {
                if (!this.newVariable.key || !this.newVariable.value) return;
                
                if (this.editingIndex !== null) {
                  // Update existing variable
                  this.currentVariables[this.editingIndex] = { ...this.newVariable };
                  this.editingIndex = null;
                } else {
                  // Add new variable
                  this.currentVariables.push({ ...this.newVariable });
                }
                
                this.newVariable = { key: '', value: '' };
                this.showAddForm = false;
                
                // Save to server
                try {
                  await fetch(\`/api/environments/\${this.selectedEnvironment}\`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ variables: this.currentVariables })
                  });
                  await this.refreshEnvironments();
                } catch (error) {
                  console.error('Failed to save variable:', error);
                }
              },

              editVariable(index) {
                const variable = this.currentVariables[index];
                this.newVariable = { ...variable };
                this.editingIndex = index;
                this.showAddForm = true;
              },

              cancelEdit() {
                this.showAddForm = false;
                this.editingIndex = null;
                this.newVariable = { key: '', value: '' };
              },

              deleteVariable(index) {
                if (confirm('Are you sure you want to delete this variable?')) {
                  this.currentVariables.splice(index, 1);
                  // Save to server
                  this.saveEnvironment();
                }
              },

              async saveEnvironment() {
                try {
                  await fetch(\`/api/environments/\${this.selectedEnvironment}\`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ variables: this.currentVariables })
                  });
                  await this.refreshEnvironments();
                } catch (error) {
                  console.error('Failed to save environment:', error);
                }
              },

              exportEnvironment() {
                const data = this.currentVariables.map(v => \`\${v.key}=\${v.value}\`).join('\\n');
                const blob = new Blob([data], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = \`.env.\${this.selectedEnvironment}\`;
                a.click();
                URL.revokeObjectURL(url);
              }
            }
          }
        </script>
      </body>
      </html>
    `);
  });

  return app;
}
