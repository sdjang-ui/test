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

// ---------- Airy twilight background with floating petals/leaves ----------
export const SkyBg: React.FC<{ tone?: number }> = ({ tone = 0 }) => {
  const frame = useCurrentFrame();
  const shift = Math.sin(frame / 110) * 8;
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${C.sky1} 0%, ${C.sky2} 100%)` }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1300px 900px at ${50 + shift}% ${10 + tone * 6}%, rgba(216,185,120,0.10) 0%, rgba(0,0,0,0) 60%)`,
        }}
      />
      <Petals />
    </AbsoluteFill>
  );
};

const Petals: React.FC = () => {
  const frame = useCurrentFrame();
  const items: React.ReactNode[] = [];
  for (let i = 0; i < 22; i++) {
    const seed = i + 1;
    const x = random(`px${seed}`) * 100;
    const speed = 0.25 + random(`ps${seed}`) * 0.5;
    const y = (random(`py${seed}`) * 120 + frame * speed) % 120 - 10;
    const sway = Math.sin(frame / 50 + seed) * 2.2;
    const size = 6 + random(`pz${seed}`) * 12;
    const o = 0.10 + random(`po${seed}`) * 0.22;
    const col = i % 3 === 0 ? C.green : i % 3 === 1 ? C.gold : C.coral;
    items.push(
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${x + sway}%`,
          top: `${y}%`,
          width: size,
          height: size * 0.62,
          background: col,
          opacity: o,
          borderRadius: "60% 0 60% 0",
          transform: `rotate(${frame * speed * 2 + seed * 30}deg)`,
        }}
      />
    );
  }
  return <AbsoluteFill>{items}</AbsoluteFill>;
};

// ---------- Logo wordmark (stylized — not the designer's real logo) ----------
export const JungwonLogo: React.FC<{ size?: number; sub?: string }> = ({ size = 130, sub }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.12 }}>
      {/* small leaf-above-line mark */}
      <svg width={size * 0.9} height={size * 0.5} viewBox="0 0 90 50">
        <line x1="8" y1="40" x2="82" y2="40" stroke={C.sub} strokeWidth="2.5" />
        <path d="M45 40 C 45 18, 60 10, 70 8 C 66 22, 56 36, 45 40 Z" fill={C.green} />
        <circle cx="33" cy="40" r="3.5" fill={C.gold} />
      </svg>
      <span style={{ fontFamily: SERIF, color: C.paper, fontWeight: 700, fontSize: size, letterSpacing: size * 0.02 }}>
        {NAME}
      </span>
      <span style={{ fontFamily: SANS, color: C.sub, fontWeight: 600, fontSize: size * 0.17, letterSpacing: size * 0.05 }}>
        {sub ?? NAME_EN}
      </span>
    </div>
  );
};

// ---------- Illustrative cover mockup (NOT a real book — placeholder title bars) ----------
export const CoverMock: React.FC<{
  field: string; // background color
  accent: string;
  variant?: number;
  width?: number;
  appear?: number;
  index?: number;
  showBars?: boolean;
}> = ({ field, accent, variant = 0, width = 240, appear = 0, index = 0, showBars = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appear - index * 6, fps, config: { damping: 18 } });
  const h = width * 1.4;
  return (
    <div
      style={{
        width,
        height: h,
        borderRadius: 6,
        opacity: s,
        transform: `translateY(${(1 - s) * 40}px) scale(${0.92 + s * 0.08})`,
        background: field,
        boxShadow: "0 36px 70px rgba(0,0,0,0.45)",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* decorative motif per variant */}
      {variant === 0 && (
        <div style={{ position: "absolute", top: h * 0.16, left: width * 0.16, width: width * 0.68, height: width * 0.68, borderRadius: "50%", background: accent, opacity: 0.9 }} />
      )}
      {variant === 1 && (
        <div style={{ position: "absolute", top: 0, left: width * 0.42, width: width * 0.16, height: "100%", background: accent, opacity: 0.85 }} />
      )}
      {variant === 2 && (
        <div style={{ position: "absolute", bottom: h * 0.22, left: width * 0.12, width: width * 0.76, height: width * 0.5, background: accent, opacity: 0.85, borderRadius: 4, transform: "rotate(-6deg)" }} />
      )}
      {/* placeholder title bars (signals: design mockup, not a real title) */}
      {showBars && (
        <div style={{ position: "absolute", bottom: h * 0.1, left: width * 0.12, right: width * 0.12, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ height: 12, width: "78%", background: "rgba(255,255,255,0.85)", borderRadius: 3 }} />
          <div style={{ height: 12, width: "55%", background: "rgba(255,255,255,0.55)", borderRadius: 3 }} />
        </div>
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
}> = ({ children, delay = 0, y = 26, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  return <div style={{ opacity: s, transform: `translateY(${(1 - s) * y}px)`, ...style }}>{children}</div>;
};

// ---------- Scene fade ----------
export const SceneFade: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, durationInFrames - 12, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// ---------- Kicker ----------
export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <Reveal delay={delay} style={{ fontFamily: SANS, color: C.gold, fontSize: 26, fontWeight: 700, letterSpacing: 8 }}>
    {children}
  </Reveal>
);
