import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: Test[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
}

export interface Test {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: Record<string, string>;
  body?: any;
  expectedStatus: number;
  assertions: Assertion[];
  status: 'passed' | 'failed' | 'pending' | 'running';
  lastRun?: string;
  duration?: number;
}

export interface Assertion {
  id: string;
  type: 'status' | 'response_time' | 'json_path' | 'header' | 'body_contains';
  expected: any;
  actual?: any;
  passed?: boolean;
}

export interface TestRun {
  id: string;
  suiteId: string;
  status: 'running' | 'completed' | 'failed';
  startTime: string;
  endTime?: string;
  results: TestResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  };
}

export interface TestResult {
  testId: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  response?: {
    status: number;
    headers: Record<string, string>;
    body: any;
  };
  assertions: Assertion[];
  error?: string;
}

export interface Environment {
  id: string;
  name: string;
  baseUrl: string;
  headers: Record<string, string>;
  variables: Record<string, string>;
  active: boolean;
}

export interface AppState {
  testSuites: TestSuite[];
  currentTestRun: TestRun | null;
  environments: Environment[];
  selectedEnvironment: string | null;
  isLoading: boolean;
  error: string | null;
}

// Action Types
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TEST_SUITES'; payload: TestSuite[] }
  | { type: 'ADD_TEST_SUITE'; payload: TestSuite }
  | { type: 'UPDATE_TEST_SUITE'; payload: TestSuite }
  | { type: 'DELETE_TEST_SUITE'; payload: string }
  | { type: 'SET_CURRENT_TEST_RUN'; payload: TestRun | null }
  | { type: 'UPDATE_TEST_RUN'; payload: TestRun }
  | { type: 'SET_ENVIRONMENTS'; payload: Environment[] }
  | { type: 'SET_SELECTED_ENVIRONMENT'; payload: string | null }
  | { type: 'ADD_ENVIRONMENT'; payload: Environment }
  | { type: 'UPDATE_ENVIRONMENT'; payload: Environment }
  | { type: 'DELETE_ENVIRONMENT'; payload: string };

// Initial State
const initialState: AppState = {
  testSuites: [],
  currentTestRun: null,
  environments: [
    {
      id: 'dev',
      name: 'Development',
      baseUrl: 'https://dev-api.example.com',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      variables: {
        apiKey: 'dev-key-123',
        version: 'v1'
      },
      active: true
    },
    {
      id: 'staging',
      name: 'Staging',
      baseUrl: 'https://staging-api.example.com',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      variables: {
        apiKey: 'staging-key-456',
        version: 'v1'
      },
      active: false
    }
  ],
  selectedEnvironment: 'dev',
  isLoading: false,
  error: null
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_TEST_SUITES':
      return { ...state, testSuites: action.payload };
    
    case 'ADD_TEST_SUITE':
      return { ...state, testSuites: [...state.testSuites, action.payload] };
    
    case 'UPDATE_TEST_SUITE':
      return {
        ...state,
        testSuites: state.testSuites.map(suite =>
          suite.id === action.payload.id ? action.payload : suite
        )
      };
    
    case 'DELETE_TEST_SUITE':
      return {
        ...state,
        testSuites: state.testSuites.filter(suite => suite.id !== action.payload)
      };
    
    case 'SET_CURRENT_TEST_RUN':
      return { ...state, currentTestRun: action.payload };
    
    case 'UPDATE_TEST_RUN':
      return { ...state, currentTestRun: action.payload };
    
    case 'SET_ENVIRONMENTS':
      return { ...state, environments: action.payload };
    
    case 'SET_SELECTED_ENVIRONMENT':
      return { ...state, selectedEnvironment: action.payload };
    
    case 'ADD_ENVIRONMENT':
      return { ...state, environments: [...state.environments, action.payload] };
    
    case 'UPDATE_ENVIRONMENT':
      return {
        ...state,
        environments: state.environments.map(env =>
          env.id === action.payload.id ? action.payload : env
        )
      };
    
    case 'DELETE_ENVIRONMENT':
      return {
        ...state,
        environments: state.environments.filter(env => env.id !== action.payload)
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Action Creators
export const appActions = {
  setLoading: (loading: boolean): AppAction => ({
    type: 'SET_LOADING',
    payload: loading
  }),

  setError: (error: string | null): AppAction => ({
    type: 'SET_ERROR',
    payload: error
  }),

  setTestSuites: (suites: TestSuite[]): AppAction => ({
    type: 'SET_TEST_SUITES',
    payload: suites
  }),

  addTestSuite: (suite: TestSuite): AppAction => ({
    type: 'ADD_TEST_SUITE',
    payload: suite
  }),

  updateTestSuite: (suite: TestSuite): AppAction => ({
    type: 'UPDATE_TEST_SUITE',
    payload: suite
  }),

  deleteTestSuite: (id: string): AppAction => ({
    type: 'DELETE_TEST_SUITE',
    payload: id
  }),

  setCurrentTestRun: (run: TestRun | null): AppAction => ({
    type: 'SET_CURRENT_TEST_RUN',
    payload: run
  }),

  updateTestRun: (run: TestRun): AppAction => ({
    type: 'UPDATE_TEST_RUN',
    payload: run
  }),

  setEnvironments: (environments: Environment[]): AppAction => ({
    type: 'SET_ENVIRONMENTS',
    payload: environments
  }),

  setSelectedEnvironment: (id: string | null): AppAction => ({
    type: 'SET_SELECTED_ENVIRONMENT',
    payload: id
  }),

  addEnvironment: (environment: Environment): AppAction => ({
    type: 'ADD_ENVIRONMENT',
    payload: environment
  }),

  updateEnvironment: (environment: Environment): AppAction => ({
    type: 'UPDATE_ENVIRONMENT',
    payload: environment
  }),

  deleteEnvironment: (id: string): AppAction => ({
    type: 'DELETE_ENVIRONMENT',
    payload: id
  })
};
