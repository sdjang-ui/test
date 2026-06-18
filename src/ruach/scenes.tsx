import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { C, SANS, SERIF } from "./theme";
import { FEATURED, FIELDS, HOME, NAME, WORD_MEANING } from "./data";
import {
  BookCard,
  Kicker,
  Reveal,
  RuachLogo,
  SceneFade,
  WindBg,
} from "./components";

const center: React.CSSProperties = { justifyContent: "center", alignItems: "center", textAlign: "center" };

// ===== S1 — Hook (0–5s) =====
export const S1: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <WindBg tone={0} />
    <AbsoluteFill style={center}>
      <Reveal delay={8} style={{ fontFamily: SERIF, color: C.paper, fontSize: 68, fontWeight: 600, lineHeight: 1.4 }}>
        어떤 책은, <span style={{ color: C.wind }}>조용히</span> 스며듭니다.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S2 — 이름 (5–10s) =====
export const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 6, fps, config: { damping: 14 } });
  return (
    <SceneFade durationInFrames={dur}>
      <WindBg tone={1} />
      <AbsoluteFill style={center}>
        <div style={{ opacity: s, transform: `scale(${0.85 + s * 0.15})` }}>
          <RuachLogo size={170} />
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S3 — 이름 뜻 (10–16s) =====
export const S3: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <WindBg tone={2} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SERIF, color: C.paper, fontSize: 64, fontWeight: 600 }}>
        <span style={{ color: C.wind }}>{NAME}</span>,
      </Reveal>
      <Reveal delay={20} style={{ marginTop: 24, fontFamily: SANS, color: C.sub, fontSize: 40, fontWeight: 500 }}>
        {WORD_MEANING}.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S4 — 분야 (16–22s) =====
export const S4: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneFade durationInFrames={dur}>
      <WindBg tone={1} />
      <AbsoluteFill style={center}>
        <Kicker delay={4}>WHAT WE MAKE</Kicker>
        <div style={{ display: "flex", gap: 40, marginTop: 44, alignItems: "baseline" }}>
          {FIELDS.map((f, i) => {
            const s = spring({ frame: frame - 16 - i * 10, fps, config: { damping: 16 } });
            return (
              <React.Fragment key={f}>
                {i > 0 && <span style={{ color: C.gold, fontSize: 50, opacity: s }}>·</span>}
                <span
                  style={{
                    opacity: s,
                    transform: `translateY(${(1 - s) * 24}px)`,
                    fontFamily: SERIF,
                    color: C.paper,
                    fontWeight: 700,
                    fontSize: 84,
                  }}
                >
                  {f}
                </span>
              </React.Fragment>
            );
          })}
        </div>
        <Reveal delay={50} style={{ marginTop: 36, fontFamily: SANS, color: C.sub, fontSize: 30, fontWeight: 500 }}>
          깊이 있는 교양을 펴냅니다
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S5 — 2017, 한 권 (22–27s) =====
export const S5: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <WindBg tone={0} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SANS, color: C.wind, fontSize: 40, fontWeight: 700, letterSpacing: 6 }}>
        2017
      </Reveal>
      <Reveal delay={18} style={{ marginTop: 18, fontFamily: SERIF, color: C.paper, fontSize: 60, fontWeight: 600 }}>
        한 권의 책에서 시작합니다.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S6 — 경성의 건축가들 (27–33s) =====
export const S6: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <WindBg tone={1} />
    <AbsoluteFill style={{ ...center, flexDirection: "row", gap: 70 }}>
      <BookCard title={FEATURED.title} author={FEATURED.author} meta="인문 · 역사 · 건축" appearAt={6} />
      <div style={{ textAlign: "left", maxWidth: 560 }}>
        <Reveal delay={20} style={{ fontFamily: SERIF, color: C.paper, fontSize: 56, fontWeight: 700, lineHeight: 1.3 }}>
          『{FEATURED.title}』
        </Reveal>
        <Reveal delay={32} style={{ marginTop: 18, fontFamily: SANS, color: C.sub, fontSize: 32, fontWeight: 500 }}>
          {FEATURED.author} 지음 · {FEATURED.publisher} {FEATURED.year}
        </Reveal>
      </div>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S7 — 관점: 삶에 주목 (33–39s) =====
export const S7: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <WindBg tone={2} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SANS, color: C.sub, fontSize: 36, fontWeight: 500 }}>
        화려한 ‘업적’이 아니라,
      </Reveal>
      <Reveal delay={20} style={{ marginTop: 16, fontFamily: SERIF, color: C.paper, fontSize: 76, fontWeight: 700 }}>
        그들의 <span style={{ color: C.gold }}>‘삶’</span>에 주목하다.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S8 — 가려진 이야기 (39–45s) =====
export const S8: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <WindBg tone={1} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SERIF, color: C.paper, fontSize: 60, fontWeight: 600, lineHeight: 1.4 }}>
        가려져 있던 이야기를,
      </Reveal>
      <Reveal delay={20} style={{ marginTop: 14, fontFamily: SERIF, color: C.wind, fontSize: 60, fontWeight: 600 }}>
        정성껏 되살립니다.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S9 — 느리지만 단단한 (45–50s) =====
export const S9: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <WindBg tone={0} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SERIF, color: C.paper, fontSize: 72, fontWeight: 700 }}>
        느리지만, <span style={{ color: C.gold }}>단단한</span> 책.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S10 — 오래 곁에 두는 (50–55s) =====
export const S10: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <WindBg tone={2} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SERIF, color: C.paper, fontSize: 68, fontWeight: 600, lineHeight: 1.4 }}>
        오래 곁에 두고 읽는 책.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S11 — CTA (55–60s) =====
export const S11: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 4, fps, config: { damping: 13 } });
  return (
    <SceneFade durationInFrames={dur}>
      <WindBg tone={1} />
      <AbsoluteFill style={center}>
        <div style={{ opacity: s, transform: `scale(${0.86 + s * 0.14})` }}>
          <RuachLogo size={120} sub="인문 · 역사 · 교양" />
        </div>
        <Reveal delay={26} style={{ marginTop: 36, fontFamily: SANS, color: C.sub, fontSize: 32, fontWeight: 500 }}>
          {HOME}
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};
