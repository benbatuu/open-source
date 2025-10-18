"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Bug,
  Star,
  Loader2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      value: "support@saaskit.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "Speak with our support team",
      value: "+1 (555) 123-4567",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "Our headquarters location",
      value: "123 SaaS Street, Tech City, TC 12345",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      description: "When we're available to help",
      value: "Mon - Fri: 9:00 AM - 6:00 PM PST",
    },
  ];

  const faqs = [
    {
      icon: <HelpCircle className="h-5 w-5" />,
      question: "How do I get started with the SaaS starter kit?",
      answer: "Simply clone our repository, install dependencies, set up your environment variables, and run the development server. Check our docs for detailed instructions.",
    },
    {
      icon: <Bug className="h-5 w-5" />,
      question: "I found a bug. How do I report it?",
      answer: "You can report bugs through our GitHub issues page or contact our support team directly. Please include steps to reproduce the issue.",
    },
    {
      icon: <Star className="h-5 w-5" />,
      question: "Do you offer custom development services?",
      answer: "Yes, we offer custom development services for Enterprise customers. Contact our sales team to discuss your specific requirements.",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      question: "How can I contribute to the project?",
      answer: "We welcome contributions! Check our GitHub repository for contribution guidelines and open issues you can work on.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <MotionWrapper variant="fadeInUp">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Get in Touch
            </h1>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions about our SaaS starter kit? We&apos;re here to help.
              Reach out to our team for support, sales, or general inquiries.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
              <Card className="shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {info.icon}
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{info.value}</p>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <MotionWrapper variant="fadeInUp">
            <Card className="shadow-soft-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="sales">Sales Question</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more details..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* FAQ Section */}
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <Card className="shadow-soft-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          {faq.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    Still have questions? We&apos;re here to help!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="mailto:support@saaskit.com">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Support
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://github.com/benbatuu/open-source/issues" target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        GitHub Issues
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
}
