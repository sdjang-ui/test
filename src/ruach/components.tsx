import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, SANS, SERIF } from "./theme";
import { NAME, NAME_EN } from "./data";

// ---------- Background with drifting "breath/wind" lines ----------
export const WindBg: React.FC<{ tone?: number }> = ({ tone = 0 }) => {
  const frame = useCurrentFrame();
  const glow = Math.sin(frame / 90) * 18;
  const lines = 6;
  const W = 1920;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1500px 1000px at ${50 + glow / 6}% ${
            22 + tone * 5
          }%, ${C.ink2} 0%, ${C.ink} 64%)`,
        }}
      />
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: lines }).map((_, i) => {
          const baseY = 140 + i * 150;
          const amp = 26 + i * 6;
          const phase = frame / 40 + i * 1.3;
          const shift = ((frame * (0.6 + i * 0.12)) % (W + 400)) - 200;
          let d = `M ${-200 + shift} ${baseY}`;
          for (let x = 0; x <= W + 200; x += 80) {
            d += ` Q ${-200 + shift + x + 40} ${baseY + Math.sin(phase + x / 160) * amp} ${
              -200 + shift + x + 80
            } ${baseY}`;
          }
          return <path key={i} d={d} stroke={i % 2 === 0 ? C.line : "rgba(134,180,201,0.12)"} strokeWidth={1.5} fill="none" />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ---------- Logo wordmark (stylized serif recreation — not the real logo) ----------
export const RuachLogo: React.FC<{ size?: number; sub?: string }> = ({ size = 150, sub }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: size * 0.18 }}>
        <span style={{ fontFamily: SERIF, color: C.paper, fontWeight: 700, fontSize: size, letterSpacing: size * 0.02 }}>
          {NAME}
        </span>
        {/* breath mark: a soft wind curve */}
        <svg width={size * 0.7} height={size * 0.5}>
          <path
            d={`M 4 ${size * 0.36} Q ${size * 0.2} ${size * 0.05} ${size * 0.42} ${size * 0.22} T ${size * 0.66} ${size * 0.2}`}
            stroke={C.wind}
            strokeWidth={Math.max(3, size * 0.035)}
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span style={{ fontFamily: SANS, color: C.sub, fontWeight: 600, fontSize: size * 0.2, letterSpacing: size * 0.12 }}>
        {NAME_EN}
      </span>
      {sub && (
        <span style={{ fontFamily: SANS, color: C.sub, fontWeight: 500, fontSize: size * 0.15, marginTop: size * 0.05 }}>
          {sub}
        </span>
      )}
    </div>
  );
};

// ---------- Featured book card (text only — real title, not the real cover) ----------
export const BookCard: React.FC<{
  title: string;
  author: string;
  meta: string;
  appearAt?: number;
}> = ({ title, author, meta, appearAt = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appearAt, fps, config: { damping: 16 } });
  const float = Math.sin(frame / 50) * 6;
  return (
    <div
      style={{
        width: 360,
        height: 500,
        borderRadius: 8,
        opacity: s,
        transform: `translateY(${(1 - s) * 50 + float}px) scale(${0.9 + s * 0.1})`,
        background: `linear-gradient(165deg, ${C.ink2} 0%, #0b1018 100%)`,
        border: `1px solid ${C.line}`,
        boxShadow: "0 50px 90px rgba(0,0,0,0.5)",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: C.gold }} />
      <div style={{ fontFamily: SANS, color: C.wind, fontWeight: 700, fontSize: 22, letterSpacing: 3 }}>
        RUACH · 2017
      </div>
      <div>
        <div style={{ fontFamily: SERIF, color: C.paper, fontWeight: 700, fontSize: 46, lineHeight: 1.3, wordBreak: "keep-all" }}>{title}</div>
        <div style={{ fontFamily: SANS, color: C.sub, fontWeight: 500, fontSize: 26, marginTop: 18 }}>{author} 지음</div>
      </div>
      <div style={{ fontFamily: SANS, color: C.sub, fontWeight: 600, fontSize: 22 }}>{meta}</div>
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
  const opacity = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// ---------- Kicker ----------
export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <Reveal delay={delay} style={{ fontFamily: SANS, color: C.wind, fontSize: 26, fontWeight: 700, letterSpacing: 8 }}>
    {children}
  </Reveal>
);
