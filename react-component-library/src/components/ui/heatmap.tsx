import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const heatmapVariants = cva(
  "w-full max-w-full overflow-x-auto",
  {
    variants: {
      variant: {
        default: "bg-background border border-border rounded-lg",
        card: "bg-card border border-border rounded-lg shadow-sm",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg",
        premium: "bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl shadow-lg shadow-primary/10",
        featured: "bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-xl shadow-lg shadow-accent/10",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const heatmapGridVariants = cva(
  "grid gap-1",
  {
    variants: {
      size: {
        sm: "gap-1",
        md: "gap-2",
        lg: "gap-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const heatmapCellVariants = cva(
  "relative transition-all duration-200 cursor-pointer group",
  {
    variants: {
      size: {
        sm: "w-3 h-3 rounded-sm",
        md: "w-4 h-4 rounded",
        lg: "w-5 h-5 rounded-md",
      },
      intensity: {
        0: "bg-muted/20 hover:bg-muted/30",
        1: "bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30",
        2: "bg-green-200 hover:bg-green-300 dark:bg-green-800/30 dark:hover:bg-green-800/40",
        3: "bg-green-300 hover:bg-green-400 dark:bg-green-700/40 dark:hover:bg-green-700/50",
        4: "bg-green-400 hover:bg-green-500 dark:bg-green-600/50 dark:hover:bg-green-600/60",
        5: "bg-green-500 hover:bg-green-600 dark:bg-green-500/60 dark:hover:bg-green-500/70",
      },
      colorScheme: {
        green: "",
        blue: "",
        red: "",
        purple: "",
        orange: "",
        gray: "",
      },
    },
    defaultVariants: {
      size: "md",
      intensity: 0,
      colorScheme: "green",
    },
  }
);

const tooltipVariants = cva(
  "absolute z-50 px-3 py-2 text-sm bg-popover text-popover-foreground border border-border rounded-md shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200",
  {
    variants: {
      position: {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      position: "top",
    },
  }
);

export interface HeatmapData {
  date: Date;
  value: number;
  label?: string;
  metadata?: Record<string, any>;
}

export interface HeatmapProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heatmapVariants> {
  data: HeatmapData[];
  startDate?: Date;
  endDate?: Date;
  colorScheme?: 'green' | 'blue' | 'red' | 'purple' | 'orange' | 'gray';
  showTooltip?: boolean;
  showLegend?: boolean;
  showLabels?: boolean;
  showWeekdays?: boolean;
  showMonths?: boolean;
  maxValue?: number;
  minValue?: number;
  loading?: boolean;
  error?: string;
  emptyText?: string;
  onCellClick?: (data: HeatmapData) => void;
  onCellHover?: (data: HeatmapData | null) => void;
  tooltipContent?: (data: HeatmapData) => React.ReactNode;
  legendLabels?: string[];
  cellSize?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  weekStart?: 0 | 1; // 0 = Sunday, 1 = Monday
}

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const colorSchemes = {
  green: {
    0: 'bg-muted/20',
    1: 'bg-green-100 dark:bg-green-900/20',
    2: 'bg-green-200 dark:bg-green-800/30',
    3: 'bg-green-300 dark:bg-green-700/40',
    4: 'bg-green-400 dark:bg-green-600/50',
    5: 'bg-green-500 dark:bg-green-500/60',
  },
  blue: {
    0: 'bg-muted/20',
    1: 'bg-blue-100 dark:bg-blue-900/20',
    2: 'bg-blue-200 dark:bg-blue-800/30',
    3: 'bg-blue-300 dark:bg-blue-700/40',
    4: 'bg-blue-400 dark:bg-blue-600/50',
    5: 'bg-blue-500 dark:bg-blue-500/60',
  },
  red: {
    0: 'bg-muted/20',
    1: 'bg-red-100 dark:bg-red-900/20',
    2: 'bg-red-200 dark:bg-red-800/30',
    3: 'bg-red-300 dark:bg-red-700/40',
    4: 'bg-red-400 dark:bg-red-600/50',
    5: 'bg-red-500 dark:bg-red-500/60',
  },
  purple: {
    0: 'bg-muted/20',
    1: 'bg-purple-100 dark:bg-purple-900/20',
    2: 'bg-purple-200 dark:bg-purple-800/30',
    3: 'bg-purple-300 dark:bg-purple-700/40',
    4: 'bg-purple-400 dark:bg-purple-600/50',
    5: 'bg-purple-500 dark:bg-purple-500/60',
  },
  orange: {
    0: 'bg-muted/20',
    1: 'bg-orange-100 dark:bg-orange-900/20',
    2: 'bg-orange-200 dark:bg-orange-800/30',
    3: 'bg-orange-300 dark:bg-orange-700/40',
    4: 'bg-orange-400 dark:bg-orange-600/50',
    5: 'bg-orange-500 dark:bg-orange-500/60',
  },
  gray: {
    0: 'bg-muted/20',
    1: 'bg-gray-100 dark:bg-gray-900/20',
    2: 'bg-gray-200 dark:bg-gray-800/30',
    3: 'bg-gray-300 dark:bg-gray-700/40',
    4: 'bg-gray-400 dark:bg-gray-600/50',
    5: 'bg-gray-500 dark:bg-gray-500/60',
  },
};

export function Heatmap({
  data,
  startDate,
  endDate,
  colorScheme = 'green',
  showTooltip = true,
  showLegend = true,
  showLabels = true,
  showWeekdays = true,
  showMonths = true,
  maxValue,
  minValue,
  loading = false,
  error,
  emptyText = 'No data available',
  onCellClick,
  onCellHover,
  tooltipContent,
  legendLabels = ['Less', 'More'],
  cellSize = 'md',
  orientation = 'horizontal',
  weekStart = 0,
  variant,
  size,
  className,
  ...props
}: HeatmapProps) {
  const [mounted, setMounted] = React.useState(false);
  const [hoveredCell, setHoveredCell] = React.useState<HeatmapData | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn(heatmapVariants({ variant, size, className }))}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn(heatmapVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading heatmap...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(heatmapVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-2xl text-destructive">⚠️</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Heatmap Error</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={cn(heatmapVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
            <span className="text-2xl text-muted-foreground">🔥</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No Data</h3>
            <p className="text-sm text-muted-foreground">{emptyText}</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate date range
  const actualStartDate = startDate || new Date(Math.min(...data.map(d => d.date.getTime())));
  const actualEndDate = endDate || new Date(Math.max(...data.map(d => d.date.getTime())));
  
  // Calculate value range
  const values = data.map(d => d.value);
  const actualMinValue = minValue ?? Math.min(...values);
  const actualMaxValue = maxValue ?? Math.max(...values);
  const valueRange = actualMaxValue - actualMinValue;

  // Generate all dates in range
  const generateDates = () => {
    const dates: Date[] = [];
    const current = new Date(actualStartDate);
    while (current <= actualEndDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const allDates = generateDates();

  // Group dates by weeks
  const groupByWeeks = (dates: Date[]) => {
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    
    dates.forEach((date, index) => {
      const dayOfWeek = (date.getDay() - weekStart + 7) % 7;
      
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
      
      currentWeek.push(date);
      
      if (index === dates.length - 1) {
        weeks.push([...currentWeek]);
      }
    });
    
    return weeks;
  };

  const weeks = groupByWeeks(allDates);

  // Get intensity level for a value
  const getIntensity = (value: number) => {
    if (valueRange === 0) return 0;
    const normalizedValue = (value - actualMinValue) / valueRange;
    return Math.min(5, Math.max(0, Math.floor(normalizedValue * 5)));
  };

  // Get data for a specific date
  const getDataForDate = (date: Date) => {
    return data.find(d => d.date.toDateString() === date.toDateString());
  };

  // Default tooltip content
  const defaultTooltipContent = (data: HeatmapData) => (
    <div className="text-center">
      <div className="font-medium">{data.date.toLocaleDateString()}</div>
      <div className="text-sm text-muted-foreground">
        {data.label || `${data.value} ${data.value === 1 ? 'contribution' : 'contributions'}`}
      </div>
    </div>
  );

  return (
    <div className={cn(heatmapVariants({ variant, size, className }))} {...props}>
      {/* Header */}
      {showLabels && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Activity Heatmap</h3>
          <p className="text-sm text-muted-foreground">
            {actualStartDate.toLocaleDateString()} - {actualEndDate.toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Month labels */}
      {showMonths && (
        <div className="flex mb-2 min-w-0">
          <div className="w-8 flex-shrink-0"></div> {/* Space for weekday labels */}
          <div className="flex min-w-0 overflow-x-auto">
            {weeks.map((week, weekIndex) => {
              const firstDay = week[0];
              const month = firstDay.getMonth();
              const isFirstWeekOfMonth = firstDay.getDate() <= 7;
              
              if (isFirstWeekOfMonth) {
                return (
                  <div key={weekIndex} className="text-xs text-muted-foreground text-center flex-shrink-0" style={{ width: `${week.length * (cellSize === 'sm' ? 16 : cellSize === 'md' ? 20 : 24)}px` }}>
                    {monthNames[month]}
                  </div>
                );
              }
              return <div key={weekIndex} className="flex-shrink-0" style={{ width: `${week.length * (cellSize === 'sm' ? 16 : cellSize === 'md' ? 20 : 24)}px` }}></div>;
            })}
          </div>
        </div>
      )}

      {/* Heatmap grid */}
      <div className="flex min-w-0">
        {/* Weekday labels */}
        {showWeekdays && (
          <div className="flex flex-col mr-2 flex-shrink-0">
            {dayNames.map((day, index) => {
              const dayIndex = (index + weekStart) % 7;
              return (
                <div key={day} className="text-xs text-muted-foreground text-right pr-2" style={{ height: `${cellSize === 'sm' ? 16 : cellSize === 'md' ? 20 : 24}px` }}>
                  {dayIndex % 2 === 1 ? day : ''}
                </div>
              );
            })}
          </div>
        )}

        {/* Heatmap cells */}
        <div className="flex min-w-0 overflow-x-auto">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col flex-shrink-0">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const cellDate = week[dayIndex];
                if (!cellDate) {
                  return <div key={dayIndex} className={cn(heatmapCellVariants({ size }))}></div>;
                }

                const cellData = getDataForDate(cellDate);
                const intensity = cellData ? getIntensity(cellData.value) : 0;
                const colorClasses = colorSchemes[colorScheme][intensity as keyof typeof colorSchemes[typeof colorScheme]];

                return (
                  <div
                    key={dayIndex}
                    className={cn(
                      heatmapCellVariants({ size }),
                      colorClasses,
                      "hover:ring-2 hover:ring-primary/20"
                    )}
                    onClick={() => cellData && onCellClick?.(cellData)}
                    onMouseEnter={() => {
                      setHoveredCell(cellData || null);
                      onCellHover?.(cellData || null);
                    }}
                    onMouseLeave={() => {
                      setHoveredCell(null);
                      onCellHover?.(null);
                    }}
                  >
                    {showTooltip && cellData && (
                      <div className={cn(tooltipVariants({ position: "top" }))}>
                        {tooltipContent ? tooltipContent(cellData) : defaultTooltipContent(cellData)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span>{legendLabels[0]}</span>
          <div className="flex items-center space-x-1">
            {[0, 1, 2, 3, 4, 5].map((intensity) => (
              <div
                key={intensity}
                className={cn(
                  heatmapCellVariants({ size }),
                  colorSchemes[colorScheme][intensity as keyof typeof colorSchemes[typeof colorScheme]]
                )}
              />
            ))}
          </div>
          <span>{legendLabels[1]}</span>
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-foreground">{data.length}</div>
          <div className="text-xs text-muted-foreground">Total Days</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">{actualMaxValue}</div>
          <div className="text-xs text-muted-foreground">Max Value</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">
            {Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length)}
          </div>
          <div className="text-xs text-muted-foreground">Average</div>
        </div>
      </div>
    </div>
  );
}

export { heatmapVariants, heatmapGridVariants, heatmapCellVariants, tooltipVariants };
