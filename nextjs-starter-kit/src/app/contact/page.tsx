"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  CheckCircle,
  Github,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    budget: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        budget: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "hello@bennbatuu.com",
      action: "mailto:hello@bennbatuu.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "San Francisco, CA",
      action: "https://maps.google.com",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Response Time",
      description: "We typically respond within",
      value: "24 hours",
      action: null,
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/benbatuu",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: "https://twitter.com/benbatuu",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://linkedin.com/in/benbatuu",
    },
    {
      name: "Website",
      icon: <Globe className="h-5 w-5" />,
      url: "https://bennbatuu.com",
    },
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on complexity. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during consultation.",
    },
    {
      question: "What&apos;s included in your development process?",
      answer:
        "Our process includes discovery, design, development, testing, deployment, and ongoing support. We maintain transparent communication throughout the entire project lifecycle.",
    },
    {
      question: "Do you provide ongoing maintenance?",
      answer:
        "Yes! We offer comprehensive maintenance packages including updates, security patches, performance monitoring, and technical support to keep your project running smoothly.",
    },
    {
      question: "Can you work with our existing team?",
      answer:
        "Absolutely! We&apos;re experienced in collaborating with in-house teams and can integrate seamlessly with your existing workflows and development processes.",
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
              <MessageSquare className="h-4 w-4 mr-2" />
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Let&apos;s Build Something Amazing
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Ready to start your next project? We&apos;d love to hear from you.
              Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <MotionWrapper
              key={info.title}
              variant="fadeInUp"
              delay={index * 0.1}
            >
              <Card className="text-center shadow-soft hover:shadow-soft-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4 text-primary">
                    {info.icon}
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {info.action ? (
                    <a
                      href={info.action}
                      className="text-primary hover:underline font-medium"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-primary font-medium">
                      {info.value}
                    </span>
                  )}
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <MotionWrapper variant="fadeInUp">
            <Card className="shadow-soft-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for your message. We&apos;ll get back to you
                      soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Project Budget</Label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                        >
                          <option value="">Select Budget Range</option>
                          <option value="under-5k">Under $5,000</option>
                          <option value="5k-15k">$5,000 - $15,000</option>
                          <option value="15k-50k">$15,000 - $50,000</option>
                          <option value="50k-plus">$50,000+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="What can we help you with?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us about your project..."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Map & Additional Info */}
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <div className="space-y-8">
              {/* Map Placeholder */}
              <Card className="shadow-soft-xl">
                <CardContent className="p-0">
                  <div className="h-64 bg-muted rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">
                        San Francisco, CA
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                  <CardDescription>
                    Stay connected and get updates on our latest projects.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialLinks.map(social => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Need Immediate Help?</CardTitle>
                  <CardDescription>
                    For urgent inquiries, call us directly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <a href="tel:+15551234567">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now: +1 (555) 123-4567
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <MotionWrapper variant="fadeInUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers. Here are some common
            questions we receive.
          </p>
        </MotionWrapper>

        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <MotionWrapper
              key={faq.question}
              variant="fadeInUp"
              delay={index * 0.1}
            >
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {faq.answer}
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
          <Card className="text-center shadow-soft-xl bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-12 pb-12">
              <Calendar className="h-12 w-12 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schedule a free consultation to discuss your project
                requirements and get a custom quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Schedule Consultation
                  <Calendar className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  View Our Work
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </section>
    </div>
  );
}
