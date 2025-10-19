// Test setup file for Jest
import { logger } from '../core/logger/logger';

// Set test environment
process.env['NODE_ENV'] = 'test';

// Configure logger for tests
logger.setLevel('error'); // Reduce noise during tests

// Global test timeout
jest.setTimeout(30000);

// Mock console methods to reduce noise during tests
const originalConsole = { ...console };
global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

// Restore console after tests
afterAll(() => {
  global.console = originalConsole;
});
