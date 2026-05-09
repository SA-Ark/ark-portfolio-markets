import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "danger" | "warning" | "outline" | "blue";
}

const variants = {
  default: "border-green-500/20 bg-green-500/8 text-zinc-100",
  success: "border-green-500/35 bg-green-500/12 text-[#22c55e]",
  danger: "border-red-500/35 bg-red-500/12 text-[#ef4444]",
  warning: "border-yellow-500/35 bg-yellow-500/12 text-[#eab308]",
  outline: "border-green-500/20 bg-black/40 text-zinc-200",
  blue: "border-yellow-500/30 bg-yellow-500/10 text-[#eab308] shadow-sm shadow-yellow-500/10",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
