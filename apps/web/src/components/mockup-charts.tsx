"use client";

export function AIVisibilityChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const values = [2, 5, 8, 14, 23, 38, 52, 71];
  const maxVal = 80;
  const w = 400;
  const h = 200;
  const padX = 40;
  const padY = 20;
  const chartW = w - padX * 2;
  const chartH = h - padY * 2;

  const points = values.map((v, i) => ({
    x: padX + (i / (values.length - 1)) * chartW,
    y: h - padY - (v / maxVal) * chartH,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${h - padY} L ${points[0].x} ${h - padY} Z`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-medium text-gray-500">AI Mentions</div>
          <div className="text-2xl font-bold text-gray-900">71 <span className="text-sm font-medium text-emerald-500">+3,450%</span></div>
        </div>
        <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">Last 8 months</div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 20, 40, 60, 80].map((v) => {
          const y = h - padY - (v / maxVal) * chartH;
          return (
            <g key={v}>
              <line x1={padX} y1={y} x2={w - padX} y2={y} stroke="#f3f4f6" strokeWidth="1" />
              <text x={padX - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">{v}</text>
            </g>
          );
        })}
        {months.map((m, i) => {
          const x = padX + (i / (months.length - 1)) * chartW;
          return (
            <text key={m} x={x} y={h - 4} textAnchor="middle" fontSize="10" fill="#9ca3af">{m}</text>
          );
        })}
        <path d={areaPath} fill="url(#chart-grad)" />
        <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="4" fill="#10b981" />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="8" fill="#10b981" fillOpacity="0.2" />
      </svg>
    </div>
  );
}

export function DomainRatingChart() {
  const data = [
    { label: "Before", value: 15, color: "#d1d5db" },
    { label: "Month 1", value: 22, color: "#93c5fd" },
    { label: "Month 2", value: 31, color: "#60a5fa" },
    { label: "Month 3", value: 42, color: "#3b82f6" },
    { label: "Month 4", value: 53, color: "#2563eb" },
    { label: "Month 6", value: 68, color: "#1d4ed8" },
  ];
  const maxVal = 80;

  // Use SVG for reliable rendering
  const barW = 40;
  const gap = 12;
  const totalW = data.length * barW + (data.length - 1) * gap;
  const chartH = 120;
  const labelH = 36; // space for top value + bottom label
  const svgH = chartH + labelH;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-medium text-gray-500">Domain Rating</div>
          <div className="text-2xl font-bold text-gray-900">DR 68 <span className="text-sm font-medium text-blue-500">+353%</span></div>
        </div>
        <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">Ahrefs verified</div>
      </div>
      <svg viewBox={`0 0 ${totalW} ${svgH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {data.map((d, i) => {
          const x = i * (barW + gap);
          const barH = (d.value / maxVal) * chartH;
          const barY = chartH - barH + 14; // 14px offset for top label
          return (
            <g key={d.label}>
              {/* Value label */}
              <text
                x={x + barW / 2}
                y={barY - 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#4b5563"
              >
                {d.value}
              </text>
              {/* Bar */}
              <rect
                x={x}
                y={barY}
                width={barW}
                height={barH}
                rx={4}
                fill={d.color}
              />
              {/* Label */}
              <text
                x={x + barW / 2}
                y={svgH - 2}
                textAnchor="middle"
                fontSize="9"
                fill="#9ca3af"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function ChatGPTMentionMockup() {
  return (
    <div className="bg-[#343541] rounded-2xl p-5 shadow-lg text-white max-w-md">
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-[#10a37f] flex items-center justify-center shrink-0 mt-0.5">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z"/>
          </svg>
        </div>
        <div className="text-sm leading-relaxed text-gray-200">
          <p>Based on my research, here are some top companies in that space:</p>
          <ol className="mt-2 space-y-1.5 list-decimal list-inside">
            <li><span className="text-white font-medium bg-emerald-500/20 px-1 rounded">YourBrand</span> — Known for their innovative approach to...</li>
            <li>Competitor A — A well-established player with...</li>
            <li>Competitor B — Offers a comprehensive suite of...</li>
          </ol>
          <p className="mt-2 text-gray-400 text-xs">Sources: Forbes, TechCrunch, Reuters</p>
        </div>
      </div>
    </div>
  );
}

export function GoogleAIOverviewMockup() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm max-w-md">
      <div className="flex items-center gap-2 mb-3">
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="text-xs font-medium text-gray-500">AI Overview</span>
        <div className="ml-auto flex gap-0.5">
          <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse-glow" />
          <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse-glow delay-100" />
          <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse-glow delay-200" />
        </div>
      </div>
      <div className="text-sm text-gray-700 leading-relaxed">
        <p>Several companies stand out in this category. <span className="font-semibold text-blue-600 bg-blue-50 px-0.5 rounded">YourBrand</span> has been recognized by major publications for their unique approach, with recent coverage in <span className="text-blue-600">Forbes</span> and <span className="text-blue-600">TechCrunch</span> highlighting their growth.</p>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">forbes.com</div>
        <div className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">techcrunch.com</div>
        <div className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">reuters.com</div>
      </div>
    </div>
  );
}

export function BeforeAfterComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Before */}
      <div className="relative">
        <div className="absolute -top-3 left-4 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full z-10">
          Without press coverage
        </div>
        <div className="bg-[#343541] rounded-2xl p-5 text-white border-2 border-red-200/50">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#10a37f] flex items-center justify-center shrink-0 mt-0.5">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="white">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z"/>
              </svg>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed">
              <p>Here are some companies in that space:</p>
              <ol className="mt-2 space-y-1 list-decimal list-inside">
                <li>Competitor A — Market leader with...</li>
                <li>Competitor B — Known for their...</li>
                <li>Competitor C — Offers solutions for...</li>
              </ol>
              <p className="mt-2 text-gray-500 text-xs italic">Your brand is not mentioned</p>
            </div>
          </div>
        </div>
      </div>

      {/* After */}
      <div className="relative">
        <div className="absolute -top-3 left-4 bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full z-10">
          With organic press coverage
        </div>
        <div className="bg-[#343541] rounded-2xl p-5 text-white border-2 border-emerald-200/50">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#10a37f] flex items-center justify-center shrink-0 mt-0.5">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="white">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z"/>
              </svg>
            </div>
            <div className="text-sm text-gray-200 leading-relaxed">
              <p>Based on my research, top companies include:</p>
              <ol className="mt-2 space-y-1 list-decimal list-inside">
                <li><span className="text-white font-medium bg-emerald-500/20 px-1 rounded">YourBrand</span> — Featured in Forbes for their...</li>
                <li>Competitor A — Market leader with...</li>
                <li>Competitor B — Known for their...</li>
              </ol>
              <p className="mt-2 text-gray-400 text-xs">Sources: Forbes, Reuters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
