import axios, { AxiosError, type AxiosInstance } from "axios";
import { siteConfig } from "@/config/site";
import type { ApiError } from "@/types/api";

export const api: AxiosInstance = axios.create({
  baseURL: siteConfig.apiUrl,
  timeout: 15_000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ detail?: string; [k: string]: unknown }>) => {
    const status = error.response?.status;
    const data = error.response?.data;

    const fieldErrors: Record<string, string[]> = {};
    if (data && typeof data === "object") {
      for (const [key, value] of Object.entries(data)) {
        if (key === "detail") continue;
        if (Array.isArray(value)) fieldErrors[key] = value.map(String);
        else if (typeof value === "string") fieldErrors[key] = [value];
      }
    }

    const apiError: ApiError = {
      status,
      message:
        (data?.detail as string | undefined) ??
        error.message ??
        "Something went wrong. Please try again.",
      fieldErrors: Object.keys(fieldErrors).length ? fieldErrors : undefined,
    };
    return Promise.reject(apiError);
  },
);
