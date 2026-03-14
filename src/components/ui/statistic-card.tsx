import * as React from "react"
import { cn } from "@/src/lib/utils"
import { motion, HTMLMotionProps } from "motion/react"

interface MotionDivProps extends HTMLMotionProps<"div"> {
  className?: string
  children?: React.ReactNode
}

const StatisticCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col items-center gap-3 rounded-2xl border border-slate-300/70 dark:border-white/[0.06] bg-white/80 dark:bg-gradient-to-br dark:from-[#1a1a24]/80 dark:to-[#12121a]/60 backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-slate-300/80 dark:hover:border-white/[0.1] hover:shadow-[0_14px_36px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] group",
        className
      )}
      {...props}
    />
  )
)
StatisticCard.displayName = "StatisticCard"

const StatisticCardLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-widest",
      className
    )}
    {...props}
  />
))
StatisticCardLabel.displayName = "StatisticCardLabel"

const StatisticCardValue = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
))
StatisticCardValue.displayName = "StatisticCardValue"

const StatisticCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-slate-600 dark:text-slate-400",
      className
    )}
    {...props}
  />
))
StatisticCardDescription.displayName = "StatisticCardDescription"

const StatisticCardIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ff88]/15 to-[#00d4ff]/10 dark:from-[#00ff88]/20 dark:to-[#00d4ff]/10 border border-[#00ff88]/25 dark:border-[#00ff88]/20 group-hover:border-[#00ff88]/45 dark:group-hover:border-[#00ff88]/40 transition-all duration-300",
      className
    )}
    {...props}
  />
))
StatisticCardIcon.displayName = "StatisticCardIcon"

export {
  StatisticCard,
  StatisticCardLabel,
  StatisticCardValue,
  StatisticCardDescription,
  StatisticCardIcon,
}
