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
import { NAME, HANDLE } from "./data";

// ---------- Noir background: moving spotlight + faint shelf lines + grain ----------
export const NoirBg: React.FC<{ tone?: number }> = ({ tone = 0 }) => {
  const frame = useCurrentFrame();
  const sx = 50 + Math.sin(frame / 70) * 22;
  const sy = 34 + Math.cos(frame / 90) * 12 + tone * 4;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <AbsoluteFill
        style={{ background: `radial-gradient(900px 700px at ${sx}% ${sy}%, ${C.ink2} 0%, ${C.ink} 60%)` }}
      />
      {/* faint vertical "bookshelf" lines */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={i} x1={`${(i + 1) * 6}%`} y1="0" x2={`${(i + 1) * 6}%`} y2="100%" stroke={C.line} strokeWidth={1} />
        ))}
      </svg>
      <Grain />
    </AbsoluteFill>
  );
};

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < 90; i++) {
    const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(frame / 45 + random(i) * 6.28));
    dots.push(
      <circle key={i} cx={`${random(`x${i}`) * 100}%`} cy={`${random(`y${i}`) * 100}%`} r={random(`r${i}`) * 1.3 + 0.4} fill={C.paper} opacity={0.05 * tw} />
    );
  }
  return <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>{dots}</svg>;
};

// ---------- Magnifying glass ----------
export const Magnifier: React.FC<{ size?: number; sweep?: boolean }> = ({ size = 160, sweep = false }) => {
  const frame = useCurrentFrame();
  const dx = sweep ? Math.sin(frame / 22) * 26 : 0;
  const dy = sweep ? Math.cos(frame / 26) * 14 : 0;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: `translate(${dx}px, ${dy}px)` }}>
      <circle cx="42" cy="42" r="28" fill="rgba(201,162,75,0.08)" stroke={C.gold} strokeWidth="5" />
      <line x1="62" y1="62" x2="88" y2="88" stroke={C.gold} strokeWidth="8" strokeLinecap="round" />
      <circle cx="42" cy="42" r="28" fill="none" stroke={C.crimson} strokeWidth="1.5" opacity={0.5} />
    </svg>
  );
};

// ---------- Floating question marks ----------
export const QMarks: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({ length: 7 }).map((_, i) => {
        const seed = i + 1;
        const x = random(`qx${seed}`) * 90 + 5;
        const baseY = random(`qy${seed}`) * 70 + 12;
        const y = baseY + Math.sin(frame / 40 + seed) * 3;
        const o = 0.06 + random(`qo${seed}`) * 0.1;
        const s = 30 + random(`qs${seed}`) * 60;
        return (
          <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, fontFamily: SERIF, fontSize: s, color: C.sub, opacity: o, fontWeight: 700 }}>
            ?
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- Logo wordmark (stylized recreation — not the real logo) ----------
export const MytomoLogo: React.FC<{ size?: number; sub?: string }> = ({ size = 110, sub }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: size * 0.18 }}>
        {/* small book + magnifier glyph */}
        <svg width={size * 0.9} height={size * 0.9} viewBox="0 0 100 100">
          <rect x="16" y="22" width="58" height="62" rx="5" fill="none" stroke={C.paper} strokeWidth="5" />
          <line x1="45" y1="24" x2="45" y2="82" stroke={C.paper} strokeWidth="3" opacity="0.6" />
          <circle cx="64" cy="58" r="17" fill="rgba(210,59,71,0.12)" stroke={C.crimson} strokeWidth="5" />
          <line x1="76" y1="70" x2="90" y2="84" stroke={C.crimson} strokeWidth="6" strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: SERIF, color: C.paper, fontWeight: 700, fontSize: size, letterSpacing: -1 }}>{NAME}</span>
      </div>
      <span style={{ fontFamily: SANS, color: C.sub, fontWeight: 600, fontSize: size * 0.2, letterSpacing: size * 0.06 }}>
        {sub ?? HANDLE}
      </span>
    </div>
  );
};

// ---------- Mystery book card (text only — real bibliography, not real cover) ----------
export const MysteryBook: React.FC<{
  title: string;
  author: string;
  meta: string;
  tag: string;
  appearAt?: number;
}> = ({ title, author, meta, tag, appearAt = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appearAt, fps, config: { damping: 16 } });
  const float = Math.sin(frame / 48) * 6;
  return (
    <div
      style={{
        width: 350,
        height: 500,
        borderRadius: 8,
        opacity: s,
        transform: `translateY(${(1 - s) * 50 + float}px) scale(${0.9 + s * 0.1})`,
        background: `linear-gradient(160deg, #1b1d27 0%, #090a0f 100%)`,
        border: `1px solid ${C.line}`,
        boxShadow: "0 50px 90px rgba(0,0,0,0.6)",
        padding: 38,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: C.crimson }} />
      <div style={{ alignSelf: "flex-start", padding: "6px 16px", border: `1.5px solid ${C.crimson}`, borderRadius: 4, color: C.crimson, fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: 3 }}>
        {tag}
      </div>
      <div>
        <div style={{ fontFamily: SERIF, color: C.paper, fontWeight: 700, fontSize: 46, lineHeight: 1.32, wordBreak: "keep-all" }}>{title}</div>
        <div style={{ fontFamily: SANS, color: C.gold, fontWeight: 600, fontSize: 26, marginTop: 16 }}>{author}</div>
      </div>
      <div style={{ fontFamily: SANS, color: C.sub, fontWeight: 500, fontSize: 21 }}>{meta}</div>
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
  <Reveal delay={delay} style={{ fontFamily: SANS, color: C.crimson, fontSize: 26, fontWeight: 800, letterSpacing: 8 }}>
    {children}
  </Reveal>
);
