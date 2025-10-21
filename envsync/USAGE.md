# EnvSync Usage Examples

This document provides practical examples of how to use EnvSync in your development workflow.

## 🚀 Getting Started

### 1. Initialize a New Project

```bash
# Initialize EnvSync in your project
envsync init

# Or with custom options
envsync init --project "my-awesome-app" --environments "dev,staging,prod"
```

### 2. Add Environments

```bash
# Add a new environment
envsync add development

# Add from existing .env file
envsync add staging --file .env.staging.backup
```

### 3. Compare Environments

```bash
# Compare two environments
envsync diff development production

# Verbose output showing actual values
envsync diff development production --verbose
```

### 4. Sync Variables

```bash
# Sync missing variables from dev to staging
envsync sync development staging

# Force sync (overwrites conflicting variables)
envsync sync development staging --force

# Dry run to see what would be synced
envsync sync development staging --dry-run
```

### 5. Backup and Restore

```bash
# Backup an environment
envsync push production

# Restore from backup
envsync pull production
```

### 6. List Environments

```bash
# List all environments
envsync list

# Show variables for specific environment
envsync list --env development
```

### 7. Launch Web Interface

```bash
# Start EnvSync Studio
envsync studio

# Custom port and host
envsync studio --port 8080 --host 0.0.0.0
```

## 🔧 Common Workflows

### Setting Up a New Project

```bash
# 1. Initialize EnvSync
envsync init --project "my-app"

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
```

### Managing Environment Variables

```bash
# Compare all environments
envsync diff development staging
envsync diff development production
envsync diff staging production

# Update staging with new variables from development
envsync sync development staging

# Backup before making changes
envsync push production

# Make changes to production
# ... edit env/.env.production ...

# Restore if needed
envsync pull production
```

### Team Collaboration

```bash
# 1. Pull latest environment changes
envsync pull development

# 2. Make your changes
# ... edit environment files ...

# 3. Compare with team's version
envsync diff development staging

# 4. Sync your changes
envsync sync development staging

# 5. Backup your work
envsync push development
```

## 🔐 Security Best Practices

### 1. Set Up Encryption

```bash
# Generate a secret key
export ENVSYNC_SECRET_KEY="$(openssl rand -hex 32)"

# Or let EnvSync generate one during init
envsync init
# Copy the generated key to your environment
```

### 2. Secure Your .gitignore

```bash
# Add to .gitignore
echo "env/" >> .gitignore
echo "*.env" >> .gitignore
echo "envsync.config.json" >> .gitignore
```

### 3. Use Environment-Specific Keys

```bash
# Different encryption keys for different environments
export ENVSYNC_SECRET_KEY_DEV="dev-key-here"
export ENVSYNC_SECRET_KEY_PROD="prod-key-here"
```

## 🌐 EnvSync Studio Features

### Environment Overview
- Visual cards showing all environments
- Variable count and last modified date
- Quick access to each environment

### Variable Management
- Add, edit, and delete variables
- Real-time validation
- Bulk operations

### Diff Visualization
- Side-by-side comparison
- Color-coded differences
- Merge conflict resolution

### Export/Import
- Export to various formats
- Import from existing .env files
- Backup and restore functionality

## 🚨 Troubleshooting

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
envsync help

# Show specific command help
envsync init --help
envsync sync --help
```

## 📝 Tips and Tricks

1. **Use dry-run before syncing**: Always use `--dry-run` to preview changes
2. **Backup before major changes**: Use `envsync push` before syncing
3. **Use verbose diff**: Use `--verbose` to see actual values in diffs
4. **Set up aliases**: Create shell aliases for common commands
5. **Use the web interface**: `envsync studio` for complex operations

## 🔗 Integration Examples

### CI/CD Pipeline

```yaml
# GitHub Actions example
- name: Setup EnvSync
  run: npm install -g envsync

- name: Sync Environment Variables
  run: |
    envsync pull production
    envsync sync production staging
```

### Docker

```dockerfile
# Dockerfile example
FROM node:18-alpine
RUN npm install -g envsync
COPY . .
RUN envsync pull production
CMD ["npm", "start"]
```

### VS Code Tasks

```json
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
