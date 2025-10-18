"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Dashboard sayfalarında navbar ve footer gösterme
  const isDashboardPage = pathname === "/dashboard" || 
                         pathname.startsWith("/analytics") || 
                         pathname.startsWith("/api-keys") || 
                         pathname.startsWith("/billing") || 
                         pathname.startsWith("/notifications") || 
                         pathname.startsWith("/reports") || 
                         pathname.startsWith("/settings") || 
                         pathname.startsWith("/users") ||
                         pathname.startsWith("/dashboard/analytics") ||
                         pathname.startsWith("/dashboard/api-keys") ||
                         pathname.startsWith("/dashboard/billing") ||
                         pathname.startsWith("/dashboard/notifications") ||
                         pathname.startsWith("/dashboard/reports") ||
                         pathname.startsWith("/dashboard/settings") ||
                         pathname.startsWith("/dashboard/users");

  // Auth sayfalarında da navbar ve footer gösterme
  const isAuthPage = pathname.startsWith("/signin") || pathname.startsWith("/signup");

  if (isDashboardPage || isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
