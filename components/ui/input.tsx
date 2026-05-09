import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-full border border-white/10 bg-[#050510]/70 px-4 py-2 text-base text-[#e8e8ed] placeholder:text-[#8888a0] outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";
