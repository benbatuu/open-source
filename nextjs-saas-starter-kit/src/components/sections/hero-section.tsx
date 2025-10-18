"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

export function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-foreground/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-foreground/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-foreground/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/80 backdrop-blur-sm border border-border mb-8">
              <Sparkles className="h-4 w-4 text-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Enterprise-Grade SaaS Platform
              </span>
            </div>
          </MotionWrapper>

          {/* Main Heading */}
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">
                Build the Future
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-slate-600 to-blue-600 bg-clip-text text-transparent">
                of Your Business
              </span>
            </h1>
          </MotionWrapper>

          {/* Subtitle */}
          <MotionWrapper variant="fadeInUp" delay={0.3}>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              The most comprehensive SaaS starter kit with enterprise-grade features, 
              beautiful design, and everything you need to launch your next big idea.
            </p>
          </MotionWrapper>

          {/* CTA Buttons */}
          <MotionWrapper variant="fadeInUp" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {isAuthenticated ? (
                <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                    <Link href="/signup" className="flex items-center gap-2">
                      Start Building
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="group border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-lg font-semibold transition-all duration-300">
                    <Link href="/signin" className="flex items-center gap-2">
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </MotionWrapper>

          {/* Demo Video Button */}
          <MotionWrapper variant="fadeInUp" delay={0.5}>
            <Button variant="ghost" className="group text-muted-foreground hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-5 w-5 text-white ml-1" />
                </div>
                <span className="text-sm font-medium">Watch Demo</span>
              </div>
            </Button>
          </MotionWrapper>

          {/* Trust Indicators */}
          <MotionWrapper variant="fadeInUp" delay={0.6}>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">Global Scale</span>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>

      {/* Scroll Indicator */}
      <MotionWrapper variant="fadeInUp" delay={0.8}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
}
