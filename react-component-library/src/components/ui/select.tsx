import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, ChevronDown, ChevronUp, AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"

import { cn } from "../../lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between rounded-xl border bg-background/80 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all duration-300 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "border-border/50 hover:border-primary/50 focus:border-primary shadow-sm hover:shadow-md focus:shadow-lg",
        error: "border-red-500/70 hover:border-red-600 focus:border-red-600 focus:ring-red-500 shadow-red-500/20 hover:shadow-red-500/30 focus:shadow-red-500/40",
        success: "border-green-500/70 hover:border-green-600 focus:border-green-600 focus:ring-green-500 shadow-green-500/20 hover:shadow-green-500/30 focus:shadow-green-500/40",
        warning: "border-yellow-500/70 hover:border-yellow-600 focus:border-yellow-600 focus:ring-yellow-500 shadow-yellow-500/20 hover:shadow-yellow-500/30 focus:shadow-yellow-500/40",
        info: "border-blue-500/70 hover:border-blue-600 focus:border-blue-600 focus:ring-blue-500 shadow-blue-500/20 hover:shadow-blue-500/30 focus:shadow-blue-500/40",
        premium: "border-purple-500/70 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-500 shadow-purple-500/20 hover:shadow-purple-500/30 focus:shadow-purple-500/40 bg-gradient-to-r from-purple-500/5 to-pink-500/5",
        featured: "border-gradient-to-r from-primary to-accent hover:border-primary focus:border-accent focus:ring-primary shadow-primary/20 hover:shadow-primary/30 focus:shadow-primary/40 bg-gradient-to-r from-primary/5 to-accent/5",
      },
      size: {
        xs: "h-7 px-2 text-xs rounded-md",
        sm: "h-8 px-3 text-sm rounded-lg",
        md: "h-10 px-3 text-sm rounded-xl",
        lg: "h-12 px-4 text-base rounded-2xl",
        xl: "h-14 px-5 text-lg rounded-2xl",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      glowing: {
        true: "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 focus:shadow-2xl focus:shadow-primary/40",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: true,
      glowing: false,
    },
  }
)

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  label?: string
  helperText?: string
  error?: string
  warning?: string
  info?: string
  success?: string
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ 
  className, 
  variant, 
  size, 
  fullWidth,
  glowing,
  label,
  helperText,
  error,
  warning,
  info,
  success,
  loading = false,
  icon,
  iconPosition = 'left',
  children, 
  ...props 
}, ref) => {
  // Auto-determine variant based on error/warning/info/success
  let selectVariant = variant
  if (error) selectVariant = "error"
  else if (success) selectVariant = "success"
  else if (warning) selectVariant = "warning"
  else if (info) selectVariant = "info"

  // Status icon
  const getStatusIcon = () => {
    if (error) return <AlertCircle className="h-4 w-4 text-red-500" />
    if (success) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (warning) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    if (info) return <Info className="h-4 w-4 text-blue-500" />
    return null
  }

  const statusIcon = getStatusIcon()
  const statusMessage = error || success || warning || info

  return (
    <div className={cn("w-full", !fullWidth && "w-auto")}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {/* Shimmer effect */}
        {glowing && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-30 rounded-xl" />
        )}
        
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(
            selectTriggerVariants({ variant: selectVariant, size, fullWidth, glowing }),
            icon && iconPosition === 'left' && "pl-10",
            (statusIcon || loading) && "pr-10",
            className
          )}
          {...props}
        >
          {/* Left Icon */}
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/70 group-hover:text-foreground transition-colors">
              {icon}
            </div>
          )}
          
          {children}
          
          {/* Right side elements */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {/* Loading spinner */}
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
            )}
            
            {/* Status Icon */}
            {statusIcon && !loading && (
              <div className="text-foreground/70 group-hover:text-foreground transition-colors">
                {statusIcon}
              </div>
            )}
            
            {/* Default chevron */}
            {!loading && !statusIcon && (
              <SelectPrimitive.Icon asChild>
                <ChevronDown className="h-4 w-4 text-foreground/70 group-hover:text-foreground transition-colors" />
              </SelectPrimitive.Icon>
            )}
          </div>
        </SelectPrimitive.Trigger>
      </div>
      
      {/* Helper text and status message */}
      {(helperText || statusMessage) && (
        <p className={cn(
          "text-xs flex items-center gap-1 mt-1",
          error ? "text-red-500" : success ? "text-green-500" : warning ? "text-yellow-500" : info ? "text-blue-500" : "text-muted-foreground"
        )}>
          {statusIcon && <span>{statusIcon}</span>}
          {statusMessage || helperText}
        </p>
      )}
    </div>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border bg-popover/95 backdrop-blur-sm text-popover-foreground shadow-2xl shadow-primary/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-2",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-2 pl-8 pr-3 text-sm outline-none focus:bg-primary/10 focus:text-primary hover:bg-muted/50 transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText className="group-hover:text-foreground transition-colors">{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  selectTriggerVariants,
}

