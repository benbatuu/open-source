# Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/saas_starter_kit"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="testSecretKey"

# JWT Secret for custom authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="SaaS Starter Kit"
```

## Database Setup

1. Make sure you have PostgreSQL running
2. Create a database named `saas_starter_kit`
3. Run the following commands:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Features Implemented

✅ **Global Navbar** - Responsive navigation with authentication state
✅ **Global Footer** - Complete footer with links and social media
✅ **Authentication System** - Login and register with database integration
✅ **Database Integration** - User management with Prisma
✅ **JWT Authentication** - Secure token-based authentication
✅ **Responsive Design** - Mobile-friendly layout

## Authentication Flow

1. **Sign Up**: Users can create accounts with name, email, and password
2. **Sign In**: Users can log in with email and password
3. **Session Management**: JWT tokens stored in HTTP-only cookies
4. **Protected Routes**: Dashboard and other protected areas
5. **Logout**: Secure logout with token cleanup

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET /api/auth/session` - Check current session

## Database Schema

The User model includes:
- `id` - Unique identifier
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password (bcrypt)
- `image` - Profile image URL
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp
