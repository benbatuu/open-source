import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { User, Crown, Star, Zap, Heart, Shield } from "lucide-react"

import { cn } from "../../lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
        "3xl": "h-24 w-24",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
        hexagon: "rounded-none",
      },
      status: {
        online: "ring-2 ring-green-500 ring-offset-2 ring-offset-background",
        offline: "ring-2 ring-gray-300 ring-offset-2 ring-offset-background",
        busy: "ring-2 ring-red-500 ring-offset-2 ring-offset-background",
        away: "ring-2 ring-yellow-500 ring-offset-2 ring-offset-background",
      },
      interactive: {
        true: "cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-primary/30",
        false: "",
      },
      bordered: {
        true: "ring-2 ring-border ring-offset-2 ring-offset-background",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      interactive: false,
      bordered: false,
    },
  }
)

const avatarImageVariants = cva(
  "aspect-square h-full w-full object-cover transition-transform duration-300 group-hover:scale-110",
  {
    variants: {
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
        hexagon: "rounded-none",
      },
    },
    defaultVariants: {
      shape: "circle",
    },
  }
)

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center font-semibold text-white transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
        "2xl": "text-xl",
        "3xl": "text-2xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
        hexagon: "rounded-none",
      },
      variant: {
        default: "bg-gradient-to-br from-primary to-accent",
        success: "bg-gradient-to-br from-green-500 to-green-600",
        warning: "bg-gradient-to-br from-yellow-500 to-orange-500",
        destructive: "bg-gradient-to-br from-red-500 to-red-600",
        info: "bg-gradient-to-br from-blue-500 to-blue-600",
        premium: "bg-gradient-to-br from-purple-500 to-pink-500",
        featured: "bg-gradient-to-br from-amber-400 to-orange-500",
        admin: "bg-gradient-to-br from-gray-700 to-gray-900",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      variant: "default",
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  interactive?: boolean
  bordered?: boolean
  onClick?: () => void
}

export interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
    VariantProps<typeof avatarImageVariants> {}

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
    VariantProps<typeof avatarFallbackVariants> {
  showIcon?: boolean
  icon?: React.ReactNode
}

// Additional Avatar Components
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  size?: AvatarProps['size']
  shape?: AvatarProps['shape']
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, shape, status, interactive, bordered, onClick, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, shape, status, interactive, bordered }), className)}
    onClick={onClick}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
      }
    } : undefined}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, shape, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(avatarImageVariants({ shape }), className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, size, shape, variant, showIcon, icon, children, ...props }, ref) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case "premium":
        return <Crown className="h-3 w-3" />
      case "featured":
        return <Star className="h-3 w-3" />
      case "admin":
        return <Shield className="h-3 w-3" />
      default:
        return <User className="h-3 w-3" />
    }
  }

  const defaultIcon = getDefaultIcon()
  const displayIcon = icon || defaultIcon

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(avatarFallbackVariants({ size, shape, variant }), className)}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
      
      <div className="relative z-10 flex items-center justify-center">
        {showIcon && displayIcon && (
          <span className="mr-1">
            {displayIcon}
          </span>
        )}
        {children}
      </div>
    </AvatarPrimitive.Fallback>
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Avatar Group Component
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 3, size = "md", shape = "circle", children, ...props }, ref) => {
    const avatars = React.Children.toArray(children)
    const visibleAvatars = avatars.slice(0, max)
    const remainingCount = avatars.length - max

    return (
      <div
        ref={ref}
        className={cn("flex items-center -space-x-2", className)}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <div key={index} className="relative">
            {React.isValidElement(avatar) &&
              React.cloneElement(avatar, {
                size,
                shape,
                bordered: true,
              } as any)}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className={cn(
            avatarVariants({ size, shape, bordered: true }),
            "flex items-center justify-center bg-muted text-muted-foreground font-semibold"
          )}>
            +{remainingCount}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

// Avatar with Badge Component
export interface AvatarWithBadgeProps extends AvatarProps {
  badgeVariant?: 'default' | 'success' | 'warning' | 'destructive' | 'info'
  badgeContent?: React.ReactNode
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const AvatarWithBadge = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarWithBadgeProps
>(({ className, badgeVariant = 'default', badgeContent, badgePosition = 'top-right', ...props }, ref) => {
  const getBadgePosition = () => {
    switch (badgePosition) {
      case 'top-right':
        return 'top-0 right-0'
      case 'top-left':
        return 'top-0 left-0'
      case 'bottom-right':
        return 'bottom-0 right-0'
      case 'bottom-left':
        return 'bottom-0 left-0'
      default:
        return 'top-0 right-0'
    }
  }

  return (
    <div className="relative inline-block">
      <Avatar ref={ref} className={className} {...props} />
      {badgeContent && (
        <div className={cn(
          "absolute w-3 h-3 rounded-full ring-2 ring-background",
          badgeVariant === 'default' && 'bg-primary',
          badgeVariant === 'success' && 'bg-green-500',
          badgeVariant === 'warning' && 'bg-yellow-500',
          badgeVariant === 'destructive' && 'bg-red-500',
          badgeVariant === 'info' && 'bg-blue-500',
          getBadgePosition()
        )}>
          {typeof badgeContent === 'string' ? (
            <span className="sr-only">{badgeContent}</span>
          ) : (
            badgeContent
          )}
        </div>
      )}
    </div>
  )
})
AvatarWithBadge.displayName = "AvatarWithBadge"

export { 
  Avatar, 
  AvatarImage, 
  AvatarFallback, 
  AvatarGroup,
  AvatarWithBadge,
  avatarVariants 
}
