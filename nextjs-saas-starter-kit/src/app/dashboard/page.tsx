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
  BarChart3,
  CreditCard,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: "2,847",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
    },
    {
      title: "Monthly Recurring Revenue",
      value: "$8,420",
      change: "+15.3%",
      trend: "up",
      icon: BarChart3,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "subscription",
      description: "New subscription: Professional Plan",
      user: "john@example.com",
      time: "2 minutes ago",
      amount: "$79",
    },
    {
      id: 2,
      type: "payment",
      description: "Payment received",
      user: "sarah@example.com",
      time: "15 minutes ago",
      amount: "$29",
    },
    {
      id: 3,
      type: "subscription",
      description: "Subscription upgraded to Enterprise",
      user: "mike@example.com",
      time: "1 hour ago",
      amount: "$199",
    },
    {
      id: 4,
      type: "payment",
      description: "Payment received",
      user: "emma@example.com",
      time: "2 hours ago",
      amount: "$79",
    },
  ];

  const topProducts = [
    { name: "Professional Plan", revenue: "$4,740", growth: "+12%" },
    { name: "Enterprise Plan", revenue: "$3,980", growth: "+8%" },
    { name: "Starter Plan", revenue: "$2,890", growth: "+15%" },
  ];

  const quickActions = [
    {
      title: "View Analytics",
      description: "Check detailed analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
    },
    {
      title: "Manage Users",
      description: "User management",
      icon: Users,
      href: "/dashboard/users",
    },
    {
      title: "Billing",
      description: "Manage subscriptions",
      icon: CreditCard,
      href: "/dashboard/billing",
    },
    {
      title: "Settings",
      description: "Account settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s what&apos;s happening with your SaaS today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/billing">
              <CreditCard className="mr-2 h-4 w-4" />
              Manage Billing
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
            <Card className="shadow-soft hover:shadow-soft-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span
                    className={`flex items-center ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3 mr-1 rotate-180" />
                    )}
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <MotionWrapper variant="fadeInUp" delay={0.4}>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest transactions and user activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <div>
                        <p className="text-sm font-medium">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{activity.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* Top Products */}
        <MotionWrapper variant="fadeInUp" delay={0.5}>
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>
                Revenue by subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.revenue}</p>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      {product.growth}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>

      {/* Quick Actions */}
      <MotionWrapper variant="fadeInUp" delay={0.6}>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2"
                  asChild
                >
                  <Link href={action.href}>
                    <action.icon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </MotionWrapper>
    </div>
  );
}