import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";
import { COLORS, FONT } from "./theme";

// ---------- Background ----------
export const Background: React.FC<{ variant?: number }> = ({ variant = 0 }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 30;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1200px 800px at ${50 + drift / 6}% ${
            18 + variant * 8
          }%, ${COLORS.ink2} 0%, ${COLORS.ink} 60%)`,
        }}
      />
      <DotGrid />
    </AbsoluteFill>
  );
};

const DotGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const cols = 26;
  const rows = 15;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = r * cols + c;
      const tw = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(frame / 40 + random(seed) * 6.28));
      dots.push(
        <circle
          key={seed}
          cx={`${(c + 0.5) * (100 / cols)}%`}
          cy={`${(r + 0.5) * (100 / rows)}%`}
          r={1.6}
          fill={COLORS.sub}
          opacity={0.06 * tw}
        />
      );
    }
  }
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      {dots}
    </svg>
  );
};

// ---------- Logo wordmark (stylized recreation, text only) ----------
export const Logo: React.FC<{ size?: number; mono?: boolean }> = ({
  size = 64,
  mono = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.32,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          width: size * 1.05,
          height: size * 1.05,
          borderRadius: size * 0.26,
          background: mono
            ? COLORS.white
            : `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accent2} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 18px 50px rgba(45,212,191,0.25)",
        }}
      >
        <span
          style={{
            color: mono ? COLORS.ink : COLORS.white,
            fontWeight: 900,
            fontSize: size * 0.62,
            lineHeight: 1,
          }}
        >
          W
        </span>
      </div>
      <span
        style={{
          color: COLORS.white,
          fontWeight: 900,
          fontSize: size,
          letterSpacing: -1,
        }}
      >
        위키북스
      </span>
    </div>
  );
};

// ---------- Category chip ----------
export const Chip: React.FC<{ label: string; index: number; appearAt: number }> = ({
  label,
  index,
  appearAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - appearAt - index * 6,
    fps,
    config: { damping: 16, mass: 0.7 },
  });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${(1 - s) * 26}px) scale(${0.9 + s * 0.1})`,
        padding: "18px 34px",
        borderRadius: 100,
        border: `1.5px solid ${COLORS.line}`,
        background: "rgba(255,255,255,0.03)",
        color: COLORS.paper,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 38,
        whiteSpace: "nowrap",
        backdropFilter: "blur(4px)",
      }}
    >
      {label}
    </div>
  );
};

// ---------- Stylized book cover (text only — no copyrighted artwork) ----------
export const BookCover: React.FC<{
  title: string;
  tag: string;
  index: number;
  appearAt: number;
  hue: number;
}> = ({ title, tag, index, appearAt, hue }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - appearAt - index * 8,
    fps,
    config: { damping: 18, mass: 0.9 },
  });
  const float = Math.sin((frame + index * 30) / 50) * 8;
  return (
    <div
      style={{
        width: 300,
        height: 420,
        borderRadius: 14,
        opacity: s,
        transform: `translateY(${(1 - s) * 60 + float}px) scale(${0.85 + s * 0.15})`,
        background: `linear-gradient(160deg, hsl(${hue},38%,22%) 0%, hsl(${hue},42%,14%) 100%)`,
        boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: 26,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 10,
          background: `hsl(${hue},70%,55%)`,
        }}
      />
      <div
        style={{
          alignSelf: "flex-start",
          padding: "6px 16px",
          borderRadius: 6,
          background: `hsl(${hue},70%,55%)`,
          color: "#06121f",
          fontWeight: 800,
          fontSize: 22,
        }}
      >
        {tag}
      </div>
      <div style={{ color: COLORS.white, fontWeight: 800, fontSize: 36, lineHeight: 1.25 }}>
        {title}
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.55)",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 1,
        }}
      >
        위키북스
      </div>
    </div>
  );
};

// ---------- Animated reveal text ----------
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
    <div
      style={{
        opacity: s,
        transform: `translateY(${(1 - s) * y}px)`,
        fontFamily: FONT,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ---------- Per-scene fade in/out wrapper ----------
export const SceneFade: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
