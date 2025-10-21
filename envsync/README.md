# 🧩 EnvSync

<div align="center">

![EnvSync](https://img.shields.io/badge/EnvSync-Environment_Manager-00D4AA?style=for-the-badge&logo=dotenv&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![NPM](https://img.shields.io/npm/v/envsync?style=for-the-badge&logo=npm)

**Effortless Environment Variable Management for Developers**

*The modern way to manage, sync, and secure your environment variables across all environments.*

[📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [💻 CLI Commands](#-cli-commands) • [🌐 Web Interface](#-envsync-studio) • [🔐 Security](#-security)

</div>

---

## 🎯 What is EnvSync?

EnvSync is a powerful, developer-friendly tool that solves the common problem of managing environment variables across different environments (development, staging, production). It provides both CLI and web interfaces to help you:

- **Sync** variables between environments safely
- **Compare** environments to find missing or different variables  
- **Backup** and restore your environment configurations
- **Encrypt** sensitive data with AES-256 encryption
- **Visualize** your environments with a modern web interface

Perfect for teams who want to maintain consistency across environments while keeping sensitive data secure.

## ⚙️ Features

| 🎯 **Core Features** | 📝 **Description** |
|---------------------|-------------------|
| 🧾 **Environment Management** | Create, edit, and organize .env files for multiple environments |
| 🔄 **Smart Sync Engine** | Synchronize variables between environments with conflict detection |
| 📊 **Diff Viewer** | Compare environments and highlight differences with detailed output |
| 🔐 **AES-256 Encryption** | Secure your sensitive variables with military-grade encryption |
| 💾 **Backup & Restore** | Create encrypted backups and restore when needed |
| 🧑‍💻 **CLI-First Design** | Full terminal support with beautiful, intuitive commands |
| 🌐 **Modern Web Interface** | Prisma Studio-like dashboard with dark/light mode |
| 📱 **Responsive Design** | Works perfectly on desktop, tablet, and mobile |

## 🚀 Quick Start

### Installation

```bash
# Install globally via npm
npm install -g @bennbatuu/envsync

# Or use npx (no installation required)
npx @bennbatuu/envsync --help
```

### Initialize Your Project

```bash
# Navigate to your project directory
cd /path/to/your/project

# Initialize EnvSync
envsync init

# Or with custom options
envsync init --project "my-awesome-app" --environments "dev,staging,prod"
```

This creates:
- `envsync.config.json` - Configuration file
- `env/` directory with environment files
- Default environments: development, staging, production

### Your First Environment Variables

```bash
# Add variables to development environment
echo "DATABASE_URL=postgresql://localhost:5432/myapp_dev" >> env/.env.development
echo "API_KEY=dev-key-123" >> env/.env.development
echo "NODE_ENV=development" >> env/.env.development

# List all environments
envsync list

# View specific environment
envsync list --env development
```

### Sync Between Environments

```bash
# Compare environments
envsync diff development production

# Sync missing variables (safe, won't overwrite)
envsync sync development production

# Force sync (overwrites conflicting variables)
envsync sync development production --force

# Dry run to see what would be synced
envsync sync development production --dry-run
```

### Backup and Restore

```bash
# Create encrypted backup
envsync push production

# Restore from backup
envsync pull production

# List available backups
ls env/backups/
```

## 💻 CLI Commands

### Core Commands

#### `envsync init` - Initialize Project
```bash
# Basic initialization
envsync init

# With custom project name
envsync init --project "my-app"

# With custom environments
envsync init --environments "dev,staging,prod,test"
```

**What it does:**
- Creates `envsync.config.json` configuration file
- Sets up `env/` directory structure
- Generates encryption key (if not provided)
- Creates initial environment files

#### `envsync add` - Add New Environment
```bash
# Add new environment
envsync add testing

# Add from existing .env file
envsync add staging --file .env.staging.backup
```

**What it does:**
- Creates new `.env.{environment}` file
- Optionally copies from existing file
- Updates configuration

#### `envsync list` - List Environments
```bash
# List all environments
envsync list

# Show variables for specific environment
envsync list --env development
```

**Output example:**
```
📋 Available Environments
────────────────────────────────────────
  development
    ✓ 3 variables
    Modified: 10/21/2025, 6:19:04 PM

  production
    ✓ 3 variables
    Modified: 10/21/2025, 6:10:04 PM
```

#### `envsync diff` - Compare Environments
```bash
# Basic comparison
envsync diff development production

# Verbose output (shows actual values)
envsync diff development production --verbose
```

**Output example:**
```
📊 Environment Comparison: development vs production
──────────────────────────────────────────────────

🔄 Variables with different values (2):
  ~ DATABASE_URL:
    development: postgresql://localhost:5432/myapp_dev
    production: postgresql://prod-db:5432/myapp_prod
  ~ API_KEY:
    development: dev-key-123
    production: prod-key-456

📈 Summary: 2 differences found
```

#### `envsync sync` - Synchronize Environments
```bash
# Safe sync (won't overwrite existing)
envsync sync development production

# Force sync (overwrites conflicts)
envsync sync development production --force

# Preview what would be synced
envsync sync development production --dry-run
```

**What it does:**
- Copies missing variables from source to target
- Shows preview of changes
- Asks for confirmation on conflicts
- Preserves existing unique values

#### `envsync push` - Backup Environment
```bash
# Backup to local storage
envsync push production

# Backup to remote storage (future feature)
envsync push production --remote
```

**What it does:**
- Creates encrypted backup in `env/backups/`
- Includes timestamp in filename
- Encrypts sensitive data
- Shows backup location

#### `envsync pull` - Restore Environment
```bash
# Restore from latest backup
envsync pull production

# Restore from specific backup
envsync pull production --backup production-2025-10-21T15-19-19-339Z.json
```

**What it does:**
- Lists available backups
- Lets you choose which backup to restore
- Decrypts and restores data
- Confirms before overwriting

#### `envsync studio` - Launch Web Interface
```bash
# Start on default port (3001)
envsync studio

# Custom port and host
envsync studio --port 8080 --host 0.0.0.0
```

**What it does:**
- Starts local web server
- Opens modern dashboard
- Provides visual environment management
- Supports dark/light mode

## 🌐 EnvSync Studio

The web interface provides a beautiful, modern way to manage your environment variables.

### Features

- **📊 Dashboard**: Overview of all environments with statistics
- **🎨 Modern UI**: Clean, responsive design with dark/light mode
- **✏️ Visual Editor**: Add, edit, and delete variables with ease
- **📤 Export/Import**: Download environment files
- **🔄 Real-time Sync**: Changes reflect immediately
- **📱 Mobile Friendly**: Works on all devices

### Accessing Studio

```bash
# Start the web interface
envsync studio

# Open in browser
open http://localhost:3001
```

### Studio Interface

1. **Header**: Project info, dark mode toggle, refresh button
2. **Stats Cards**: Total environments, variables, encryption status
3. **Environment Cards**: Visual representation of each environment
4. **Variable Editor**: Table view with add/edit/delete functionality
5. **Export Tools**: Download environment files

## 🔐 Security

EnvSync takes security seriously with multiple layers of protection:

### Encryption
- **AES-256-CBC** encryption for sensitive data
- **Scrypt** key derivation for strong password hashing
- **Local encryption** - keys never leave your machine
- **Encrypted backups** with timestamp-based filenames

### Best Practices
```bash
# Set encryption key in environment
export ENVSYNC_SECRET_KEY="your-secure-key-here"

# Or let EnvSync generate one
envsync init
# Copy the generated key to your environment
```

### File Security
- `.env` files are automatically added to `.gitignore`
- Backup files are encrypted before storage
- Configuration files don't contain sensitive data
- All operations are logged for audit trails

## 📁 Project Structure

After initialization, your project will look like this:

```
your-project/
├── envsync.config.json          # Configuration file
├── env/                         # Environment files directory
│   ├── .env.development         # Development environment
│   ├── .env.staging            # Staging environment
│   ├── .env.production         # Production environment
│   └── backups/                # Encrypted backups
│       └── production-2025-10-21T15-19-19-339Z.json
└── .gitignore                  # Updated to ignore env files
```

### Configuration File

```json
{
  "project": "my-awesome-app",
  "environments": ["development", "staging", "production"],
  "storage": {
    "type": "local",
    "path": "./env"
  },
  "encryption": {
    "enabled": true,
    "key": "your-encryption-key"
  },
  "version": "1.0.0"
}
```

## 🛠️ Development Workflows

### Setting Up a New Project

```bash
# 1. Initialize EnvSync
envsync init --project "my-new-app"

# 2. Add your environments
envsync add development
envsync add staging  
envsync add production

# 3. Add variables to development
echo "DATABASE_URL=postgresql://localhost:5432/myapp_dev" >> env/.env.development
echo "API_KEY=dev-key-123" >> env/.env.development

# 4. Sync to other environments
envsync sync development staging
envsync sync development production

# 5. Launch web interface
envsync studio
```

### Team Collaboration

```bash
# 1. Pull latest environment changes
envsync pull development

# 2. Make your changes
# Edit env/.env.development with your IDE

# 3. Compare with team's version
envsync diff development staging

# 4. Sync your changes
envsync sync development staging

# 5. Backup your work
envsync push development
```

### CI/CD Integration

```yaml
# GitHub Actions example
name: Deploy
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup EnvSync
        run: npm install -g @bennbatuu/envsync
        
      - name: Restore Environment
        run: envsync pull production
        
      - name: Deploy
        run: npm run deploy
```

## 🚀 Advanced Usage

### Custom Environment Names

```bash
# Create custom environments
envsync add testing
envsync add demo
envsync add preview

# Sync between any environments
envsync sync testing demo
envsync diff preview production
```

### Batch Operations

```bash
# Sync multiple environments
envsync sync development staging
envsync sync development testing
envsync sync development demo

# Backup all environments
envsync push development
envsync push staging
envsync push production
```

### Integration with Other Tools

```bash
# Docker integration
FROM node:18-alpine
RUN npm install -g @bennbatuu/envsync
COPY . .
RUN envsync pull production
CMD ["npm", "start"]

# VS Code tasks
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "EnvSync: Studio",
      "type": "shell",
      "command": "envsync",
      "args": ["studio"],
      "group": "build"
    }
  ]
}
```

## 🐛 Troubleshooting

### Common Issues

**"EnvSync not initialized"**
```bash
# Solution: Run init first
envsync init
```

**"Environment not found"**
```bash
# Check available environments
envsync list

# Create the environment
envsync add <environment-name>
```

**"Encryption failed"**
```bash
# Check your secret key
echo $ENVSYNC_SECRET_KEY

# Generate a new key
export ENVSYNC_SECRET_KEY="$(openssl rand -hex 32)"
```

**"Permission denied"**
```bash
# Check file permissions
ls -la env/

# Fix permissions if needed
chmod 644 env/.env.*
```

### Getting Help

```bash
# Show all commands
envsync --help

# Show specific command help
envsync init --help
envsync sync --help
```

## 🚀 Roadmap

| Version | Features |
|---------|----------|
| **v1.0** ✅ | CLI core, web interface, encryption |
| **v1.1** 🔄 | Version history, rollback functionality |
| **v1.2** 📋 | Team collaboration, shared environments |
| **v2.0** ☁️ | Cloud sync, multi-user workspaces |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/bennbatuu/open-source.git
cd open-source/envsync

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Start development mode
npm run dev
```

### Contributing Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Performance

EnvSync is designed for speed and efficiency:

- **Fast CLI**: Commands execute in milliseconds
- **Lightweight**: Minimal dependencies, small footprint
- **Efficient**: Only processes changed files
- **Scalable**: Handles projects with hundreds of variables

## 💬 Philosophy

> "Your environment configuration is part of your codebase — so it should be versioned, synced, and transparent like code."

EnvSync was created for developers who value:
- **Clean tooling** - Simple, intuitive commands
- **No vendor lock-in** - Your data stays local
- **Security first** - Encryption by default
- **Developer experience** - Beautiful interfaces and helpful output

## 🧑‍💻 Author

**Batuhan (bennbatuu)**  
Creative Developer & Founder of [bennbatuu.dev](https://bennbatuu.com)

Building clean, developer-first open source tools that make development more enjoyable and productive.

## 📜 License

MIT License © 2025 bennbatuu

---

<div align="center">

**Made with ❤️ by [bennbatuu.com](https://bennbatuu.com)**

[⭐ Star this repo](https://github.com/bennbatuu/open-source) • [🐛 Report Bug](https://github.com/bennbatuu/open-source/issues) • [✨ Request Feature](https://github.com/bennbatuu/open-source/issues) • [📖 Documentation](https://github.com/bennbatuu/open-source#readme)

</div>
