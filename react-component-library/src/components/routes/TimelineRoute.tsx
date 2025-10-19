import { Suspense, useState } from 'react';
import { Timeline, TimelineItem } from '../ui/timeline';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  CreditCard,
  Package,
  Truck,
  Star,
  MessageSquare,
  Heart,
  ThumbsUp,
  Download,
  Upload,
  Settings,
  Bell,
  Shield,
  Zap,
  Target,
  Award,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3
} from 'lucide-react';

// Sample data
const projectTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Project Kickoff',
    description: 'Initial project planning and team setup completed successfully.',
    date: '2024-01-15',
    time: '09:00 AM',
    status: 'completed',
    icon: <CheckCircle className="h-4 w-4" />,
  },
  {
    id: '2',
    title: 'Requirements Gathering',
    description: 'Collected and analyzed all project requirements from stakeholders.',
    date: '2024-01-20',
    time: '02:30 PM',
    status: 'completed',
    icon: <CheckCircle className="h-4 w-4" />,
  },
  {
    id: '3',
    title: 'Design Phase',
    description: 'Creating wireframes and mockups for the application interface.',
    date: '2024-01-25',
    time: '11:00 AM',
    status: 'in-progress',
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: '4',
    title: 'Development Sprint 1',
    description: 'First development sprint focusing on core functionality.',
    date: '2024-02-01',
    time: '10:00 AM',
    status: 'pending',
    icon: <AlertCircle className="h-4 w-4" />,
  },
  {
    id: '5',
    title: 'Testing & QA',
    description: 'Comprehensive testing and quality assurance phase.',
    date: '2024-02-15',
    time: '09:00 AM',
    status: 'pending',
    icon: <AlertCircle className="h-4 w-4" />,
  },
  {
    id: '6',
    title: 'Deployment',
    description: 'Production deployment and go-live activities.',
    date: '2024-03-01',
    time: '08:00 AM',
    status: 'pending',
    icon: <AlertCircle className="h-4 w-4" />,
  },
];

const userActivityTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Account Created',
    description: 'New user account created successfully.',
    date: '2024-01-10',
    time: '14:30',
    status: 'completed',
    icon: <User className="h-4 w-4" />,
  },
  {
    id: '2',
    title: 'Email Verified',
    description: 'Email address verified and account activated.',
    date: '2024-01-10',
    time: '14:35',
    status: 'completed',
    icon: <Mail className="h-4 w-4" />,
  },
  {
    id: '3',
    title: 'Profile Updated',
    description: 'User profile information updated with personal details.',
    date: '2024-01-12',
    time: '10:15',
    status: 'completed',
    icon: <User className="h-4 w-4" />,
  },
  {
    id: '4',
    title: 'First Purchase',
    description: 'Completed first purchase worth $99.99.',
    date: '2024-01-15',
    time: '16:45',
    status: 'completed',
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: '5',
    title: 'Support Ticket',
    description: 'Submitted support ticket regarding billing inquiry.',
    date: '2024-01-18',
    time: '11:20',
    status: 'in-progress',
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    id: '6',
    title: 'Subscription Renewal',
    description: 'Monthly subscription renewed automatically.',
    date: '2024-02-15',
    time: '00:00',
    status: 'pending',
    icon: <CreditCard className="h-4 w-4" />,
  },
];

const orderTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Order Placed',
    description: 'Order #12345 has been placed successfully.',
    date: '2024-01-20',
    time: '15:30',
    status: 'completed',
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: '2',
    title: 'Payment Confirmed',
    description: 'Payment of $149.99 has been processed and confirmed.',
    date: '2024-01-20',
    time: '15:32',
    status: 'completed',
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: '3',
    title: 'Order Processing',
    description: 'Your order is being prepared for shipment.',
    date: '2024-01-21',
    time: '09:00',
    status: 'completed',
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: '4',
    title: 'Shipped',
    description: 'Your order has been shipped via FedEx. Tracking: #1Z999AA1234567890',
    date: '2024-01-22',
    time: '14:15',
    status: 'completed',
    icon: <Truck className="h-4 w-4" />,
  },
  {
    id: '5',
    title: 'In Transit',
    description: 'Package is in transit to your location.',
    date: '2024-01-23',
    time: '08:00',
    status: 'in-progress',
    icon: <Truck className="h-4 w-4" />,
  },
  {
    id: '6',
    title: 'Delivered',
    description: 'Package has been delivered to your address.',
    date: '2024-01-25',
    time: '16:30',
    status: 'pending',
    icon: <CheckCircle className="h-4 w-4" />,
  },
];

const achievementTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'First Login',
    description: 'Welcome to the platform! You\'ve successfully logged in.',
    date: '2024-01-01',
    time: '10:00',
    status: 'completed',
    icon: <Star className="h-4 w-4" />,
  },
  {
    id: '2',
    title: 'Profile Complete',
    description: 'You\'ve completed your profile setup.',
    date: '2024-01-02',
    time: '14:30',
    status: 'completed',
    icon: <User className="h-4 w-4" />,
  },
  {
    id: '3',
    title: 'First Upload',
    description: 'You\'ve uploaded your first file.',
    date: '2024-01-05',
    time: '16:45',
    status: 'completed',
    icon: <Upload className="h-4 w-4" />,
  },
  {
    id: '4',
    title: 'Team Member',
    description: 'You\'ve joined your first team.',
    date: '2024-01-10',
    time: '11:20',
    status: 'completed',
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: '5',
    title: 'Power User',
    description: 'You\'ve reached 100 total actions.',
    date: '2024-01-15',
    time: '09:15',
    status: 'completed',
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: '6',
    title: 'Premium Member',
    description: 'You\'ve upgraded to premium membership.',
    date: '2024-01-20',
    time: '13:00',
    status: 'completed',
    icon: <Award className="h-4 w-4" />,
  },
];

export function TimelineRoute() {
  const [selectedTimeline, setSelectedTimeline] = useState<string>('project');

  return (
    <div className="space-y-8">
      {/* Timeline Types */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Timeline Types</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Project Timeline</div>
            <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Timeline
                items={projectTimeline}
                variant="card"
                size="md"
                showConnector={true}
                connectorVariant="primary"
                dotVariant="primary"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">User Activity Timeline</div>
            <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Timeline
                items={userActivityTimeline}
                variant="premium"
                size="md"
                showConnector={true}
                connectorVariant="success"
                dotVariant="success"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Order Timeline</div>
            <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Timeline
                items={orderTimeline}
                variant="featured"
                size="md"
                showConnector={true}
                connectorVariant="accent"
                dotVariant="accent"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Achievement Timeline</div>
            <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Timeline
                items={achievementTimeline}
                variant="glass"
                size="md"
                showConnector={true}
                connectorVariant="primary"
                dotVariant="primary"
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Timeline Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Timeline Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Default Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Timeline
                  items={projectTimeline.slice(0, 3)}
                  variant="default"
                  size="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Card Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Timeline
                  items={projectTimeline.slice(0, 3)}
                  variant="card"
                  size="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Glass Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Timeline
                  items={projectTimeline.slice(0, 3)}
                  variant="glass"
                  size="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Premium Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Timeline
                  items={projectTimeline.slice(0, 3)}
                  variant="premium"
                  size="sm"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Timeline Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Small Size</div>
              <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Timeline
                  items={projectTimeline.slice(0, 2)}
                  variant="card"
                  size="sm"
                  dotSize="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Medium Size</div>
              <Suspense fallback={<div className="h-40 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Timeline
                  items={projectTimeline.slice(0, 3)}
                  variant="card"
                  size="md"
                  dotSize="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Large Size</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Timeline
                  items={projectTimeline.slice(0, 3)}
                  variant="card"
                  size="lg"
                  dotSize="lg"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dashboard */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Interactive Dashboard</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Activity Dashboard</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest user activities and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Timeline
                      items={userActivityTimeline.slice(0, 4)}
                      variant="default"
                      size="sm"
                      dotSize="sm"
                      showConnector={true}
                      connectorVariant="primary"
                    />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-green-500" />
                    Order Status
                  </CardTitle>
                  <CardDescription>Current order tracking information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Timeline
                      items={orderTimeline.slice(0, 4)}
                      variant="default"
                      size="sm"
                      dotSize="sm"
                      showConnector={true}
                      connectorVariant="success"
                    />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-500" />
                    Project Progress
                  </CardTitle>
                  <CardDescription>Current project milestones and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Timeline
                      items={projectTimeline.slice(0, 4)}
                      variant="default"
                      size="sm"
                      dotSize="sm"
                      showConnector={true}
                      connectorVariant="accent"
                    />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-500" />
                    Achievements
                  </CardTitle>
                  <CardDescription>User achievements and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Timeline
                      items={achievementTimeline.slice(0, 4)}
                      variant="default"
                      size="sm"
                      dotSize="sm"
                      showConnector={true}
                      connectorVariant="primary"
                    />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline States */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Timeline States</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Loading State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Timeline
                  items={[]}
                  loading={true}
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Error State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Timeline
                  items={[]}
                  error="Failed to load timeline data"
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Empty State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Timeline
                  items={[]}
                  emptyText="No timeline events to display"
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
