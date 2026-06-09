import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
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
   * Standard API response shape
   */
  export interface ApiError {
    error: string;
    message: string;
    status?: number;
  }
  
  export type ApiResponse<T> = T | ApiError;
  
  /**
   * POST request without auth token
   */
  export async function httpPostWithoutToken<TResponse, TRequest = unknown>(
    url: string,
    data: TRequest,
    config?: AxiosRequestConfig<TRequest>
  ): Promise<ApiResponse<TResponse>> {
    try {
      const response = await apiClient.post<TResponse>(url, data, config);
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
  
      // Network error
      if (error.code === "ERR_NETWORK") {
        return {
          error: "Network error. Please try again.",
          message: "Network error. Please try again.",
        };
      }
  
      const message =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";
  
      return {
        error: message,
        message,
        status: error.response?.status,
      };
    }
  }
  
  export const validateEmail = (e: unknown) => {
    return String(e)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };