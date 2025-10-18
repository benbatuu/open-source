"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import {
  Book,
  Code,
  Rocket,
  Shield,
  CreditCard,
  Users,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Github,
  FileText,
  Video,
} from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  const quickStart = [
    {
      step: "1",
      title: "Install Dependencies",
      description: "Install all required packages and dependencies",
      code: "npm install",
    },
    {
      step: "2",
      title: "Setup Environment",
      description: "Configure your environment variables",
      code: "cp .env.example .env.local",
    },
    {
      step: "3",
      title: "Setup Database",
      description: "Initialize your PostgreSQL database",
      code: "npm run db:push",
    },
    {
      step: "4",
      title: "Start Development",
      description: "Launch your development server",
      code: "npm run dev",
    },
  ];

  const docSections = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Getting Started",
      description: "Learn how to set up and run your SaaS application",
      topics: [
        "Installation Guide",
        "Environment Setup",
        "Database Configuration",
        "First Steps",
      ],
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "API Documentation",
      description: "Complete API reference and integration guides",
      topics: [
        "Authentication API",
        "User Management",
        "Subscription API",
        "Webhook Events",
      ],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Authentication",
      description: "Secure user authentication and authorization",
      topics: [
        "NextAuth.js Setup",
        "OAuth Providers",
        "Role-based Access",
        "Session Management",
      ],
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Billing & Payments",
      description: "Stripe integration and subscription management",
      topics: [
        "Stripe Setup",
        "Subscription Plans",
        "Payment Processing",
        "Webhook Handling",
      ],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "User Management",
      description: "Multi-tenant architecture and user organization",
      topics: [
        "Organization Setup",
        "Team Management",
        "User Roles",
        "Invitation System",
      ],
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics",
      description: "Dashboard and reporting features",
      topics: [
        "Dashboard Setup",
        "Custom Metrics",
        "Report Generation",
        "Data Export",
      ],
    },
  ];

  const resources = [
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub Repository",
      description: "View source code and contribute",
      link: "https://github.com/benbatuu/open-source",
      external: true,
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "API Reference",
      description: "Complete API documentation",
      link: "/docs/api",
      external: false,
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      link: "/docs/tutorials",
      external: false,
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Best Practices",
      description: "Development and deployment guides",
      link: "/docs/best-practices",
      external: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <MotionWrapper variant="fadeInUp">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Documentation
            </h1>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to build and deploy your SaaS application.
              Comprehensive guides, API docs, and best practices.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link href="#quick-start">
                  Quick Start
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <a href="https://github.com/benbatuu/open-source" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <MotionWrapper variant="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quick Start Guide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get up and running in minutes with our step-by-step guide
            </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStart.map((step, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
              <Card className="shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {step.description}
                  </CardDescription>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                    {step.code}
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <MotionWrapper variant="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Documentation Sections
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guides for every aspect of your SaaS application
            </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docSections.map((section, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
              <Card className="shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {section.icon}
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <CardDescription className="text-base">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center text-sm">
                        <ArrowRight className="h-4 w-4 text-primary mr-2" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <MotionWrapper variant="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Helpful resources to accelerate your development
            </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resources.map((resource, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
              <Card className="shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={resource.link}>
                          {resource.external ? (
                            <>
                              Visit Resource
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </>
                          ) : (
                            <>
                              Read More
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </>
                          )}
                        </Link>
                      </Button>
                    </div>
                  </div>
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
                Need Help?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/contact">
                    Contact Support
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <a href="https://github.com/benbatuu/open-source/issues" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Report Issue
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </section>
    </div>
  );
}
