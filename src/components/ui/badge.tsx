import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/src/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700",
        secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800",
        outline: "text-slate-950 dark:text-slate-100 dark:border-slate-800",
        success: "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400",
        warning: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400",
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
