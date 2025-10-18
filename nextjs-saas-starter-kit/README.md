# 🏢 NextJS SaaS Starter Kit

<div align="center">

![NextJS SaaS](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

**A comprehensive SaaS starter kit with subscription management, billing, and admin dashboard.**

[🌐 bennbatuu.com](https://bennbatuu.com) • [📖 Documentation](#-documentation) • [🎨 Live Demo](#-live-demo) • [🐛 Report Bug](https://github.com/benbatuu/open-source/issues) • [✨ Request Feature](https://github.com/benbatuu/open-source/issues)

</div>

---

## 🌟 About This Project

This is one of the **open source projects** from [bennbatuu.com](https://bennbatuu.com) - a comprehensive SaaS starter kit that provides everything you need to build and launch a successful SaaS product. Whether you're a solo developer or part of a team, this starter kit will accelerate your SaaS development process with its carefully crafted architecture and production-ready features.

## ✨ Key Features

### 🏗️ **Modern Architecture**

- ✅ **Next.js 15** with App Router & Server Components
- ✅ **TypeScript** for type safety and better DX
- ✅ **Prisma ORM** with PostgreSQL for robust data management
- ✅ **Tailwind CSS + shadcn/ui** for beautiful, accessible components
- ✅ **Framer Motion** for smooth, professional animations

### 💰 **Revenue Ready**

- ✅ **Stripe Integration** for payment processing
- ✅ **Subscription Management** with multiple plans
- ✅ **Billing & Invoicing** system
- ✅ **Webhook Handling** for real-time updates
- ✅ **Multi-tenant Architecture** for scalability

### 🔐 **Authentication & Security**

- ✅ **NextAuth.js** integration for secure authentication
- ✅ **Role-based Access Control** (RBAC)
- ✅ **API Rate Limiting** and security
- ✅ **Protected routes** with middleware
- ✅ **Form validation** with Zod schemas

### 📊 **Admin Dashboard**

- ✅ **Analytics Dashboard** with key metrics
- ✅ **User Management** and organization control
- ✅ **Revenue Tracking** and reporting
- ✅ **API Key Management**
- ✅ **Usage Monitoring** and insights

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
- ✅ **Database migrations** with Prisma

## 🎨 Live Demo

<div align="center">

[![Live Demo](https://img.shields.io/badge/🎨_Live_Demo-View_Now-7B61FF?style=for-the-badge&logo=vercel&logoColor=white)](https://nextjs-saas-starter-kit.bennbatuu.com)

_Experience the full-featured demo with authentication, dashboard, billing, and all SaaS features_

</div>

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **PostgreSQL** database
- **Stripe** account for payments
- **npm** or **yarn** package manager
- **Git** for version control

### ⚡ **One-Command Setup**

```bash
# Clone and start in seconds
git clone https://github.com/benbatuu/open-source.git
cd open-source/nextjs-saas-starter-kit
npm install
npm run dev
```

### 🔧 **Complete Setup**

1. **Clone the repository**

   ```bash
   git clone https://github.com/benbatuu/open-source.git
   cd open-source/nextjs-saas-starter-kit
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

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Or run migrations
   npm run db:migrate
   ```

5. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) and start building! 🎉

## 📁 Project Structure

```
nextjs-saas-starter-kit/
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
│   │   ├── auth/            # Authentication components
│   │   ├── billing/         # Billing components
│   │   └── admin/           # Admin components
│   ├── lib/                 # Utilities and configurations
│   │   ├── contexts/        # React contexts (Auth, Theme)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── validations/     # Zod schemas
│   │   ├── auth/            # Authentication logic
│   │   ├── billing/         # Billing logic
│   │   ├── db/              # Database configuration
│   │   └── utils.ts         # Utility functions
│   └── types/              # TypeScript type definitions
├── prisma/                 # Database schema and migrations
├── public/                # Static assets
└── docs/                  # Documentation
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
| `npm run db:generate`  | Generate Prisma client                   |
| `npm run db:push`      | Push schema changes to database          |
| `npm run db:migrate`   | Run database migrations                  |
| `npm run db:studio`    | Open Prisma Studio                      |

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/saas_starter_kit"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="SaaS Starter Kit"
```

### Database Setup

1. **PostgreSQL**: Create a new database
2. **Prisma**: Run `npm run db:push` to create tables
3. **Migrations**: Use `npm run db:migrate` for production

### Stripe Setup

1. Create a Stripe account
2. Get your API keys from the dashboard
3. Set up webhooks for subscription events
4. Configure products and prices

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push to main

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- Any other environment variables from `env.example`

## 🎯 **Roadmap**

We're continuously improving this starter kit. Here's what's coming next:

- 🔄 **Advanced Analytics** with custom dashboards
- 📧 **Email Templates** and notification system
- 🔔 **Real-time Notifications** with WebSocket support
- 📱 **Mobile App** companion
- 🌍 **Multi-language Support** (i18n)
- 🔍 **Advanced Search** and filtering
- 📊 **Custom Reports** and data export
- 🎨 **Theme Customization** and branding
- 🔐 **Two-Factor Authentication** (2FA)
- 📈 **A/B Testing** framework

## 🌟 Why Choose This Starter Kit?

### 🚀 **Complete SaaS Solution**
- Everything you need to launch a SaaS product
- Production-ready architecture
- Scalable and maintainable codebase

### 💰 **Revenue Ready**
- Built-in subscription management
- Stripe integration out of the box
- Automated billing and invoicing

### 🔒 **Enterprise Security**
- Role-based access control
- API rate limiting
- Secure payment processing

### 📊 **Analytics & Insights**
- User behavior tracking
- Revenue analytics
- Performance monitoring

### ⚡ **Developer Friendly**
- Modern tech stack
- Excellent TypeScript support
- Comprehensive documentation
- Active community support

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 **Report Issues**
- Found a bug? [Open an issue](https://github.com/benbatuu/open-source/issues)
- Have a feature request? [Let us know](https://github.com/benbatuu/open-source/issues)

### 💻 **Contribute Code**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

This SaaS starter kit is built with amazing open source technologies:

- [**Next.js**](https://nextjs.org/) - The React framework for production
- [**Stripe**](https://stripe.com/) - Payment processing platform
- [**Prisma**](https://prisma.io/) - Next-generation ORM
- [**NextAuth.js**](https://next-auth.js.org/) - Authentication for Next.js
- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework
- [**shadcn/ui**](https://ui.shadcn.com/) - Beautiful, accessible components

---

<div align="center">

**Made with ❤️ by [bennbatuu.com](https://bennbatuu.com)**

[⭐ Star this repo](https://github.com/benbatuu/open-source) • [🐛 Report Bug](https://github.com/benbatuu/open-source/issues) • [✨ Request Feature](https://github.com/benbatuu/open-source/issues) • [📖 Documentation](https://github.com/benbatuu/open-source#readme)

</div>
