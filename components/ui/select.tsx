import * as React from "react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      className={cn(
        "flex h-11 w-full rounded-full border border-white/10 bg-[#050510]/70 px-4 py-2 text-base text-[#e8e8ed] outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-400/20",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";
