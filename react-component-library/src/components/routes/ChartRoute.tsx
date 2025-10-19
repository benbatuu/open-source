import { Suspense, useState } from 'react';
import { Chart, ChartData } from '../ui/chart';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Target } from 'lucide-react';

// Sample data
const salesData: ChartData[] = [
  { name: 'Jan', sales: 4000, revenue: 2400, profit: 1600 },
  { name: 'Feb', sales: 3000, revenue: 1398, profit: 1200 },
  { name: 'Mar', sales: 2000, revenue: 9800, profit: 800 },
  { name: 'Apr', sales: 2780, revenue: 3908, profit: 1800 },
  { name: 'May', sales: 1890, revenue: 4800, profit: 1200 },
  { name: 'Jun', sales: 2390, revenue: 3800, profit: 1500 },
  { name: 'Jul', sales: 3490, revenue: 4300, profit: 2000 },
];

const userGrowthData: ChartData[] = [
  { name: 'Week 1', users: 100, newUsers: 20, activeUsers: 80 },
  { name: 'Week 2', users: 150, newUsers: 30, activeUsers: 120 },
  { name: 'Week 3', users: 200, newUsers: 25, activeUsers: 175 },
  { name: 'Week 4', users: 250, newUsers: 40, activeUsers: 210 },
  { name: 'Week 5', users: 300, newUsers: 35, activeUsers: 265 },
  { name: 'Week 6', users: 350, newUsers: 45, activeUsers: 305 },
];

const categoryData: ChartData[] = [
  { name: 'Electronics', value: 35, color: '#8884d8' },
  { name: 'Clothing', value: 25, color: '#82ca9d' },
  { name: 'Books', value: 20, color: '#ffc658' },
  { name: 'Home & Garden', value: 15, color: '#ff7300' },
  { name: 'Sports', value: 5, color: '#00ff00' },
];

const performanceData: ChartData[] = [
  { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
  { subject: 'Reliability', A: 98, B: 130, fullMark: 150 },
  { subject: 'Comfort', A: 86, B: 130, fullMark: 150 },
  { subject: 'Safety', A: 99, B: 100, fullMark: 150 },
  { subject: 'Efficiency', A: 85, B: 90, fullMark: 150 },
  { subject: 'Price', A: 65, B: 85, fullMark: 150 },
];

const scatterData: ChartData[] = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

export function ChartRoute() {
  const [selectedChart, setSelectedChart] = useState<string>('line');

  return (
    <div className="space-y-8">
      {/* Chart Types */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Chart Types</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Line Chart</div>
            <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Chart
                data={salesData}
                type="line"
                title="Monthly Sales"
                description="Sales performance over the last 7 months"
                series={[
                  { dataKey: 'sales', name: 'Sales', color: '#8884d8' },
                  { dataKey: 'revenue', name: 'Revenue', color: '#82ca9d' },
                  { dataKey: 'profit', name: 'Profit', color: '#ffc658' },
                ]}
                variant="card"
                size="lg"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Area Chart</div>
            <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Chart
                data={userGrowthData}
                type="area"
                title="User Growth"
                description="User growth metrics over time"
                series={[
                  { dataKey: 'users', name: 'Total Users', color: '#8884d8' },
                  { dataKey: 'newUsers', name: 'New Users', color: '#82ca9d' },
                  { dataKey: 'activeUsers', name: 'Active Users', color: '#ffc658' },
                ]}
                variant="premium"
                size="lg"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Bar Chart</div>
            <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Chart
                data={salesData}
                type="bar"
                title="Sales Comparison"
                description="Monthly sales comparison"
                series={[
                  { dataKey: 'sales', name: 'Sales', color: '#8884d8' },
                  { dataKey: 'revenue', name: 'Revenue', color: '#82ca9d' },
                ]}
                variant="featured"
                size="lg"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Pie Chart</div>
            <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Chart
                data={categoryData}
                type="pie"
                title="Sales by Category"
                description="Distribution of sales across different categories"
                variant="glass"
                size="lg"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Radar Chart</div>
            <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Chart
                data={performanceData}
                type="radar"
                title="Performance Comparison"
                description="Performance metrics comparison between two products"
                series={[
                  { dataKey: 'A', name: 'Product A', color: '#8884d8' },
                  { dataKey: 'B', name: 'Product B', color: '#82ca9d' },
                ]}
                variant="card"
                size="lg"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Scatter Chart</div>
            <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Chart
                data={scatterData}
                type="scatter"
                title="Data Distribution"
                description="Scatter plot showing data distribution"
                xAxisKey="x"
                dataKey="y"
                variant="premium"
                size="lg"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Composed Chart</div>
            <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Chart
                data={salesData}
                type="composed"
                title="Comprehensive Analysis"
                description="Combined chart showing multiple data types"
                series={[
                  { dataKey: 'sales', name: 'Sales', type: 'bar', color: '#8884d8' },
                  { dataKey: 'revenue', name: 'Revenue', type: 'line', color: '#82ca9d' },
                  { dataKey: 'profit', name: 'Profit', type: 'area', color: '#ffc658' },
                ]}
                variant="featured"
                size="lg"
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Chart Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Chart Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Default Variant</div>
              <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Chart
                  data={salesData.slice(0, 4)}
                  type="line"
                  title="Default Chart"
                  variant="default"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Card Variant</div>
              <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Chart
                  data={salesData.slice(0, 4)}
                  type="bar"
                  title="Card Chart"
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Glass Variant</div>
              <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Chart
                  data={salesData.slice(0, 4)}
                  type="area"
                  title="Glass Chart"
                  variant="glass"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Premium Variant</div>
              <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Chart
                  data={salesData.slice(0, 4)}
                  type="line"
                  title="Premium Chart"
                  variant="premium"
                  size="md"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Chart Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Small Size</div>
              <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Chart
                  data={salesData.slice(0, 3)}
                  type="line"
                  title="Small Chart"
                  variant="card"
                  size="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Large Size</div>
              <Suspense fallback={<div className="h-96 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Chart
                  data={salesData}
                  type="bar"
                  title="Large Chart"
                  variant="card"
                  size="lg"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Extra Large Size</div>
              <Suspense fallback={<div className="h-[28rem] w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Chart
                  data={salesData}
                  type="area"
                  title="Extra Large Chart"
                  variant="premium"
                  size="xl"
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
            <div className="text-sm font-medium text-muted-foreground">Analytics Dashboard</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Revenue Growth
                  </CardTitle>
                  <CardDescription>Monthly revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Chart
                      data={salesData}
                      type="line"
                      series={[
                        { dataKey: 'revenue', name: 'Revenue', color: '#22c55e' },
                      ]}
                      variant="default"
                      size="md"
                      showLegend={false}
                    />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Sales Performance
                  </CardTitle>
                  <CardDescription>Monthly sales comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Chart
                      data={salesData}
                      type="bar"
                      series={[
                        { dataKey: 'sales', name: 'Sales', color: '#3b82f6' },
                      ]}
                      variant="default"
                      size="md"
                      showLegend={false}
                    />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-purple-500" />
                    Category Distribution
                  </CardTitle>
                  <CardDescription>Sales by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Chart
                      data={categoryData}
                      type="pie"
                      variant="default"
                      size="md"
                    />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-500" />
                    User Activity
                  </CardTitle>
                  <CardDescription>User engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Chart
                      data={userGrowthData}
                      type="area"
                      series={[
                        { dataKey: 'activeUsers', name: 'Active Users', color: '#f97316' },
                      ]}
                      variant="default"
                      size="md"
                      showLegend={false}
                    />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Chart States */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Chart States</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Loading State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Chart
                  data={[]}
                  type="line"
                  title="Loading Chart"
                  loading={true}
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Error State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Chart
                  data={[]}
                  type="line"
                  title="Error Chart"
                  error="Failed to load chart data"
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Empty State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Chart
                  data={[]}
                  type="line"
                  title="Empty Chart"
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
