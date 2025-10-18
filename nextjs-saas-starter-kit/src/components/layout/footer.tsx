"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUp,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleAccordion = (section: string) => {
    // Eğer aynı section'a tıklanıyorsa, kapat
    if (openAccordion === section) {
      setOpenAccordion("");
    } else {
      // Farklı section'a tıklanıyorsa, o section'ı aç (diğerini kapat)
      setOpenAccordion(section);
    }
  };

  return (
    <footer className="bg-background border-t">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl">SaaS Kit</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              A comprehensive SaaS starter kit with subscription management, billing, and admin dashboard.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:contact@example.com">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            {/* Desktop Header */}
            <h3 className="font-semibold mb-4 hidden md:block">Product</h3>
            
            {/* Mobile Accordion Header */}
            <button
              onClick={() => toggleAccordion("product")}
              className="flex items-center justify-between w-full md:hidden py-2 text-left"
            >
              <h3 className="font-semibold">Product</h3>
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${
                  openAccordion === "product" ? "rotate-180" : ""
                }`} 
              />
            </button>
            
            {/* Links - Hidden on mobile when closed */}
            <ul className={`space-y-3 transition-all duration-200 ${
              openAccordion === "product" ? "block" : "hidden md:block"
            }`}>
              <li>
                <Link
                  href="/features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            {/* Desktop Header */}
            <h3 className="font-semibold mb-4 hidden md:block">Company</h3>
            
            {/* Mobile Accordion Header */}
            <button
              onClick={() => toggleAccordion("company")}
              className="flex items-center justify-between w-full md:hidden py-2 text-left"
            >
              <h3 className="font-semibold">Company</h3>
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${
                  openAccordion === "company" ? "rotate-180" : ""
                }`} 
              />
            </button>
            
            {/* Links - Hidden on mobile when closed */}
            <ul className={`space-y-3 transition-all duration-200 ${
              openAccordion === "company" ? "block" : "hidden md:block"
            }`}>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            {/* Desktop Header */}
            <h3 className="font-semibold mb-4 hidden md:block">Support</h3>
            
            {/* Mobile Accordion Header */}
            <button
              onClick={() => toggleAccordion("support")}
              className="flex items-center justify-between w-full md:hidden py-2 text-left"
            >
              <h3 className="font-semibold">Support</h3>
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${
                  openAccordion === "support" ? "rotate-180" : ""
                }`} 
              />
            </button>
            
            {/* Links - Hidden on mobile when closed */}
            <ul className={`space-y-3 transition-all duration-200 ${
              openAccordion === "support" ? "block" : "hidden md:block"
            }`}>
              <li>
                <Link
                  href="/help"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SaaS Kit. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-50 shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </footer>
  );
}
