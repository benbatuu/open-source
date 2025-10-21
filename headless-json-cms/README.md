# 🚀 Headless JSON CMS

A modern, production-ready headless CMS built with Next.js 15 and TypeScript. This powerful CMS allows you to create custom content types, manage media files, handle user authentication, and export your data - all with a beautiful, responsive interface.

![CMS](https://img.shields.io/badge/CMS-Headless-FF6B6B?style=for-the-badge&logo=contentful&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

## ✨ Key Features

### 🎯 Core Functionality
- **📝 Advanced Content Management** - Full CRUD operations with rich text editing
- **🏗️ Dynamic Schema Builder** - Create custom content types with drag-and-drop interface
- **📁 Comprehensive Media Library** - File upload, organization, and management with folder support
- **👥 User Management** - Role-based authentication (Admin, Editor) with secure JWT tokens
- **🔐 Secure Authentication** - Login, registration, password reset with email verification
- **📊 Real-time Analytics** - Track visitors, page views, and content performance
- **💾 Backup & Export** - Complete data backup and restore functionality
- **🌐 SEO Optimization** - Built-in SEO tools with meta tags and social sharing

### 🎨 User Experience
- **🌓 Dark/Light Theme** - Automatic theme switching with system preference
- **📱 Responsive Design** - Mobile-first design that works on all devices
- **⚡ Real-time Preview** - Live preview with device simulation (desktop, tablet, mobile)
- **🎯 Intuitive Interface** - Clean, modern UI with drag-and-drop functionality
- **🔍 Advanced Search** - Filter content by schema, category, and status
- **📈 Dashboard Analytics** - Comprehensive overview of your content and site performance

### 🛠️ Technical Features
- **⚡ Next.js 15** - Latest App Router with Server-Side Rendering (SSR)
- **🔒 Type Safety** - Full TypeScript implementation with strict type checking
- **📦 File-based Storage** - JSON-based storage with automatic backups
- **🔄 API-First Design** - RESTful API endpoints for all operations
- **🎨 Tailwind CSS** - Utility-first styling with custom components
- **🔧 Production Ready** - Optimized build with error handling and validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/benbatuu/open-source.git
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
│   ├── app/                    # Next.js 15 App Router
│   │   ├── api/               # RESTful API endpoints
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── content/       # Content management API
│   │   │   ├── schemas/       # Schema management API
│   │   │   ├── media/         # Media management API
│   │   │   ├── users/         # User management API
│   │   │   ├── analytics/     # Analytics tracking API
│   │   │   └── backup/        # Backup/export API
│   │   ├── dashboard/         # Admin dashboard pages
│   │   ├── auth/              # Authentication pages
│   │   ├── content/           # Content management pages
│   │   ├── schemas/           # Schema builder pages
│   │   ├── media/             # Media library pages
│   │   ├── users/             # User management pages
│   │   ├── analytics/         # Analytics dashboard
│   │   ├── settings/          # Site settings
│   │   ├── backup/            # Backup management
│   │   ├── blog/              # Public blog pages
│   │   ├── categories/        # Category pages
│   │   └── category/          # Category-specific content
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── editor/           # Rich text editor components
│   │   ├── layout/           # Layout components
│   │   ├── auth/             # Authentication components
│   │   ├── media/            # Media management components
│   │   ├── schemas/          # Schema builder components
│   │   └── users/            # User management components
│   ├── lib/                  # Utilities and helpers
│   │   ├── auth.ts           # Authentication utilities
│   │   ├── permissions.ts    # Role-based permissions
│   │   ├── file-system.ts    # File system operations
│   │   ├── analytics.ts      # Analytics tracking
│   │   └── settings.ts       # Site settings management
│   └── hooks/                # Custom React hooks
├── content/                   # File-based content storage
├── schemas/                   # Content type definitions
├── data/                      # System data (users, settings, analytics)
├── public/uploads/           # Uploaded media files
└── backups/                  # Automatic backup files
```

## 🔌 API Endpoints

### Authentication API
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `GET /api/auth/me` - Get current user
- `POST /api/auth/validate-reset-token` - Validate reset token

### Content API
- `GET /api/content` - Get all content items
- `GET /api/content?schema=id` - Get content by schema
- `GET /api/content?category=slug` - Get content by category
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

### Media API
- `POST /api/media` - Upload file
- `GET /api/media` - Get uploaded files list
- `GET /api/media/[id]` - Get media by ID
- `DELETE /api/media/[id]` - Delete media
- `POST /api/media/folders` - Create folder
- `PUT /api/media/move` - Move files between folders
- `PUT /api/media/rename` - Rename files

### User Management API
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Categories API
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `GET /api/categories/[id]` - Get category by ID
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

### Analytics API
- `POST /api/analytics/track` - Track page views
- `GET /api/analytics/stats` - Get analytics data

### Backup API
- `GET /api/backup/export` - Download backup file
- `POST /api/backup/import` - Restore from backup
- `POST /api/backup/create` - Create manual backup

### Settings API
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update site settings

## 🎯 Usage Examples

### Creating a Schema

1. Navigate to **Schemas** in the admin dashboard
2. Click **"Create Schema"**
3. Enter schema name and slug
4. Add fields with desired types:
   - Text, Textarea, Number, Boolean
   - Image, Date, Select, Rich Text
5. Configure field properties (required, default values, etc.)
6. Save the schema

### Adding Content

1. Go to **Content** page
2. Click **"Create Content"**
3. Select a schema
4. Fill in the content fields
5. Add SEO metadata (title, description, keywords)
6. Set cover image and excerpt
7. Preview your content with device simulation
8. Save and publish

### Managing Media

1. Navigate to **Media Library**
2. Create folders for organization
3. Drag and drop files or click to browse
4. Rename, move, or delete files
5. Copy file URLs for use in content
6. View storage usage and file information

### User Management

1. Go to **Users** page (Admin only)
2. Create new users with specific roles
3. Assign permissions (Admin, Editor)
4. Manage user accounts and permissions
5. Track user activity and login history

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# JWT Secret for authentication
JWT_SECRET="your-super-secret-jwt-key-here"

# Site Configuration
SITE_NAME="Your CMS Name"
SITE_DESCRIPTION="Your CMS Description"
SITE_URL="http://localhost:3000"

# File Upload Settings
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE=10485760

# OpenAI Integration (Optional)
OPENAI_API_KEY="your-openai-api-key"
OPENAI_MODEL="gpt-3.5-turbo"
OPENAI_MAX_TOKENS=1000
OPENAI_TEMPERATURE=0.7
OPENAI_ENABLED=true

# Email Settings (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate database schema
npm run db:push      # Push schema changes
npm run db:studio    # Open database studio
```

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **Storage**: File-based JSON with automatic backups
- **Authentication**: JWT with bcrypt password hashing
- **Icons**: Lucide React
- **Rich Text**: Editor.js
- **Analytics**: Custom tracking system

## 📝 Content Structure

Content is stored as JSON files in the `content/` directory. Each content item follows this structure:

```json
{
  "id": "unique-id",
  "title": "Content Title",
  "slug": "content-slug",
  "content": {
    "blocks": [
      {
        "type": "paragraph",
        "data": {
          "text": "Your content here..."
        }
      }
    ]
  },
  "schema": "schema-id",
  "status": "published|draft|archived",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "author": "admin",
  "metadata": {
    "seo-title": "SEO Title",
    "seo-description": "SEO Description",
    "seo-keywords": "keyword1, keyword2",
    "seo-image": "https://example.com/image.jpg",
    "canonical-url": "https://example.com/post",
    "cover": "https://example.com/cover.jpg",
    "excerpt": "Content excerpt",
    "category": "category-slug"
  }
}
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Role-based Access Control** - Admin and Editor roles with specific permissions
- **Input Validation** - Comprehensive validation for all inputs
- **File Upload Security** - Type and size validation for uploads
- **Rate Limiting** - Protection against brute force attacks
- **CSRF Protection** - Built-in CSRF protection

## 📊 Analytics & Monitoring

- **Real-time Tracking** - Track page views and user interactions
- **Unique Visitor Detection** - IP-based unique visitor tracking
- **Content Performance** - Monitor which content performs best
- **User Activity** - Track user login and activity patterns
- **Storage Monitoring** - Monitor file storage usage
- **Error Tracking** - Built-in error logging and monitoring

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Setup

1. Set up your production environment variables
2. Configure your domain and SSL certificates
3. Set up automated backups
4. Configure monitoring and logging
5. Set up CDN for media files (optional)

### Recommended Hosting

- **Vercel** - Optimal for Next.js applications
- **Netlify** - Great for static sites with serverless functions
- **Railway** - Full-stack deployment with database
- **DigitalOcean** - VPS with full control

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Report Issues
- Found a bug? [Open an issue](https://github.com/benbatuu/open-source/issues)
- Have a feature request? [Let us know](https://github.com/benbatuu/open-source/issues)

### 💻 Contribute Code
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 🎯 Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Follow the existing code style
- Add proper error handling

## 🚧 Roadmap

### ✅ Completed Features
- [x] User authentication and authorization
- [x] Role-based permissions (Admin, Editor)
- [x] File-based storage with backups
- [x] Rich text editor with Editor.js
- [x] Media library with folder organization
- [x] Real-time analytics tracking
- [x] SEO optimization tools
- [x] Category management
- [x] Content versioning and status management
- [x] Responsive design with dark/light themes

### 🔄 Planned Features
- [ ] Database storage options (PostgreSQL, MongoDB)
- [ ] GraphQL API support
- [ ] Webhook integrations
- [ ] Multi-language support
- [ ] Advanced media processing (image optimization, thumbnails)
- [ ] Plugin system for extensibility
- [ ] Advanced search with full-text indexing
- [ ] Content scheduling and publishing
- [ ] Advanced user roles and permissions
- [ ] API rate limiting and usage analytics

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This headless CMS is built with amazing open source technologies:

- [**Next.js**](https://nextjs.org/) - React framework with App Router
- [**TypeScript**](https://www.typescriptlang.org/) - Type-safe JavaScript
- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework
- [**Radix UI**](https://www.radix-ui.com/) - Accessible UI components
- [**Editor.js**](https://editorjs.io/) - Block-styled editor
- [**Lucide**](https://lucide.dev/) - Beautiful icon library
- [**bcryptjs**](https://www.npmjs.com/package/bcryptjs) - Password hashing
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken) - JWT authentication

---

<div align="center">

**Made with ❤️ by [bennbatuu](https://bennbatuu.com/)**

[⭐ Star this repo](https://github.com/benbatuu/open-source) • [🐛 Report Bug](https://github.com/benbatuu/open-source/issues) • [✨ Request Feature](https://github.com/benbatuu/open-source/issues) • [📖 Documentation](https://github.com/benbatuu/open-source#readme)

</div>