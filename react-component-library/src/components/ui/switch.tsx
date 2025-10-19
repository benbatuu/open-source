import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"

import { cn } from "../../lib/utils"

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input shadow-sm hover:shadow-md",
        error: "data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-red-100 focus-visible:ring-red-500 shadow-red-500/20 data-[state=checked]:shadow-red-500/30",
        success: "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-green-100 focus-visible:ring-green-500 shadow-green-500/20 data-[state=checked]:shadow-green-500/30",
        warning: "data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-yellow-100 focus-visible:ring-yellow-500 shadow-yellow-500/20 data-[state=checked]:shadow-yellow-500/30",
        info: "data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-blue-100 focus-visible:ring-blue-500 shadow-blue-500/20 data-[state=checked]:shadow-blue-500/30",
        premium: "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500 data-[state=unchecked]:bg-purple-100 focus-visible:ring-purple-500 shadow-purple-500/20 data-[state=checked]:shadow-purple-500/30",
        featured: "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent data-[state=unchecked]:bg-primary/20 focus-visible:ring-primary shadow-primary/20 data-[state=checked]:shadow-primary/30",
        ios26: "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-400 data-[state=checked]:to-emerald-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700 shadow-lg data-[state=checked]:shadow-emerald-500/30 data-[state=unchecked]:shadow-gray-500/20",
      },
      size: {
        xs: "h-4 w-7",
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-13",
        xl: "h-8 w-15",
      },
      animated: {
        true: "data-[state=checked]:animate-pulse",
        false: "",
      },
      glowing: {
        true: "data-[state=checked]:shadow-xl data-[state=checked]:shadow-primary/40 hover:shadow-lg hover:shadow-primary/20",
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

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform duration-300",
  {
    variants: {
      variant: {
        default: "shadow-lg",
        error: "shadow-red-500/20 data-[state=checked]:shadow-red-500/30",
        success: "shadow-green-500/20 data-[state=checked]:shadow-green-500/30",
        warning: "shadow-yellow-500/20 data-[state=checked]:shadow-yellow-500/30",
        info: "shadow-blue-500/20 data-[state=checked]:shadow-blue-500/30",
        premium: "shadow-purple-500/20 data-[state=checked]:shadow-purple-500/30",
        featured: "shadow-primary/20 data-[state=checked]:shadow-primary/30",
        ios26: "shadow-xl data-[state=checked]:shadow-emerald-500/30 data-[state=unchecked]:shadow-gray-500/20 data-[state=checked]:bg-white data-[state=unchecked]:bg-white border-2 border-gray-300 dark:border-gray-600",
      },
      size: {
        xs: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
        xl: "h-7 w-7 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  label?: string
  helperText?: string
  error?: string
  warning?: string
  info?: string
  success?: string
  icon?: React.ReactNode
  loading?: boolean
  fullWidth?: boolean
  showIcons?: boolean
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ 
  className, 
  variant, 
  size, 
  animated,
  glowing,
  label,
  helperText,
  error,
  warning,
  info,
  success,
  icon,
  loading = false,
  fullWidth = false,
  showIcons = false,
  checked,
  onCheckedChange,
  ...props 
}, ref) => {
  // Auto-determine variant based on error/warning/info/success
  let switchVariant = variant
  if (error) switchVariant = "error"
  else if (success) switchVariant = "success"
  else if (warning) switchVariant = "warning"
  else if (info) switchVariant = "info"

  // Status icon
  const getStatusIcon = () => {
    if (error) return <AlertCircle className="h-3 w-3 text-red-500" />
    if (success) return <CheckCircle className="h-3 w-3 text-green-500" />
    if (warning) return <AlertTriangle className="h-3 w-3 text-yellow-500" />
    if (info) return <Info className="h-3 w-3 text-blue-500" />
    return null
  }

  const statusIcon = getStatusIcon()
  const statusMessage = error || success || warning || info

  return (
    <div className={cn("flex items-start space-x-3", fullWidth && "w-full")}>
      <div className="relative group">
        {/* Shimmer effect */}
        {(checked || glowing) && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-30 rounded-full" />
        )}
        
        <SwitchPrimitive.Root
          className={cn(
            switchVariants({ variant: switchVariant, size, animated, glowing }),
            className
          )}
          checked={checked}
          onCheckedChange={onCheckedChange}
          {...props}
          ref={ref}
        >
          <SwitchPrimitive.Thumb
            className={cn(
              switchThumbVariants({ variant: switchVariant, size })
            )}
          >
            {/* Loading spinner */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full border-2 border-current border-t-transparent h-3 w-3" />
              </div>
            )}
            
            {/* Custom icon */}
            {!loading && icon && (
              <div className="absolute inset-0 flex items-center justify-center">
                {icon}
              </div>
            )}
            
            {/* Status icons */}
            {!loading && !icon && showIcons && (
              <div className="absolute inset-0 flex items-center justify-center">
                {statusIcon}
              </div>
            )}
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
      </div>
      
      {/* Label and helper text */}
      {(label || helperText || statusMessage) && (
        <div className="flex-1 space-y-1">
          {label && (
            <label className="text-sm font-medium text-foreground cursor-pointer">
              {label}
            </label>
          )}
          
          {(helperText || statusMessage) && (
            <p className={cn(
              "text-xs flex items-center gap-1",
              error ? "text-red-500" : success ? "text-green-500" : warning ? "text-yellow-500" : info ? "text-blue-500" : "text-muted-foreground"
            )}>
              {statusIcon && <span>{statusIcon}</span>}
              {statusMessage || helperText}
            </p>
          )}
        </div>
      )}
    </div>
  )
})
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch, switchVariants, switchThumbVariants }
