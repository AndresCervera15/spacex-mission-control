/* SpaceX API Response Types v4 https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches/v4/all.md
    Using Paste JSON as Code extension in VSCode
 */
export interface SpaceXLaunchResponse {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  tbd: boolean;
  net: boolean;
  window: number | null;
  rocket: string;
  success: boolean | null;
  failures: Array<{
    time: number;
    altitude: number | null;
    reason: string;
  }>;
  upcoming: boolean;
  details: string | null;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  auto_update: boolean;
  flight_number: number;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  cores: Array<{
    core: string | null;
    flight: number | null;
    gridfins: boolean | null;
    legs: boolean | null;
    reused: boolean | null;
    landing_attempt: boolean | null;
    landing_success: boolean | null;
    landing_type: string | null;
    landpad: string | null;
  }>;
}

export interface SpaceXRocketResponse {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: {
    meters: number;
    feet: number;
  };
  diameter: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  description: string;
  wikipedia: string;
  flickr_images: string[];
}

export interface SpaceXLaunchpadResponse {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  timezone: string;
  launches: string[];
  status: string;
  details: string;
}
