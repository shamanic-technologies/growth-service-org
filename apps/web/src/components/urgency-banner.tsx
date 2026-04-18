"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY_FIRST_SEEN = "gs_banner_first_seen";
const STORAGE_KEY_DISMISSED = "gs_banner_dismissed_at";
const REAPPEAR_DAYS = 3;

function currentMonth() {
  return new Date().toLocaleString("en", { month: "long" });
}

export function getEndOfUTCDay(): number {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  ).getTime();
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function shouldShowBanner(): boolean {
  if (typeof window === "undefined") return false;

  const firstSeen = localStorage.getItem(STORAGE_KEY_FIRST_SEEN);
  const dismissedAt = localStorage.getItem(STORAGE_KEY_DISMISSED);

  if (!firstSeen) {
    localStorage.setItem(STORAGE_KEY_FIRST_SEEN, String(Date.now()));
    return true;
  }

  if (dismissedAt) {
    const elapsed = Date.now() - Number(dismissedAt);
    const reappearMs = REAPPEAR_DAYS * 24 * 60 * 60 * 1000;
    if (elapsed < reappearMs) return false;
    return true;
  }

  return true;
}

export function UrgencyBanner({
  onClaim,
  onVisibilityChange,
}: {
  onClaim: () => void;
  onVisibilityChange?: (visible: boolean) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const show = shouldShowBanner();
    setVisible(show);
    onVisibilityChange?.(show);

    if (!show) return;

    const endOfDay = getEndOfUTCDay();

    const tick = () => {
      const remaining = endOfDay - Date.now();
      if (remaining <= 0) {
        setTimeLeft("00:00:00");
        return;
      }
      setTimeLeft(formatCountdown(remaining));
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [onVisibilityChange]);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY_DISMISSED, String(Date.now()));
    setVisible(false);
    onVisibilityChange?.(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-500 to-orange-500 text-white">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm flex-1 min-w-0">
          <span className="shrink-0 font-bold text-xs bg-white/20 px-2 py-0.5 rounded-full">
            50% OFF
          </span>
          <span className="truncate">
            <span className="font-semibold">Limited offer</span>
            {" "}&mdash; First month at $175 (50% off)
          </span>
          <span className="shrink-0 font-mono text-xs bg-black/20 px-2 py-1 rounded-md tabular-nums">
            {timeLeft}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClaim}
            className="bg-white text-orange-600 font-semibold text-sm px-4 py-1.5 rounded-full hover:bg-orange-50 transition"
          >
            Claim Offer
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded-lg transition"
            aria-label="Dismiss"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
