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
import { useAuth } from "@/lib/hooks/use-auth";
import {
  CheckCircle,
  Star,
  ArrowRight,
  Users,
  Zap,
  Crown,
} from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const { isAuthenticated } = useAuth();

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: 29,
      interval: "month",
      popular: false,
      icon: <Zap className="h-8 w-8" />,
      features: [
        "Up to 5 team members",
        "Basic analytics dashboard",
        "Email support",
        "10GB storage",
        "Standard API access",
        "Basic integrations",
        "SSL certificate",
        "99.9% uptime SLA",
      ],
      limitations: [
        "Limited custom branding",
        "Basic reporting",
        "Standard webhooks",
      ],
    },
    {
      name: "Professional",
      description: "For growing businesses and teams",
      price: 79,
      interval: "month",
      popular: true,
      icon: <Users className="h-8 w-8" />,
      features: [
        "Up to 25 team members",
        "Advanced analytics & reporting",
        "Priority email & chat support",
        "100GB storage",
        "Advanced API access",
        "Custom integrations",
        "White-label options",
        "99.95% uptime SLA",
        "Advanced webhooks",
        "Custom domains",
        "Team collaboration tools",
        "Advanced security features",
      ],
      limitations: [
        "Limited custom development",
        "Standard compliance reports",
      ],
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      price: 199,
      interval: "month",
      popular: false,
      icon: <Crown className="h-8 w-8" />,
      features: [
        "Unlimited team members",
        "Custom analytics & dashboards",
        "24/7 phone & chat support",
        "Unlimited storage",
        "Full API access",
        "Custom development",
        "Full white-label solution",
        "99.99% uptime SLA",
        "Advanced webhooks & integrations",
        "Custom domains & branding",
        "Enterprise collaboration",
        "Advanced security & compliance",
        "Dedicated account manager",
        "Custom training & onboarding",
        "SLA with penalties",
        "Audit logs & compliance reports",
      ],
      limitations: [],
    },
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All plans come with a 14-day free trial. No credit card required to start your trial.",
    },
    {
      question: "What happens if I exceed my limits?",
      answer: "We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional capacity as needed.",
    },
    {
      question: "Do you offer custom pricing?",
      answer: "Yes, for Enterprise customers with specific needs, we offer custom pricing and features. Contact our sales team for more information.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <MotionWrapper variant="fadeInUp">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Simple, Transparent
              <br />
              <span className="text-primary">Pricing</span>
            </h1>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose the plan that fits your business needs. Start with a free trial,
              then upgrade as you grow.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-background/50 backdrop-blur">
              <Star className="h-4 w-4 text-yellow-500 mr-2" />
              <span>14-day free trial on all plans</span>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
              <Card className={`shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full relative ${
                plan.popular ? 'border-primary ring-2 ring-primary/20 scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href={isAuthenticated ? "/dashboard" : "/auth/signup"}>
                      {isAuthenticated ? "Manage Plan" : "Start Free Trial"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>

                  <div>
                    <h4 className="font-semibold mb-3">What&apos;s included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-muted-foreground">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitationIndex) => (
                          <li key={limitationIndex} className="flex items-start">
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <MotionWrapper variant="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our pricing and plans
            </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
                Join thousands of developers building amazing SaaS products.
                Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <Link href="/contact">
                    Contact Sales
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
