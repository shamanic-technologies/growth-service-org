"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";

const STORAGE_KEY_FIRST_SEEN = "gs_banner_first_seen";
const STORAGE_KEY_DISMISSED = "gs_banner_dismissed_at";
const REAPPEAR_DAYS = 3;

/**
 * Next 8am Malaysia Time (MYT = UTC+8).
 * 8am MYT = 00:00 UTC.
 * If we're past 00:00 UTC today, the next one is tomorrow 00:00 UTC.
 */
export function getNextDeadline(): number {
  const now = new Date();
  const todayMidnightUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  // If now is past today's midnight UTC, use tomorrow's
  if (now.getTime() >= todayMidnightUTC) {
    return todayMidnightUTC + 24 * 60 * 60 * 1000;
  }
  return todayMidnightUTC;
}

// Keep this export for checkout-modal countdown
export function getEndOfUTCDay(): number {
  return getNextDeadline();
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getDeadlineLabel(deadline: number): string {
  const deadlineDate = new Date(deadline);
  const now = new Date();

  const todayLocal = now.toLocaleDateString();
  const deadlineLocal = deadlineDate.toLocaleDateString();

  const dayLabel = todayLocal === deadlineLocal ? "today" : "tomorrow";

  const timeStr = deadlineDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${dayLabel} ${timeStr}`;
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
  const [deadlineLabel, setDeadlineLabel] = useState("");

  useEffect(() => {
    const show = shouldShowBanner();
    setVisible(show);
    onVisibilityChange?.(show);
    if (show) posthog.capture("urgency_banner_shown");

    if (!show) return;

    const deadline = getNextDeadline();
    setDeadlineLabel(getDeadlineLabel(deadline));

    const tick = () => {
      const remaining = deadline - Date.now();
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
    posthog.capture("urgency_banner_dismissed");
    localStorage.setItem(STORAGE_KEY_DISMISSED, String(Date.now()));
    setVisible(false);
    onVisibilityChange?.(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-500 to-orange-500 text-white">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center text-sm flex-1 min-w-0">
          <span className="truncate">
            <span className="font-semibold">Limited offer</span>
            {" "}&mdash; 🎉 First month at <s>$350</s> $250 until {deadlineLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs bg-black/20 px-2 py-1 rounded-md tabular-nums">
            {timeLeft}
          </span>
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
