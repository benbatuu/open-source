import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Play, 
  Settings, 
  FileText, 
  Server, 
  BarChart3, 
  Database,
  Zap,
  Home
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'API Tests', href: '/tests', icon: Play },
  { name: 'Test Suites', href: '/suites', icon: FileText },
  { name: 'Mock Server', href: '/mock', icon: Server },
  { name: 'Performance', href: '/performance', icon: Zap },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Data Manager', href: '/data', icon: Database },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="sidebar w-72 flex flex-col">
      <div className="flex items-center h-20 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-white" />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold text-gray-900">API Test Suite</h1>
            <p className="text-sm text-gray-500">Testing Platform</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
            >
              <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Version 1.0.0</p>
          <p>© 2025 bennbatuu.com</p>
        </div>
      </div>
    </div>
  );
};
