"use client";

import { MotionWrapper } from "@/components/common/motion-wrapper";
import {
  CreditCard,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Lock,
  Database,
  Smartphone,
  Cloud,
  Settings,
  Headphones,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Advanced Billing",
      description: "Complete Stripe integration with subscription management, invoicing, and revenue analytics.",
      gradient: "from-blue-600 to-slate-700",
      bgGradient: "from-blue-50/50 to-slate-50/50 dark:from-blue-950/10 dark:to-slate-900/10",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Multi-tenant Architecture",
      description: "Built for scale with organization management and role-based access control.",
      gradient: "from-slate-600 to-slate-800",
      bgGradient: "from-slate-50/50 to-slate-100/50 dark:from-slate-800/10 dark:to-slate-900/10",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights with real-time metrics and customizable reports.",
      gradient: "from-emerald-600 to-slate-700",
      bgGradient: "from-emerald-50/50 to-slate-50/50 dark:from-emerald-950/10 dark:to-slate-900/10",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with 2FA, SSO, and compliance-ready infrastructure.",
      gradient: "from-red-600 to-slate-700",
      bgGradient: "from-red-50/50 to-slate-50/50 dark:from-red-950/10 dark:to-slate-900/10",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Performance",
      description: "Optimized for speed with edge computing and intelligent caching.",
      gradient: "from-amber-600 to-slate-700",
      bgGradient: "from-amber-50/50 to-slate-50/50 dark:from-amber-950/10 dark:to-slate-900/10",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Infrastructure",
      description: "Worldwide CDN with 99.9% uptime and multi-region deployment.",
      gradient: "from-indigo-600 to-slate-700",
      bgGradient: "from-indigo-50/50 to-slate-50/50 dark:from-indigo-950/10 dark:to-slate-900/10",
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Data Privacy",
      description: "GDPR compliant with end-to-end encryption and data sovereignty.",
      gradient: "from-slate-600 to-slate-800",
      bgGradient: "from-slate-50/50 to-slate-100/50 dark:from-slate-800/10 dark:to-slate-900/10",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Scalable Database",
      description: "PostgreSQL with read replicas, automated backups, and query optimization.",
      gradient: "from-cyan-600 to-slate-700",
      bgGradient: "from-cyan-50/50 to-slate-50/50 dark:from-cyan-950/10 dark:to-slate-900/10",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Ready",
      description: "Responsive design with PWA support and native mobile apps.",
      gradient: "from-rose-600 to-slate-700",
      bgGradient: "from-rose-50/50 to-slate-50/50 dark:from-rose-950/10 dark:to-slate-900/10",
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Native",
      description: "Built for the cloud with auto-scaling and container orchestration.",
      gradient: "from-violet-600 to-slate-700",
      bgGradient: "from-violet-50/50 to-slate-50/50 dark:from-violet-950/10 dark:to-slate-900/10",
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Developer Experience",
      description: "TypeScript, hot reload, and comprehensive documentation included.",
      gradient: "from-green-600 to-slate-700",
      bgGradient: "from-green-50/50 to-slate-50/50 dark:from-green-950/10 dark:to-slate-900/10",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Dedicated support team with priority response and expert guidance.",
      gradient: "from-amber-600 to-slate-700",
      bgGradient: "from-amber-50/50 to-slate-50/50 dark:from-amber-950/10 dark:to-slate-900/10",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <MotionWrapper variant="fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/80 backdrop-blur-sm border border-border mb-6">
              <span className="text-sm font-medium text-muted-foreground">
                Enterprise Features
              </span>
            </div>
          </MotionWrapper>
          
          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-foreground">
                Everything You Need
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-slate-600 to-blue-600 bg-clip-text text-transparent">
                to Scale
              </span>
            </h2>
          </MotionWrapper>
          
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Built with modern technologies and best practices, our platform provides 
              all the tools you need to build, launch, and scale your SaaS business.
            </p>
          </MotionWrapper>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
              <div className={`group relative p-8 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border border-border hover:border-muted transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-foreground transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
