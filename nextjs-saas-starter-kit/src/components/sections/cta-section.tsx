"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  ArrowRight,
  Sparkles,
  Rocket,
  Star,
} from "lucide-react";

export function CTASection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-24 bg-gradient-to-br from-background via-background to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-foreground/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-foreground/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-foreground/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <MotionWrapper variant="fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 mb-8">
              <Sparkles className="h-4 w-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">
                Ready to Get Started?
              </span>
            </div>
          </MotionWrapper>

          {/* Main Heading */}
          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Launch Your Next
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Big Idea
              </span>
            </h2>
          </MotionWrapper>

          {/* Subtitle */}
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of developers and entrepreneurs who are already building 
              the future with our comprehensive SaaS platform.
            </p>
          </MotionWrapper>

          {/* CTA Buttons */}
          <MotionWrapper variant="fadeInUp" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {isAuthenticated ? (
                <Button size="lg" className="group px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="group px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                    <Link href="/signup" className="flex items-center gap-2">
                      <Rocket className="h-5 w-5" />
                      Start Building Now
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="group px-8 py-4 text-lg font-semibold transition-all duration-300">
                    <Link href="/signin" className="flex items-center gap-2">
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </MotionWrapper>

          {/* Trust Indicators */}
          <MotionWrapper variant="fadeInUp" delay={0.4}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Rocket className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium">Quick Setup</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-medium">Premium Support</span>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
