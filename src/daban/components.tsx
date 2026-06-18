import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, SANS, SERIF } from "./theme";
import { NAME, NAME_EN } from "./data";

// ---------- Warm paper background with faint grain + steam-like drift ----------
export const PaperBg: React.FC<{ tone?: number }> = ({ tone = 0 }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 100) * 20;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1300px 900px at ${50 + drift / 7}% ${
            20 + tone * 6
          }%, ${C.ink2} 0%, ${C.ink} 66%)`,
        }}
      />
      <Grain />
    </AbsoluteFill>
  );
};

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const dots: React.ReactNode[] = [];
  const n = 120;
  for (let i = 0; i < n; i++) {
    const x = random(`x${i}`) * 100;
    const y = random(`y${i}`) * 100;
    const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(frame / 50 + random(i) * 6.28));
    dots.push(
      <circle key={i} cx={`${x}%`} cy={`${y}%`} r={random(`r${i}`) * 1.4 + 0.4} fill={C.paper} opacity={0.05 * tw} />
    );
  }
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      {dots}
    </svg>
  );
};

// ---------- Logo wordmark (stylized serif recreation — not the real logo) ----------
export const DabanLogo: React.FC<{ size?: number; sub?: string }> = ({ size = 150, sub }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.14 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: size * 0.16 }}>
        <span style={{ fontFamily: SERIF, color: C.paper, fontWeight: 700, fontSize: size, letterSpacing: size * 0.04 }}>
          {NAME}
        </span>
        {/* small terracotta dot — a teacup/period mark */}
        <span style={{ width: size * 0.16, height: size * 0.16, borderRadius: "50%", background: C.terra, display: "inline-block" }} />
      </div>
      <span style={{ fontFamily: SANS, color: C.sub, fontWeight: 700, fontSize: size * 0.2, letterSpacing: size * 0.1 }}>
        {NAME_EN}
      </span>
      {sub && (
        <span style={{ fontFamily: SANS, color: C.sub, fontWeight: 500, fontSize: size * 0.16, marginTop: size * 0.06 }}>
          {sub}
        </span>
      )}
    </div>
  );
};

// ---------- Reveal ----------
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, y = 28, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  return (
    <div style={{ opacity: s, transform: `translateY(${(1 - s) * y}px)`, ...style }}>{children}</div>
  );
};

// ---------- Stylized book (text spine, no copyrighted artwork) ----------
export const BookSpine: React.FC<{ label: string; color: string; index: number; appearAt: number }> = ({
  label,
  color,
  index,
  appearAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appearAt - index * 6, fps, config: { damping: 18 } });
  const float = Math.sin((frame + index * 40) / 55) * 6;
  return (
    <div
      style={{
        width: 90,
        height: 320,
        borderRadius: 6,
        background: `linear-gradient(180deg, ${color} 0%, rgba(0,0,0,0.25) 140%)`,
        boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
        opacity: s,
        transform: `translateY(${(1 - s) * 40 + float}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <span
        style={{
          fontFamily: SERIF,
          color: "rgba(255,255,255,0.92)",
          fontWeight: 600,
          fontSize: 26,
          writingMode: "vertical-rl",
          letterSpacing: 4,
        }}
      >
        {label}
      </span>
    </div>
  );
};

// ---------- Scene fade ----------
export const SceneFade: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 14, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// ---------- Kicker ----------
export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <Reveal delay={delay} style={{ fontFamily: SANS, color: C.terra, fontSize: 28, fontWeight: 700, letterSpacing: 8 }}>
    {children}
  </Reveal>
);
