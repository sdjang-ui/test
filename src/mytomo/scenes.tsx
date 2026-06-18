import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, SANS, SERIF } from "./theme";
import { AUTHOR, BOOKS, GENRE, HOME } from "./data";
import {
  Kicker,
  Magnifier,
  MysteryBook,
  MytomoLogo,
  NoirBg,
  QMarks,
  Reveal,
  SceneFade,
} from "./components";

const center: React.CSSProperties = { justifyContent: "center", alignItems: "center", textAlign: "center" };

// ===== S1 — Hook (0–5s) =====
export const S1: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <NoirBg tone={0} />
    <QMarks />
    <AbsoluteFill style={center}>
      <Reveal delay={8} style={{ fontFamily: SERIF, color: C.paper, fontSize: 66, fontWeight: 600, lineHeight: 1.4 }}>
        밤이 깊을수록, <span style={{ color: C.crimson }}>페이지</span>는 빨라집니다.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S2 — 이름·로고 (5–10s) =====
export const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 6, fps, config: { damping: 14 } });
  return (
    <SceneFade durationInFrames={dur}>
      <NoirBg tone={1} />
      <AbsoluteFill style={center}>
        <div style={{ opacity: s, transform: `scale(${0.85 + s * 0.15})` }}>
          <MytomoLogo size={120} />
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S3 — 이름 의미 (10–15s) =====
export const S3: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <NoirBg tone={2} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SERIF, color: C.paper, fontSize: 60, fontWeight: 600, lineHeight: 1.4 }}>
        친구의 <span style={{ color: C.gold }}>서재</span>에서
      </Reveal>
      <Reveal delay={18} style={{ marginTop: 12, fontFamily: SERIF, color: C.paper, fontSize: 60, fontWeight: 600 }}>
        한 권 꺼내 보듯이.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S4 — 분야: 추리·미스터리 (15–21s) =====
export const S4: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <NoirBg tone={1} />
    <AbsoluteFill style={center}>
      <Reveal delay={4}><Magnifier size={150} sweep /></Reveal>
      <div style={{ display: "flex", gap: 34, marginTop: 30, alignItems: "baseline" }}>
        <Reveal delay={16} style={{ fontFamily: SERIF, color: C.paper, fontWeight: 700, fontSize: 92 }}>{GENRE[0]}</Reveal>
        <Reveal delay={22} style={{ color: C.crimson, fontSize: 50 }}>·</Reveal>
        <Reveal delay={28} style={{ fontFamily: SERIF, color: C.paper, fontWeight: 700, fontSize: 92 }}>{GENRE[1]}</Reveal>
      </div>
      <Reveal delay={44} style={{ marginTop: 30, fontFamily: SANS, color: C.sub, fontSize: 30, fontWeight: 500 }}>
        추리·미스터리 소설을 펴냅니다
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S5 — 특징: 엄선한 일본 미스터리 (21–27s) =====
export const S5: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <NoirBg tone={2} />
    <AbsoluteFill style={center}>
      <Kicker delay={4}>CURATED</Kicker>
      <Reveal delay={14} style={{ marginTop: 18, fontFamily: SERIF, color: C.paper, fontSize: 60, fontWeight: 600, lineHeight: 1.4 }}>
        한 권 한 권, 골라 옮긴
      </Reveal>
      <Reveal delay={26} style={{ marginTop: 8, fontFamily: SERIF, color: C.gold, fontSize: 68, fontWeight: 700 }}>
        일본 미스터리
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S6 — 대표 작가 (27–33s) =====
export const S6: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <NoirBg tone={1} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SANS, color: C.sub, fontSize: 32, fontWeight: 500 }}>
        문제작을 선보여온 작가
      </Reveal>
      <Reveal delay={18} style={{ marginTop: 18, fontFamily: SERIF, color: C.paper, fontSize: 86, fontWeight: 700 }}>
        {AUTHOR}
      </Reveal>
      <Reveal delay={32} style={{ marginTop: 18, fontFamily: SANS, color: C.crimson, fontSize: 28, fontWeight: 600, letterSpacing: 2 }}>
        SHIRAI TOMOYUKI
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S7 — 도서 1 (33–39s) =====
export const S7: React.FC<{ dur: number }> = ({ dur }) => {
  const b = BOOKS[0];
  return (
    <SceneFade durationInFrames={dur}>
      <NoirBg tone={2} />
      <AbsoluteFill style={{ ...center, flexDirection: "row", gap: 64 }}>
        <MysteryBook title={b.title} author={b.author} meta={b.meta} tag={b.tag} appearAt={6} />
        <div style={{ textAlign: "left", maxWidth: 540 }}>
          <Reveal delay={22} style={{ fontFamily: SERIF, color: C.paper, fontSize: 52, fontWeight: 700, lineHeight: 1.3, wordBreak: "keep-all" }}>
            『{b.title}』
          </Reveal>
          <Reveal delay={34} style={{ marginTop: 16, fontFamily: SANS, color: C.sub, fontSize: 28, fontWeight: 500 }}>
            {b.author} 지음 · {b.meta}
          </Reveal>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S8 — 도서 2 (39–45s) =====
export const S8: React.FC<{ dur: number }> = ({ dur }) => {
  const b = BOOKS[1];
  return (
    <SceneFade durationInFrames={dur}>
      <NoirBg tone={1} />
      <AbsoluteFill style={{ ...center, flexDirection: "row", gap: 64 }}>
        <div style={{ textAlign: "right", maxWidth: 540 }}>
          <Reveal delay={22} style={{ fontFamily: SERIF, color: C.paper, fontSize: 52, fontWeight: 700, lineHeight: 1.3, wordBreak: "keep-all" }}>
            『{b.title}』
          </Reveal>
          <Reveal delay={34} style={{ marginTop: 16, fontFamily: SANS, color: C.sub, fontSize: 28, fontWeight: 500 }}>
            {b.author} 지음 · 내친구의서재
          </Reveal>
        </div>
        <MysteryBook title={b.title} author={b.author} meta={b.meta} tag={b.tag} appearAt={6} />
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== S9 — 반전의 쾌감 (45–50s) =====
export const S9: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <NoirBg tone={2} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SANS, color: C.sub, fontSize: 34, fontWeight: 500 }}>
        마지막 페이지에서,
      </Reveal>
      <Reveal delay={18} style={{ marginTop: 14, fontFamily: SERIF, color: C.crimson, fontSize: 80, fontWeight: 700 }}>
        뒤집히는 진실.
      </Reveal>
    </AbsoluteFill>
  </SceneFade>
);

// ===== S10 — 약속 (50–55s) =====
export const S10: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneFade durationInFrames={dur}>
    <NoirBg tone={1} />
    <AbsoluteFill style={center}>
      <Reveal delay={6} style={{ fontFamily: SERIF, color: C.paper, fontSize: 64, fontWeight: 600, lineHeight: 1.4 }}>
        오늘 밤, 곁에서 건네는 한 권.
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
      <NoirBg tone={0} />
      <AbsoluteFill style={center}>
        <div style={{ opacity: s, transform: `scale(${0.86 + s * 0.14})` }}>
          <MytomoLogo size={110} sub="추리 · 미스터리" />
        </div>
        <Reveal delay={26} style={{ marginTop: 34, fontFamily: SANS, color: C.sub, fontSize: 32, fontWeight: 500 }}>
          {HOME}
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};
