# 🚀 API Testing Suite

A comprehensive, production-ready API testing platform built with Next.js, TypeScript, and modern web technologies. Test your APIs with ease, manage test suites, monitor performance, and generate detailed reports.

![API Testing Suite](https://img.shields.io/badge/Next.js-15.5.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.17.1-2D3748?style=for-the-badge&logo=prisma)

## ✨ Features

### 🎯 Core Testing Features
- **Test Suite Management** - Organize your API tests into logical groups
- **Individual Test Execution** - Run single tests or entire test suites
- **Real-time Test Results** - See test results instantly with detailed response data
- **Assertion Management** - Define and validate response expectations
- **Environment Management** - Switch between development, staging, and production environments

### 🔧 Advanced Features
- **Mock Server** - Create and manage mock endpoints for testing
- **Performance Testing** - Monitor API response times and performance metrics
- **Data Management** - Store and manage test data fixtures
- **Comprehensive Reporting** - Generate detailed test reports and analytics
- **Environment Variables** - Manage API keys, tokens, and configuration variables

### 🎨 User Experience
- **Modern UI** - Clean, responsive interface built with shadcn/ui
- **Real-time Updates** - Live test execution and result updates
- **Dark/Light Theme** - Customizable theme preferences
- **Mobile Responsive** - Works seamlessly on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- SQLite (included) or PostgreSQL/MySQL

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd api-testing-suite-nextjs
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Optional: Start Mock Server
To run the mock server alongside the main application:

```bash
npm run dev:mock
# or
yarn dev:mock
# or
pnpm dev:mock
```

This will start both the Next.js app (port 3000) and the mock server (port 3003).

## 📖 User Guide

### 🏠 Dashboard
The dashboard provides an overview of your testing activities:
- **Test Statistics** - Total test suites, tests, and success rates
- **Performance Metrics** - Average response times and trends
- **Recent Activity** - Latest test runs and results
- **Quick Actions** - Fast access to common tasks

### 📋 Test Suites
Organize your API tests into logical groups:

1. **Create a Test Suite**
   - Click "Create Test Suite" button
   - Enter name and description
   - Save to create your suite

2. **Add Tests to Suite**
   - Navigate to your test suite
   - Click "Add Test" to create individual tests
   - Configure HTTP method, URL, headers, and body
   - Set expected status codes and timeouts

3. **Run Tests**
   - Run individual tests or entire suites
   - View real-time results and response data
   - Analyze test performance and failures

### 🧪 Individual Tests
Create and manage individual API tests:

1. **Test Configuration**
   - **Method**: GET, POST, PUT, DELETE, PATCH
   - **URL**: Full API endpoint URL
   - **Headers**: Custom headers (JSON format)
   - **Body**: Request payload (JSON format)
   - **Expected Status**: Expected HTTP status code
   - **Timeout**: Request timeout in milliseconds

2. **Assertions**
   - **Status Code**: Validate HTTP response status
   - **Response Body**: Check JSON response content
   - **Headers**: Validate response headers
   - **Response Time**: Ensure requests complete within time limits

### 🌍 Environment Management
Manage different testing environments:

1. **Create Environments**
   - Navigate to Settings → Environments
   - Add development, staging, production environments
   - Configure base URLs, headers, and variables

2. **Environment Variables**
   - Store API keys, tokens, and configuration
   - Use variables in test URLs and headers
   - Switch between environments easily

3. **Active Environment**
   - Set one environment as active
   - All tests will use the active environment's configuration

### 🎭 Mock Server
Create mock endpoints for testing:

1. **Create Mock Endpoints**
   - Navigate to Mock Server page
   - Click "Create Endpoint"
   - Configure path, method, status code, and response

2. **Mock Configuration**
   - **Path**: API endpoint path (supports parameters)
   - **Method**: HTTP method to mock
   - **Status Code**: Response status code
   - **Response Body**: JSON response data
   - **Headers**: Response headers
   - **Delay**: Simulate network latency

3. **Start Mock Server**
   - Click "Start Server" to begin serving mock responses
   - Access mock endpoints at `http://localhost:3003`
   - View server logs and request history

### 📊 Performance Testing
Monitor API performance:

1. **Performance Metrics**
   - View response time trends
   - Monitor success/failure rates
   - Track API performance over time

2. **Load Testing**
   - Run multiple concurrent requests
   - Measure system performance under load
   - Identify performance bottlenecks

### 📈 Reports & Analytics
Generate comprehensive test reports:

1. **Test Reports**
   - View detailed test execution results
   - Export reports in various formats
   - Track test trends and patterns

2. **Performance Analytics**
   - Analyze response time distributions
   - Identify slow endpoints
   - Monitor API health over time

### 💾 Data Management
Manage test data and fixtures:

1. **Data Fixtures**
   - Store reusable test data
   - Create JSON, CSV, or XML fixtures
   - Use fixtures in your tests

2. **Data Factories**
   - Generate dynamic test data
   - Create realistic test scenarios
   - Automate data generation

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Mock Server
MOCK_SERVER_PORT=3003

# Optional: External database
# DATABASE_URL="postgresql://user:password@localhost:5432/api_testing"
```

### Database Setup
The application uses Prisma ORM with SQLite by default. To use a different database:

1. **Update DATABASE_URL** in `.env.local`
2. **Run migrations**:
```bash
npx prisma migrate dev
```

### Custom Configuration
- **Test Timeouts**: Default 30 seconds, configurable per test
- **Mock Server Port**: Default 3003, configurable via environment
- **Database**: SQLite (default), PostgreSQL, MySQL supported

## 🛠️ Development

### Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── test-suites/       # Test suites management
│   ├── tests/             # Individual tests
│   ├── mock/              # Mock server interface
│   ├── performance/       # Performance testing
│   ├── reports/           # Reports and analytics
│   ├── data/              # Data management
│   └── settings/          # Application settings
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
└── types/                 # TypeScript type definitions
```

### API Routes
- `/api/test-suites` - Test suite management
- `/api/test-suites/[id]/tests` - Test management
- `/api/test-suites/[id]/run` - Test execution
- `/api/environments` - Environment management
- `/api/mock/endpoints` - Mock endpoint management
- `/api/dashboard/metrics` - Dashboard metrics

### Database Schema
- **TestSuite** - Test suite information
- **Test** - Individual test configurations
- **TestRun** - Test execution records
- **TestResult** - Individual test results
- **Environment** - Environment configurations
- **MockEndpoint** - Mock server endpoints
- **DataFixture** - Test data fixtures

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Docker
```bash
# Build the application
docker build -t api-testing-suite .

# Run the container
docker run -p 3000:3000 api-testing-suite
```

### Manual Deployment
1. **Build the application**:
```bash
npm run build
```

2. **Start production server**:
```bash
npm start
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions

## 🎯 Roadmap

- [ ] **CI/CD Integration** - GitHub Actions, GitLab CI support
- [ ] **Team Collaboration** - Multi-user support and permissions
- [ ] **API Documentation** - Auto-generate API docs from tests
- [ ] **Advanced Assertions** - More assertion types and validators
- [ ] **Webhook Support** - Test webhook endpoints
- [ ] **GraphQL Support** - GraphQL query testing
- [ ] **API Monitoring** - Continuous monitoring and alerting

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
