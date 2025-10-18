"use client";

import { MotionWrapper } from "@/components/common/motion-wrapper";
import {
  Users,
  Zap,
  Globe,
  Shield,
  TrendingUp,
  Award,
} from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: "10,000+",
      label: "Active Users",
      description: "Growing community of developers",
      gradient: "from-blue-600 to-slate-700",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      value: "99.9%",
      label: "Uptime",
      description: "Enterprise-grade reliability",
      gradient: "from-amber-600 to-slate-700",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      value: "50+",
      label: "Countries",
      description: "Global infrastructure",
      gradient: "from-emerald-600 to-slate-700",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      value: "SOC 2",
      label: "Compliant",
      description: "Enterprise security standards",
      gradient: "from-slate-600 to-slate-800",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "300%",
      label: "Growth",
      description: "Year-over-year expansion",
      gradient: "from-indigo-600 to-slate-700",
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: "4.9/5",
      label: "Rating",
      description: "Customer satisfaction",
      gradient: "from-rose-600 to-slate-700",
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
                Trusted Worldwide
              </span>
            </div>
          </MotionWrapper>
          
          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-foreground">
                Trusted by
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-slate-600 to-blue-600 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
          </MotionWrapper>
          
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of companies that trust our platform to power their 
              mission-critical applications and scale their business globally.
            </p>
          </MotionWrapper>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
              <div className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-muted transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${stat.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                
                {/* Value */}
                <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2 transition-colors">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                
                {/* Description */}
                <div className="text-muted-foreground">
                  {stat.description}
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </MotionWrapper>
          ))}
        </div>

        {/* Trust Badges */}
        <MotionWrapper variant="fadeInUp" delay={0.7}>
          <div className="mt-20 text-center">
            <p className="text-sm text-muted-foreground mb-8">
              Trusted by leading companies worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
              {/* Company logos would go here */}
              <div className="h-8 w-24 bg-muted rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">Company 1</span>
              </div>
              <div className="h-8 w-24 bg-muted rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">Company 2</span>
              </div>
              <div className="h-8 w-24 bg-muted rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">Company 3</span>
              </div>
              <div className="h-8 w-24 bg-muted rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">Company 4</span>
              </div>
              <div className="h-8 w-24 bg-muted rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">Company 5</span>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
