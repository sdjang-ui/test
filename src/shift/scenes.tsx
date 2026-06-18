import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C } from "./theme";
import { DESC, HOME_CANVA, HOME_NOTION } from "./data";
import {
  Kicker,
  Reveal,
  SceneFade,
  ShiftBg,
  ShiftLogo,
  ShiftMark,
} from "./components";

const center: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

// ===== S1 — Hook: 같은 자리 (0–7s) =====
export const S1: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const rows = 5;
  return (
    <SceneFade durationInFrames={dur}>
      <ShiftBg tone={0} />
      <AbsoluteFill style={{ ...center }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBottom: 60 }}>
          {Array.from({ length: rows }).map((_, i) => {
            const o = interpolate(frame, [i * 6, i * 6 + 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={i}
                style={{
                  width: 360,
                  height: 16,
                  borderRadius: 8,
                  background: C.line,
                  opacity: o,
                }}
              />
            );
          })}
        </div>
        <Reveal delay={36} style={{ color: C.white, fontSize: 64, fontWeight: 900 }}>
          매일, 같은 자리에서.
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S2 — 한 권의 책이 (7–15s) =====
export const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bookS = spring({ frame: frame - 10, fps, config: { damping: 16 } });
  return (
    <SceneFade durationInFrames={dur}>
      <ShiftBg tone={1} />
      <AbsoluteFill style={{ ...center }}>
        <div
          style={{
            width: 200,
            height: 270,
            borderRadius: 12,
            background: `linear-gradient(160deg, ${C.ink2} 0%, #0a0f1a 100%)`,
            border: `1px solid ${C.line}`,
            boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
            transform: `translateY(${(1 - bookS) * 50}px) scale(${0.9 + bookS * 0.1})`,
            opacity: bookS,
            position: "relative",
            overflow: "hidden",
            marginBottom: 50,
          }}
        >
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 10, background: C.amber }} />
        </div>
        <Reveal delay={26} style={{ color: C.white, fontSize: 60, fontWeight: 900 }}>
          그런데, 한 권의 책이
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S3 — 한 칸 옮김 / shift (15–24s) =====
export const S3: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [24, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <SceneFade durationInFrames={dur}>
      <ShiftBg tone={2} />
      <AbsoluteFill style={{ ...center }}>
        <Kicker delay={4}>S · H · I · F · T</Kicker>
        <div style={{ height: 30 }} />
        <ShiftMark size={120} progress={progress} />
        <div style={{ height: 24 }} />
        <Reveal delay={30} style={{ color: C.white, fontSize: 58, fontWeight: 900 }}>
          생각의 위치를 <span style={{ color: C.amber }}>한 칸</span> 옮깁니다.
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S4 — 이름 공개 / 로고 (24–33s) =====
export const S4: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 8, fps, config: { damping: 14 } });
  return (
    <SceneFade durationInFrames={dur}>
      <ShiftBg tone={1} />
      <AbsoluteFill style={{ ...center }}>
        <div style={{ opacity: s, transform: `scale(${0.85 + s * 0.15})` }}>
          <ShiftLogo size={150} />
        </div>
        <Reveal delay={40} style={{ marginTop: 48, color: C.sub, fontSize: 34, fontWeight: 600 }}>
          작은 전환을 만드는 출판사
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S5 — 소개 문구 (verified) (33–42s) =====
export const S5: React.FC<{ dur: number }> = ({ dur }) => {
  // DESC = "실용적인 책, 도움이 되는 책을 만드는 출판사"
  const parts = ["실용적인 책,", "도움이 되는 책."];
  return (
    <SceneFade durationInFrames={dur}>
      <ShiftBg tone={0} />
      <AbsoluteFill style={{ ...center, padding: 120 }}>
        <Kicker delay={4}>우리가 만드는 책</Kicker>
        <div style={{ height: 44 }} />
        {parts.map((p, i) => (
          <Reveal key={p} delay={18 + i * 16} style={{ color: C.white, fontSize: 86, fontWeight: 900, lineHeight: 1.2 }}>
            {p}
          </Reveal>
        ))}
        <Reveal delay={60} style={{ marginTop: 40, color: C.sub, fontSize: 30, fontWeight: 600 }}>
          — 도서출판 시프트 소개 문구
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S6 — 실용 = 바로 쓰는 책 (42–50s) =====
export const S6: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tags = ["펼치면 바로", "오늘부터 적용", "삶에 가까이"];
  return (
    <SceneFade durationInFrames={dur}>
      <ShiftBg tone={2} />
      <AbsoluteFill style={{ ...center }}>
        <Reveal delay={4} style={{ color: C.white, fontSize: 62, fontWeight: 900 }}>
          읽고 끝나지 않는 책
        </Reveal>
        <div style={{ display: "flex", gap: 24, marginTop: 56 }}>
          {tags.map((t, i) => {
            const sp = spring({ frame: frame - 20 - i * 8, fps, config: { damping: 16 } });
            return (
              <div
                key={t}
                style={{
                  opacity: sp,
                  transform: `translateY(${(1 - sp) * 24}px)`,
                  padding: "22px 40px",
                  borderRadius: 100,
                  border: `1.5px solid ${C.line}`,
                  background: "rgba(255,255,255,0.03)",
                  color: C.paper,
                  fontSize: 36,
                  fontWeight: 700,
                }}
              >
                {t}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S7 — 방향을 바꾸다 (50–56s) =====
export const S7: React.FC<{ dur: number }> = ({ dur }) => {
  return (
    <SceneFade durationInFrames={dur}>
      <ShiftBg tone={1} />
      <AbsoluteFill style={{ ...center }}>
        <Reveal delay={4} style={{ color: C.white, fontSize: 64, fontWeight: 900, lineHeight: 1.3 }}>
          한 페이지가 하루를,
        </Reveal>
        <Reveal delay={20} style={{ color: C.amber, fontSize: 76, fontWeight: 900, lineHeight: 1.3 }}>
          한 권이 방향을 바꿉니다.
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S8 — CTA / 홈페이지 (56–60s) =====
export const S8: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 4, fps, config: { damping: 13 } });
  return (
    <SceneFade durationInFrames={dur}>
      <ShiftBg tone={0} />
      <AbsoluteFill style={{ ...center }}>
        <div style={{ opacity: s, transform: `scale(${0.85 + s * 0.15})` }}>
          <ShiftLogo size={120} />
        </div>
        <Reveal delay={26} style={{ marginTop: 40, color: C.sub, fontSize: 32, fontWeight: 600 }}>
          {HOME_CANVA} · {HOME_NOTION}
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};
