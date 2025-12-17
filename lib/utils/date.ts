import { format, formatDistanceToNow, isPast, parseISO } from "date-fns";

// Format a date string from the API to a readable format
export function formatLaunchDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "PPP"); // "December 17, 2025"
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

// Format a date to show time as well
export function formatLaunchDateTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "PPP 'at' p"); //  "December 17, 2025 at 10:25 AM"
  } catch (error) {
    console.error("Error formatting date time:", error);
    return "Invalid date";
  }
}

// Get relative time ("3 days ago", "in 2 months")

export function getRelativeTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    // const isInPast = isPast(date);
    const distance = formatDistanceToNow(date, { addSuffix: true });

    return distance;
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return "Unknown";
  }
}

// Format year only
export function formatYear(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "yyyy");
  } catch (error) {
    console.error("Error formatting year:", error);
    return "Unknown";
  }
}
