import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, CheckCircle, Info, X, XCircle, Shield, Star, Zap } from "lucide-react"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border/50",
        destructive: "border-red-500/50 text-red-700 bg-red-50/50 dark:border-red-500 dark:text-red-400 dark:bg-red-950/20 [&>svg]:text-red-600 dark:[&>svg]:text-red-400 shadow-red-500/10",
        success: "border-green-500/50 text-green-700 bg-green-50/50 dark:border-green-500 dark:text-green-400 dark:bg-green-950/20 [&>svg]:text-green-600 dark:[&>svg]:text-green-400 shadow-green-500/10",
        warning: "border-yellow-500/50 text-yellow-700 bg-yellow-50/50 dark:border-yellow-500 dark:text-yellow-400 dark:bg-yellow-950/20 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400 shadow-yellow-500/10",
        info: "border-blue-500/50 text-blue-700 bg-blue-50/50 dark:border-blue-500 dark:text-blue-400 dark:bg-blue-950/20 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400 shadow-blue-500/10",
        premium: "border-purple-500/50 text-purple-700 bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:border-purple-500 dark:text-purple-400 dark:bg-gradient-to-br dark:from-purple-950/30 dark:to-pink-950/30 [&>svg]:text-purple-600 dark:[&>svg]:text-purple-400 shadow-purple-500/20",
        featured: "border-primary/50 text-primary bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 dark:border-primary dark:text-primary dark:bg-gradient-to-br dark:from-primary/20 dark:via-accent/20 dark:to-primary/20 [&>svg]:text-primary dark:[&>svg]:text-primary shadow-primary/20",
        glass: "border-white/20 text-foreground bg-white/10 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 [&>svg]:text-foreground shadow-xl shadow-black/10",
      },
      size: {
        sm: "p-3 text-sm [&>svg]:h-4 [&>svg]:w-4",
        md: "p-4 text-sm [&>svg]:h-5 [&>svg]:w-5",
        lg: "p-6 text-base [&>svg]:h-6 [&>svg]:w-6",
        xl: "p-8 text-lg [&>svg]:h-7 [&>svg]:w-7",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
      glowing: {
        true: "shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30",
        false: "",
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

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  dismissible?: boolean
  onDismiss?: () => void
  icon?: React.ReactNode
  autoIcon?: boolean
  showShimmer?: boolean
  fullWidth?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant, 
    size, 
    animated,
    glowing,
    dismissible = false, 
    onDismiss, 
    icon,
    autoIcon = true,
    showShimmer = false,
    fullWidth = true,
    children, 
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)

    const handleDismiss = () => {
      setIsVisible(false)
      onDismiss?.()
    }

    if (!isVisible) return null

    const getDefaultIcon = () => {
      if (icon) return icon
      if (!autoIcon) return null
      
      switch (variant) {
        case "destructive":
          return <XCircle />
        case "success":
          return <CheckCircle />
        case "warning":
          return <AlertTriangle />
        case "info":
          return <Info />
        case "premium":
          return <Star />
        case "featured":
          return <Shield />
        case "glass":
          return <Zap />
        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ variant, size, animated, glowing }),
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {/* Shimmer effect */}
        {showShimmer && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-30" />
        )}
        
        {getDefaultIcon()}
        <div className="flex-1">
          {children}
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight bg-gradient-to-r from-current to-current/80 bg-clip-text text-transparent", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed opacity-90", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }
