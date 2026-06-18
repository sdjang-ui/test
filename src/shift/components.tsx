import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "./theme";
import { NAME, NAME_EN, NAME_PREFIX } from "./data";

// ---------- Background: faint vertical "tracks" that the motif shifts along ----------
export const ShiftBg: React.FC<{ tone?: number }> = ({ tone = 0 }) => {
  const frame = useCurrentFrame();
  const glow = Math.sin(frame / 80) * 24;
  const tracks = 9;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1400px 900px at ${50 + glow / 8}% ${
            14 + tone * 6
          }%, ${C.ink2} 0%, ${C.ink} 62%)`,
        }}
      />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: tracks }).map((_, i) => {
          const x = ((i + 1) / (tracks + 1)) * 100;
          return (
            <line
              key={i}
              x1={`${x}%`}
              y1="0"
              x2={`${x}%`}
              y2="100%"
              stroke={C.line}
              strokeWidth={1}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ---------- The "shift" motif: a square that steps one notch up-right ----------
export const ShiftMark: React.FC<{ size?: number; progress: number }> = ({
  size = 120,
  progress,
}) => {
  // progress 0..1 — square slides one step right and up, leaving a ghost
  const step = size * 0.9;
  const dx = interpolate(progress, [0, 1], [0, step]);
  const dy = interpolate(progress, [0, 1], [0, -step]);
  return (
    <svg width={size * 2.4} height={size * 2.4} viewBox={`0 0 ${size * 2.4} ${size * 2.4}`}>
      {/* ghost / origin */}
      <rect
        x={size * 0.5}
        y={size * 1.0}
        width={size}
        height={size}
        rx={size * 0.18}
        fill="none"
        stroke={C.sub}
        strokeWidth={3}
        opacity={0.35}
      />
      {/* arrow hint */}
      <path
        d={`M ${size * 1.0} ${size * 1.5} L ${size * 1.5} ${size * 1.0}`}
        stroke={C.sub}
        strokeWidth={3}
        opacity={0.25 * (1 - progress)}
      />
      {/* moving block */}
      <rect
        x={size * 0.5 + dx}
        y={size * 1.0 + dy}
        width={size}
        height={size}
        rx={size * 0.18}
        fill={C.amber}
        style={{ filter: "drop-shadow(0 16px 30px rgba(245,165,36,0.35))" }}
      />
    </svg>
  );
};

// ---------- Logo wordmark (stylized text recreation — not the real logo) ----------
export const ShiftLogo: React.FC<{ size?: number; showPrefix?: boolean }> = ({
  size = 120,
  showPrefix = true,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.12, fontFamily: FONT }}>
      {showPrefix && (
        <span style={{ color: C.sub, fontWeight: 700, fontSize: size * 0.26, letterSpacing: size * 0.05 }}>
          {NAME_PREFIX}
        </span>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: size * 0.22 }}>
        <span style={{ color: C.white, fontWeight: 900, fontSize: size, letterSpacing: -2 }}>{NAME}</span>
        {/* shift glyph: amber block nudged up-right */}
        <div style={{ position: "relative", width: size * 0.62, height: size * 0.62 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: size * 0.42,
              height: size * 0.42,
              borderRadius: size * 0.1,
              border: `${Math.max(2, size * 0.03)}px solid ${C.sub}`,
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: size * 0.42,
              height: size * 0.42,
              borderRadius: size * 0.1,
              background: `linear-gradient(135deg, ${C.amber} 0%, ${C.amber2} 100%)`,
              boxShadow: "0 10px 24px rgba(245,165,36,0.4)",
            }}
          />
        </div>
      </div>
      <span style={{ color: C.sub, fontWeight: 800, fontSize: size * 0.2, letterSpacing: size * 0.08 }}>
        {NAME_EN}
      </span>
    </div>
  );
};

// ---------- Reveal helper ----------
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, y = 30, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  return (
    <div style={{ opacity: s, transform: `translateY(${(1 - s) * y}px)`, fontFamily: FONT, ...style }}>
      {children}
    </div>
  );
};

// ---------- Per-scene fade wrapper ----------
export const SceneFade: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// ---------- small kicker label ----------
export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <Reveal delay={delay} style={{ color: C.amber, fontSize: 30, fontWeight: 800, letterSpacing: 6 }}>
    {children}
  </Reveal>
);
