import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-primary via-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 hover:-translate-y-0.5 active:scale-95",
        secondary: "bg-gradient-to-r from-muted via-muted to-muted/80 text-muted-foreground shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95 dark:bg-muted dark:text-muted-foreground",
        outline: "border border-border bg-background text-foreground hover:bg-muted hover:text-muted-foreground shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-0.5 active:scale-95",
        ghost: "hover:bg-muted hover:text-muted-foreground transition-colors duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors duration-300",
        destructive: "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 hover:-translate-y-0.5 active:scale-95",
        success: "bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 hover:-translate-y-0.5 active:scale-95",
      },
      size: {
        xs: "h-7 px-2 py-1 text-xs rounded-md",
        sm: "h-8 px-3 py-1.5 text-sm rounded-md",
        md: "h-10 px-4 py-2 text-sm rounded-lg",
        lg: "h-12 px-5 py-2.5 text-base rounded-xl",
        xl: "h-14 px-6 py-3 text-lg rounded-2xl",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    loading = false,
    icon,
    iconPosition = 'left',
    asChild = false, 
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading

    const renderContent = () => {
      if (loading) {
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span>{children}</span>
          </>
        )
      }

      if (icon && iconPosition === 'left') {
        return (
          <>
            <span className="mr-2">{icon}</span>
            <span>{children}</span>
          </>
        )
      }

      if (icon && iconPosition === 'right') {
        return (
          <>
            <span>{children}</span>
            <span className="ml-2">{icon}</span>
          </>
        )
      }

      return children
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Shimmer effect overlay - only for non-ghost and non-link variants */}
        {variant !== 'ghost' && variant !== 'link' && (
          <span className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
        )}
        <span className="relative z-10 flex items-center justify-center">
          {renderContent()}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
