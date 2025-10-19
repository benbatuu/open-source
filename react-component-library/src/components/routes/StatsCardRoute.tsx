import { useState } from 'react';
import { 
  StatsCard, 
  RevenueCard, 
  UsersCard, 
  SalesCard, 
  PerformanceCard 
} from '../ui/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Activity,
  Target,
  Zap,
  Star,
  Award,
  Calendar,
  Globe,
  Smartphone
} from 'lucide-react';

export function StatsCardRoute() {
  const [animated, setAnimated] = useState(true);

  return (
    <div className="space-y-8">
      {/* Stats Card Types */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Stats Card Types</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RevenueCard
              value={125430}
              change={{ value: 12.5, label: 'from last month', type: 'positive' }}
              description="Total revenue generated"
              variant="premium"
              animated={animated}
            />
            
            <UsersCard
              value={2847}
              change={{ value: 8.2, label: 'new users', type: 'positive' }}
              description="Active users this month"
              variant="featured"
              animated={animated}
            />
            
            <SalesCard
              value={156}
              change={{ value: -2.1, label: 'from last week', type: 'negative' }}
              description="Orders completed"
              variant="success"
              animated={animated}
            />
            
            <PerformanceCard
              value={0.94}
              change={{ value: 5.3, label: 'improvement', type: 'positive' }}
              description="System performance score"
              variant="warning"
              animated={animated}
            />
          </div>
        </div>
      </div>

      {/* Stats Card Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Stats Card Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="Total Revenue"
              value={125430}
              description="Monthly revenue"
              icon={<DollarSign className="h-5 w-5" />}
              change={{ value: 12.5, label: 'from last month', type: 'positive' }}
              variant="default"
              format="currency"
              animated={animated}
            />
            
            <StatsCard
              title="Active Users"
              value={2847}
              description="Users this month"
              icon={<Users className="h-5 w-5" />}
              change={{ value: 8.2, label: 'new users', type: 'positive' }}
              variant="glass"
              format="number"
              animated={animated}
            />
            
            <StatsCard
              title="Conversion Rate"
              value={0.156}
              description="Sales conversion"
              icon={<Target className="h-5 w-5" />}
              change={{ value: -2.1, label: 'from last week', type: 'negative' }}
              variant="premium"
              format="percentage"
              precision={1}
              animated={animated}
            />
            
            <StatsCard
              title="Page Views"
              value={125430}
              description="Total page views"
              icon={<Activity className="h-5 w-5" />}
              change={{ value: 15.3, label: 'increase', type: 'positive' }}
              variant="featured"
              format="number"
              animated={animated}
            />
            
            <StatsCard
              title="Response Time"
              value={245}
              description="Average response time (ms)"
              icon={<Zap className="h-5 w-5" />}
              change={{ value: -12.5, label: 'faster', type: 'positive' }}
              variant="success"
              format="number"
              suffix="ms"
              animated={animated}
            />
            
            <StatsCard
              title="Customer Rating"
              value={4.8}
              description="Average rating"
              icon={<Star className="h-5 w-5" />}
              change={{ value: 0.2, label: 'improvement', type: 'positive' }}
              variant="warning"
              format="number"
              precision={1}
              animated={animated}
            />
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
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm font-medium text-muted-foreground">Business Metrics</div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnimated(!animated)}
              >
                {animated ? 'Disable' : 'Enable'} Animations
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Revenue"
              value={125430}
              description="This month"
              icon={<DollarSign className="h-5 w-5" />}
              change={{ value: 12.5, label: 'from last month', type: 'positive' }}
              variant="premium"
              format="currency"
              interactive={true}
              animated={animated}
              onClick={() => console.log('Revenue card clicked')}
            />
            
            <StatsCard
              title="Users"
              value={2847}
              description="Active users"
              icon={<Users className="h-5 w-5" />}
              change={{ value: 8.2, label: 'new users', type: 'positive' }}
              variant="featured"
              format="number"
              interactive={true}
              animated={animated}
              onClick={() => console.log('Users card clicked')}
            />
            
            <StatsCard
              title="Orders"
              value={156}
              description="Completed orders"
              icon={<ShoppingCart className="h-5 w-5" />}
              change={{ value: -2.1, label: 'from last week', type: 'negative' }}
              variant="success"
              format="number"
              interactive={true}
              animated={animated}
              onClick={() => console.log('Orders card clicked')}
            />
            
            <StatsCard
              title="Growth"
              value={0.156}
              description="Monthly growth"
              icon={<TrendingUp className="h-5 w-5" />}
              change={{ value: 5.3, label: 'improvement', type: 'positive' }}
              variant="warning"
              format="percentage"
              precision={1}
              interactive={true}
              animated={animated}
              onClick={() => console.log('Growth card clicked')}
            />
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Stats Dashboard</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Financial Overview
                </CardTitle>
                <CardDescription>Key financial metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <StatsCard
                    title="Revenue"
                    value={125430}
                    icon={<DollarSign className="h-4 w-4" />}
                    change={{ value: 12.5, label: 'up', type: 'positive' }}
                    variant="default"
                    size="sm"
                    format="currency"
                    animated={animated}
                  />
                  <StatsCard
                    title="Profit"
                    value={45230}
                    icon={<TrendingUp className="h-4 w-4" />}
                    change={{ value: 8.2, label: 'up', type: 'positive' }}
                    variant="default"
                    size="sm"
                    format="currency"
                    animated={animated}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  User Analytics
                </CardTitle>
                <CardDescription>User engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <StatsCard
                    title="Active Users"
                    value={2847}
                    icon={<Users className="h-4 w-4" />}
                    change={{ value: 5.3, label: 'up', type: 'positive' }}
                    variant="default"
                    size="sm"
                    format="number"
                    animated={animated}
                  />
                  <StatsCard
                    title="New Users"
                    value={234}
                    icon={<Award className="h-4 w-4" />}
                    change={{ value: 15.2, label: 'up', type: 'positive' }}
                    variant="default"
                    size="sm"
                    format="number"
                    animated={animated}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  Performance
                </CardTitle>
                <CardDescription>System performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <StatsCard
                    title="Uptime"
                    value={0.999}
                    icon={<Zap className="h-4 w-4" />}
                    change={{ value: 0.1, label: 'up', type: 'positive' }}
                    variant="default"
                    size="sm"
                    format="percentage"
                    precision={1}
                    animated={animated}
                  />
                  <StatsCard
                    title="Response Time"
                    value={245}
                    icon={<Target className="h-4 w-4" />}
                    change={{ value: -12.5, label: 'faster', type: 'positive' }}
                    variant="default"
                    size="sm"
                    format="number"
                    suffix="ms"
                    animated={animated}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-orange-500" />
                  Sales Metrics
                </CardTitle>
                <CardDescription>Sales and conversion data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <StatsCard
                    title="Orders"
                    value={156}
                    icon={<ShoppingCart className="h-4 w-4" />}
                    change={{ value: -2.1, label: 'down', type: 'negative' }}
                    variant="default"
                    size="sm"
                    format="number"
                    animated={animated}
                  />
                  <StatsCard
                    title="Conversion"
                    value={0.156}
                    icon={<Target className="h-4 w-4" />}
                    change={{ value: 3.2, label: 'up', type: 'positive' }}
                    variant="default"
                    size="sm"
                    format="percentage"
                    precision={1}
                    animated={animated}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Mobile-First Stats</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatsCard
              title="Mobile Users"
              value={1847}
              description="Active mobile users"
              icon={<Smartphone className="h-5 w-5" />}
              change={{ value: 22.5, label: 'from last month', type: 'positive' }}
              variant="premium"
              size="lg"
              format="number"
              animated={animated}
            />
            
            <StatsCard
              title="Global Reach"
              value={45}
              description="Countries served"
              icon={<Globe className="h-5 w-5" />}
              change={{ value: 3, label: 'new countries', type: 'positive' }}
              variant="featured"
              size="lg"
              format="number"
              animated={animated}
            />
          </div>
        </div>
      </div>

      {/* Stats States */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Stats States</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Loading State</div>
              <StatsCard
                title="Loading..."
                value={0}
                description="Fetching data"
                icon={<Activity className="h-5 w-5" />}
                loading={true}
                variant="card"
              />
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Error State</div>
              <StatsCard
                title="Error"
                value={0}
                description="Failed to load"
                icon={<Activity className="h-5 w-5" />}
                error="Unable to fetch data"
                variant="card"
              />
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Neutral Change</div>
              <StatsCard
                title="Stable Metric"
                value={1000}
                description="No change"
                icon={<Activity className="h-5 w-5" />}
                change={{ value: 0, label: 'no change', type: 'neutral' }}
                variant="card"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
