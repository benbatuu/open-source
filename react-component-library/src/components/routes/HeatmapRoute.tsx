import { Suspense, useState } from 'react';
import { Heatmap, HeatmapData } from '../ui/heatmap';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Activity,
  Calendar,
  TrendingUp,
  Users,
  Code,
  Heart,
  Star,
  Zap,
  Target,
  Award,
  BarChart3,
  Clock,
  MapPin,
  Download,
  Upload,
  Share,
  Settings,
  Eye,
  EyeOff,
  Palette,
  Grid,
  List,
  Filter
} from 'lucide-react';

// Generate sample data
const generateSampleData = (days: number, startDate: Date = new Date()): HeatmapData[] => {
  const data: HeatmapData[] = [];
  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(currentDate);
    const value = Math.floor(Math.random() * 10);
    const dayOfWeek = date.getDay();
    
    // Make weekends less active
    const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.3 : 1;
    const finalValue = Math.floor(value * weekendMultiplier);
    
    data.push({
      date,
      value: finalValue,
      label: `${finalValue} contributions`,
      metadata: {
        commits: Math.floor(Math.random() * 5),
        pullRequests: Math.floor(Math.random() * 3),
        issues: Math.floor(Math.random() * 2),
      }
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};

// Sample datasets
const gitHubActivity = generateSampleData(365, new Date());
const workoutData = generateSampleData(90, new Date()).map(d => ({
  ...d,
  value: Math.floor(Math.random() * 8),
  label: `${d.value} workouts`,
  metadata: {
    duration: Math.floor(Math.random() * 120) + 30,
    calories: Math.floor(Math.random() * 500) + 200,
    type: ['Cardio', 'Strength', 'Yoga', 'Running'][Math.floor(Math.random() * 4)]
  }
}));

const codingActivity = generateSampleData(180, new Date()).map(d => ({
  ...d,
  value: Math.floor(Math.random() * 12),
  label: `${d.value} hours coded`,
  metadata: {
    languages: ['TypeScript', 'JavaScript', 'Python', 'Go'][Math.floor(Math.random() * 4)],
    projects: Math.floor(Math.random() * 3) + 1,
    linesOfCode: Math.floor(Math.random() * 1000) + 100
  }
}));

const socialActivity = generateSampleData(60, new Date()).map(d => ({
  ...d,
  value: Math.floor(Math.random() * 6),
  label: `${d.value} posts`,
  metadata: {
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
    shares: Math.floor(Math.random() * 10)
  }
}));

export function HeatmapRoute() {
  const [selectedDataset, setSelectedDataset] = useState<string>('github');
  const [selectedColorScheme, setSelectedColorScheme] = useState<'green' | 'blue' | 'red' | 'purple' | 'orange' | 'gray'>('green');
  const [showTooltip, setShowTooltip] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [showWeekdays, setShowWeekdays] = useState(true);
  const [showMonths, setShowMonths] = useState(true);

  const datasets = {
    github: {
      data: gitHubActivity,
      title: 'GitHub Activity',
      description: 'Code contributions over the last year',
      icon: <Code className="h-5 w-5" />,
    },
    workout: {
      data: workoutData,
      title: 'Workout Activity',
      description: 'Fitness activities over the last 3 months',
      icon: <Activity className="h-5 w-5" />,
    },
    coding: {
      data: codingActivity,
      title: 'Coding Hours',
      description: 'Daily coding hours over the last 6 months',
      icon: <Code className="h-5 w-5" />,
    },
    social: {
      data: socialActivity,
      title: 'Social Activity',
      description: 'Social media posts over the last 2 months',
      icon: <Heart className="h-5 w-5" />,
    },
  };

  const currentDataset = datasets[selectedDataset as keyof typeof datasets];

  const handleCellClick = (data: HeatmapData) => {
    console.log('Cell clicked:', data);
  };

  const handleCellHover = (data: HeatmapData | null) => {
    // You can implement hover effects here
  };

  const customTooltipContent = (data: HeatmapData) => (
    <div className="text-center">
      <div className="font-medium">{data.date.toLocaleDateString()}</div>
      <div className="text-sm text-muted-foreground">{data.label}</div>
      {data.metadata && (
        <div className="mt-2 space-y-1">
          {Object.entries(data.metadata).map(([key, value]) => (
            <div key={key} className="text-xs">
              {key}: {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Heatmap Types */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Heatmap Types</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">GitHub Activity Heatmap</div>
            <div className="w-full overflow-x-auto">
              <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={gitHubActivity}
                  colorScheme="green"
                  showTooltip={true}
                  showLegend={true}
                  showLabels={true}
                  showWeekdays={true}
                  showMonths={true}
                  onCellClick={handleCellClick}
                  onCellHover={handleCellHover}
                  tooltipContent={customTooltipContent}
                  variant="card"
                  size="lg"
                  cellSize="md"
                />
              </Suspense>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Workout Activity Heatmap</div>
            <div className="w-full overflow-x-auto">
              <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={workoutData}
                  colorScheme="blue"
                  showTooltip={true}
                  showLegend={true}
                  showLabels={true}
                  showWeekdays={true}
                  showMonths={true}
                  onCellClick={handleCellClick}
                  onCellHover={handleCellHover}
                  tooltipContent={customTooltipContent}
                  variant="premium"
                  size="lg"
                  cellSize="md"
                />
              </Suspense>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Coding Hours Heatmap</div>
            <div className="w-full overflow-x-auto">
              <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={codingActivity}
                  colorScheme="purple"
                  showTooltip={true}
                  showLegend={true}
                  showLabels={true}
                  showWeekdays={true}
                  showMonths={true}
                  onCellClick={handleCellClick}
                  onCellHover={handleCellHover}
                  tooltipContent={customTooltipContent}
                  variant="featured"
                  size="lg"
                  cellSize="md"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Heatmap Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Default Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={gitHubActivity.slice(-90)}
                  colorScheme="green"
                  variant="default"
                  size="md"
                  cellSize="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Card Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={gitHubActivity.slice(-90)}
                  colorScheme="blue"
                  variant="card"
                  size="md"
                  cellSize="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Glass Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={gitHubActivity.slice(-90)}
                  colorScheme="red"
                  variant="glass"
                  size="md"
                  cellSize="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Premium Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={gitHubActivity.slice(-90)}
                  colorScheme="purple"
                  variant="premium"
                  size="md"
                  cellSize="sm"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Color Schemes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Color Schemes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['green', 'blue', 'red', 'purple', 'orange', 'gray'] as const).map((scheme) => (
              <div key={scheme} className="space-y-4">
                <div className="text-sm font-medium text-muted-foreground capitalize">{scheme} Scheme</div>
                <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
                  <Heatmap
                    data={gitHubActivity.slice(-60)}
                    colorScheme={scheme}
                    variant="card"
                    size="sm"
                    cellSize="sm"
                    showLegend={false}
                    showLabels={false}
                    showWeekdays={false}
                    showMonths={false}
                  />
                </Suspense>
              </div>
            ))}
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
            <div className="text-sm font-medium text-muted-foreground">Activity Analytics Dashboard</div>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Dataset:</label>
                <select 
                  value={selectedDataset} 
                  onChange={(e) => setSelectedDataset(e.target.value)}
                  className="px-3 py-1 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="github">GitHub Activity</option>
                  <option value="workout">Workout Activity</option>
                  <option value="coding">Coding Hours</option>
                  <option value="social">Social Activity</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Color:</label>
                <select 
                  value={selectedColorScheme} 
                  onChange={(e) => setSelectedColorScheme(e.target.value as any)}
                  className="px-3 py-1 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                  <option value="gray">Gray</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant={showTooltip ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowTooltip(!showTooltip)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Tooltip
                </Button>
                <Button
                  variant={showLegend ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowLegend(!showLegend)}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Legend
                </Button>
                <Button
                  variant={showWeekdays ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowWeekdays(!showWeekdays)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Weekdays
                </Button>
                <Button
                  variant={showMonths ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowMonths(!showMonths)}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Months
                </Button>
              </div>
            </div>

            {/* Main Heatmap */}
            <div className="w-full overflow-x-auto">
              <Suspense fallback={<div className="h-96 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={currentDataset.data}
                  colorScheme={selectedColorScheme}
                  showTooltip={showTooltip}
                  showLegend={showLegend}
                  showLabels={true}
                  showWeekdays={showWeekdays}
                  showMonths={showMonths}
                  onCellClick={handleCellClick}
                  onCellHover={handleCellHover}
                  tooltipContent={customTooltipContent}
                  variant="premium"
                  size="lg"
                  cellSize="md"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Activity Dashboard</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-green-500" />
                  Development Activity
                </CardTitle>
                <CardDescription>Code contributions and commits</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                  <Heatmap
                    data={gitHubActivity.slice(-90)}
                    colorScheme="green"
                    variant="default"
                    size="md"
                    cellSize="sm"
                    showLabels={false}
                    showWeekdays={false}
                    showMonths={false}
                  />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Fitness Activity
                </CardTitle>
                <CardDescription>Workout sessions and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                  <Heatmap
                    data={workoutData}
                    colorScheme="blue"
                    variant="default"
                    size="md"
                    cellSize="sm"
                    showLabels={false}
                    showWeekdays={false}
                    showMonths={false}
                  />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Social Activity
                </CardTitle>
                <CardDescription>Social media engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                  <Heatmap
                    data={socialActivity}
                    colorScheme="red"
                    variant="default"
                    size="md"
                    cellSize="sm"
                    showLabels={false}
                    showWeekdays={false}
                    showMonths={false}
                  />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  Productivity
                </CardTitle>
                <CardDescription>Daily productivity metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                  <Heatmap
                    data={codingActivity.slice(-60)}
                    colorScheme="purple"
                    variant="default"
                    size="md"
                    cellSize="sm"
                    showLabels={false}
                    showWeekdays={false}
                    showMonths={false}
                  />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Heatmap States */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Heatmap States</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Loading State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={[]}
                  loading={true}
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Error State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={[]}
                  error="Failed to load heatmap data"
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Empty State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Heatmap
                  data={[]}
                  emptyText="No activity data available"
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
