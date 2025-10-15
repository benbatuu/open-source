"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Navbar } from "@/components/layout/navbar";
import { User, Mail, Calendar, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <MotionWrapper variant="fadeInUp" className="mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground mt-2">
              Here&apos;s what&apos;s happening with your account today.
            </p>
          </div>
        </MotionWrapper>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.3}>
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.4}>
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>

        {/* User Profile Card */}
        <MotionWrapper variant="fadeInUp" delay={0.5}>
          <Card className="shadow-soft-lg">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{user?.name}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    User ID
                  </label>
                  <p className="text-sm">{user?.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Account Type
                  </label>
                  <p className="text-sm">Demo Account</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
}
