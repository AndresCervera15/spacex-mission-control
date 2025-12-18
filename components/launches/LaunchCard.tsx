"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatLaunchDate } from "@/lib/utils/date";
import type { Launch } from "@/types/launch";
import Image from "next/image";
import { FC } from "react";

interface LaunchCardProps {
  launch: Launch;
  onClick: (id: string) => void;
  selected?: boolean;
}

export const LaunchCard: FC<LaunchCardProps> = ({ launch, onClick, selected }) => {
  return (
    <Card
      hover
      onClick={() => onClick(launch.id)}
      className={selected ? "border-rocket-500" : ""}
    >
      <div className="flex gap-4">
        <div className="shrink-0">
          {launch.media.patchUrl ? (
            <Image
              src={launch.media.patchUrl}
              alt={`${launch.name} mission patch`}
              width={80}
              height={80}
              className="rounded-lg"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-space-700 text-3xl">
              🚀
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-nebula-100 line-clamp-2">
              {launch.name}
            </h3>
            <Badge status={launch.status} showLabel={false} />
          </div>

          <div className="space-y-1 text-sm text-nebula-300">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{formatLaunchDate(launch.dateUtc)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔢</span>
              <span>Flight #{launch.flightNumber}</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-sm font-medium text-rocket-500 group-hover:text-rocket-400 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
