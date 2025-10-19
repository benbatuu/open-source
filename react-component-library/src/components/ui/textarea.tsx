import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff, X, Check, AlertCircle, Info, MessageSquare, FileText, PenTool } from "lucide-react"

import { cn } from "../../lib/utils"

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-xl border bg-background/80 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 relative overflow-hidden group resize-y",
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
        xs: "min-h-[60px] px-2 py-1 text-xs rounded-md",
        sm: "min-h-[70px] px-3 py-2 text-sm rounded-lg",
        md: "min-h-[80px] px-3 py-2 text-sm rounded-xl",
        lg: "min-h-[100px] px-4 py-3 text-base rounded-2xl",
        xl: "min-h-[120px] px-5 py-4 text-lg rounded-2xl",
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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  helperText?: string
  error?: string
  warning?: string
  info?: string
  success?: string
  autoIcon?: boolean
  iconType?: 'message' | 'text' | 'comment' | 'note' | 'custom'
  floatingLabel?: boolean
  required?: boolean
  maxLength?: number
  showCharacterCount?: boolean
  loading?: boolean
  clearable?: boolean
  onClear?: () => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    animated,
    glowing,
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
    clearable = false,
    onClear,
    onFocus,
    onBlur,
    value,
    onChange,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || "")
    const [isFocused, setIsFocused] = React.useState(false)
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }

    const handleClear = () => {
      setInternalValue("")
      onClear?.()
    }

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    // Auto-determine variant based on error/warning/info/success
    let textareaVariant = variant
    if (error) textareaVariant = "error"
    else if (success) textareaVariant = "success"
    else if (warning) textareaVariant = "warning"
    else if (info) textareaVariant = "info"

    // Auto-determine icon based on type and autoIcon
    const getAutoIcon = () => {
      if (!autoIcon) return null
      
      switch (iconType) {
        case 'message':
          return <MessageSquare className="h-4 w-4" />
        case 'text':
          return <FileText className="h-4 w-4" />
        case 'comment':
          return <MessageSquare className="h-4 w-4" />
        case 'note':
          return <PenTool className="h-4 w-4" />
        default:
          return null
      }
    }

    const autoIconElement = getAutoIcon()

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
          
          {/* Top Left Icon */}
          {autoIconElement && (
            <div className="absolute top-3 left-3 text-foreground/70 group-hover:text-foreground transition-colors z-10">
              {autoIconElement}
            </div>
          )}
          
          <textarea
            className={cn(
              textareaVariants({ variant: textareaVariant, size, fullWidth, animated, glowing }),
              autoIconElement && "pt-10 pl-10",
              floatingLabel && "pt-6 pb-2",
              floatingLabel && !internalValue && !isFocused && "placeholder-transparent",
              clearable && "pr-10",
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
              autoIconElement ? "left-10" : "left-3",
              "top-3",
              isFocused || internalValue
                ? "top-1 text-xs text-primary font-medium bg-background px-1 rounded-sm shadow-sm"
                : "top-3 text-sm text-muted-foreground"
            )}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          {/* Clear button */}
          {clearable && internalValue && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-3 right-3 text-foreground/70 hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/50 z-10"
              aria-label="Clear textarea"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {/* Loading spinner */}
          {loading && (
            <div className="absolute top-3 right-3 animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent z-10" />
          )}
          
          {/* Status Icon */}
          {statusIcon && !loading && !clearable && (
            <div className="absolute top-3 right-3 z-10">
              {statusIcon}
            </div>
          )}
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
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
