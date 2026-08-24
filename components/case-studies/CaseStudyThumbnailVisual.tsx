import React from "react";
import styles from "./CaseStudyThumbnailVisual.module.css";

export default function CaseStudyThumbnailVisual() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 480 240" fill="none">
        {/* Subtle Matte Background */}
        <rect width="480" height="240" rx="12" fill="#0d0d0e" stroke="rgba(255,255,255,0.06)" />

        {/* Minimal grid lines */}
        <path
          d="M 60,0 V 240 M 180,0 V 240 M 300,0 V 240 M 420,0 V 240 M 0,60 H 480 M 0,120 H 480 M 0,180 H 480"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="1"
        />

        {/* Minimal connection track */}
        <path
          d="M 80,120 H 180 M 260,120 H 380"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Left Node: Question */}
        <g transform="translate(60, 96)">
          <rect width="90" height="48" rx="6" fill="#141417" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
          <circle cx="16" cy="16" r="3" fill="#3b82f6" />
          <rect x="26" y="14" width="46" height="4" rx="2" fill="#f3f0e8" opacity="0.6" />
          <rect x="16" y="28" width="56" height="3" rx="1.5" fill="#606064" />
        </g>

        {/* Center Node: ~95% Benchmark */}
        <g transform="translate(195, 76)">
          <rect width="90" height="88" rx="10" fill="#111113" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="45" cy="44" r="30" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="45" y="42" textAnchor="middle" fill="#f3f0e8" fontSize="17" fontWeight="600" fontFamily="sans-serif">
            ~95%
          </text>
          <text x="45" y="55" textAnchor="middle" fill="#8c8c90" fontSize="7.5" letterSpacing="0.12em" fontFamily="monospace">
            BENCHMARK
          </text>
        </g>

        {/* Right Node: Validated SQL */}
        <g transform="translate(330, 96)">
          <rect width="90" height="48" rx="6" fill="#141417" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
          <circle cx="16" cy="16" r="3" fill="#10b981" />
          <rect x="26" y="14" width="46" height="4" rx="2" fill="#f3f0e8" opacity="0.6" />
          <rect x="16" y="28" width="44" height="3" rx="1.5" fill="#10b981" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
