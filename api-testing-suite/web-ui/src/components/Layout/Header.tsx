import React from 'react';
import { Play, Settings, Bell, User, Search } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 h-20 flex items-center justify-between p-4">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold text-gray-900">API Testing Suite</h2>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tests, suites..."
            className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        {/* Run Tests Button */}
        <button className="btn btn-primary flex items-center">
          <Play className="w-4 h-4 mr-2" />
          Run Tests
        </button>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button className="btn btn-secondary">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="btn btn-secondary">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-sm">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-medium text-gray-900">John Doe</span>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};
