import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Heart, Share2, MoreHorizontal, Star } from "lucide-react"

import { cn } from "../../lib/utils"

const cardVariants = cva(
  "rounded-2xl border text-card-foreground shadow-xl transition-all duration-300 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "border-border/20 bg-card/50 backdrop-blur-sm shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10",
        elevated: "border-border/30 bg-card/80 backdrop-blur-md shadow-2xl shadow-primary/10 hover:shadow-3xl hover:shadow-primary/20 hover:-translate-y-1",
        outlined: "border-2 border-primary/30 bg-background/80 backdrop-blur-sm shadow-lg shadow-primary/5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/15",
        filled: "border-border/20 bg-gradient-to-br from-card via-card/95 to-card/90 shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20",
        interactive: "border-border/20 bg-card/50 backdrop-blur-sm shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/15 hover:scale-[1.02] cursor-pointer",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  interactive?: boolean
  hoverable?: boolean
  clickable?: boolean
  onCardClick?: () => void
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, hoverable, clickable, onCardClick, children, ...props }, ref) => {
    const cardVariant = interactive || clickable ? "interactive" : variant
    const isClickable = clickable || interactive

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant: cardVariant, size }), className)}
        onClick={isClickable ? onCardClick : undefined}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={isClickable ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onCardClick?.()
          }
        } : undefined}
        {...props}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Shimmer effect */}
        {hoverable && (
          <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
        )}
        
        {/* Content wrapper */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-tight tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-muted-foreground/80 leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Additional Card Components
const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string
    alt?: string
    aspectRatio?: "square" | "video" | "wide"
  }
>(({ className, src, alt, aspectRatio = "square", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-t-2xl",
      aspectRatio === "square" && "aspect-square",
      aspectRatio === "video" && "aspect-video",
      aspectRatio === "wide" && "aspect-[16/9]",
      className
    )}
    {...props}
  >
    {src ? (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Image placeholder</div>
      </div>
    )}
  </div>
))
CardImage.displayName = "CardImage"

const CardActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    actions?: Array<{
      icon: React.ReactNode
      onClick: () => void
      label: string
    }>
  }
>(({ className, actions = [], ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  >
    {actions.map((action, index) => (
      <button
        key={index}
        onClick={action.onClick}
        className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
        aria-label={action.label}
      >
        {action.icon}
      </button>
    ))}
  </div>
))
CardActions.displayName = "CardActions"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardImage,
  CardActions,
  cardVariants
}