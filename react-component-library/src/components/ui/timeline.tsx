import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const timelineVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        default: "text-foreground",
        card: "bg-card border border-border rounded-lg p-6",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6",
        premium: "bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6 shadow-lg shadow-primary/10",
        featured: "bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-xl p-6 shadow-lg shadow-accent/10",
      },
      orientation: {
        vertical: "flex flex-col",
        horizontal: "flex flex-row",
      },
      size: {
        sm: "space-y-3",
        md: "space-y-4",
        lg: "space-y-6",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "vertical",
      size: "md",
    },
  }
);

const timelineItemVariants = cva(
  "relative flex items-start",
  {
    variants: {
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row",
      },
      position: {
        left: "flex-row",
        right: "flex-row-reverse",
        alternate: "flex-row",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      position: "left",
    },
  }
);

const timelineConnectorVariants = cva(
  "absolute border-l-2 border-muted-foreground/30",
  {
    variants: {
      orientation: {
        vertical: "left-4 top-8 bottom-0 w-0 h-auto",
        horizontal: "top-4 left-8 right-0 h-0 w-auto border-l-0 border-t-2",
      },
      variant: {
        default: "border-muted-foreground/30",
        primary: "border-primary/50",
        success: "border-green-500/50",
        warning: "border-yellow-500/50",
        destructive: "border-red-500/50",
        accent: "border-accent/50",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      variant: "default",
    },
  }
);

const timelineDotVariants = cva(
  "flex-shrink-0 w-8 h-8 rounded-full border-2 border-background shadow-sm flex items-center justify-center text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground border-muted-foreground/30",
        primary: "bg-primary text-primary-foreground border-primary",
        success: "bg-green-500 text-white border-green-500",
        warning: "bg-yellow-500 text-white border-yellow-500",
        destructive: "bg-red-500 text-white border-red-500",
        accent: "bg-accent text-accent-foreground border-accent",
        outline: "bg-background text-foreground border-foreground",
        ghost: "bg-transparent text-foreground border-foreground/20",
      },
      size: {
        sm: "w-6 h-6 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const timelineContentVariants = cva(
  "flex-1 min-w-0",
  {
    variants: {
      orientation: {
        vertical: "ml-4",
        horizontal: "mt-4",
      },
      position: {
        left: "ml-4",
        right: "mr-4",
        alternate: "ml-4",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      position: "left",
    },
  }
);

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'accent' | 'outline' | 'ghost';
  status?: 'completed' | 'in-progress' | 'pending' | 'cancelled';
  metadata?: Record<string, any>;
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  items: TimelineItem[];
  showConnector?: boolean;
  connectorVariant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'accent';
  dotVariant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'accent' | 'outline' | 'ghost';
  dotSize?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'right' | 'alternate';
  loading?: boolean;
  error?: string;
  emptyText?: string;
  onItemClick?: (item: TimelineItem, index: number) => void;
  renderItem?: (item: TimelineItem, index: number) => React.ReactNode;
}

export function Timeline({
  items,
  showConnector = true,
  connectorVariant = 'default',
  dotVariant = 'default',
  dotSize = 'md',
  position = 'left',
  loading = false,
  error,
  emptyText = 'No timeline items',
  onItemClick,
  renderItem,
  variant,
  orientation = 'vertical',
  size,
  className,
  ...props
}: TimelineProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn(timelineVariants({ variant, orientation, size, className }))}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn(timelineVariants({ variant, orientation, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading timeline...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(timelineVariants({ variant, orientation, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-2xl text-destructive">⚠️</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Timeline Error</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className={cn(timelineVariants({ variant, orientation, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
            <span className="text-2xl text-muted-foreground">📅</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No Timeline</h3>
            <p className="text-sm text-muted-foreground">{emptyText}</p>
          </div>
        </div>
      </div>
    );
  }

  const getDotVariant = (item: TimelineItem) => {
    if (item.variant) return item.variant;
    
    switch (item.status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      default:
        return dotVariant;
    }
  };

  const getConnectorVariant = (item: TimelineItem) => {
    switch (item.status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      default:
        return connectorVariant;
    }
  };

  const defaultRenderItem = (item: TimelineItem, index: number) => (
    <div
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:bg-muted/50 rounded-lg p-4 -m-4",
        onItemClick && "hover:shadow-md"
      )}
      onClick={() => onItemClick?.(item, index)}
    >
      <div className="flex items-start space-x-3">
        <div className={cn(timelineDotVariants({ variant: getDotVariant(item), size: dotSize }))}>
          {item.icon || (
            <span className="text-xs font-bold">
              {item.status === 'completed' ? '✓' : 
               item.status === 'in-progress' ? '⏳' : 
               item.status === 'pending' ? '⏸' : 
               item.status === 'cancelled' ? '✕' : 
               index + 1}
            </span>
          )}
        </div>
        
        <div className={cn(timelineContentVariants({ orientation, position }))}>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              {(item.date || item.time) && (
                <div className="text-xs text-muted-foreground">
                  {item.date && <span>{item.date}</span>}
                  {item.date && item.time && <span className="mx-1">•</span>}
                  {item.time && <span>{item.time}</span>}
                </div>
              )}
            </div>
            
            {item.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            )}
            
            {item.status && (
              <div className="flex items-center space-x-2">
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  item.status === 'completed' && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
                  item.status === 'in-progress' && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
                  item.status === 'pending' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
                  item.status === 'cancelled' && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                )}>
                  {item.status === 'completed' && 'Completed'}
                  {item.status === 'in-progress' && 'In Progress'}
                  {item.status === 'pending' && 'Pending'}
                  {item.status === 'cancelled' && 'Cancelled'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn(timelineVariants({ variant, orientation, size, className }))} {...props}>
      {items.map((item, index) => (
        <div key={item.id} className="relative">
          <div className={cn(timelineItemVariants({ orientation, position }))}>
            {renderItem ? renderItem(item, index) : defaultRenderItem(item, index)}
          </div>
          
          {showConnector && index < items.length - 1 && (
            <div className={cn(timelineConnectorVariants({ 
              orientation, 
              variant: getConnectorVariant(item) 
            }))} />
          )}
        </div>
      ))}
    </div>
  );
}

export { timelineVariants, timelineItemVariants, timelineConnectorVariants, timelineDotVariants, timelineContentVariants };
