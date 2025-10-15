"use client";

import { Navbar } from "@/components/layout/navbar";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code,
  Palette,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Web Development",
      description:
        "Custom web applications built with modern technologies like Next.js, React, and TypeScript.",
      features: [
        "Responsive Design",
        "Performance Optimization",
        "SEO Friendly",
        "Cross-browser Compatibility",
      ],
      price: "Starting at $2,500",
      popular: false,
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile apps that deliver exceptional user experiences.",
      features: [
        "iOS & Android Apps",
        "React Native Development",
        "App Store Optimization",
        "Push Notifications",
      ],
      price: "Starting at $5,000",
      popular: true,
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive designs that engage users and drive conversions.",
      features: [
        "User Research",
        "Wireframing & Prototyping",
        "Visual Design",
        "Usability Testing",
      ],
      price: "Starting at $1,500",
      popular: false,
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Backend Development",
      description:
        "Scalable server-side solutions with robust APIs and database architecture.",
      features: [
        "RESTful APIs",
        "Database Design",
        "Authentication Systems",
        "Cloud Integration",
      ],
      price: "Starting at $3,000",
      popular: false,
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Solutions",
      description:
        "Deploy and scale your applications with modern cloud infrastructure.",
      features: [
        "AWS/Azure/GCP Setup",
        "CI/CD Pipelines",
        "Monitoring & Logging",
        "Auto-scaling",
      ],
      price: "Starting at $2,000",
      popular: false,
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security Audit",
      description:
        "Comprehensive security assessments to protect your applications and data.",
      features: [
        "Vulnerability Assessment",
        "Penetration Testing",
        "Security Best Practices",
        "Compliance Review",
      ],
      price: "Starting at $1,000",
      popular: false,
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description:
        "We start by understanding your business goals, target audience, and technical requirements.",
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description:
        "Create wireframes, mockups, and interactive prototypes to visualize your project.",
    },
    {
      step: "03",
      title: "Development & Testing",
      description:
        "Build your solution using best practices with continuous testing and quality assurance.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description:
        "Deploy your project and provide ongoing maintenance and support services.",
    },
  ];

  const technologies = [
    { name: "Next.js", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
    { name: "Figma", category: "Design" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Prisma", category: "ORM" },
    { name: "Vercel", category: "Deployment" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <MotionWrapper variant="fadeInUp">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-4 w-4 mr-2" />
              Our Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Comprehensive Digital Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              From concept to deployment, we provide end-to-end development
              services that help your business thrive in the digital landscape.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <MotionWrapper
              key={service.title}
              variant="fadeInUp"
              delay={index * 0.1}
            >
              <Card
                className={`h-full shadow-soft hover:shadow-soft-lg transition-all duration-300 relative ${
                  service.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-4">
                      {service.price}
                    </div>
                    <Button
                      className="w-full"
                      variant={service.popular ? "default" : "outline"}
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-16">
        <MotionWrapper variant="fadeInUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Development Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that ensures quality, transparency, and
            successful project delivery.
          </p>
        </MotionWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <MotionWrapper
              key={step.step}
              variant="fadeInUp"
              delay={index * 0.1}
            >
              <Card className="text-center shadow-soft h-full">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {step.step}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Technologies Section */}
      <section className="container mx-auto px-4 py-16">
        <MotionWrapper variant="fadeInUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technologies We Use
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We work with the latest and most reliable technologies to build
            robust solutions.
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <MotionWrapper
              key={tech.name}
              variant="fadeInUp"
              delay={index * 0.05}
            >
              <Card className="text-center shadow-soft hover:shadow-soft-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="text-sm font-medium mb-1">{tech.name}</div>
                  <Badge variant="secondary" className="text-xs">
                    {tech.category}
                  </Badge>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <MotionWrapper variant="fadeInUp">
          <Card className="text-center shadow-soft-xl bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-12 pb-12">
              <Users className="h-12 w-12 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss your requirements and create a custom
                solution that fits your needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Schedule Consultation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  View Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </section>
    </div>
  );
}
