import axios, {
  AxiosError,
  type AxiosInstance,
} from "axios";

/**
 * Resolve API base URL safely
 */
const resolveBaseURL = (): string => {
  if (typeof window !== "undefined" && window.location.hostname.includes("localhost")) {
    return "http://localhost:9000/api";
  }
  return "https://your-production-api.com/api";
};

/**
 * Centralized Axios instance
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * Normalise an axios error into a readable message.
 */
function toErrorMessage(err: unknown): Error {
  const error = err as AxiosError<{ message?: string }>;

  if (error.code === "ERR_NETWORK") {
    return new Error("Network error. Please try again.");
  }

  const message =
    error.response?.data?.message ?? error.message ?? "Something went wrong";

  return new Error(message);
}

/**
 * POST request without auth token
 * - No config/options param to prevent unknown fields leaking into requests
 * - Throws on error so callers can catch properly
 */
export async function httpPostWithoutToken<TResponse, TRequest = unknown>(
  url: string,
  data: TRequest
): Promise<TResponse> {
  try {
    const response = await apiClient.post<TResponse>(url, data);
    return response.data;
  } catch (err: unknown) {
    throw toErrorMessage(err);
  }
}

/**
 * GET request with the bearer token stored in localStorage.
 */
export async function httpGet<TResponse>(url: string): Promise<TResponse> {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.get<TResponse>(
      url,
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
    return response.data;
  } catch (err: unknown) {
    throw toErrorMessage(err);
  }
}

/**
 * POST request that attaches the bearer token stored in localStorage.
 */
export async function httpPostWithToken<TResponse, TRequest = unknown>(
  url: string,
  data: TRequest
): Promise<TResponse> {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.post<TResponse>(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return response.data;
  } catch (err: unknown) {
    throw toErrorMessage(err);
  }
}

export const validateEmail = (e: unknown) => {
  return String(e)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};