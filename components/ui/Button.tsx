import React from "react";
import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rocket-500 focus-visible:ring-offset-2 focus-visible:ring-offset-space-900 disabled:pointer-events-none disabled:opacity-50",

          // Variants
          {
            "bg-rocket-500 text-space-900 hover:bg-rocket-600 active:scale-95":
              variant === "primary",
            "bg-space-700 text-nebula-100 hover:bg-space-600 active:scale-95":
              variant === "secondary",
            "text-nebula-300 hover:bg-space-700 hover:text-nebula-100":
              variant === "ghost",
          },

          // Sizes
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },

          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
