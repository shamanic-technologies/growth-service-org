"use client";

import { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <svg width="24" height="24" viewBox="0 0 32 32" className="shrink-0">
            <rect width="32" height="32" rx="8" fill="#111" />
            <path d="M8 22L14 14L19 17L24 8" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M20 8H24V12" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          GrowthService
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#how-it-works" className="hover:text-gray-900 transition">
            How It Works
          </a>
          <a href="#results" className="hover:text-gray-900 transition">
            Results
          </a>
          <a href="#pricing" className="hover:text-gray-900 transition">
            Pricing
          </a>
          <a href="#faq" className="hover:text-gray-900 transition">
            FAQ
          </a>
          <a
            href="#pricing"
            className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800 transition"
          >
            Get Started
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-3 -mr-3"
          aria-label="Menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {menuOpen ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pb-4 flex flex-col gap-3 text-sm text-gray-600">
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How It Works
          </a>
          <a href="#results" onClick={() => setMenuOpen(false)}>
            Results
          </a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>
            FAQ
          </a>
        </div>
      )}
    </nav>
  );
}
