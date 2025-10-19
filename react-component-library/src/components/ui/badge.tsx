import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, Star, Heart, Zap, Check, AlertTriangle } from "lucide-react"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 relative overflow-hidden group shadow-sm hover:shadow-md hover:scale-105",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gradient-to-r from-primary via-primary to-accent text-white shadow-primary/25 hover:shadow-primary/40",
        secondary: "border-transparent bg-gradient-to-r from-muted via-muted to-muted/80 text-muted-foreground shadow-muted/25 hover:shadow-muted/40",
        destructive: "border-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-red-500/25 hover:shadow-red-500/40",
        outline: "border-primary/30 bg-background/80 backdrop-blur-sm text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:border-primary/50",
        success: "border-transparent bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white shadow-green-500/25 hover:shadow-green-500/40",
        warning: "border-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 text-white shadow-yellow-500/25 hover:shadow-yellow-500/40",
        info: "border-transparent bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-blue-500/25 hover:shadow-blue-500/40",
        premium: "border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-purple-500/25 hover:shadow-purple-500/40",
        featured: "border-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 text-white shadow-amber-500/25 hover:shadow-amber-500/40",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
        xl: "px-5 py-2 text-lg",
      },
      removable: {
        true: "pr-2",
        false: "",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
      icon: {
        true: "pl-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      removable: false,
      animated: false,
      icon: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  onRemove?: () => void
  removable?: boolean
  animated?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  count?: number
  maxCount?: number
  dot?: boolean
}

function Badge({ 
  className, 
  variant, 
  size, 
  removable, 
  onRemove, 
  animated,
  icon,
  iconPosition = 'left',
  count,
  maxCount = 99,
  dot,
  children, 
  ...props 
}: BadgeProps) {
  const hasIcon = !!icon
  const displayCount = count && count > maxCount ? `${maxCount}+` : count?.toString()

  const getDefaultIcon = () => {
    switch (variant) {
      case "success":
        return <Check className="h-3 w-3" />
      case "warning":
        return <AlertTriangle className="h-3 w-3" />
      case "premium":
        return <Star className="h-3 w-3" />
      case "featured":
        return <Zap className="h-3 w-3" />
      default:
        return null
    }
  }

  const defaultIcon = getDefaultIcon()
  const showIcon = icon || defaultIcon

  if (dot) {
    return (
      <div className={cn("relative", className)}>
        <div className={cn(
          "w-3 h-3 rounded-full",
          variant === "destructive" && "bg-red-500",
          variant === "success" && "bg-green-500",
          variant === "warning" && "bg-yellow-500",
          variant === "info" && "bg-blue-500",
          variant === "default" && "bg-primary",
          variant === "secondary" && "bg-muted-foreground",
          animated && "animate-pulse"
        )} />
      </div>
    )
  }

  return (
    <div className={cn(badgeVariants({ variant, size, removable, animated, icon: hasIcon }), className)} {...props}>
      {/* Shimmer effect overlay */}
      <span className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
      
      <span className="relative z-10 flex items-center gap-1">
        {/* Icon on the left */}
        {showIcon && iconPosition === 'left' && (
          <span className="flex-shrink-0">
            {showIcon}
          </span>
        )}
        
        {/* Badge content */}
        <span className="flex items-center gap-1">
          {children}
          {displayCount && (
            <span className="bg-black/20 dark:bg-white/20 rounded-full px-1.5 py-0.5 text-xs font-bold">
              {displayCount}
            </span>
          )}
        </span>
        
        {/* Icon on the right */}
        {showIcon && iconPosition === 'right' && (
          <span className="flex-shrink-0">
            {showIcon}
          </span>
        )}
        
        {/* Remove button */}
        {removable && onRemove && (
          <button
            onClick={onRemove}
            className="ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Remove badge"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    </div>
  )
}

export { Badge, badgeVariants }
