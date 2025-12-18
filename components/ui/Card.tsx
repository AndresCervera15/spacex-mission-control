import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-space-700 bg-space-800 p-6 shadow-card",
          hover &&
            "cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-rocket-500/50 hover:shadow-hover",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
