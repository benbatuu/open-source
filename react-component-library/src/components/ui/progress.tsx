import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircle, AlertTriangle, XCircle, Info, Star, Shield } from "lucide-react"

import { cn } from "../../lib/utils"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full shadow-inner border",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-muted/50 via-muted to-muted/50 border-border/20",
        success: "bg-gradient-to-r from-green-100/50 via-green-200/30 to-green-100/50 border-green-200/20 dark:from-green-900/30 dark:via-green-800/20 dark:to-green-900/30",
        warning: "bg-gradient-to-r from-yellow-100/50 via-yellow-200/30 to-yellow-100/50 border-yellow-200/20 dark:from-yellow-900/30 dark:via-yellow-800/20 dark:to-yellow-900/30",
        destructive: "bg-gradient-to-r from-red-100/50 via-red-200/30 to-red-100/50 border-red-200/20 dark:from-red-900/30 dark:via-red-800/20 dark:to-red-900/30",
        info: "bg-gradient-to-r from-blue-100/50 via-blue-200/30 to-blue-100/50 border-blue-200/20 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/30",
        premium: "bg-gradient-to-r from-purple-100/50 via-purple-200/30 to-pink-100/50 border-purple-200/20 dark:from-purple-900/30 dark:via-purple-800/20 dark:to-pink-900/30",
        featured: "bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-primary/20 dark:from-primary/30 dark:via-accent/30 dark:to-primary/30",
        glass: "bg-white/10 backdrop-blur-sm border-white/20 dark:bg-white/5 dark:border-white/10",
      },
      size: {
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
        xl: "h-6",
      },
      animated: {
        true: "",
        false: "",
      },
      glowing: {
        true: "shadow-lg",
        false: "shadow-inner",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animated: false,
      glowing: false,
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-1000 ease-out relative overflow-hidden shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary via-primary to-accent",
        success: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
        warning: "bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500",
        destructive: "bg-gradient-to-r from-red-500 via-red-600 to-red-700",
        info: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700",
        premium: "bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500",
        featured: "bg-gradient-to-r from-primary via-accent to-primary",
        glass: "bg-gradient-to-r from-white/80 via-white/90 to-white/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  showValue?: boolean
  label?: string
  icon?: React.ReactNode
  autoIcon?: boolean
  showShimmer?: boolean
  showGlow?: boolean
  fullWidth?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value, 
  variant, 
  size, 
  animated,
  glowing,
  showValue = false, 
  label, 
  icon,
  autoIcon = true,
  showShimmer = true,
  showGlow = true,
  fullWidth = true,
  ...props 
}, ref) => {
  const getDefaultIcon = () => {
    if (icon) return icon
    if (!autoIcon) return null
    
    switch (variant) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "destructive":
        return <XCircle className="h-4 w-4" />
      case "info":
        return <Info className="h-4 w-4" />
      case "premium":
        return <Star className="h-4 w-4" />
      case "featured":
        return <Shield className="h-4 w-4" />
      default:
        return null
    }
  }

  const getIconColor = () => {
    switch (variant) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "destructive":
        return "text-red-600"
      case "info":
        return "text-blue-600"
      case "premium":
        return "text-purple-600"
      case "featured":
        return "text-primary"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className={cn("w-full", fullWidth && "w-full")}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {getDefaultIcon() && (
              <span className={getIconColor()}>
                {getDefaultIcon()}
              </span>
            )}
            <span className="text-sm font-medium text-foreground bg-gradient-to-r from-current to-current/80 bg-clip-text text-transparent">
              {label}
            </span>
          </div>
          {showValue && (
            <span className="text-sm text-muted-foreground font-medium">
              {Math.round(value || 0)}%
            </span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ variant, size, animated, glowing }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={progressIndicatorVariants({ variant })}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        >
          {/* Animated shimmer effect */}
          {showShimmer && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          )}
          {/* Glow effect */}
          {showGlow && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 blur-sm" />
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress, progressVariants, progressIndicatorVariants }
