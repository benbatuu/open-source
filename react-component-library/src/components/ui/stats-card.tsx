import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ArrowUp, 
  ArrowDown,
  Activity,
  Users,
  DollarSign,
  ShoppingCart,
  Target,
  Zap,
  Star
} from "lucide-react";

const statsCardVariants = cva(
  "relative overflow-hidden rounded-xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card border-border shadow-sm hover:shadow-md",
        glass: "bg-white/10 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl",
        premium: "bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20",
        featured: "bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20 shadow-lg shadow-accent/10 hover:shadow-xl hover:shadow-accent/20",
        success: "bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20 shadow-lg shadow-green-500/10 hover:shadow-xl hover:shadow-green-500/20",
        warning: "bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border-yellow-500/20 shadow-lg shadow-yellow-500/10 hover:shadow-xl hover:shadow-yellow-500/20",
        destructive: "bg-gradient-to-br from-red-500/5 to-pink-500/5 border-red-500/20 shadow-lg shadow-red-500/10 hover:shadow-xl hover:shadow-red-500/20",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const statsIconVariants = cva(
  "flex items-center justify-center rounded-lg",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
      variant: {
        default: "bg-primary/10 text-primary",
        glass: "bg-white/20 text-white",
        premium: "bg-primary/20 text-primary",
        featured: "bg-accent/20 text-accent",
        success: "bg-green-500/20 text-green-500",
        warning: "bg-yellow-500/20 text-yellow-500",
        destructive: "bg-red-500/20 text-red-500",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const statsValueVariants = cva(
  "font-bold tracking-tight",
  {
    variants: {
      size: {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-3xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const statsLabelVariants = cva(
  "font-medium text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const changeVariants = cva(
  "inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-1",
  {
    variants: {
      type: {
        positive: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        negative: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
        neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
      },
    },
    defaultVariants: {
      type: "neutral",
    },
  }
);

export interface StatsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsCardVariants> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    label: string;
    type?: 'positive' | 'negative' | 'neutral';
  };
  trend?: {
    data: number[];
    type?: 'line' | 'bar';
  };
  loading?: boolean;
  error?: string;
  onClick?: () => void;
  interactive?: boolean;
  animated?: boolean;
  showTrend?: boolean;
  prefix?: string;
  suffix?: string;
  precision?: number;
  format?: 'number' | 'currency' | 'percentage';
  currency?: string;
}

const defaultIcons = {
  activity: <Activity className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  revenue: <DollarSign className="h-5 w-5" />,
  sales: <ShoppingCart className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  performance: <Zap className="h-5 w-5" />,
  rating: <Star className="h-5 w-5" />,
};

export function StatsCard({
  title,
  value,
  description,
  icon,
  change,
  trend,
  loading = false,
  error,
  onClick,
  interactive = false,
  animated = false,
  showTrend = true,
  prefix = '',
  suffix = '',
  precision = 0,
  format = 'number',
  currency = 'USD',
  variant,
  size,
  className,
  ...props
}: StatsCardProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const formatValue = (val: string | number): string => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        }).format(val);
      case 'percentage':
        return `${(val * 100).toFixed(precision)}%`;
      default:
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        }).format(val);
    }
  };

  const getChangeIcon = () => {
    if (!change) return null;
    
    switch (change.type) {
      case 'positive':
        return <ArrowUp className="h-3 w-3" />;
      case 'negative':
        return <ArrowDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getChangeType = (): 'positive' | 'negative' | 'neutral' => {
    if (!change) return 'neutral';
    if (change.value > 0) return 'positive';
    if (change.value < 0) return 'negative';
    return 'neutral';
  };

  if (!mounted) {
    return (
      <div className={cn(statsCardVariants({ variant, size, className }))}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-8 bg-muted rounded w-8"></div>
          </div>
          <div className="mt-4 h-6 bg-muted rounded w-3/4"></div>
          <div className="mt-2 h-3 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn(statsCardVariants({ variant, size, className }))}>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
          <div className="h-8 bg-muted animate-pulse rounded w-8"></div>
        </div>
        <div className="mt-4 h-6 bg-muted animate-pulse rounded w-3/4"></div>
        <div className="mt-2 h-3 bg-muted animate-pulse rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(statsCardVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-2xl text-destructive">⚠️</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Error</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        statsCardVariants({ variant, size, className }),
        interactive && "cursor-pointer hover:scale-[1.02]",
        animated && "hover:shadow-lg transition-all duration-300"
      )}
      onClick={interactive ? onClick : undefined}
      {...props}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={cn(statsLabelVariants({ size }))}>
            {title}
          </div>
          {icon && (
            <div className={cn(statsIconVariants({ size, variant }))}>
              {icon}
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <div className={cn(statsValueVariants({ size }))}>
            {prefix}{formatValue(value)}{suffix}
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className={cn(statsLabelVariants({ size }))}>
            {description}
          </div>
        )}

        {/* Change */}
        {change && showTrend && (
          <div className="mt-4 flex items-center gap-2">
            <div className={cn(changeVariants({ type: getChangeType() }))}>
              {getChangeIcon()}
              <span>
                {Math.abs(change.value)}% {change.label}
              </span>
            </div>
          </div>
        )}

        {/* Trend Indicator */}
        {trend && showTrend && (
          <div className="mt-4 flex items-center gap-1">
            {trend.data.slice(-5).map((point, index) => (
              <div
                key={index}
                className="h-1 bg-primary/30 rounded-full flex-1"
                style={{
                  height: `${Math.max(4, (point / Math.max(...trend.data)) * 16)}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Preset components for common use cases
export function RevenueCard({ value, change, ...props }: Omit<StatsCardProps, 'title' | 'icon'>) {
  return (
    <StatsCard
      title="Revenue"
      value={value}
      icon={defaultIcons.revenue}
      format="currency"
      change={change}
      {...props}
    />
  );
}

export function UsersCard({ value, change, ...props }: Omit<StatsCardProps, 'title' | 'icon'>) {
  return (
    <StatsCard
      title="Users"
      value={value}
      icon={defaultIcons.users}
      format="number"
      change={change}
      {...props}
    />
  );
}

export function SalesCard({ value, change, ...props }: Omit<StatsCardProps, 'title' | 'icon'>) {
  return (
    <StatsCard
      title="Sales"
      value={value}
      icon={defaultIcons.sales}
      format="number"
      change={change}
      {...props}
    />
  );
}

export function PerformanceCard({ value, change, ...props }: Omit<StatsCardProps, 'title' | 'icon'>) {
  return (
    <StatsCard
      title="Performance"
      value={value}
      icon={defaultIcons.performance}
      format="percentage"
      change={change}
      {...props}
    />
  );
}

export { 
  statsCardVariants, 
  statsIconVariants, 
  statsValueVariants, 
  statsLabelVariants, 
  changeVariants,
  defaultIcons 
};
