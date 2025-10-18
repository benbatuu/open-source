"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import {
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  MousePointer,
  Clock,
} from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Total Page Views",
      value: "1,234,567",
      change: "+12.5%",
      icon: Eye,
    },
    {
      title: "Unique Visitors",
      value: "89,432",
      change: "+8.2%",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+2.1%",
      icon: TrendingUp,
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+15.3%",
      icon: DollarSign,
    },
    {
      title: "Avg. Session Duration",
      value: "4m 32s",
      change: "+5.2%",
      icon: Clock,
    },
    {
      title: "Bounce Rate",
      value: "42.1%",
      change: "-3.2%",
      icon: MousePointer,
    },
  ];

  const topPages = [
    { page: "/dashboard", views: 12345, visitors: 8234 },
    { page: "/pricing", views: 9876, visitors: 6543 },
    { page: "/features", views: 7654, visitors: 5432 },
    { page: "/docs", views: 5432, visitors: 3654 },
    { page: "/contact", views: 3210, visitors: 2109 },
  ];

  const trafficSources = [
    { source: "Direct", visitors: 45234, percentage: 45.2 },
    { source: "Google", visitors: 32156, percentage: 32.1 },
    { source: "Social Media", visitors: 12789, percentage: 12.8 },
    { source: "Referrals", visitors: 8432, percentage: 8.4 },
    { source: "Email", visitors: 1389, percentage: 1.4 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track your website performance and user behavior
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MotionWrapper key={index} variant="fadeInUp" delay={index * 0.1}>
            <Card className="shadow-soft hover:shadow-soft-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {metric.change} from last month
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <MotionWrapper variant="fadeInUp" delay={0.6}>
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>
                Most visited pages on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{page.page}</p>
                        <p className="text-xs text-muted-foreground">
                          {page.visitors.toLocaleString()} visitors
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {page.views.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* Traffic Sources */}
        <MotionWrapper variant="fadeInUp" delay={0.7}>
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>
                Where your visitors are coming from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{source.source}</span>
                      <span className="text-sm text-muted-foreground">
                        {source.visitors.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {source.percentage}% of total traffic
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
}
