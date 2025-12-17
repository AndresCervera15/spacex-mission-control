/* Domain Models - internal types for the UI
 */
export type LaunchStatus = "success" | "failure" | "upcoming";

export interface LaunchMedia {
  patchUrl: string | null;
  videoUrl: string | null;
  articleUrl: string | null;
  wikipediaUrl: string | null;
  youtubeId: string | null;
}

export interface LaunchLocation {
  launchpadId: string;
  launchpadName?: string;
}

export interface Launch {
  id: string;
  name: string;
  flightNumber: number;
  date: Date;
  dateUtc: string;
  status: LaunchStatus;
  details: string | null;
  media: LaunchMedia;
  location: LaunchLocation;
  rocketId: string;
  rocketName?: string;
  upcoming: boolean;
  failures: Array<{
    time: number;
    reason: string;
  }>;
}

/**
 * Utility types for components
 */
export type LaunchCardData = Pick<
  Launch,
  "id" | "name" | "date" | "status" | "media" | "flightNumber"
>;

export interface LaunchStats {
  total: number;
  successful: number;
  failed: number;
  upcoming: number;
  successRate: number;
}

export type FilterOption = "all" | "success" | "failure" | "upcoming";

export type SortOption = "newest" | "oldest" | "flight-number";
