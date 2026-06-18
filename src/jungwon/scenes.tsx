import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, SANS, SERIF } from "./theme";
import { FIELD, HANDLE, HOME, MEANING, NAME } from "./data";
import {
  CoverMock,
  Kicker,
  JungwonLogo,
  Reveal,
  SceneFade,
  SkyBg,
} from "./components";

const center: React.CSSProperties = { justifyContent: "center", alignItems: "center", textAlign: "center" };

// ===== S1 — Hook (0–5s) =====
export const S1: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <SkyBg tone={0} />
    <AbsoluteFill style={center}>
      <Reveal delay={8} style={{ fontFamily: SERIF, color: C.paper, fontSize: 64, fontWeight: 600, lineHeight: 1.4 }}>
        책을 펼치기 전, <span style={{ color: C.gold }}>가장 먼저</span> 만나는 것.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S2 — 답: 표지 + 이름 (5–10s) =====
export const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 6, fps, config: { damping: 15 } });
  return (
    <SceneFade durationInFrames={dur}>
      <SkyBg tone={1} />
      <AbsoluteFill style={{ ...center, flexDirection: "row", gap: 70 }}>
        <CoverMock field={C.green} accent={C.gold} variant={0} width={230} appear={4} />
        <div style={{ textAlign: "left" }}>
          <div style={{ opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
            <JungwonLogo size={120} sub={HANDLE} />
          </div>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S3 — 이름 의미 (10–15s) =====
export const S3: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <SkyBg tone={2} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SERIF, color: C.paper, fontSize: 54, fontWeight: 600 }}>
        <span style={{ color: C.green }}>{NAME}</span>,
      </Reveal>
      <Reveal delay={18} style={{ marginTop: 18, fontFamily: SANS, color: C.sub, fontSize: 40, fontWeight: 500 }}>
        {MEANING}.
      </Reveal>
      <Reveal delay={32} style={{ marginTop: 26, fontFamily: SERIF, color: C.paper, fontSize: 40, fontWeight: 500, lineHeight: 1.4 }}>
        글 위에 피어나는, 한 권의 표지.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S4 — 표지 = 책의 얼굴 (15–20s) =====
export const S4: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <SkyBg tone={1} />
    <AbsoluteFill style={center}>
      <Kicker delay={4}>BOOK COVER DESIGN</Kicker>
      <Reveal delay={14} style={{ marginTop: 18, fontFamily: SERIF, color: C.paper, fontSize: 64, fontWeight: 700 }}>
        표지는 책의 <span style={{ color: C.coral }}>얼굴</span>입니다.
      </Reveal>
      <Reveal delay={28} style={{ marginTop: 18, fontFamily: SANS, color: C.sub, fontSize: 30, fontWeight: 500 }}>
        {FIELD} — 첫인상을 짓는 일
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S5 — craft: 타이포그래피 (20–26s) =====
export const S5: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const weights = [300, 500, 700, 900];
  return (
    <SceneFade durationInFrames={dur}>
      <SkyBg tone={0} />
      <AbsoluteFill style={center}>
        <Kicker delay={4}>01 · TYPOGRAPHY</Kicker>
        <Reveal delay={12} style={{ marginTop: 14, fontFamily: SANS, color: C.paper, fontSize: 44, fontWeight: 600 }}>
          제목을 시각 언어로
        </Reveal>
        <div style={{ display: "flex", gap: 40, marginTop: 40, alignItems: "baseline" }}>
          {weights.map((w, i) => {
            const o = interpolate(frame, [24 + i * 8, 40 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <span key={w} style={{ opacity: o, fontFamily: SERIF, color: i === 2 ? C.gold : C.paper, fontWeight: w as any, fontSize: 120, lineHeight: 1 }}>
                가
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S6 — craft: 색 (26–32s) =====
export const S6: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palette = [C.green, C.gold, C.coral, "#6E7FB0", "#C76E8A"];
  return (
    <SceneFade durationInFrames={dur}>
      <SkyBg tone={1} />
      <AbsoluteFill style={center}>
        <Kicker delay={4}>02 · COLOR</Kicker>
        <Reveal delay={12} style={{ marginTop: 14, fontFamily: SANS, color: C.paper, fontSize: 44, fontWeight: 600 }}>
          색으로 분위기를
        </Reveal>
        <div style={{ display: "flex", gap: 22, marginTop: 44 }}>
          {palette.map((p, i) => {
            const s = spring({ frame: frame - 24 - i * 6, fps, config: { damping: 16 } });
            return (
              <div key={i} style={{ opacity: s, transform: `translateY(${(1 - s) * 30}px)`, width: 120, height: 160, borderRadius: 10, background: p, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }} />
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S7 — craft: 이미지·여백 (32–38s) =====
export const S7: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <SkyBg tone={2} />
    <AbsoluteFill style={{ ...center, flexDirection: "row", gap: 60 }}>
      <CoverMock field={"#26304E"} accent={C.coral} variant={2} width={250} appear={6} />
      <div style={{ textAlign: "left", maxWidth: 560 }}>
        <Kicker delay={10}>03 · IMAGE & SPACE</Kicker>
        <Reveal delay={20} style={{ marginTop: 16, fontFamily: SANS, color: C.paper, fontSize: 46, fontWeight: 600, lineHeight: 1.35 }}>
          이미지와 여백으로<br />이야기를 담습니다.
        </Reveal>
      </div>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S8 — process: 수많은 시안 → 하나 (38–44s) =====
export const S8: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const fields = [
    { f: C.green, a: C.gold, v: 0 },
    { f: "#2A3358", a: C.coral, v: 1 },
    { f: C.coral, a: C.paper, v: 2 },
    { f: "#6E7FB0", a: C.gold, v: 0 },
    { f: C.gold, a: "#2A3358", v: 1 },
  ];
  // the chosen one (index 1) scales up, others fade
  return (
    <SceneFade durationInFrames={dur}>
      <SkyBg tone={1} />
      <AbsoluteFill style={center}>
        <Kicker delay={4}>04 · PROCESS</Kicker>
        <div style={{ display: "flex", gap: 20, marginTop: 30, alignItems: "center" }}>
          {fields.map((c, i) => {
            const chosen = i === 1;
            const dim = interpolate(frame, [70, 95], [1, chosen ? 1 : 0.22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const sc = interpolate(frame, [70, 95], [1, chosen ? 1.16 : 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: dim, transform: `scale(${sc})` }}>
                <CoverMock field={c.f} accent={c.a} variant={c.v} width={150} appear={6} index={i} />
              </div>
            );
          })}
        </div>
        <Reveal delay={64} style={{ marginTop: 34, fontFamily: SERIF, color: C.paper, fontSize: 46, fontWeight: 600 }}>
          수많은 시안 끝에, <span style={{ color: C.gold }}>단 하나</span>.
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S9 — result: 피어나는 표지 (44–49s) =====
export const S9: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <SkyBg tone={0} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SERIF, color: C.paper, fontSize: 60, fontWeight: 600, lineHeight: 1.4 }}>
        한 권의 표지가, <span style={{ color: C.green }}>피어납니다.</span>
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S10 — positioning: 손이 가는 표지 (49–54s) =====
export const S10: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <SkyBg tone={1} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SERIF, color: C.paper, fontSize: 56, fontWeight: 600, lineHeight: 1.4 }}>
        수많은 책 사이에서,
      </Reveal>
      <Reveal delay={18} style={{ marginTop: 10, fontFamily: SERIF, color: C.gold, fontSize: 64, fontWeight: 700 }}>
        손이 가는 한 권으로.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S11 — CTA (54–60s) =====
export const S11: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 4, fps, config: { damping: 13 } });
  return (
    <SceneFade durationInFrames={dur}>
      <SkyBg tone={2} />
      <AbsoluteFill style={center}>
        <div style={{ opacity: s, transform: `scale(${0.86 + s * 0.14})` }}>
          <JungwonLogo size={120} sub={FIELD} />
        </div>
        <Reveal delay={26} style={{ marginTop: 34, fontFamily: SANS, color: C.sub, fontSize: 32, fontWeight: 500 }}>
          {HOME}
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};
