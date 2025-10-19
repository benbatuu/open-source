import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"

import { cn } from "../../lib/utils"

const Modal = DialogPrimitive.Root

const ModalTrigger = DialogPrimitive.Trigger

const ModalPortal = DialogPrimitive.Portal

const ModalClose = DialogPrimitive.Close

const modalOverlayVariants = cva(
  "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default: "bg-background/80",
        blur: "bg-background/60 backdrop-blur-md",
        dark: "bg-black/80",
        light: "bg-white/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const modalContentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl",
  {
    variants: {
      variant: {
        default: "border-border/50 bg-background/95 backdrop-blur-sm",
        error: "border-red-500/50 bg-background/95 backdrop-blur-sm",
        success: "border-green-500/50 bg-background/95 backdrop-blur-sm",
        warning: "border-yellow-500/50 bg-background/95 backdrop-blur-sm",
        info: "border-blue-500/50 bg-background/95 backdrop-blur-sm",
        premium: "border-purple-500/50 bg-gradient-to-br from-background/95 to-purple-500/5 backdrop-blur-sm",
        featured: "border-primary/50 bg-gradient-to-br from-background/95 to-primary/5 backdrop-blur-sm",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[95vw] max-h-[95vh]",
      },
      rounded: {
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        xl: "rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
    },
  }
)

export interface ModalOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof modalOverlayVariants> {}

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  ModalOverlayProps
>(({ className, variant, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(modalOverlayVariants({ variant }), className)}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ 
  className, 
  variant, 
  size, 
  rounded,
  showCloseButton = true,
  closeOnOverlayClick = true,
  children, 
  ...props 
}, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(modalContentVariants({ variant, size, rounded }), className)}
      onPointerDownOutside={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
      onEscapeKeyDown={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = DialogPrimitive.Content.displayName

export interface ModalHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'error' | 'success' | 'warning' | 'info' | 'premium' | 'featured'
  showIcon?: boolean
  icon?: React.ReactNode
}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, variant = 'default', showIcon = false, icon, children, ...props }, ref) => {
    // Status icon
    const getStatusIcon = () => {
      if (icon) return icon
      if (variant === 'error') return <AlertCircle className="h-5 w-5 text-red-500" />
      if (variant === 'success') return <CheckCircle className="h-5 w-5 text-green-500" />
      if (variant === 'warning') return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      if (variant === 'info') return <Info className="h-5 w-5 text-blue-500" />
      return null
    }

    const statusIcon = getStatusIcon()

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5 text-center sm:text-left",
          showIcon && statusIcon && "flex-row items-center gap-3",
          className
        )}
        {...props}
      >
        {showIcon && statusIcon && (
          <div className="flex-shrink-0">
            {statusIcon}
          </div>
        )}
        <div className="flex-1">
          {children}
        </div>
      </div>
    )
  }
)
ModalHeader.displayName = "ModalHeader"

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
))
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  modalOverlayVariants,
  modalContentVariants,
}

