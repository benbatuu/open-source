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
import {
  Users,
  Target,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Code,
  Palette,
  Zap,
  Shield,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    {
      label: "Projects Completed",
      value: "500+",
      icon: <Target className="h-6 w-6" />,
    },
    {
      label: "Happy Clients",
      value: "200+",
      icon: <Users className="h-6 w-6" />,
    },
    {
      label: "Years Experience",
      value: "8+",
      icon: <Award className="h-6 w-6" />,
    },
    {
      label: "Success Rate",
      value: "99%",
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ];

  const values = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Innovation First",
      description:
        "We stay ahead of the curve with cutting-edge technologies and modern development practices.",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Design Excellence",
      description:
        "Every pixel matters. We create beautiful, intuitive interfaces that users love.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance Focused",
      description:
        "Speed and efficiency are at the core of everything we build.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security Minded",
      description:
        "We implement best practices to keep your applications secure and reliable.",
    },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Full-stack developer with 8+ years of experience in modern web technologies.",
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Creative designer passionate about creating beautiful and functional user experiences.",
    },
    {
      name: "Mike Rodriguez",
      role: "DevOps Engineer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Infrastructure expert ensuring scalable and reliable deployments.",
    },
    {
      name: "Emma Wilson",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Strategic thinker focused on delivering products that users actually need.",
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
              <Globe className="h-4 w-4 mr-2" />
              About Our Company
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Building the Future of Web Development
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We&apos;re a passionate team of developers, designers, and
              innovators dedicated to creating exceptional digital experiences
              that drive business growth and user satisfaction.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <MotionWrapper
              key={stat.label}
              variant="fadeInUp"
              delay={index * 0.1}
            >
              <Card className="text-center shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <MotionWrapper variant="fadeInUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            These principles guide everything we do and help us deliver
            exceptional results.
          </p>
        </MotionWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <MotionWrapper
              key={value.title}
              variant="fadeInUp"
              delay={index * 0.1}
            >
              <Card className="h-full shadow-soft hover:shadow-soft-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4 text-primary">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <MotionWrapper variant="fadeInUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The talented individuals behind our success stories.
          </p>
        </MotionWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <MotionWrapper
              key={member.name}
              variant="fadeInUp"
              delay={index * 0.1}
            >
              <Card className="text-center shadow-soft hover:shadow-soft-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
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
              <Heart className="h-12 w-12 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Work Together?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss your project and see how we can help bring
                your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Get In Touch
                </a>
                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  View Our Work
                </a>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </section>
    </div>
  );
}
