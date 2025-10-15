# 🚀 NextJS Starter Kit

<div align="center">

![NextJS Starter Kit](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

**A modern, production-ready Next.js 15 starter kit with premium design, smooth animations, and enterprise-grade features.**

[🌐 bennbatuu.com](https://bennbatuu.com) • [📖 Documentation](#-documentation) • [🎨 Live Demo](#-live-demo) • [🐛 Report Bug](https://github.com/benbatuu/open-source/issues) • [✨ Request Feature](https://github.com/benbatuu/open-source/issues)

</div>

---

## 🌟 About This Project

This is one of the **open source projects** from [bennbatuu.com](https://bennbatuu.com) - a comprehensive Next.js 15 starter kit that provides everything you need to build modern, scalable web applications. Whether you're a solo developer or part of a team, this starter kit will accelerate your development process with its carefully crafted architecture and beautiful design system.

## ✨ Key Features

### 🏗️ **Modern Architecture**

- ✅ **Next.js 15** with App Router & Server Components
- ✅ **TypeScript** for type safety and better DX
- ✅ **Tailwind CSS + shadcn/ui** for beautiful, accessible components
- ✅ **Framer Motion** for smooth, professional animations

### 🎨 **Premium Design System**

- ✅ **Dark/Light theme** with system preference detection
- ✅ **Responsive design** that works on all devices
- ✅ **Premium color palette** with soft shadows and 2xl radius
- ✅ **Custom fonts** (Plus Jakarta Sans + IBM Plex Mono)
- ✅ **Dynamic headers** that transform on scroll

### 🔐 **Authentication & Security**

- ✅ **Demo authentication** system with context API
- ✅ **Protected routes** with dashboard layout
- ✅ **Form validation** with Zod schemas
- ✅ **Secure routing** and middleware ready

### 🌍 **Internationalization**

- ✅ **Multi-language support** (English/Turkish)
- ✅ **Translation management** with JSON files
- ✅ **RTL support** ready

### 🛠️ **Developer Experience**

- ✅ **Git hooks** with Husky for code quality
- ✅ **ESLint + Prettier** for consistent code style
- ✅ **TypeScript** strict mode enabled
- ✅ **CI/CD** workflows with GitHub Actions
- ✅ **VSCode** configuration included

### 🚀 **Production Ready**

- ✅ **SEO optimized** with next-seo
- ✅ **Sitemap & robots.txt** generation
- ✅ **Performance optimized** with ISR
- ✅ **Vercel deployment** ready

## 🎨 Live Demo

<div align="center">

[![Live Demo](https://img.shields.io/badge/🎨_Live_Demo-View_Now-7B61FF?style=for-the-badge&logo=vercel&logoColor=white)](https://nextjs-starter-kit.bennbatuu.com)

_Experience the full-featured demo with authentication, dashboard, and all premium features_

</div>

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **yarn** package manager
- **Git** for version control

### ⚡ **One-Command Setup**

```bash
# Clone and start in seconds
git clone https://github.com/benbatuu/open-source.git
cd open-source/nextjs-starter-kit
npm install
npm run dev
```

### 🔧 **Manual Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/benbatuu/open-source.git
   cd open-source/nextjs-starter-kit
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) and start building! 🎉

## 📁 Project Structure

```
nextjs-starter-kit/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── dashboard/         # Protected dashboard pages
│   │   ├── api/              # API routes
│   │   └── globals.css       # Global styles & CSS variables
│   ├── components/           # React components (Atomic Design)
│   │   ├── ui/              # shadcn/ui base components
│   │   ├── common/          # Reusable components
│   │   ├── layout/          # Layout components (Navbar, Sidebar, etc.)
│   │   └── sections/        # Page sections
│   ├── lib/                 # Utilities and configurations
│   │   ├── contexts/        # React contexts (Auth, Theme)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── validations/     # Zod schemas
│   │   ├── motion.ts        # Framer Motion variants
│   │   └── utils.ts         # Utility functions
│   ├── config/             # App configuration
│   ├── locales/            # i18n translation files
│   └── types/              # TypeScript type definitions
├── .github/                # CI/CD workflows
├── .husky/                # Git hooks (pre-commit, commit-msg)
├── .vscode/              # VSCode settings & extensions
├── public/               # Static assets
└── components.json       # shadcn/ui configuration
```

## 🛠 Available Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server with hot reload |
| `npm run build`        | Build optimized production bundle        |
| `npm run start`        | Start production server                  |
| `npm run lint`         | Run ESLint for code quality              |
| `npm run lint:fix`     | Auto-fix ESLint errors                   |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check code formatting                    |
| `npm run type-check`   | Run TypeScript type checking             |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push to main

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `NEXT_PUBLIC_SITE_URL`
- `REVALIDATE_SECRET`
- Any other environment variables from `env.example`

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 **Report Issues**

- Found a bug? [Open an issue](https://github.com/benbatuu/open-source/issues)
- Have a feature request? [Let us know](https://github.com/benbatuu/open-source/issues)

### 💻 **Contribute Code**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This starter kit is built with amazing open source technologies:

- [**Next.js**](https://nextjs.org/) - The React framework for production
- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework
- [**shadcn/ui**](https://ui.shadcn.com/) - Beautiful, accessible components
- [**Framer Motion**](https://www.framer.com/motion/) - Production-ready motion library
- [**Zod**](https://zod.dev/) - TypeScript-first schema validation
- [**Lucide React**](https://lucide.dev/) - Beautiful & consistent icon toolkit

---

<div align="center">

**Made with ❤️ by [bennbatuu.com](https://bennbatuu.com)**

[⭐ Star this repo](https://github.com/benbatuu/open-source) • [🐛 Report Bug](https://github.com/benbatuu/open-source/issues) • [✨ Request Feature](https://github.com/benbatuu/open-source/issues) • [📖 Documentation](https://github.com/benbatuu/open-source#readme)

</div>
