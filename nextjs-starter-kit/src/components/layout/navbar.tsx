"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";
import { useTheme } from "@/lib/hooks/use-theme";
import { LogOut } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { isDark } = useTheme();

  return (
    <nav
      className="navbar sticky top-0 z-50 w-full"
      style={{
        backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
        borderBottom: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
        boxShadow: isDark
          ? "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)"
          : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">N</span>
          </div>
          <span
            className="font-bold text-xl"
            style={{ color: isDark ? "#ededed" : "#1c1c1c" }}
          >
            NextJS Starter Kit
          </span>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors"
            style={{ color: isDark ? "#ededed" : "#1c1c1c" }}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
            style={{ color: isDark ? "#ededed" : "#1c1c1c" }}
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium hover:text-primary transition-colors"
            style={{ color: isDark ? "#ededed" : "#1c1c1c" }}
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            className="text-sm font-medium hover:text-primary transition-colors"
            style={{ color: isDark ? "#ededed" : "#1c1c1c" }}
          >
            Portfolio
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary transition-colors"
            style={{ color: isDark ? "#ededed" : "#1c1c1c" }}
          >
            Contact
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button asChild variant="outline">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={logout} variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
