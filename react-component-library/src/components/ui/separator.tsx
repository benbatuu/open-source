import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const separatorVariants = cva(
  "shrink-0 relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-transparent via-primary/30 to-transparent",
        subtle: "bg-gradient-to-r from-transparent via-muted/40 to-transparent",
        bold: "bg-gradient-to-r from-transparent via-primary/60 to-transparent",
        success: "bg-gradient-to-r from-transparent via-green-500/50 to-transparent",
        warning: "bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent",
        destructive: "bg-gradient-to-r from-transparent via-red-500/50 to-transparent",
        info: "bg-gradient-to-r from-transparent via-blue-500/50 to-transparent",
        premium: "bg-gradient-to-r from-transparent via-purple-500/50 to-transparent",
      },
      size: {
        xs: "h-[1px] w-full",
        sm: "h-[2px] w-full", 
        md: "h-[3px] w-full",
        lg: "h-[4px] w-full",
        xl: "h-[6px] w-full",
      },
      orientation: {
        horizontal: "h-[3px] w-full",
        vertical: "h-full w-[3px]",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
      dotted: {
        true: "bg-dotted",
        false: "",
      },
    },
    compoundVariants: [
      {
        orientation: "vertical",
        size: "xs",
        class: "h-full w-[1px]",
      },
      {
        orientation: "vertical", 
        size: "sm",
        class: "h-full w-[2px]",
      },
      {
        orientation: "vertical",
        size: "md", 
        class: "h-full w-[3px]",
      },
      {
        orientation: "vertical",
        size: "lg",
        class: "h-full w-[4px]",
      },
      {
        orientation: "vertical",
        size: "xl",
        class: "h-full w-[6px]",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      orientation: "horizontal",
      animated: false,
      dotted: false,
    },
  }
)

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {
  label?: string
  labelPosition?: 'left' | 'center' | 'right'
  showIcon?: boolean
  icon?: React.ReactNode
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { 
      className, 
      orientation = "horizontal", 
      decorative = true, 
      variant,
      size,
      animated,
      dotted,
      label,
      labelPosition = 'center',
      showIcon,
      icon,
      ...props 
    },
    ref
  ) => {
    const getVariantGradient = () => {
      const isVertical = orientation === "vertical"
      switch (variant) {
        case "subtle":
          return isVertical 
            ? "bg-gradient-to-b from-transparent via-muted/40 to-transparent"
            : "bg-gradient-to-r from-transparent via-muted/40 to-transparent"
        case "bold":
          return isVertical
            ? "bg-gradient-to-b from-transparent via-primary/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        case "success":
          return isVertical
            ? "bg-gradient-to-b from-transparent via-green-500/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-green-500/50 to-transparent"
        case "warning":
          return isVertical
            ? "bg-gradient-to-b from-transparent via-yellow-500/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"
        case "destructive":
          return isVertical
            ? "bg-gradient-to-b from-transparent via-red-500/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
        case "info":
          return isVertical
            ? "bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        case "premium":
          return isVertical
            ? "bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        default:
          return isVertical
            ? "bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            : "bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      }
    }

    const getShimmerGradient = () => {
      const isVertical = orientation === "vertical"
      return isVertical
        ? "bg-gradient-to-b from-transparent via-white/40 to-transparent"
        : "bg-gradient-to-r from-transparent via-white/40 to-transparent"
    }

    const getGlowGradient = () => {
      const isVertical = orientation === "vertical"
      switch (variant) {
        case "success":
          return isVertical
            ? "bg-gradient-to-b from-green-500/20 via-green-500/40 to-green-500/20"
            : "bg-gradient-to-r from-green-500/20 via-green-500/40 to-green-500/20"
        case "warning":
          return isVertical
            ? "bg-gradient-to-b from-yellow-500/20 via-yellow-500/40 to-yellow-500/20"
            : "bg-gradient-to-r from-yellow-500/20 via-yellow-500/40 to-yellow-500/20"
        case "destructive":
          return isVertical
            ? "bg-gradient-to-b from-red-500/20 via-red-500/40 to-red-500/20"
            : "bg-gradient-to-r from-red-500/20 via-red-500/40 to-red-500/20"
        case "info":
          return isVertical
            ? "bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-blue-500/20"
            : "bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20"
        case "premium":
          return isVertical
            ? "bg-gradient-to-b from-purple-500/20 via-purple-500/40 to-purple-500/20"
            : "bg-gradient-to-r from-purple-500/20 via-purple-500/40 to-purple-500/20"
        default:
          return isVertical
            ? "bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"
            : "bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
      }
    }

    if (label) {
      return (
        <div className={cn(
          "flex items-center w-full",
          orientation === "vertical" && "flex-col h-full"
        )}>
          <div className={cn(
            "flex items-center w-full gap-4",
            orientation === "vertical" && "flex-col h-full gap-4"
          )}>
            {(labelPosition === 'left' || labelPosition === 'center') && (
              <div className={cn(
                separatorVariants({ variant, size, orientation, animated, dotted }),
                orientation === "horizontal" ? "flex-1" : "flex-1"
              )}>
                {/* Gradient separator line */}
                <div className={cn("absolute inset-0", getVariantGradient())} />
                
                {/* Animated shimmer effect */}
                <div className={cn(
                  "absolute inset-0 animate-shimmer opacity-60",
                  getShimmerGradient()
                )} />
                
                {/* Glow effect */}
                <div className={cn(
                  "absolute inset-0 blur-sm",
                  getGlowGradient()
                )} />
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
              {showIcon && icon && <span>{icon}</span>}
              <span>{label}</span>
            </div>
            
            {(labelPosition === 'right' || labelPosition === 'center') && (
              <div className={cn(
                separatorVariants({ variant, size, orientation, animated, dotted }),
                orientation === "horizontal" ? "flex-1" : "flex-1"
              )}>
                {/* Gradient separator line */}
                <div className={cn("absolute inset-0", getVariantGradient())} />
                
                {/* Animated shimmer effect */}
                <div className={cn(
                  "absolute inset-0 animate-shimmer opacity-60",
                  getShimmerGradient()
                )} />
                
                {/* Glow effect */}
                <div className={cn(
                  "absolute inset-0 blur-sm",
                  getGlowGradient()
                )} />
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          separatorVariants({ variant, size, orientation, animated, dotted }),
          className
        )}
        {...props}
      >
        {/* Gradient separator line */}
        <div className={cn("absolute inset-0", getVariantGradient())} />
        
        {/* Animated shimmer effect */}
        <div className={cn(
          "absolute inset-0 animate-shimmer opacity-60",
          getShimmerGradient()
        )} />
        
        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 blur-sm",
          getGlowGradient()
        )} />
      </SeparatorPrimitive.Root>
    )
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator, separatorVariants }
