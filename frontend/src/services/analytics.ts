import { api } from "./api";
import type { AnalyticsEventPayload } from "@/types/api";

export async function trackEvent(payload: AnalyticsEventPayload): Promise<void> {
  try {
    await api.post("/analytics/events/", payload);
  } catch {
    /* analytics is fire-and-forget */
  }
}
