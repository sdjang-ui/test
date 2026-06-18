// Visual theme for the 공중정원 brand intro — airy twilight "garden in the sky".
// NOTE: palette/typography are an independent editorial choice for this video,
// NOT the designer's official brand identity (portfolio could not be accessed —
// see JUNGWON_SOURCES.md). On-screen "covers" are illustrative mockups, not
// real works by 공중정원.

export const SANS = '"Noto Sans KR", system-ui, sans-serif';
export const SERIF = '"Noto Serif KR", serif';

export const C = {
  ink: "#161B2E", // deep twilight
  ink2: "#232B45",
  sky1: "#1B2440",
  sky2: "#3A2E50",
  paper: "#F2EFE9", // warm off-white
  sub: "#A9AEC4", // muted lavender-grey
  green: "#8FB89A", // botanical sage
  gold: "#D8B978", // warm gold
  coral: "#E08A6E", // soft coral
  line: "rgba(169,174,196,0.18)",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 1800; // 60s

// 11 scenes
export const SC = {
  s1: { from: 0, dur: 150 }, // 0-5   Hook: 가장 먼저 만나는 것
  s2: { from: 150, dur: 150 }, // 5-10  답: 표지 + 이름
  s3: { from: 300, dur: 150 }, // 10-15 이름 의미: 공중정원
  s4: { from: 450, dur: 150 }, // 15-20 표지 = 책의 얼굴
  s5: { from: 600, dur: 180 }, // 20-26 craft: 타이포그래피
  s6: { from: 780, dur: 180 }, // 26-32 craft: 색
  s7: { from: 960, dur: 180 }, // 32-38 craft: 이미지·여백
  s8: { from: 1140, dur: 180 }, // 38-44 process: 수많은 시안 → 하나
  s9: { from: 1320, dur: 150 }, // 44-49 result: 피어나는 표지
  s10: { from: 1470, dur: 150 }, // 49-54 positioning: 손이 가는 표지
  s11: { from: 1620, dur: 180 }, // 54-60 CTA
};
