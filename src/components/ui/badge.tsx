import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/src/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f]",
  {
    variants: {
      variant: {
        default: "border border-[#00ff88]/20 bg-gradient-to-r from-[#00ff88]/20 to-[#00cc6a]/10 text-[#00ff88]",
        secondary:
          "border border-slate-300/70 bg-slate-100 text-slate-700 dark:border-white/[0.1] dark:bg-[#2a2a3a]/50 dark:text-slate-300",
        destructive: "border border-red-500/20 bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-400",
        outline: "border border-slate-300/70 text-slate-700 dark:border-white/[0.1] dark:text-slate-300",
        success: "border border-[#00ff88]/20 bg-gradient-to-r from-[#00ff88]/20 to-[#00cc6a]/10 text-[#00ff88]",
        warning: "border border-amber-500/20 bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-400",
        info: "border border-[#00d4ff]/20 bg-gradient-to-r from-[#00d4ff]/20 to-[#00a8cc]/10 text-[#00d4ff]",
        purple: "border border-purple-500/20 bg-gradient-to-r from-purple-500/20 to-purple-600/10 text-purple-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
