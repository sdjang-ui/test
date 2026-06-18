// Visual theme for the 내친구의서재 brand intro — noir mystery, but warm/trusted.
// NOTE: palette/typography are an independent editorial choice for this video,
// NOT the publisher's official brand identity (site assets could not be
// downloaded — see MYTOMO_SOURCES.md).

export const SANS = '"Noto Sans KR", system-ui, sans-serif';
export const SERIF = '"Noto Serif KR", serif';

export const C = {
  ink: "#0B0C11", // near-black
  ink2: "#14161F",
  paper: "#ECEAE3", // warm off-white
  sub: "#8C93A3", // muted blue-grey
  crimson: "#D23B47", // noir accent
  gold: "#C9A24B", // warm gold
  line: "rgba(140,147,163,0.18)",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 1800; // 60s

// 11 scenes
export const SC = {
  s1: { from: 0, dur: 150 }, // 0-5   Hook (noir)
  s2: { from: 150, dur: 150 }, // 5-10  이름·로고
  s3: { from: 300, dur: 150 }, // 10-15 이름 의미: 친구의 서재
  s4: { from: 450, dur: 180 }, // 15-21 분야: 추리·미스터리
  s5: { from: 630, dur: 180 }, // 21-27 특징: 엄선한 일본 미스터리
  s6: { from: 810, dur: 180 }, // 27-33 대표 작가: 시라이 도모유키
  s7: { from: 990, dur: 180 }, // 33-39 도서 1
  s8: { from: 1170, dur: 180 }, // 39-45 도서 2
  s9: { from: 1350, dur: 150 }, // 45-50 반전의 쾌감
  s10: { from: 1500, dur: 150 }, // 50-55 약속
  s11: { from: 1650, dur: 150 }, // 55-60 CTA
};
