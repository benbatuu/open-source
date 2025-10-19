import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-lg border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground border-border",
        dark: "bg-gray-900 text-white border-gray-700",
        light: "bg-white text-gray-900 border-gray-200",
        success: "bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800",
        error: "bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800",
        warning: "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800",
        info: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800",
        premium: "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-900 border-purple-200 dark:from-purple-950 dark:to-pink-950 dark:text-purple-100 dark:border-purple-800",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
      arrow: {
        true: "before:content-[''] before:absolute before:w-2 before:h-2 before:bg-inherit before:border-inherit before:rotate-45",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      arrow: false,
    },
  }
)

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
  avoidCollisions?: boolean
  collisionBoundary?: Element | null
  collisionPadding?: number | Partial<Record<"top" | "right" | "bottom" | "left", number>>
  sticky?: "partial" | "always"
  hideWhenDetached?: boolean
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ 
  className, 
  variant, 
  size, 
  arrow,
  side = "top",
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  avoidCollisions = true,
  collisionBoundary,
  collisionPadding = 0,
  sticky = "partial",
  hideWhenDetached = false,
  ...props 
}, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    side={side}
    align={align}
    sideOffset={sideOffset}
    alignOffset={alignOffset}
    avoidCollisions={avoidCollisions}
    collisionBoundary={collisionBoundary}
    collisionPadding={collisionPadding}
    sticky={sticky}
    hideWhenDetached={hideWhenDetached}
    className={cn(tooltipContentVariants({ variant, size, arrow }), className)}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  tooltipContentVariants,
}

