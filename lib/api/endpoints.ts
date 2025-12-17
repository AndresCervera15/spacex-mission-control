/**
 * SpaceX API Endpoints
 * Using the official SpaceX API v4
 * Documentation: https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4
 */

const BASE_URL = "https://api.spacexdata.com/v4";

export const SPACEX_API = {
  // Launch endpoints
  launches: `${BASE_URL}/launches`,
  launchesUpcoming: `${BASE_URL}/launches/upcoming`,
  launchesPast: `${BASE_URL}/launches/past`,
  launchById: (id: string) => `${BASE_URL}/launches/${id}`,

  // Rocket endpoints
  rockets: `${BASE_URL}/rockets`,
  rocketById: (id: string) => `${BASE_URL}/rockets/${id}`,

  // Launchpad endpoints
  launchpads: `${BASE_URL}/launchpads`,
  launchpadById: (id: string) => `${BASE_URL}/launchpads/${id}`,
} as const;

export const API_CONFIG = {
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
} as const;
