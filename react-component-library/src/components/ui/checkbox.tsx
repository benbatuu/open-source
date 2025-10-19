import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Minus, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"

import { cn } from "../../lib/utils"

const checkboxVariants = cva(
  "peer shrink-0 rounded-lg border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 relative overflow-hidden group data-[state=checked]:shadow-lg data-[state=checked]:shadow-primary/20 hover:shadow-md hover:shadow-primary/10",
  {
    variants: {
      variant: {
        default: "border-primary/50 hover:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
        error: "border-red-500/50 hover:border-red-600 data-[state=checked]:bg-red-500 data-[state=checked]:text-white data-[state=checked]:border-red-500 focus-visible:ring-red-500",
        success: "border-green-500/50 hover:border-green-600 data-[state=checked]:bg-green-500 data-[state=checked]:text-white data-[state=checked]:border-green-500 focus-visible:ring-green-500",
        warning: "border-yellow-500/50 hover:border-yellow-600 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white data-[state=checked]:border-yellow-500 focus-visible:ring-yellow-500",
        info: "border-blue-500/50 hover:border-blue-600 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 focus-visible:ring-blue-500",
        premium: "border-purple-500/50 hover:border-purple-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500 data-[state=checked]:text-white data-[state=checked]:border-purple-500 focus-visible:ring-purple-500",
        featured: "border-primary/50 hover:border-accent data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent data-[state=checked]:text-white data-[state=checked]:border-primary focus-visible:ring-primary",
      },
      size: {
        xs: "h-3 w-3 rounded-sm",
        sm: "h-4 w-4 rounded-md",
        md: "h-5 w-5 rounded-lg",
        lg: "h-6 w-6 rounded-lg",
        xl: "h-7 w-7 rounded-xl",
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

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string
  helperText?: string
  error?: string
  warning?: string
  info?: string
  success?: string
  indeterminate?: boolean
  icon?: React.ReactNode
  loading?: boolean
  fullWidth?: boolean
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
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
  indeterminate = false,
  icon,
  loading = false,
  fullWidth = false,
  checked,
  onCheckedChange,
  ...props 
}, ref) => {
  // Auto-determine variant based on error/warning/info/success
  let checkboxVariant = variant
  if (error) checkboxVariant = "error"
  else if (success) checkboxVariant = "success"
  else if (warning) checkboxVariant = "warning"
  else if (info) checkboxVariant = "info"

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

  // Get appropriate icon size based on checkbox size
  const getIconSize = () => {
    switch (size) {
      case 'xs': return 'h-2 w-2'
      case 'sm': return 'h-3 w-3'
      case 'md': return 'h-4 w-4'
      case 'lg': return 'h-5 w-5'
      case 'xl': return 'h-6 w-6'
      default: return 'h-4 w-4'
    }
  }

  const iconSize = getIconSize()

  return (
    <div className={cn("flex items-start space-x-3", fullWidth && "w-full")}>
      <div className="relative group">
        {/* Shimmer effect */}
        {(checked || glowing) && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-30 rounded-lg" />
        )}
        
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            checkboxVariants({ variant: checkboxVariant, size, animated, glowing }),
            className
          )}
          checked={indeterminate ? 'indeterminate' : checked}
          onCheckedChange={onCheckedChange}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn("flex items-center justify-center text-current relative")}
          >
            {/* Loading spinner */}
            {loading && (
              <div className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", iconSize)} />
            )}
            
            {/* Check icon */}
            {!loading && checked && !indeterminate && (
              <Check className={iconSize} />
            )}
            
            {/* Indeterminate icon */}
            {!loading && indeterminate && (
              <Minus className={iconSize} />
            )}
            
            {/* Custom icon */}
            {!loading && !checked && !indeterminate && icon && (
              <div className={iconSize}>
                {icon}
              </div>
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
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
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants }
