import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { RequestBuilder } from './components/API/RequestBuilder';
import { TestSuiteManager } from './components/API/TestSuiteManager';
import { MockServerManager } from './components/Mock/MockServerManager';
import { Performance } from './components/Performance/Performance';
import { Reports } from './components/Reports/Reports';
import { DataManager } from './components/DataManager/DataManager';
import { Settings } from './components/Settings/Settings';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="tests" element={<RequestBuilder />} />
              <Route path="suites" element={<TestSuiteManager />} />
              <Route path="mock" element={<MockServerManager />} />
              <Route path="performance" element={<Performance />} />
              <Route path="reports" element={<Reports />} />
              <Route path="data" element={<DataManager />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </QueryClientProvider>
  );
}


export default App;