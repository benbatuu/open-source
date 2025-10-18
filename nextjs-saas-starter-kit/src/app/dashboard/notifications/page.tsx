"use client";

import { useState } from "react";
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
  Bell,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  Settings,
  CheckCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New subscription received",
      message: "John Doe has subscribed to the Professional plan for $79/month",
      type: "success",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Payment failed",
      message: "Payment for Sarah Wilson's subscription failed. Please review.",
      type: "error",
      time: "15 minutes ago",
      read: false,
    },
    {
      id: "3",
      title: "System maintenance scheduled",
      message: "Scheduled maintenance will occur on Sunday at 2 AM UTC",
      type: "info",
      time: "1 hour ago",
      read: true,
    },
    {
      id: "4",
      title: "API rate limit exceeded",
      message: "API rate limit exceeded for key: sk_live_1234...",
      type: "warning",
      time: "2 hours ago",
      read: true,
    },
    {
      id: "5",
      title: "Weekly report ready",
      message: "Your weekly analytics report is ready for download",
      type: "success",
      time: "1 day ago",
      read: true,
    },
    {
      id: "6",
      title: "New user registered",
      message: "Emma Davis has created a new account",
      type: "info",
      time: "2 days ago",
      read: true,
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: false,
    sms: false,
    webhook: true,
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500";
      case "error":
        return "border-l-red-500";
      case "warning":
        return "border-l-yellow-500";
      case "info":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-2">
            Manage your notifications and alerts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MotionWrapper variant="fadeInUp">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-muted-foreground">
                All notifications
              </p>
            </CardContent>
          </Card>
        </MotionWrapper>

        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </MotionWrapper>

        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                New today
              </p>
            </CardContent>
          </Card>
        </MotionWrapper>

        <MotionWrapper variant="fadeInUp" delay={0.3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <MotionWrapper variant="fadeInUp" delay={0.4}>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                Latest notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                      !notification.read ? 'bg-primary/5' : ''
                    } ${getNotificationColor(notification.type)} border-l-4`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* Notification Settings */}
        <MotionWrapper variant="fadeInUp" delay={0.5}>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-xs text-muted-foreground">
                      Receive email notifications
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, email: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Push</div>
                    <div className="text-xs text-muted-foreground">
                      Browser push notifications
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, push: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">SMS</div>
                    <div className="text-xs text-muted-foreground">
                      Text message alerts
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.sms}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, sms: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Webhook</div>
                    <div className="text-xs text-muted-foreground">
                      Webhook notifications
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.webhook}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, webhook: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
}
