import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, SANS, SERIF } from "./theme";
import { HANDLE, HOME, IMPRINT, IMPRINT_EN } from "./data";
import {
  BookSpine,
  DabanLogo,
  Kicker,
  PaperBg,
  Reveal,
  SceneFade,
} from "./components";

const center: React.CSSProperties = { justifyContent: "center", alignItems: "center", textAlign: "center" };

// ===== S1 — Hook: 하루의 끝 (0–7s) =====
export const S1: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [20, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneFade durationInFrames={dur}>
      <PaperBg tone={0} />
      <AbsoluteFill style={center}>
        <Reveal delay={10} style={{ fontFamily: SERIF, color: C.paper, fontSize: 70, fontWeight: 600, lineHeight: 1.4 }}>
          하루의 끝에서,
        </Reveal>
        <div
          style={{
            marginTop: 30,
            width: interpolate(line, [0, 1], [0, 420]),
            height: 2,
            background: C.terra,
          }}
        />
        <Reveal delay={40} style={{ marginTop: 30, fontFamily: SANS, color: C.sub, fontSize: 36, fontWeight: 500 }}>
          한 권의 책을 펼칩니다
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S2 — 이름 공개 '다반' (7–15s) =====
export const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 8, fps, config: { damping: 14 } });
  return (
    <SceneFade durationInFrames={dur}>
      <PaperBg tone={1} />
      <AbsoluteFill style={center}>
        <div style={{ opacity: s, transform: `scale(${0.84 + s * 0.16})` }}>
          <DabanLogo size={170} />
        </div>
        <Reveal delay={42} style={{ marginTop: 40, fontFamily: SANS, color: C.sub, fontSize: 32, fontWeight: 500 }}>
          {HANDLE}
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S3 — 정서: 차 한 잔의 시간 (evocative) (15–24s) =====
export const S3: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  // steam wisp
  const steam = (i: number) => {
    const p = ((frame + i * 30) % 120) / 120;
    return { y: interpolate(p, [0, 1], [0, -80]), o: Math.sin(p * Math.PI) * 0.5, x: Math.sin(p * 6 + i) * 10 };
  };
  return (
    <SceneFade durationInFrames={dur}>
      <PaperBg tone={2} />
      <AbsoluteFill style={center}>
        {/* cup + steam */}
        <div style={{ position: "relative", marginBottom: 40 }}>
          <svg width="160" height="120">
            {[0, 1, 2].map((i) => {
              const s = steam(i);
              return (
                <path
                  key={i}
                  d={`M ${70 + i * 12 + s.x} ${70 + s.y} q 8 -16 0 -32`}
                  stroke={C.sub}
                  strokeWidth={3}
                  fill="none"
                  opacity={s.o}
                  strokeLinecap="round"
                />
              );
            })}
            <path d="M 40 78 h 80 v 6 a 40 40 0 0 1 -80 0 z" fill={C.terra} opacity={0.9} />
            <path d="M 120 84 q 22 4 0 28" stroke={C.terra} strokeWidth={6} fill="none" />
          </svg>
        </div>
        <Reveal delay={16} style={{ fontFamily: SERIF, color: C.paper, fontSize: 60, fontWeight: 600, lineHeight: 1.4 }}>
          이름처럼, <span style={{ color: C.terra }}>차 한 잔</span>의 시간.
        </Reveal>
        <Reveal delay={34} style={{ marginTop: 24, fontFamily: SANS, color: C.sub, fontSize: 28, fontWeight: 500 }}>
          느리게, 곁에 두고 읽는 책
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S4 — 분야: 에세이 (24–34s) =====
export const S4: React.FC<{ dur: number }> = ({ dur }) => {
  const colors = [C.sage, C.terra, "#6E7E8C", "#B98A4B", C.sage];
  const labels = ["에 세 이", "마 음", "일 상", "위 로", "문 장"];
  return (
    <SceneFade durationInFrames={dur}>
      <PaperBg tone={1} />
      <AbsoluteFill style={center}>
        <Kicker delay={4}>ESSAY</Kicker>
        <Reveal delay={14} style={{ marginTop: 18, fontFamily: SERIF, color: C.paper, fontSize: 72, fontWeight: 600 }}>
          마음에 닿는 <span style={{ color: C.terra }}>에세이</span>
        </Reveal>
        <div style={{ display: "flex", gap: 22, marginTop: 56, alignItems: "flex-end" }}>
          {labels.map((l, i) => (
            <BookSpine key={l} label={l} color={colors[i]} index={i} appearAt={28} />
          ))}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S5 — 분야: 예술 (34–44s) =====
export const S5: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const frames = ["#B98A4B", C.terra, C.sage];
  return (
    <SceneFade durationInFrames={dur}>
      <PaperBg tone={2} />
      <AbsoluteFill style={center}>
        <Kicker delay={4}>ART</Kicker>
        <Reveal delay={14} style={{ marginTop: 18, fontFamily: SERIF, color: C.paper, fontSize: 72, fontWeight: 600 }}>
          곁에 두는 <span style={{ color: C.terra }}>예술</span>
        </Reveal>
        <div style={{ display: "flex", gap: 40, marginTop: 56 }}>
          {frames.map((col, i) => {
            const s = spring({ frame: frame - 26 - i * 8, fps, config: { damping: 16 } });
            return (
              <div
                key={i}
                style={{
                  opacity: s,
                  transform: `translateY(${(1 - s) * 30}px) rotate(${(i - 1) * 2}deg)`,
                  width: 200,
                  height: 250,
                  background: C.paper,
                  padding: 14,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
                }}
              >
                <div style={{ width: "100%", height: "100%", background: col, opacity: 0.85 }} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S6 — 임프린트: 디페랑스 (44–51s) =====
export const S6: React.FC<{ dur: number }> = ({ dur }) => {
  return (
    <SceneFade durationInFrames={dur}>
      <PaperBg tone={1} />
      <AbsoluteFill style={center}>
        <Reveal delay={4} style={{ fontFamily: SANS, color: C.sub, fontSize: 30, fontWeight: 500 }}>
          다반과 함께하는 임프린트
        </Reveal>
        <Reveal delay={18} style={{ marginTop: 22, fontFamily: SERIF, color: C.paper, fontSize: 88, fontWeight: 700, letterSpacing: 2 }}>
          {IMPRINT}
        </Reveal>
        <Reveal delay={30} style={{ marginTop: 10, fontFamily: SANS, color: C.terra, fontSize: 34, fontWeight: 600, letterSpacing: 4 }}>
          {IMPRINT_EN}
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S7 — 약속 (51–56s) =====
export const S7: React.FC<{ dur: number }> = ({ dur }) => {
  return (
    <SceneFade durationInFrames={dur}>
      <PaperBg tone={0} />
      <AbsoluteFill style={center}>
        <Reveal delay={4} style={{ fontFamily: SERIF, color: C.paper, fontSize: 64, fontWeight: 600, lineHeight: 1.4 }}>
          평범한 하루를,
        </Reveal>
        <Reveal delay={18} style={{ marginTop: 8, fontFamily: SERIF, color: C.terra, fontSize: 80, fontWeight: 700, lineHeight: 1.3 }}>
          한 뼘 더 특별하게.
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S8 — CTA (56–60s) =====
export const S8: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 4, fps, config: { damping: 13 } });
  return (
    <SceneFade durationInFrames={dur}>
      <PaperBg tone={1} />
      <AbsoluteFill style={center}>
        <div style={{ opacity: s, transform: `scale(${0.86 + s * 0.14})` }}>
          <DabanLogo size={120} sub="에세이 · 예술" />
        </div>
        <Reveal delay={26} style={{ marginTop: 36, fontFamily: SANS, color: C.sub, fontSize: 32, fontWeight: 500 }}>
          {HOME}
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};
