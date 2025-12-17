import type { LaunchStatus } from "@/types/launch";

//  Determine the status of a launch based on API data

export function getLaunchStatus(
  success: boolean | null,
  upcoming: boolean
): LaunchStatus {
  if (upcoming) {
    return "upcoming";
  }

  if (success === true) {
    return "success";
  }

  if (success === false) {
    return "failure";
  }

  return "failure";
}

export function getStatusColor(status: LaunchStatus): string {
  switch (status) {
    case "success":
      return "bg-success-500/20 text-success-500 border-success-500/50";
    case "failure":
      return "bg-failure-500/20 text-failure-500 border-failure-500/50";
    case "upcoming":
      return "bg-upcoming-500/20 text-upcoming-500 border-upcoming-500/50";
    default:
      return "bg-nebula-500/20 text-nebula-300 border-nebula-500/50";
  }
}

export function getStatusIcon(status: LaunchStatus): string {
  switch (status) {
    case "success":
      return "✓";
    case "failure":
      return "✕";
    case "upcoming":
      return "◷";
    default:
      return "•";
  }
}

export function getStatusLabel(status: LaunchStatus): string {
  switch (status) {
    case "success":
      return "Success";
    case "failure":
      return "Failed";
    case "upcoming":
      return "Upcoming";
    default:
      return "Unknown";
  }
}

export function calculateSuccessRate(
  successful: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((successful / total) * 100 * 10) / 10; // One decimal place
}
