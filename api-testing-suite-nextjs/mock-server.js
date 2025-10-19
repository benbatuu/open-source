const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.MOCK_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint (before middleware)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Test endpoint
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

app.post('/api/users', (req, res) => {
  res.status(201).json({
    id: 3,
    name: req.body.name || 'New User',
    email: req.body.email || 'newuser@example.com',
    createdAt: new Date().toISOString()
  });
});

// Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Get all enabled mock endpoints
async function getMockEndpoints() {
  try {
    const endpoints = await prisma.mockEndpoint.findMany({
      where: { enabled: true }
    });
    return endpoints;
  } catch (error) {
    console.error('Error fetching mock endpoints:', error);
    return [];
  }
}

// Find matching endpoint
function findMatchingEndpoint(endpoints, method, path) {
  return endpoints.find(endpoint => {
    if (endpoint.method.toUpperCase() !== method.toUpperCase()) {
      return false;
    }

    // Simple path matching (you could enhance this with parameter support)
    if (endpoint.path === path) {
      return true;
    }

    // Support for path parameters like /users/:id
    const endpointPattern = endpoint.path.replace(/:[^/]+/g, '[^/]+');
    const regex = new RegExp(`^${endpointPattern}$`);
    return regex.test(path);
  });
}

// Handle all requests
app.use(async (req, res) => {
  try {
    const endpoints = await getMockEndpoints();
    const matchingEndpoint = findMatchingEndpoint(endpoints, req.method, req.path);

    if (!matchingEndpoint) {
      return res.status(404).json({
        error: 'Mock endpoint not found',
        path: req.path,
        method: req.method,
        availableEndpoints: endpoints.map(ep => ({
          path: ep.path,
          method: ep.method
        }))
      });
    }

    // Add delay if specified
    if (matchingEndpoint.delay > 0) {
      await new Promise(resolve => setTimeout(resolve, matchingEndpoint.delay));
    }

    // Parse headers
    let headers = {};
    try {
      headers = JSON.parse(matchingEndpoint.headers || '{}');
    } catch (error) {
      console.error('Error parsing headers:', error);
    }

    // Set response headers
    Object.entries(headers).forEach(([key, value]) => {
      res.set(key, value);
    });

    // Parse and send response body
    let responseBody;
    try {
      responseBody = JSON.parse(matchingEndpoint.responseBody || '{}');
    } catch (error) {
      responseBody = matchingEndpoint.responseBody || '{}';
    }

    res.status(matchingEndpoint.statusCode).json(responseBody);

  } catch (error) {
    console.error('Error handling mock request:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down mock server...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down mock server...');
  await prisma.$disconnect();
  process.exit(0);
});
