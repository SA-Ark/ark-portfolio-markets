import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "danger" | "warning" | "outline" | "blue";
}

const variants = {
  default: "border-transparent bg-white/10 text-zinc-100",
  success: "border-green-500/30 bg-green-500/10 text-green-300",
  danger: "border-red-500/30 bg-red-500/10 text-red-300",
  warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
  outline: "border-white/15 bg-white/[0.03] text-zinc-200",
  blue: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200 shadow-sm shadow-cyan-400/10",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.12em]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
