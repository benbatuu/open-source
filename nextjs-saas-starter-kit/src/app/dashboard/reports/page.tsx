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
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const reports = [
    {
      id: "1",
      name: "Monthly Revenue Report",
      description: "Comprehensive revenue analysis for March 2024",
      type: "Revenue",
      status: "ready",
      createdAt: "2024-03-31",
      size: "2.3 MB",
      format: "PDF",
    },
    {
      id: "2",
      name: "User Analytics Dashboard",
      description: "User behavior and engagement metrics",
      type: "Analytics",
      status: "generating",
      createdAt: "2024-04-01",
      size: "1.8 MB",
      format: "Excel",
    },
    {
      id: "3",
      name: "Subscription Growth Report",
      description: "Quarterly subscription and churn analysis",
      type: "Subscriptions",
      status: "ready",
      createdAt: "2024-03-25",
      size: "3.1 MB",
      format: "PDF",
    },
    {
      id: "4",
      name: "API Usage Statistics",
      description: "API endpoint usage and performance metrics",
      type: "Technical",
      status: "ready",
      createdAt: "2024-03-20",
      size: "1.2 MB",
      format: "CSV",
    },
  ];

  const metrics = [
    {
      title: "Total Reports",
      value: "24",
      change: "+4",
      trend: "up",
      icon: FileText,
    },
    {
      title: "This Month",
      value: "8",
      change: "+2",
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Downloads",
      value: "156",
      change: "+23",
      trend: "up",
      icon: Download,
    },
    {
      title: "Avg. Size",
      value: "2.1 MB",
      change: "-0.3 MB",
      trend: "down",
      icon: BarChart3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "generating":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-muted text-foreground/80";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Revenue":
        return DollarSign;
      case "Analytics":
        return BarChart3;
      case "Subscriptions":
        return Users;
      case "Technical":
        return TrendingUp;
      default:
        return FileText;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground mt-2">
            Generate and download analytics reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="flex items-center text-xs">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {metric.change}
                  </span>
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>
        ))}
      </div>

      {/* Reports List */}
      <MotionWrapper variant="fadeInUp" delay={0.4}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              Your generated reports and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {reports.map((report) => {
                const TypeIcon = getTypeIcon(report.type);
                return (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <TypeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{report.name}</h3>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {report.createdAt}
                          </span>
                          <span>{report.size}</span>
                          <span>{report.format}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled={report.status !== "ready"}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </MotionWrapper>

      {/* Quick Actions */}
      <MotionWrapper variant="fadeInUp" delay={0.5}>
        <Card>
          <CardHeader>
            <CardTitle>Quick Reports</CardTitle>
            <CardDescription>
              Generate common reports instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <DollarSign className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Revenue Report</div>
                  <div className="text-xs text-muted-foreground">
                    Monthly revenue analysis
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <Users className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">User Report</div>
                  <div className="text-xs text-muted-foreground">
                    User growth and activity
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <BarChart3 className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Analytics Report</div>
                  <div className="text-xs text-muted-foreground">
                    Website and app analytics
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <TrendingUp className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Growth Report</div>
                  <div className="text-xs text-muted-foreground">
                    Business growth metrics
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </MotionWrapper>
    </div>
  );
}
