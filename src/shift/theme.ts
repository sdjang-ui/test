// Visual theme for the 시프트 brand intro.
// NOTE: palette is an independent "warm, trustworthy editorial" choice for this
// video — NOT claimed to be the publisher's official brand colors (site assets
// could not be downloaded; see SOURCES.md).

export const FONT = '"Noto Sans KR", system-ui, sans-serif';

export const C = {
  ink: "#0E1320", // deep ink-navy
  ink2: "#161E32",
  paper: "#F4F1EA", // warm paper
  white: "#FFFFFF",
  sub: "#9AA6BF",
  amber: "#F5A524", // warm accent (movement / optimism)
  amber2: "#FF7A59",
  line: "rgba(154,166,191,0.16)",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// 8 scenes, 60s = 1800 frames
export const SC = {
  s1: { from: 0, dur: 210 }, // 0-7   Hook: 같은 자리
  s2: { from: 210, dur: 240 }, // 7-15  한 권의 책이
  s3: { from: 450, dur: 270 }, // 15-24 한 칸 옮김 (shift)
  s4: { from: 720, dur: 270 }, // 24-33 이름 공개 / 로고
  s5: { from: 990, dur: 270 }, // 33-42 소개 문구 (verified)
  s6: { from: 1260, dur: 240 }, // 42-50 실용 = 바로 쓰는 책
  s7: { from: 1500, dur: 180 }, // 50-56 방향을 바꾸다
  s8: { from: 1680, dur: 120 }, // 56-60 CTA / 홈페이지
};
export const DURATION = 1800;
