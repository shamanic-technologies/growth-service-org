import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderToString } from "react-dom/server";
import {
  UrgencyBanner,
  wasRecentlyDismissed,
} from "./urgency-banner";

vi.mock("posthog-js", () => ({
  default: { capture: vi.fn() },
}));

describe("UrgencyBanner SSR", () => {
  it("renders promo text in initial HTML so non-JS scrapers see it", () => {
    const html = renderToString(<UrgencyBanner onClaim={() => {}} />);
    expect(html).toContain("Limited offer");
    expect(html).toContain("$250");
    expect(html).toContain("$350");
    expect(html).toContain("Claim Offer");
  });

  it("renders non-empty markup at SSR (not null)", () => {
    const html = renderToString(<UrgencyBanner onClaim={() => {}} />);
    expect(html.length).toBeGreaterThan(0);
  });
});

describe("wasRecentlyDismissed", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns false when no dismissal recorded", () => {
    expect(wasRecentlyDismissed()).toBe(false);
  });

  it("returns true if dismissed less than 3 days ago", () => {
    const oneDayAgo = Date.now() - 1 * 24 * 60 * 60 * 1000;
    localStorage.setItem("gs_banner_dismissed_at", String(oneDayAgo));
    expect(wasRecentlyDismissed()).toBe(true);
  });

  it("returns false if dismissed more than 3 days ago", () => {
    const fourDaysAgo = Date.now() - 4 * 24 * 60 * 60 * 1000;
    localStorage.setItem("gs_banner_dismissed_at", String(fourDaysAgo));
    expect(wasRecentlyDismissed()).toBe(false);
  });
});
