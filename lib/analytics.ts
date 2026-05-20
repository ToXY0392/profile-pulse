import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | "sign_in_success"
  | "booking_success"
  | "trust_success";

export function trackEvent(
  name: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>,
): void {
  if (process.env.NODE_ENV !== "production") return;
  track(name, properties);
}
