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
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  const currentPlan = {
    name: "Professional",
    price: 79,
    interval: "month",
    features: [
      "Up to 25 team members",
      "Advanced analytics",
      "Priority support",
      "100GB storage",
      "API access",
    ],
    nextBilling: "2024-04-15",
    status: "active",
  };

  const invoices = [
    {
      id: "INV-001",
      date: "2024-03-15",
      amount: 79,
      status: "paid",
      description: "Professional Plan - March 2024",
    },
    {
      id: "INV-002",
      date: "2024-02-15",
      amount: 79,
      status: "paid",
      description: "Professional Plan - February 2024",
    },
    {
      id: "INV-003",
      date: "2024-01-15",
      amount: 29,
      status: "paid",
      description: "Starter Plan - January 2024",
    },
  ];

  const usage = [
    {
      metric: "API Calls",
      used: 125000,
      limit: 1000000,
      unit: "calls",
    },
    {
      metric: "Storage",
      used: 45,
      limit: 100,
      unit: "GB",
    },
    {
      metric: "Team Members",
      used: 8,
      limit: 25,
      unit: "members",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <MotionWrapper variant="fadeInUp">
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Current Plan
                </CardTitle>
                <CardDescription>
                  Your active subscription details
                </CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">${currentPlan.price}</span>
                  <span className="text-muted-foreground">/{currentPlan.interval}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Next billing: {currentPlan.nextBilling}
                </p>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-medium mb-2">Plan Features:</h4>
                <ul className="space-y-1">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button>Upgrade Plan</Button>
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>
      </MotionWrapper>

      {/* Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Usage This Month
              </CardTitle>
              <CardDescription>
                Track your current usage against plan limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usage.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.metric}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.used.toLocaleString()} / {item.limit.toLocaleString()} {item.unit}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          (item.used / item.limit) > 0.8 ? 'bg-red-500' : 'bg-primary'
                        }`}
                        style={{ width: `${Math.min((item.used / item.limit) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((item.used / item.limit) * 100)}% of limit used
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* Payment Method */}
        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
              <CardDescription>
                Your current payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/26</p>
                    </div>
                  </div>
                  <Badge variant="outline">Default</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Update Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>

      {/* Invoice History */}
      <MotionWrapper variant="fadeInUp" delay={0.3}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Invoice History
                </CardTitle>
                <CardDescription>
                  Download your past invoices and receipts
                </CardDescription>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{invoice.id}</span>
                        <span>{invoice.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount}</p>
                      <Badge className={
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }>
                        {invoice.status === 'paid' ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </MotionWrapper>
    </div>
  );
}
