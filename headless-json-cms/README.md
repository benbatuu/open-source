# 🚀 Dev Portfolio CMS

A modern headless CMS built with Next.js and TypeScript for managing portfolio content. This CMS allows you to create custom content types, manage media files, and export your data - all without writing code.

![CMS](https://img.shields.io/badge/CMS-Headless-FF6B6B?style=for-the-badge&logo=contentful&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

## ✨ Features

### ✅ Implemented Features

- **📝 Content CRUD** - Create, read, update, and delete content items
- **🏗️ Schema Builder** - Build custom content types with various field types
- **📁 File Upload** - Drag & drop file upload with URL support
- **🌓 Dark/Light Theme** - Automatic theme switching with system preference
- **👁️ Realtime Preview** - JSON to Markdown preview with multiple view modes
- **💾 Backup/Export** - Export and restore your content and schemas
- **📚 Documentation** - Built-in docs with API endpoints and guides

### 🔄 Field Types Supported

- **Text** - Single line text input
- **Textarea** - Multi-line text input
- **Number** - Numeric input with validation
- **Boolean** - True/False toggle
- **Image** - Image upload and display
- **Date** - Date picker
- **Select** - Dropdown with custom options
- **Rich Text** - Rich text editor

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/headless-json-cms.git
   cd headless-json-cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
headless-json-cms/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API endpoints
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── content/           # Content management
│   │   ├── schemas/           # Schema builder
│   │   ├── media/             # Media library
│   │   └── docs/              # Documentation
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── editor/           # Content editor components
│   │   └── layout/           # Layout components
│   └── lib/                  # Utilities and helpers
├── content/                   # File-based content storage
├── schemas/                   # Content type definitions
├── public/uploads/           # Uploaded media files
└── config/                   # Configuration files
```

## 🔌 API Endpoints

### Content API
- `GET /api/content` - Get all content items
- `GET /api/content?schema=id` - Get content by schema
- `POST /api/content` - Create new content
- `GET /api/content/[id]` - Get content by ID
- `PUT /api/content/[id]` - Update content
- `DELETE /api/content/[id]` - Delete content

### Schema API
- `GET /api/schemas` - Get all schemas
- `POST /api/schemas` - Create new schema
- `GET /api/schemas/[id]` - Get schema by ID
- `PUT /api/schemas/[id]` - Update schema
- `DELETE /api/schemas/[id]` - Delete schema

### Média API
- `POST /api/upload` - Upload file
- `GET /api/upload` - Get uploaded files list

### Backup API
- `GET /api/backup` - Download backup file
- `POST /api/backup` - Restore from backup

## 🎯 Usage Examples

### Creating a Schema

1. Go to the Schemas page
2. Click "Create Schema"
3. Enter schema name and slug
4. Add fields with desired types
5. Configure field properties
6. Save the schema

### Adding Content

1. Go to the Content page
2. Click "Create Content"
3. Select a schema
4. Fill in the content fields
5. Preview your content
6. Save and publish

### Managing Media

1. Go to the Media page
2. Drag and drop files or click to browse
3. Copy file URLs for use in content
4. Organize and manage your media library

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# JWT Secret
JWT_SECRET="your-jwt-secret-here"

# File Upload
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE=10485760

# Site Configuration
SITE_NAME="Dev Portfolio CMS"
SITE_DESCRIPTION="Headless JSON CMS for Portfolio Management"
SITE_URL="http://localhost:3000"

# Roles
ADMIN_EMAIL="admin@example.com"
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Storage**: File-based JSON
- **Icons**: Lucide React

## 📝 Content Structure

Content is stored as JSON files in the `content/` directory. Each content item follows this structure:

```json
{
  "id": "unique-id",
  "title": "Content Title",
  "slug": "content-slug",
  "content": {
    // Schema-defined fields
  },
  "schema": "schema-id",
  "status": "published|draft|archived",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "author": "admin",
  "metadata": {
    "description": "Content description",
    "tags": ["tag1", "tag2"],
    "featured": false
  }
}
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Report Issues
- Found a bug? [Open an issue](https://github.com/yourusername/headless-json-cms/issues)
- Have a feature request? [Let us know](https://github.com/yourusername/headless-json-cms/issues)

### 💻 Contribute Code
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚧 Roadmap

### Planned Features
- [ ] User authentication and authorization
- [ ] Role-based permissions
- [ ] Database storage options (PostgreSQL, MongoDB)
- [ ] GraphQL API support
- [ ] Webhook integrations
- [ ] Multi-language support
- [ ] Content versioning
- [ ] Advanced media processing
- [ ] Plugin system

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This headless CMS is built with amazing open source technologies:

- [**Next.js**](https://nextjs.org/) - React framework
- [**TypeScript**](https://www.typescriptlang.org/) - Type-safe JavaScript
- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS
- [**Radix UI**](https://www.radix-ui.com/) - Accessible UI components
- [**Lucide**](https://lucide.dev/) - Beautiful icons

---

<div align="center">

**Made with ❤️ by [Your Name](https://yourwebsite.com)**

[⭐ Star this repo](https://github.com/yourusername/headless-json-cms) • [🐛 Report Bug](https://github.com/yourusername/headless-json-cms/issues) • [✨ Request Feature](https://github.com/yourusername/headless-json-cms/issues) • [📖 Documentation](https://github.com/yourusername/headless-json-cms#readme)

</div>