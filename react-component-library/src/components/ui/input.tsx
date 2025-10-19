import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff, Search, X, Check, AlertCircle, Info, Lock, Mail, User, Phone, Calendar, CreditCard } from "lucide-react"

import { cn } from "../../lib/utils"

const inputVariants = cva(
  "flex w-full rounded-xl border bg-background/80 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "border-border/50 hover:border-primary/50 focus:border-primary shadow-sm hover:shadow-md focus:shadow-lg",
        error: "border-red-500/70 hover:border-red-600 focus:border-red-600 focus-visible:ring-red-500 shadow-red-500/20 hover:shadow-red-500/30 focus:shadow-red-500/40",
        success: "border-green-500/70 hover:border-green-600 focus:border-green-600 focus-visible:ring-green-500 shadow-green-500/20 hover:shadow-green-500/30 focus:shadow-green-500/40",
        warning: "border-yellow-500/70 hover:border-yellow-600 focus:border-yellow-600 focus-visible:ring-yellow-500 shadow-yellow-500/20 hover:shadow-yellow-500/30 focus:shadow-yellow-500/40",
        info: "border-blue-500/70 hover:border-blue-600 focus:border-blue-600 focus-visible:ring-blue-500 shadow-blue-500/20 hover:shadow-blue-500/30 focus:shadow-blue-500/40",
        premium: "border-purple-500/70 hover:border-purple-600 focus:border-purple-600 focus-visible:ring-purple-500 shadow-purple-500/20 hover:shadow-purple-500/30 focus:shadow-purple-500/40 bg-gradient-to-r from-purple-500/5 to-pink-500/5",
        featured: "border-gradient-to-r from-primary to-accent hover:border-primary focus:border-accent focus-visible:ring-primary shadow-primary/20 hover:shadow-primary/30 focus:shadow-primary/40 bg-gradient-to-r from-primary/5 to-accent/5",
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
      animated: {
        true: "animate-pulse",
        false: "",
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
      animated: false,
      glowing: false,
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  clearable?: boolean
  onClear?: () => void
  showPasswordToggle?: boolean
  label?: string
  helperText?: string
  error?: string
  warning?: string
  info?: string
  success?: string
  autoIcon?: boolean
  iconType?: 'search' | 'email' | 'password' | 'user' | 'phone' | 'calendar' | 'credit-card' | 'custom'
  floatingLabel?: boolean
  required?: boolean
  maxLength?: number
  showCharacterCount?: boolean
  loading?: boolean
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    variant, 
    size, 
    icon, 
    iconPosition = 'left',
    clearable = false,
    onClear,
    showPasswordToggle = false,
    label,
    helperText,
    error,
    warning,
    info,
    success,
    autoIcon = false,
    iconType = 'custom',
    floatingLabel = false,
    required = false,
    maxLength,
    showCharacterCount = false,
    loading = false,
    leftAddon,
    rightAddon,
    fullWidth,
    animated,
    glowing,
    onFocus,
    onBlur,
    value,
    onChange,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(value || "")
    const [isFocused, setIsFocused] = React.useState(false)
    
    const inputType = showPasswordToggle && type === "password" 
      ? (showPassword ? "text" : "password") 
      : type

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }

    const handleClear = () => {
      setInternalValue("")
      onClear?.()
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    // Auto-determine variant based on error/warning/info/success
    let inputVariant = variant
    if (error) inputVariant = "error"
    else if (success) inputVariant = "success"
    else if (warning) inputVariant = "warning"
    else if (info) inputVariant = "info"

    // Auto-determine icon based on type and autoIcon
    const getAutoIcon = () => {
      if (!autoIcon) return null
      
      switch (iconType) {
        case 'search':
          return <Search className="h-4 w-4" />
        case 'email':
          return <Mail className="h-4 w-4" />
        case 'password':
          return <Lock className="h-4 w-4" />
        case 'user':
          return <User className="h-4 w-4" />
        case 'phone':
          return <Phone className="h-4 w-4" />
        case 'calendar':
          return <Calendar className="h-4 w-4" />
        case 'credit-card':
          return <CreditCard className="h-4 w-4" />
        default:
          return null
      }
    }

    const autoIconElement = getAutoIcon()
    const displayIcon = icon || autoIconElement

    // Status icon
    const getStatusIcon = () => {
      if (error) return <AlertCircle className="h-4 w-4 text-red-500" />
      if (success) return <Check className="h-4 w-4 text-green-500" />
      if (warning) return <AlertCircle className="h-4 w-4 text-yellow-500" />
      if (info) return <Info className="h-4 w-4 text-blue-500" />
      return null
    }

    const statusIcon = getStatusIcon()
    const statusMessage = error || success || warning || info

    return (
      <div className={cn("w-full", !fullWidth && "w-auto")}>
        {label && !floatingLabel && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative group">
          {/* Shimmer effect */}
          {(isFocused || glowing) && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-30 rounded-xl" />
          )}
          
          {/* Left Addon */}
          {leftAddon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground font-medium">
              {leftAddon}
            </div>
          )}
          
          {/* Left Icon */}
          {displayIcon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/70 group-hover:text-foreground transition-colors">
              {displayIcon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              inputVariants({ variant: inputVariant, size, fullWidth, animated, glowing }),
              displayIcon && iconPosition === 'left' && !leftAddon && "pl-10",
              leftAddon && "pl-10",
              ((displayIcon && iconPosition === 'right') || clearable || showPasswordToggle || statusIcon || rightAddon) && !leftAddon && "pr-10",
              rightAddon && "pr-10",
              floatingLabel && "pt-6 pb-2",
              floatingLabel && !internalValue && !isFocused && "placeholder-transparent",
              className
            )}
            ref={ref}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={maxLength}
            placeholder={floatingLabel && (!internalValue && !isFocused) ? "" : props.placeholder}
            {...props}
          />
          
          {/* Floating Label */}
          {floatingLabel && (
            <label className={cn(
              "absolute transition-all duration-200 pointer-events-none z-10",
              displayIcon && iconPosition === 'left' && "left-10",
              leftAddon && "left-10",
              !displayIcon && !leftAddon && "left-3",
              isFocused || internalValue
                ? "top-1 text-xs text-primary font-medium bg-background px-1 rounded-sm shadow-sm"
                : "top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground"
            )}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          {/* Right side elements */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {/* Loading spinner */}
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
            )}
            
            {/* Status Icon */}
            {statusIcon && !loading && (
              <div className="flex-shrink-0">
                {statusIcon}
              </div>
            )}
            
            {/* Clear button */}
            {clearable && internalValue && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="text-foreground/70 hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/50"
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {/* Password toggle */}
            {showPasswordToggle && type === "password" && !loading && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-foreground/70 hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/50"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
            
            {/* Right Icon */}
            {displayIcon && iconPosition === 'right' && !clearable && !showPasswordToggle && !statusIcon && !loading && (
              <div className="text-foreground/70 group-hover:text-foreground transition-colors">
                {displayIcon}
              </div>
            )}
            
            {/* Right Addon */}
            {rightAddon && (
              <div className="text-foreground font-medium">
                {rightAddon}
              </div>
            )}
          </div>
        </div>
        
        {/* Helper text, status message, and character count */}
        <div className="flex justify-between items-start mt-1">
          <div className="flex-1">
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
          
          {/* Character count */}
          {showCharacterCount && maxLength && (
            <span className={cn(
              "text-xs ml-2",
              internalValue.length > maxLength * 0.9 ? "text-yellow-500" : "text-muted-foreground"
            )}>
              {internalValue.length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
