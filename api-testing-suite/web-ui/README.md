# API Testing Suite - Web UI

Modern, responsive web interface for the API Testing Suite - a Postman-like experience for API testing.

## 🎨 Features

### ✅ **Implemented Features**

- **📊 Dashboard** - Overview of test activities and statistics
- **🔧 Request Builder** - Visual API request builder with method selection, headers, and body
- **📁 Test Suite Manager** - Organize and manage test collections
- **🖥️ Mock Server** - Visual mock server management with endpoint configuration
- **📱 Responsive Design** - Works on desktop, tablet, and mobile devices
- **🎨 Modern UI** - Clean, professional interface with Tailwind CSS

### 🚧 **Planned Features**

- **📈 Performance Testing** - Load testing interface
- **📋 Reports** - Detailed test result visualization
- **🗄️ Data Manager** - Fixture and data factory management
- **⚙️ Settings** - Configuration management
- **🔗 Backend Integration** - Connect to the API Testing Suite backend

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd web-ui
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 🏗️ Architecture

### Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Icons
- **Radix UI** - Accessible UI primitives

### Project Structure

```
web-ui/
├── src/
│   ├── components/
│   │   ├── Layout/           # Layout components
│   │   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   │   ├── Header.tsx    # Top header
│   │   │   └── Layout.tsx    # Main layout wrapper
│   │   ├── Dashboard/        # Dashboard components
│   │   │   └── Dashboard.tsx # Main dashboard
│   │   ├── API/              # API testing components
│   │   │   ├── RequestBuilder.tsx    # Request builder
│   │   │   └── TestSuiteManager.tsx  # Test suite management
│   │   └── Mock/             # Mock server components
│   │       └── MockServerManager.tsx # Mock server UI
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── vite.config.ts            # Vite configuration
└── tsconfig.json             # TypeScript configuration
```

## 🎯 Key Components

### 1. **Dashboard**
- Test statistics and metrics
- Recent test results
- Performance charts
- Quick action buttons

### 2. **Request Builder**
- HTTP method selection (GET, POST, PUT, DELETE, etc.)
- URL input with validation
- Dynamic header management
- Request body editor (JSON, XML, etc.)
- Response viewer with syntax highlighting
- Request/response timing

### 3. **Test Suite Manager**
- Create and organize test suites
- Visual test management
- Test execution with real-time status
- Test result visualization
- Suite-level operations

### 4. **Mock Server Manager**
- Visual mock server control
- Endpoint configuration
- Response customization
- Server status monitoring
- Request/response preview

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Primary blue, success green, error red, warning orange
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent 4px grid system
- **Components**: Reusable button, input, card components

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layout**: Sidebar collapses on mobile

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels
- **Color Contrast**: WCAG AA compliant
- **Focus Management**: Clear focus indicators

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm start            # Start with host access
```

### Code Style

- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting (configured via ESLint)
- **TypeScript**: Strict mode enabled
- **Import Organization**: Absolute imports with path mapping

### Component Guidelines

1. **Functional Components**: Use React hooks
2. **TypeScript**: Proper typing for props and state
3. **Props Interface**: Define clear prop interfaces
4. **Styling**: Use Tailwind CSS classes
5. **Icons**: Use Lucide React icons consistently

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 📱 Mobile Support

- **iOS Safari** 14+
- **Chrome Mobile** 90+
- **Samsung Internet** 14+

## 🔗 Integration

### Backend API
The web UI is designed to integrate with the API Testing Suite backend:

```typescript
// Example API integration
const apiClient = new ApiClient('http://localhost:3000');

// Run tests
const results = await apiClient.runTests(testSuite);

// Get mock server status
const status = await apiClient.getMockServerStatus();
```

### Environment Configuration
```bash
# Development
VITE_API_URL=http://localhost:3000

# Production
VITE_API_URL=https://api-testing-suite.com
```

## 🚀 Deployment

### Static Hosting
```bash
npm run build
# Deploy dist/ folder to any static host
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Status**: ✅ Core UI Complete
**Version**: 1.0.0
**Last Updated**: October 2025