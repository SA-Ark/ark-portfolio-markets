import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

const variants = {
  default: "bg-[linear-gradient(135deg,#15803d,#22c55e)] text-black shadow-lg shadow-green-500/15 hover:shadow-green-400/30",
  secondary: "border border-green-500/20 bg-green-500/[0.06] text-zinc-100 hover:bg-green-500/[0.1]",
  outline: "border border-green-500/30 bg-transparent text-green-200 hover:border-green-400/70 hover:bg-green-500/10",
  ghost: "text-zinc-200 hover:bg-white/10",
  destructive: "bg-red-500 text-black hover:bg-red-400",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 py-2 text-base",
  lg: "h-12 px-5 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-mono font-semibold uppercase tracking-[0.08em] transition-all duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Button.displayName = "Button";
