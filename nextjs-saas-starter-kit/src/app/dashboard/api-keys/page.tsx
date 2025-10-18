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
  Key,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Calendar,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ApiKeysPage() {
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});

  const apiKeys = [
    {
      id: "1",
      name: "Production API Key",
      key: "sk_live_1234567890abcdef",
      created: "2024-01-15",
      lastUsed: "2 minutes ago",
      status: "active",
      usage: {
        requests: 125000,
        limit: 1000000,
      },
    },
    {
      id: "2",
      name: "Development Key",
      key: "sk_test_abcdef1234567890",
      created: "2024-02-20",
      lastUsed: "1 hour ago",
      status: "active",
      usage: {
        requests: 45000,
        limit: 100000,
      },
    },
    {
      id: "3",
      name: "Legacy Integration",
      key: "sk_live_oldkey123456789",
      created: "2023-12-10",
      lastUsed: "3 days ago",
      status: "inactive",
      usage: {
        requests: 0,
        limit: 1000000,
      },
    },
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("API key copied to clipboard");
  };

  const maskedKey = (key: string) => {
    return key.substring(0, 12) + "..." + key.substring(key.length - 4);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-muted-foreground mt-2">
            Manage your API keys and monitor usage
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Key
        </Button>
      </div>

      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MotionWrapper variant="fadeInUp">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">170,000</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </MotionWrapper>

        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Out of 5 allowed
              </p>
            </CardContent>
          </Card>
        </MotionWrapper>

        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rate Limit</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">
                Usage this month
              </p>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>

      {/* API Keys List */}
      <MotionWrapper variant="fadeInUp" delay={0.3}>
        <Card>
          <CardHeader>
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>
              Manage and monitor your API key usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Key className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{apiKey.name}</h3>
                        <Badge className={
                          apiKey.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-muted text-foreground/80'
                        }>
                          {apiKey.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="font-mono">
                          {showKeys[apiKey.id] ? apiKey.key : maskedKey(apiKey.key)}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Created {apiKey.created}
                        </span>
                        <span className="flex items-center">
                          <Activity className="h-3 w-3 mr-1" />
                          Last used {apiKey.lastUsed}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Usage this month</span>
                          <span>
                            {apiKey.usage.requests.toLocaleString()} / {apiKey.usage.limit.toLocaleString()} requests
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              (apiKey.usage.requests / apiKey.usage.limit) > 0.8 ? 'bg-red-500' : 'bg-primary'
                            }`}
                            style={{ width: `${Math.min((apiKey.usage.requests / apiKey.usage.limit) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {showKeys[apiKey.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(apiKey.key)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </MotionWrapper>

      {/* Security Notice */}
      <MotionWrapper variant="fadeInUp" delay={0.4}>
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/10">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Security Notice</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  Keep your API keys secure and never share them publicly. 
                  If you suspect a key has been compromised, revoke it immediately and create a new one.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </MotionWrapper>
    </div>
  );
}
