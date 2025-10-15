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
  ExternalLink,
  Github,
  Globe,
  Code,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";

export default function PortfolioPage() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with advanced features like real-time inventory, payment processing, and analytics dashboard.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      technologies: ["Next.js", "TypeScript", "Prisma", "Stripe", "PostgreSQL"],
      category: "Web Development",
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/example/ecommerce",
      featured: true,
      stats: {
        users: "10K+",
        revenue: "$500K+",
        rating: "4.9",
      },
    },
    {
      title: "Mobile Banking App",
      description:
        "Secure mobile banking application with biometric authentication, real-time transactions, and financial insights.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      technologies: ["React Native", "Node.js", "MongoDB", "JWT", "AWS"],
      category: "Mobile Development",
      liveUrl: "https://banking-app.com",
      githubUrl: "https://github.com/example/banking-app",
      featured: true,
      stats: {
        users: "50K+",
        transactions: "$2M+",
        rating: "4.8",
      },
    },
    {
      title: "SaaS Dashboard",
      description:
        "Comprehensive analytics dashboard for SaaS companies with real-time metrics, user management, and reporting tools.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      technologies: ["React", "D3.js", "Express", "Redis", "Docker"],
      category: "Web Development",
      liveUrl: "https://saas-dashboard.com",
      githubUrl: "https://github.com/example/saas-dashboard",
      featured: false,
      stats: {
        users: "5K+",
        dataPoints: "1M+",
        rating: "4.7",
      },
    },
    {
      title: "Healthcare Management System",
      description:
        "Complete healthcare management solution with patient records, appointment scheduling, and telemedicine features.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      technologies: ["Vue.js", "Laravel", "MySQL", "WebRTC", "AWS"],
      category: "Web Development",
      liveUrl: "https://healthcare-system.com",
      githubUrl: "https://github.com/example/healthcare-system",
      featured: false,
      stats: {
        patients: "25K+",
        appointments: "100K+",
        rating: "4.9",
      },
    },
    {
      title: "Fitness Tracking App",
      description:
        "Personal fitness companion with workout tracking, nutrition logging, and social features for motivation.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      technologies: [
        "Flutter",
        "Firebase",
        "Google Fit",
        "Stripe",
        "Cloud Functions",
      ],
      category: "Mobile Development",
      liveUrl: "https://fitness-app.com",
      githubUrl: "https://github.com/example/fitness-app",
      featured: false,
      stats: {
        users: "100K+",
        workouts: "1M+",
        rating: "4.6",
      },
    },
    {
      title: "Real Estate Platform",
      description:
        "Modern real estate platform with virtual tours, property search, and agent management system.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      technologies: ["Next.js", "GraphQL", "PostgreSQL", "Mapbox", "Vercel"],
      category: "Web Development",
      liveUrl: "https://real-estate-platform.com",
      githubUrl: "https://github.com/example/real-estate",
      featured: false,
      stats: {
        properties: "50K+",
        agents: "2K+",
        rating: "4.8",
      },
    },
  ];

  const categories = [
    { name: "All", count: projects.length },
    {
      name: "Web Development",
      count: projects.filter(p => p.category === "Web Development").length,
    },
    {
      name: "Mobile Development",
      count: projects.filter(p => p.category === "Mobile Development").length,
    },
    { name: "Featured", count: projects.filter(p => p.featured).length },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content:
        "The team delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is unmatched.",
      rating: 5,
      project: "E-Commerce Platform",
    },
    {
      name: "Michael Chen",
      role: "CTO, FinanceApp",
      content:
        "Our mobile banking app has been a game-changer for our business. The security features and user experience are outstanding.",
      rating: 5,
      project: "Mobile Banking App",
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, HealthTech",
      content:
        "The healthcare management system has streamlined our operations significantly. The team understood our complex requirements perfectly.",
      rating: 5,
      project: "Healthcare Management System",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <MotionWrapper variant="fadeInUp">
            <Badge variant="outline" className="mb-4">
              <Code className="h-4 w-4 mr-2" />
              Our Portfolio
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects That Make a Difference
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Explore our portfolio of successful projects that have helped
              businesses grow, innovate, and achieve their digital
              transformation goals.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="container mx-auto px-4 py-8">
        <MotionWrapper variant="fadeInUp">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button
                key={category.name}
                variant={index === 0 ? "default" : "outline"}
                className="rounded-full"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </MotionWrapper>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-16">
        <MotionWrapper variant="fadeInUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our most successful and innovative projects that showcase our
            capabilities.
          </p>
        </MotionWrapper>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects
            .filter(p => p.featured)
            .map((project, index) => (
              <MotionWrapper
                key={project.title}
                variant="fadeInUp"
                delay={index * 0.2}
              >
                <Card className="overflow-hidden shadow-soft-xl hover:shadow-soft-2xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{project.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {project.stats.rating}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {value}
                          </div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <Button className="flex-1" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </MotionWrapper>
            ))}
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="container mx-auto px-4 py-16">
        <MotionWrapper variant="fadeInUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive view of all our completed projects across different
            industries and technologies.
          </p>
        </MotionWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <MotionWrapper
              key={project.title}
              variant="fadeInUp"
              delay={index * 0.1}
            >
              <Card className="overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{project.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {project.stats.rating}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <MotionWrapper variant="fadeInUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients
            have to say about working with us.
          </p>
        </MotionWrapper>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <MotionWrapper
              key={testimonial.name}
              variant="fadeInUp"
              delay={index * 0.1}
            >
              <Card className="shadow-soft h-full">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    &quot;{testimonial.content}&quot;
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-primary">
                        {testimonial.project}
                      </div>
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
          <Card className="text-center shadow-soft-xl bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-12 pb-12">
              <TrendingUp className="h-12 w-12 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let&apos;s create something amazing together. Get in touch to
                discuss your project requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Start Your Project
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  View Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </section>
    </div>
  );
}
