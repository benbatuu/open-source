// Core Types
export interface TestConfig {
  name: string;
  description?: string;
  baseUrl: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
  auth?: AuthConfig;
  plugins?: PluginConfig[];
  modules?: ModuleConfig[];
}

export interface AuthConfig {
  type: 'bearer' | 'basic' | 'api-key' | 'oauth2';
  token?: string;
  username?: string;
  password?: string;
  apiKey?: string;
  apiKeyHeader?: string;
  clientId?: string;
  clientSecret?: string;
}

export interface PluginConfig {
  name: string;
  enabled: boolean;
  config?: Record<string, any>;
}

export interface ModuleConfig {
  name: string;
  enabled: boolean;
  config?: Record<string, any>;
}

// Test Execution Types
export interface TestSuite {
  name: string;
  description?: string;
  tests: TestCase[];
  setup?: TestHook[];
  teardown?: TestHook[];
  config?: TestConfig;
}

export interface TestCase {
  name: string;
  description?: string;
  type: 'unit' | 'integration' | 'e2e' | 'performance';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  expectedStatus?: number;
  expectedResponse?: any;
  assertions?: Assertion[];
  timeout?: number;
  retries?: number;
  skip?: boolean;
  tags?: string[];
}

export interface TestHook {
  name: string;
  type: 'before' | 'after' | 'beforeEach' | 'afterEach';
  action: () => Promise<void> | void;
}

export interface Assertion {
  type: 'status' | 'header' | 'body' | 'responseTime' | 'custom';
  expected: any;
  path?: string;
  operator?: 'equals' | 'contains' | 'matches' | 'greaterThan' | 'lessThan';
  custom?: (response: any) => boolean;
}

// API Client Types
export interface ApiRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  responseTime: number;
  size: number;
}

// Test Result Types
export interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'skipped' | 'error';
  duration: number;
  startTime: Date;
  endTime: Date;
  error?: Error;
  assertions?: AssertionResult[];
  response?: ApiResponse;
  retries?: number;
}

export interface AssertionResult {
  name: string;
  status: 'passed' | 'failed';
  expected: any;
  actual: any;
  message?: string;
}

export interface TestReport {
  summary: TestSummary;
  results: TestResult[];
  duration: number;
  startTime: Date;
  endTime: Date;
  config: TestConfig;
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  error: number;
  passRate: number;
}

// Plugin Types
export interface Plugin {
  name: string;
  version: string;
  description?: string;
  hooks?: PluginHooks;
  commands?: PluginCommands;
  init?: (config: any) => Promise<void>;
  destroy?: () => Promise<void>;
}

export interface PluginHooks {
  beforeTest?: (test: TestCase) => Promise<void>;
  afterTest?: (result: TestResult) => Promise<void>;
  beforeSuite?: (suite: TestSuite) => Promise<void>;
  afterSuite?: (results: TestResult[]) => Promise<void>;
  beforeAll?: () => Promise<void>;
  afterAll?: () => Promise<void>;
}

export interface PluginCommands {
  [key: string]: (args: any[]) => Promise<any>;
}

// Data Management Types
export interface TestData {
  id: string;
  name: string;
  type: 'fixture' | 'factory' | 'generator';
  data: any;
  schema?: any;
  dependencies?: string[];
}

export interface DataGenerator {
  name: string;
  generate: (params?: any) => any;
  validate?: (data: any) => boolean;
}

// Mock Server Types
export interface MockRule {
  id: string;
  name: string;
  method: string;
  url: string | RegExp;
  response: MockResponse;
  delay?: number;
  enabled: boolean;
}

export interface MockResponse {
  status: number;
  headers?: Record<string, string>;
  body: any;
}

// Performance Testing Types
export interface PerformanceTest {
  name: string;
  description?: string;
  scenarios: PerformanceScenario[];
  config: PerformanceConfig;
}

export interface PerformanceScenario {
  name: string;
  weight: number;
  requests: PerformanceRequest[];
  thinkTime?: number;
}

export interface PerformanceRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: any;
}

export interface PerformanceConfig {
  duration?: number;
  users?: number;
  rampUp?: number;
  rampDown?: number;
  thresholds?: PerformanceThreshold[];
}

export interface PerformanceThreshold {
  metric: string;
  threshold: number;
  operator: 'lessThan' | 'greaterThan' | 'equals';
}

export interface PerformanceResult {
  name: string;
  duration: number;
  requests: number;
  failures: number;
  avgResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  throughput: number;
  errorRate: number;
  thresholds: PerformanceThresholdResult[];
}

export interface PerformanceThresholdResult {
  metric: string;
  threshold: number;
  actual: number;
  passed: boolean;
}

// Logger Types
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
}

// Event Types
export interface TestEvent {
  type: string;
  timestamp: Date;
  data: any;
}

export interface EventEmitter {
  on: (event: string, listener: (data: any) => void) => void;
  off: (event: string, listener: (data: any) => void) => void;
  emit: (event: string, data: any) => void;
}
