import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/src/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { hideCloseButton?: boolean }
>(({ className, children, hideCloseButton, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 sm:p-6">
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 grid w-full max-w-lg gap-4 rounded-2xl border border-slate-300/70 dark:border-white/[0.08] bg-[#F0F0F0]/90 dark:bg-gradient-to-br dark:from-[#1a1a24]/95 dark:to-[#12121a]/95 backdrop-blur-xl p-6 shadow-[0_24px_64px_rgba(15,23,42,0.14)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]",
          // Entry animations
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          // Duration and easing
          "duration-200",
          className
        )}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-xl p-2 text-slate-600 dark:text-slate-400 opacity-70 ring-offset-white dark:ring-offset-[#0a0a0f] transition-all hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100/70 dark:data-[state=open]:bg-white/[0.06] data-[state=open]:text-slate-600 dark:data-[state=open]:text-slate-400">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </div>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

// Large modal variant with enhanced scale animation
const DialogContentLarge = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { hideCloseButton?: boolean }
>(({ className, children, hideCloseButton, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 sm:p-6">
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 grid w-full max-w-4xl gap-4 rounded-2xl border border-slate-300/70 dark:border-white/[0.08] bg-[#F0F0F0]/90 dark:bg-gradient-to-br dark:from-[#1a1a24]/95 dark:to-[#12121a]/95 backdrop-blur-xl p-6 shadow-[0_24px_64px_rgba(15,23,42,0.14)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]",
          // Enhanced entry animations for larger modal
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[45%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[45%]",
          "duration-300 ease-out",
          className
        )}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-xl p-2 text-slate-600 dark:text-slate-400 opacity-70 ring-offset-white dark:ring-offset-[#0a0a0f] transition-all hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </div>
  </DialogPortal>
))
DialogContentLarge.displayName = "DialogContentLarge"

// Slide-in modal from the side
const DialogContentSlide = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { hideCloseButton?: boolean; side?: "left" | "right" }
>(({ className, children, hideCloseButton, side = "right", ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 sm:p-6">
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 grid w-full max-w-lg gap-4 rounded-2xl border border-slate-300/70 dark:border-white/[0.08] bg-[#F0F0F0]/90 dark:bg-gradient-to-br dark:from-[#1a1a24]/95 dark:to-[#12121a]/95 backdrop-blur-xl p-6 shadow-[0_24px_64px_rgba(15,23,42,0.14)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]",
          side === "right" 
            ? "data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full"
            : "data-[state=closed]:slide-out-to-left-full data-[state=open]:slide-in-from-left-full",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "duration-300 ease-out",
          className
        )}
        style={{ 
          [side === "right" ? "transformOrigin" : "transformOrigin"]: side === "right" ? "right center" : "left center"
        }}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-xl p-2 text-slate-600 dark:text-slate-400 opacity-70 ring-offset-white dark:ring-offset-[#0a0a0f] transition-all hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </div>
  </DialogPortal>
))
DialogContentSlide.displayName = "DialogContentSlide"

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 mt-6",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-600 dark:text-slate-400", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

const DialogStickyHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sticky top-0 z-20 bg-[#F0F0F0]/75 dark:bg-[#12121a]/65 border-b border-slate-300/70 dark:border-white/[0.06] shadow-sm backdrop-blur-xl",
      className
    )}
    {...props}
  />
)
DialogStickyHeader.displayName = "DialogStickyHeader"

const DialogStickyFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sticky bottom-0 z-20 bg-[#F0F0F0]/75 dark:bg-[#12121a]/65 border-t border-slate-300/70 dark:border-white/[0.06] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl",
      className
    )}
    {...props}
  />
)
DialogStickyFooter.displayName = "DialogStickyFooter"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogContentLarge,
  DialogContentSlide,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogStickyHeader,
  DialogStickyFooter,
}
