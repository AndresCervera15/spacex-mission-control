import React from "react";
import { cn } from "@/lib/utils/cn";
import type { LaunchStatus } from "@/types/launch";
import { getStatusColor, getStatusIcon, getStatusLabel } from "@/lib/utils/status";
import { FC } from "react";

interface BadgeProps {
  status: LaunchStatus;
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
}

export const Badge: FC<BadgeProps> = ({
  status,
  showIcon = true,
  showLabel = true,
  className,
}) => {
  const colorClasses = getStatusColor(status);
  const icon = getStatusIcon(status);
  const label = getStatusLabel(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        colorClasses,
        className
      )}
    >
      {showIcon && <span aria-hidden="true">{icon}</span>}
      {showLabel && <span>{label}</span>}
    </span>
  );
};
