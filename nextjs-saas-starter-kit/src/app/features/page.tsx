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
  ArrowRight,
  CreditCard,
  Shield,
  Users,
  BarChart3,
  CheckCircle,
  Zap,
  Globe,
  Lock,
  Clock,
  Smartphone,
  Database,
  Code,
} from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Subscription Management",
      description: "Complete Stripe integration with automated billing, invoicing, and subscription lifecycle management.",
      features: [
        "Automated billing cycles",
        "Multiple payment methods",
        "Proration handling",
        "Subscription upgrades/downgrades",
        "Failed payment recovery",
      ],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Multi-tenant Architecture",
      description: "Built for scale with organization management, role-based access control, and team collaboration.",
      features: [
        "Organization management",
        "Role-based permissions",
        "Team collaboration",
        "User invitation system",
        "Workspace isolation",
      ],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and reporting with real-time insights into your business metrics.",
      features: [
        "Revenue tracking",
        "User behavior analytics",
        "Custom reports",
        "Export capabilities",
        "Real-time metrics",
      ],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with authentication, authorization, and data protection built-in.",
      features: [
        "JWT authentication",
        "API rate limiting",
        "Data encryption",
        "Audit logging",
        "GDPR compliance",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimized",
      description: "Built with Next.js 15 and optimized for speed and scalability.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global CDN",
      description: "Worldwide content delivery for fast loading times.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Data Privacy",
      description: "Your data is secure with enterprise-grade encryption.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "99.9% Uptime",
      description: "Reliable infrastructure with guaranteed uptime.",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Responsive",
      description: "Perfect experience across all devices and screen sizes.",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Scalable Database",
      description: "PostgreSQL with Prisma ORM for robust data management.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Developer Friendly",
      description: "Clean code architecture with TypeScript and modern tooling.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <MotionWrapper variant="fadeInUp">
    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Powerful Features for
              <br />
              <span className="text-primary">Modern SaaS</span>
            </h1>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to build, launch, and scale your SaaS product with
              enterprise-grade features and modern architecture.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link href="/pricing">
                  View Pricing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link href="/dashboard">
                  Try Dashboard
                </Link>
              </Button>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <MotionWrapper variant="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The essential features every successful SaaS needs
            </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mainFeatures.map((feature, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
              <Card className="shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <MotionWrapper variant="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plus many more features to help you succeed
            </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.05}>
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
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already building amazing SaaS
                products with our starter kit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/auth/signup">
                    Start Building
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <Link href="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </section>
    </div>
  );
}
