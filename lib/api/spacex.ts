import { fetchWithConfig } from "./client";
import { SPACEX_API } from "./endpoints";
import type { SpaceXLaunchResponse } from "@/types/spaceX";
import type { Launch, LaunchStats } from "@/types/launch";
import { getLaunchStatus } from "@/lib/utils/status";

function transformLaunch(apiLaunch: SpaceXLaunchResponse): Launch {
  return {
    id: apiLaunch.id,
    name: apiLaunch.name,
    flightNumber: apiLaunch.flight_number,
    date: new Date(apiLaunch.date_utc),
    dateUtc: apiLaunch.date_utc,
    status: getLaunchStatus(apiLaunch.success, apiLaunch.upcoming),
    details: apiLaunch.details,
    media: {
      patchUrl: apiLaunch.links.patch.small || apiLaunch.links.patch.large,
      videoUrl: apiLaunch.links.webcast,
      articleUrl: apiLaunch.links.article,
      wikipediaUrl: apiLaunch.links.wikipedia,
      youtubeId: apiLaunch.links.youtube_id,
    },
    location: {
      launchpadId: apiLaunch.launchpad,
    },
    rocketId: apiLaunch.rocket,
    upcoming: apiLaunch.upcoming,
    failures: apiLaunch.failures.map((f) => ({
      time: f.time,
      reason: f.reason,
    })),
  };
}

export async function fetchLaunches(): Promise<Launch[]> {
  try {
    const response = await fetchWithConfig<SpaceXLaunchResponse[]>(
      SPACEX_API.launches
    );

    return response.map(transformLaunch);
  } catch (error) {
    console.error("Error fetching launches:", error);
    throw error;
  }
}

export async function fetchLaunchById(id: string): Promise<Launch> {
  try {
    const response = await fetchWithConfig<SpaceXLaunchResponse>(
      SPACEX_API.launchById(id)
    );

    return transformLaunch(response);
  } catch (error) {
    console.error(`Error fetching launch ${id}:`, error);
    throw error;
  }
}

export function calculateLaunchStats(launches: Launch[]): LaunchStats {
  const total = launches.length;
  const successful = launches.filter((l) => l.status === "success").length;
  const failed = launches.filter((l) => l.status === "failure").length;
  const upcoming = launches.filter((l) => l.status === "upcoming").length;

  // Calculate success rate only from completed launches (exclude upcoming)
  const completed = total - upcoming;
  const successRate = completed > 0 ? (successful / completed) * 100 : 0;

  return {
    total,
    successful,
    failed,
    upcoming,
    successRate: Math.round(successRate * 10) / 10, // One decimal place
  };
}
