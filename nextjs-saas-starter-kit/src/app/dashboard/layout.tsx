"use client";

import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
      {children}
      </main>
    </div>
  );
}
