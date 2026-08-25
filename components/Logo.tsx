import React from "react";

type LogoProps = {
  className?: string;
  size?: number;
  width?: number | string;
  height?: number | string;
  color?: string;
};

export default function Logo({
  className,
  size,
  width = size ?? 28,
  height = size ? (size * 245) / 288 : 24,
  color = "#ffffff",
}: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 288 245"
      fill="none"
      width={width}
      height={height}
      className={className}
      aria-label="DEPLOY Logo"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="deployLogoGradient" x1="91" y1="204" x2="200" y2="61" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>

      {/* Outer D Envelope */}
      <path
        d="M 47 0 L 186 0 C 242 0 287 55 287 122.5 C 287 190 242 245 185 245 L 58 245 L 93 201 L 180 201 C 223 201 247 166 247 122.5 C 247 79 223 44 175 44 L 77 44 Z"
        fill={color}
      />

      {/* Left Speed Streaks */}
      <path d="M 0 61.5 L 69 61.5 L 89 89 L 19 89 Z" fill={color} />
      <path d="M 33 113.5 L 110 113.5 L 121 127.5 L 111 141.5 L 34 141.5 Z" fill={color} />
      <path d="M 18 165 L 89 165 L 68 192.5 L 0 192.5 Z" fill={color} />

      {/* Center Arrow / Chevron */}
      <path
        d="M 98 61.5 L 145 61.5 L 200 127.5 L 135 204 L 91 204 L 151 127.5 Z"
        fill="url(#deployLogoGradient)"
      />
    </svg>
  );
}
