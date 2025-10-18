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
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Shield,
  Crown,
  Star,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      plan: "Professional",
      lastActive: "2 minutes ago",
      avatar: "JD",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "user",
      status: "active",
      plan: "Starter",
      lastActive: "1 hour ago",
      avatar: "SW",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "user",
      status: "inactive",
      plan: "Enterprise",
      lastActive: "3 days ago",
      avatar: "MJ",
      joinDate: "2024-01-10",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      role: "moderator",
      status: "active",
      plan: "Professional",
      lastActive: "30 minutes ago",
      avatar: "ED",
      joinDate: "2024-03-05",
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex@example.com",
      role: "user",
      status: "active",
      plan: "Starter",
      lastActive: "5 minutes ago",
      avatar: "AB",
      joinDate: "2024-03-15",
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Active Users",
      value: "2,234",
      change: "+8.2%",
      icon: Star,
    },
    {
      title: "New This Month",
      value: "234",
      change: "+15.3%",
      icon: UserPlus,
    },
    {
      title: "Premium Users",
      value: "1,456",
      change: "+22.1%",
      icon: Crown,
    },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "moderator":
        return <Star className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "moderator":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "inactive":
        return "bg-muted text-foreground/80";
      default:
        return "bg-muted text-foreground/80";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-2">
            Manage your users and their permissions
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
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
                <div className="flex items-center text-xs text-green-600">
                  <span>{stat.change} from last month</span>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>
        ))}
      </div>

      {/* Users Table */}
      <MotionWrapper variant="fadeInUp" delay={0.4}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  A list of all users in your organization
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleIcon(user.role)}
                          <span className="ml-1 capitalize">{user.role}</span>
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Joined {user.joinDate}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Active {user.lastActive}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{user.plan}</Badge>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
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
