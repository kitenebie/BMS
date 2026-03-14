import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a0f] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-[#0a0a0f] hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:from-[#00ff88] hover:to-[#00e676] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:from-red-400 hover:to-red-500 active:scale-[0.98]",
        outline:
          "border border-slate-300/70 bg-transparent text-slate-700 hover:bg-slate-100/70 hover:border-slate-300/80 hover:text-slate-900 dark:border-white/[0.14] dark:text-slate-100 dark:hover:bg-white/[0.06] dark:hover:border-white/[0.22] dark:hover:text-white",
        secondary:
          "bg-slate-100/80 text-slate-900 border border-slate-300/70 hover:bg-slate-200/80 dark:bg-white/[0.06] dark:text-slate-100 dark:border-white/[0.10] dark:hover:bg-white/[0.10]",
        ghost:
          "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white",
        tab:
          "font-medium rounded-lg border border-slate-300/70 bg-transparent text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-gradient-to-r hover:from-[#F0F0F0]/90 hover:to-[#00ff88]/10 hover:shadow-[0_0_0_1px_rgba(0,255,136,0.12)] active:scale-[0.99] dark:border-white/[0.14] dark:bg-transparent dark:text-slate-100 dark:hover:text-white dark:hover:border-white/[0.22] dark:hover:bg-gradient-to-r dark:hover:from-white/[0.06] dark:hover:to-[#00ff88]/8 dark:hover:shadow-[0_0_0_1px_rgba(0,255,136,0.16)]",
        link: "text-emerald-600 dark:text-[#00ff88] underline-offset-4 hover:underline hover:text-emerald-700 dark:hover:text-[#00e676]",
        gradient: "bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7] text-white hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] bg-[length:200%_auto] animate-gradient",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
