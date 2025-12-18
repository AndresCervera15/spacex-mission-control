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

  console.log(`[API] Fetching: ${url}`); // Debug log

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retry; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`[API] Retry attempt ${attempt} for ${url}`); // Debug log
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log(`[API] Request timeout after ${timeout}ms: ${url}`); // Debug log
        controller.abort();
      }, timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log(`[API] Response status ${response.status} for ${url}`); // Debug log

      if (!response.ok) {
        throw createAPIError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      const data = await response.json();
      console.log(`[API] Successfully fetched data from ${url}`); // Debug log
      return data as T;
    } catch (error) {
      lastError = error as Error;
      console.error(`[API] Error on attempt ${attempt + 1}:`, error); // Debug log

      if (isAPIError(error) && error.status && error.status < 500) {
        throw error;
      }

      if (attempt < retry) {
        await sleep(retryDelay * (attempt + 1)); // Exponential backoff
        continue;
      }

      break;
    }
  }

  console.error(`[API] All retries exhausted for ${url}`); // Debug log
  throw createAPIError(
    `Request failed after ${retry + 1} attempts: ${lastError?.message}`,
    undefined,
    undefined
  );
}

export function isAPIError(error: unknown): error is APIError {
  return error instanceof Error && error.name === "APIError" && "status" in error;
}
