import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "./theme";
import {
  Background,
  BookCover,
  Chip,
  Logo,
  Reveal,
  SceneFade,
} from "./components";
import { BOOKS, BRAND, DOMAIN, FIELDS, GREETING, SERIES, TAGLINE } from "./data";

const center: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

// ===== Scene 1 — Hook (0–8s) =====
export const Scene1: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  return (
    <SceneFade durationInFrames={dur}>
      <Background variant={0} />
      <AbsoluteFill style={center}>
        <Reveal delay={6} style={{ color: COLORS.sub, fontSize: 40, fontWeight: 600 }}>
          수많은 IT 책 사이에서,
        </Reveal>
        <div style={{ height: 26 }} />
        <Reveal
          delay={18}
          style={{ color: COLORS.white, fontSize: 78, fontWeight: 900, lineHeight: 1.2 }}
        >
          무엇을 펼쳐야 할까요?
        </Reveal>
        <div
          style={{
            marginTop: 60,
            opacity: logoS,
            transform: `scale(${0.8 + logoS * 0.2})`,
          }}
        >
          <Logo size={56} />
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== Scene 2 — Who we are (8–17s) =====
export const Scene2: React.FC<{ dur: number }> = ({ dur }) => {
  return (
    <SceneFade durationInFrames={dur}>
      <Background variant={1} />
      <AbsoluteFill style={{ ...center, padding: 120 }}>
        <Reveal delay={4} style={{ color: COLORS.sub, fontSize: 48, fontWeight: 600 }}>
          {GREETING}
        </Reveal>
        <div style={{ height: 28 }} />
        <Reveal delay={16}>
          <Logo size={104} />
        </Reveal>
        <div style={{ height: 40 }} />
        <Reveal
          delay={30}
          style={{
            color: COLORS.white,
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.35,
          }}
        >
          <span style={{ color: COLORS.accent }}>{TAGLINE}</span>
          <br />
          위키북스입니다.
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== Scene 3 — Fields / categories (17–28s) =====
export const Scene3: React.FC<{ dur: number }> = ({ dur }) => {
  return (
    <SceneFade durationInFrames={dur}>
      <Background variant={2} />
      <AbsoluteFill style={{ ...center, padding: 100 }}>
        <Reveal delay={4} style={{ color: COLORS.white, fontSize: 60, fontWeight: 900 }}>
          IT의 거의 모든 분야
        </Reveal>
        <Reveal
          delay={14}
          style={{ color: COLORS.sub, fontSize: 34, fontWeight: 600, marginTop: 14 }}
        >
          기초 입문서부터 실무 전문서까지
        </Reveal>
        <div
          style={{
            marginTop: 64,
            display: "flex",
            flexWrap: "wrap",
            gap: 22,
            justifyContent: "center",
            maxWidth: 1300,
          }}
        >
          {FIELDS.map((f, i) => (
            <Chip key={f} label={f} index={i} appearAt={36} />
          ))}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== Scene 4 — Real books (28–38s) =====
export const Scene4: React.FC<{ dur: number }> = ({ dur }) => {
  const hues = [200, 168, 260, 215, 280, 190];
  return (
    <SceneFade durationInFrames={dur}>
      <Background variant={1} />
      <AbsoluteFill style={{ ...center, padding: 70 }}>
        <Reveal delay={4} style={{ color: COLORS.white, fontSize: 54, fontWeight: 900 }}>
          한 권 한 권, 실무로 검증된 책
        </Reveal>
        <div
          style={{
            marginTop: 56,
            display: "flex",
            gap: 30,
            justifyContent: "center",
          }}
        >
          {BOOKS.map((b, i) => (
            <BookCover
              key={b.title}
              title={b.title}
              tag={b.tag}
              index={i}
              appearAt={20}
              hue={hues[i % hues.length]}
            />
          ))}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== Scene 5 — Trust / open example code (38–47s) =====
export const Scene5: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const lines = [
    "$ git clone github.com/wikibook",
    ">_ 책 속 모든 예제를 직접 실행",
    "✓ 읽고 — 따라 하고 — 내 것으로",
  ];
  return (
    <SceneFade durationInFrames={dur}>
      <Background variant={2} />
      <AbsoluteFill style={{ ...center, padding: 120 }}>
        <Reveal delay={4} style={{ color: COLORS.white, fontSize: 58, fontWeight: 900 }}>
          코드까지 <span style={{ color: COLORS.accent }}>열어 둡니다</span>
        </Reveal>
        <div
          style={{
            marginTop: 50,
            width: 1040,
            borderRadius: 18,
            background: "rgba(2,8,18,0.8)",
            border: `1px solid ${COLORS.line}`,
            boxShadow: "0 40px 90px rgba(0,0,0,0.5)",
            overflow: "hidden",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              padding: "16px 22px",
              borderBottom: `1px solid ${COLORS.line}`,
            }}
          >
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
              <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />
            ))}
          </div>
          <div style={{ padding: "30px 36px", fontSize: 34, lineHeight: 1.9 }}>
            {lines.map((ln, i) => {
              const show = interpolate(frame, [30 + i * 26, 46 + i * 26], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: show,
                    transform: `translateX(${(1 - show) * 16}px)`,
                    color: i === 0 ? COLORS.accent : COLORS.paper,
                  }}
                >
                  {ln}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== Scene 6 — Series (47–55s) =====
export const Scene6: React.FC<{ dur: number }> = ({ dur }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <SceneFade durationInFrames={dur}>
      <Background variant={0} />
      <AbsoluteFill style={{ ...center, padding: 110 }}>
        <Reveal delay={4} style={{ color: COLORS.sub, fontSize: 34, fontWeight: 600 }}>
          시대를 읽는 기획 시리즈
        </Reveal>
        <div style={{ height: 30 }} />
        <div style={{ display: "flex", gap: 40 }}>
          {SERIES.map((s, i) => {
            const sp = spring({ frame: frame - 16 - i * 12, fps, config: { damping: 16 } });
            return (
              <div
                key={s.name}
                style={{
                  opacity: sp,
                  transform: `translateY(${(1 - sp) * 30}px)`,
                  padding: "46px 60px",
                  borderRadius: 22,
                  background:
                    i === 0
                      ? `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accent2} 100%)`
                      : "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${COLORS.line}`,
                  fontFamily: FONT,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 64,
                    fontWeight: 900,
                    color: i === 0 ? "#06121f" : COLORS.white,
                  }}
                >
                  {s.name}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    marginTop: 10,
                    color: i === 0 ? "rgba(6,18,31,0.7)" : COLORS.sub,
                  }}
                >
                  {s.url}
                </div>
              </div>
            );
          })}
        </div>
        <Reveal
          delay={40}
          style={{ marginTop: 50, color: COLORS.white, fontSize: 40, fontWeight: 700 }}
        >
          AI 시대, 한 걸음 더 앞서서.
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ===== Scene 7 — CTA / Logo (55–60s) =====
export const Scene7: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame: frame - 6, fps, config: { damping: 13 } });
  return (
    <SceneFade durationInFrames={dur}>
      <Background variant={1} />
      <AbsoluteFill style={center}>
        <div style={{ transform: `scale(${0.85 + logoS * 0.15})`, opacity: logoS }}>
          <Logo size={96} />
        </div>
        <Reveal
          delay={26}
          style={{ marginTop: 44, color: COLORS.white, fontSize: 50, fontWeight: 800 }}
        >
          당신의 다음 성장, 위키북스에서.
        </Reveal>
        <Reveal
          delay={40}
          style={{
            marginTop: 26,
            color: COLORS.accent,
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          {DOMAIN}
        </Reveal>
      </AbsoluteFill>
    </SceneFade>
  );
};
