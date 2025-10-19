import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ComposedChart,
} from 'recharts';

const chartVariants = cva(
  "w-full h-full",
  {
    variants: {
      variant: {
        default: "bg-background",
        card: "bg-card border border-border rounded-lg p-4",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4",
        premium: "bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6 shadow-lg shadow-primary/10",
        featured: "bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-xl p-6 shadow-lg shadow-accent/10",
      },
      size: {
        sm: "h-64",
        md: "h-80",
        lg: "h-96",
        xl: "h-[28rem]",
        full: "h-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ChartData {
  name: string;
  value?: number;
  [key: string]: any;
}

export interface ChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chartVariants> {
  data: ChartData[];
  type: 'line' | 'area' | 'bar' | 'pie' | 'radar' | 'scatter' | 'composed';
  title?: string;
  description?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  colors?: string[];
  height?: number;
  width?: number;
  loading?: boolean;
  error?: string;
  // Line/Area specific
  dataKey?: string;
  xAxisKey?: string;
  // Bar specific
  barDataKey?: string;
  // Pie specific
  pieDataKey?: string;
  nameKey?: string;
  // Multi-series
  series?: Array<{
    dataKey: string;
    name: string;
    color?: string;
    type?: 'line' | 'area' | 'bar';
  }>;
}

const defaultColors = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00',
  '#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#0000ff'
];

export function Chart({
  data,
  type,
  title,
  description,
  showLegend = true,
  showTooltip = true,
  showGrid = true,
  colors = defaultColors,
  height,
  width,
  loading = false,
  error,
  dataKey = 'value',
  xAxisKey = 'name',
  barDataKey = 'value',
  pieDataKey = 'value',
  nameKey = 'name',
  series = [],
  variant,
  size,
  className,
  ...props
}: ChartProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn(chartVariants({ variant, size, className }))}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn(chartVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading chart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(chartVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-2xl text-destructive">⚠️</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Chart Error</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={cn(chartVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
            <span className="text-2xl text-muted-foreground">📊</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No Data</h3>
            <p className="text-sm text-muted-foreground">No data available to display</p>
          </div>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {series.length > 0 ? (
              series.map((s, index) => (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  stroke={s.color || colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: s.color || colors[index % colors.length], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))
            ) : (
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {series.length > 0 ? (
              series.map((s, index) => (
                <Area
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  stackId="1"
                  stroke={s.color || colors[index % colors.length]}
                  fill={s.color || colors[index % colors.length]}
                  fillOpacity={0.6}
                />
              ))
            ) : (
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.6}
              />
            )}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {series.length > 0 ? (
              series.map((s, index) => (
                <Bar
                  key={s.dataKey}
                  dataKey={s.dataKey}
                  fill={s.color || colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))
            ) : (
              <Bar
                dataKey={barDataKey}
                fill={colors[0]}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={pieDataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </PieChart>
        );

      case 'radar':
        return (
          <RadarChart data={data} margin={{ top: 20, right: 80, bottom: 0, left: 80 }}>
            <PolarGrid />
            <PolarAngleAxis dataKey={nameKey} />
            <PolarRadiusAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {series.length > 0 ? (
              series.map((s, index) => (
                <Radar
                  key={s.dataKey}
                  name={s.name}
                  dataKey={s.dataKey}
                  stroke={s.color || colors[index % colors.length]}
                  fill={s.color || colors[index % colors.length]}
                  fillOpacity={0.6}
                />
              ))
            ) : (
              <Radar
                name="Value"
                dataKey={dataKey}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.6}
              />
            )}
          </RadarChart>
        );

      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            {showTooltip && <Tooltip cursor={{ strokeDasharray: '3 3' }} />}
            {showLegend && <Legend />}
            {series.length > 0 ? (
              series.map((s, index) => (
                <Scatter
                  key={s.dataKey}
                  name={s.name}
                  dataKey={s.dataKey}
                  fill={s.color || colors[index % colors.length]}
                />
              ))
            ) : (
              <Scatter
                name="Data"
                dataKey={dataKey}
                fill={colors[0]}
              />
            )}
          </ScatterChart>
        );

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {series.map((s, index) => {
              const color = s.color || colors[index % colors.length];
              switch (s.type) {
                case 'area':
                  return (
                    <Area
                      key={s.dataKey}
                      type="monotone"
                      dataKey={s.dataKey}
                      fill={color}
                      stroke={color}
                      fillOpacity={0.6}
                    />
                  );
                case 'bar':
                  return (
                    <Bar
                      key={s.dataKey}
                      dataKey={s.dataKey}
                      fill={color}
                      radius={[4, 4, 0, 0]}
                    />
                  );
                default:
                  return (
                    <Line
                      key={s.dataKey}
                      type="monotone"
                      dataKey={s.dataKey}
                      stroke={color}
                      strokeWidth={2}
                    />
                  );
              }
            })}
          </ComposedChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn(chartVariants({ variant, size, className }))} {...props}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

export { chartVariants };
