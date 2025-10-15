"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Navbar } from "@/components/layout/navbar";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  ArrowRight,
  Code,
  Palette,
  Shield,
  Zap,
  Star,
  Github,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Modern Architecture",
      description:
        "Next.js 15 with App Router, TypeScript, and Server Components for optimal performance.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Premium Design",
      description:
        "Beautiful UI with shadcn/ui components, dark/light theme, and smooth animations.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Authentication Ready",
      description:
        "Demo auth system with protected routes and form validation using Zod.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Production Ready",
      description:
        "SEO optimized, performance tuned, and deployment ready with Vercel.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <MotionWrapper variant="fadeInUp">
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-background/50 backdrop-blur">
              <Star className="h-4 w-4 text-yellow-500 mr-2" />
              <span>Production-ready Next.js 15 starter kit</span>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mt-8 mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Build Modern Web Apps
              <br />
              <span className="text-primary">Faster</span>
            </h1>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A comprehensive Next.js 15 starter kit with premium design, smooth
              animations, authentication, and enterprise-grade features. Start
              building your next project in minutes.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                  {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <a
                  href="https://github.com/bennbatuu/nextjs-starter-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <MotionWrapper variant="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Build
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pre-configured with modern tools and best practices for rapid
              development
            </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
              <Card className="shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <MotionWrapper variant="fadeInUp">
          <Card className="shadow-soft-xl bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="text-center py-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Building?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Clone the repository and start building your next amazing
                project with our production-ready starter kit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="gap-2">
                  <a
                    href="https://github.com/bennbatuu/nextjs-starter-kit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    Star on GitHub
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <a
                    href="https://nextjs-starter-kit.bennbatuu.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <MotionWrapper variant="fadeIn">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">
                    N
                  </span>
                </div>
                <span className="font-semibold">NextJS Starter Kit</span>
              </div>
            </MotionWrapper>

            <MotionWrapper variant="fadeIn" delay={0.1}>
              <p className="text-sm text-muted-foreground">
                Made with ❤️ by{" "}
                <a
                  href="https://bennbatuu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  bennbatuu.com
                </a>
              </p>
            </MotionWrapper>
          </div>
        </div>
      </footer>
    </div>
  );
}
