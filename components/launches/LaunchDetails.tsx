"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatLaunchDateTime, getRelativeTime } from "@/lib/utils/date";
import type { Launch } from "@/types/launch";
import Image from "next/image";
import { motion } from "framer-motion";

interface LaunchDetailProps {
  launch: Launch;
}

export function LaunchDetail({ launch }: LaunchDetailProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="text-center">
        {launch.media.patchUrl ? (
          <Image
            src={launch.media.patchUrl}
            alt={`${launch.name} mission patch`}
            width={200}
            height={200}
            className="mx-auto rounded-lg"
          />
        ) : (
          <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-lg bg-space-700 text-6xl">
            🚀
          </div>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-nebula-100">{launch.name}</h1>
        <div className="flex items-center justify-center gap-2">
          <Badge status={launch.status} />
          <span className="text-sm text-nebula-300">Flight #{launch.flightNumber}</span>
        </div>
        <p className="text-nebula-300">{formatLaunchDateTime(launch.dateUtc)}</p>
        <p className="text-sm text-nebula-500">{getRelativeTime(launch.dateUtc)}</p>
      </motion.div>

      <hr className="border-space-700" />

      {launch.details && (
        <motion.div variants={itemVariants} className="space-y-2">
          <h2 className="text-xl font-semibold text-nebula-100">Mission Details</h2>
          <p className="text-nebula-300 leading-relaxed">{launch.details}</p>
        </motion.div>
      )}

      {launch.failures.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-2">
          <h2 className="text-xl font-semibold text-failure-500">Launch Failures</h2>
          <div className="space-y-2">
            {launch.failures.map((failure, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-failure-500/30 bg-failure-500/10 p-3"
              >
                <p className="text-sm text-nebula-300">{failure.reason}</p>
                <p className="text-xs text-nebula-500 mt-1">Time: T+{failure.time}s</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <hr className="border-space-700" />

      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-xl font-semibold text-nebula-100">Media & Resources</h2>
        <div className="flex flex-wrap gap-3">
          {launch.media.videoUrl && (
            <Button
              variant="primary"
              onClick={() => window.open(launch.media.videoUrl!, "_blank")}
            >
              ▶ Watch Webcast
            </Button>
          )}
          {launch.media.articleUrl && (
            <Button
              variant="secondary"
              onClick={() => window.open(launch.media.articleUrl!, "_blank")}
            >
              📰 Read Article
            </Button>
          )}
          {launch.media.wikipediaUrl && (
            <Button
              variant="secondary"
              onClick={() => window.open(launch.media.wikipediaUrl!, "_blank")}
            >
              📖 Wikipedia
            </Button>
          )}
        </div>
        {!launch.media.videoUrl &&
          !launch.media.articleUrl &&
          !launch.media.wikipediaUrl && (
            <p className="text-nebula-500 text-sm">
              No media resources available for this launch.
            </p>
          )}
      </motion.div>
    </motion.div>
  );
}
