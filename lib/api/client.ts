import { API_CONFIG } from "./endpoints";

export interface APIError extends Error {
  readonly name: "APIError";
  readonly status?: number;
  readonly statusText?: string;
}

export function createAPIError(
  message: string,
  status?: number,
  statusText?: string
): APIError {
  const error = new Error(message) as APIError;
  (error as { name: string }).name = "APIError";
  (error as { status?: number }).status = status;
  (error as { statusText?: string }).statusText = statusText;
  return error;
}

interface FetchConfig extends RequestInit {
  timeout?: number;
  retry?: number;
  retryDelay?: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithConfig<T>(
  url: string,
  config: FetchConfig = {}
): Promise<T> {
  const {
    timeout = API_CONFIG.timeout,
    retry = API_CONFIG.retries,
    retryDelay = API_CONFIG.retryDelay,
    ...fetchOptions
  } = config;

  let lastError: Error | null = null;

  // Retry loop
  for (let attempt = 0; attempt <= retry; attempt++) {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle HTTP errors
      if (!response.ok) {
        throw createAPIError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      // Parse JSON response
      const data = await response.json();
      return data as T;
    } catch (error) {
      lastError = error as Error;

      // Don't retry on certain errors
      if (isAPIError(error) && error.status && error.status < 500) {
        throw error; // Client errors (4xx) shouldn't be retried
      }

      //  wait and retry if this wasn't the last attempt
      if (attempt < retry) {
        await sleep(retryDelay * (attempt + 1)); // Exponential backoff
        continue;
      }

      break;
    }
  }

  // If we get here, all retries failed
  throw createAPIError(
    `Request failed after ${retry + 1} attempts: ${lastError?.message}`,
    undefined,
    undefined
  );
}

export function isAPIError(error: unknown): error is APIError {
  return (
    error instanceof Error && error.name === "APIError" && "status" in error
  );
}
