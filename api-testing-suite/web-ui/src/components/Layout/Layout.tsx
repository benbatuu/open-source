import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout: React.FC = () => {
  return (
    <div className="h-screen flex bg-gray-50 w-full">
      <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        <main className="flex-1 overflow-auto px-4">
          <Outlet />
        </main>
        </div>
    </div>
  );
};
