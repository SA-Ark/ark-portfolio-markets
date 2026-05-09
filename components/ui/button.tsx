import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

const variants = {
  default: "bg-[linear-gradient(135deg,#7c3aed,#00d4ff)] text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40",
  secondary: "border border-white/10 bg-white/[0.06] text-zinc-100 hover:bg-white/[0.1]",
  outline: "border border-cyan-400/25 bg-transparent text-cyan-100 hover:border-cyan-300/60 hover:bg-cyan-400/10",
  ghost: "text-zinc-200 hover:bg-white/10",
  destructive: "bg-red-500 text-white hover:bg-red-400",
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
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50",
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
