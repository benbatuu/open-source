import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../../lib/utils"

const Tabs = TabsPrimitive.Root

const tabsListVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-muted rounded-md p-1",
        outlined: "bg-background border border-border rounded-lg p-1",
        filled: "bg-primary/10 rounded-lg p-1",
        premium: "bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-1 shadow-lg shadow-primary/10",
        featured: "bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl p-1 shadow-xl shadow-primary/20",
        glass: "bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-1 shadow-lg",
      },
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
        xl: "h-14",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col h-auto w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      orientation: "horizontal",
    },
  }
)

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative group",
  {
    variants: {
      variant: {
        default: "rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        outlined: "rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md",
        filled: "rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg",
        premium: "rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-primary/30",
        featured: "rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-primary data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-accent/40",
        glass: "rounded-lg data-[state=active]:bg-background/90 data-[state=active]:text-foreground data-[state=active]:shadow-xl data-[state=active]:border data-[state=active]:border-border/50",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
        xl: "px-5 py-2.5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const tabsContentVariants = cva(
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "mt-2",
        outlined: "mt-4 p-4 bg-background border border-border rounded-lg shadow-sm",
        filled: "mt-4 p-6 bg-muted rounded-lg shadow-md",
        premium: "mt-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-xl shadow-xl shadow-primary/10",
        featured: "mt-6 p-8 bg-gradient-to-br from-accent/10 via-background/50 to-primary/10 border border-accent/30 rounded-xl shadow-2xl shadow-accent/20",
        glass: "mt-4 p-6 bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  showArrows?: boolean
  scrollable?: boolean
}

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  icon?: React.ReactNode
  badge?: string | number
  animated?: boolean
}

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {
  animated?: boolean
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, size, orientation, showArrows = false, scrollable = false, ...props }, ref) => (
  <div className="relative">
    {showArrows && (
      <>
        <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-background border border-border shadow-md hover:bg-muted transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-background border border-border shadow-md hover:bg-muted transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </>
    )}
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        tabsListVariants({ variant, size, orientation }),
        scrollable && "overflow-x-auto scrollbar-hide",
        showArrows && "px-8",
        className
      )}
      {...props}
    />
  </div>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, icon, badge, animated = false, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      tabsTriggerVariants({ variant, size }),
      animated && "data-[state=active]:animate-pulse",
      className
    )}
    {...props}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
    {badge && (
      <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
        {badge}
      </span>
    )}
    {/* Shimmer effect for active tab */}
    {animated && (
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 data-[state=active]:opacity-100 rounded-lg" />
    )}
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, variant, animated = false, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      tabsContentVariants({ variant }),
      animated && "animate-in fade-in-0 slide-in-from-top-2 duration-300",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, tabsContentVariants }