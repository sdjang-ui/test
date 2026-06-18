// Visual theme for the 다반 brand intro — warm, literary, gallery-calm.
// NOTE: palette/typography are an independent editorial choice for this video,
// NOT claimed to be the publisher's official brand identity (site assets could
// not be downloaded — see DABAN_SOURCES.md).

export const SANS = '"Noto Sans KR", system-ui, sans-serif';
export const SERIF = '"Noto Serif KR", serif';

export const C = {
  ink: "#1A140F", // deep espresso/brown-black
  ink2: "#2A2018",
  paper: "#F3EBDD", // warm cream paper
  paperDim: "#D9CDB8",
  white: "#FFFFFF",
  sub: "#B7A98F", // muted warm grey
  terra: "#C97B5A", // terracotta accent
  sage: "#8A9A7B", // muted sage
  line: "rgba(183,169,143,0.22)",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 1800; // 60s

// 8 scenes
export const SC = {
  s1: { from: 0, dur: 210 }, // 0-7   Hook: 하루의 끝
  s2: { from: 210, dur: 240 }, // 7-15  이름 공개 '다반'
  s3: { from: 450, dur: 270 }, // 15-24 정서: 차 한 잔의 시간 (evocative)
  s4: { from: 720, dur: 300 }, // 24-34 분야: 에세이
  s5: { from: 1020, dur: 300 }, // 34-44 분야: 예술
  s6: { from: 1320, dur: 210 }, // 44-51 임프린트: 디페랑스
  s7: { from: 1530, dur: 150 }, // 51-56 약속
  s8: { from: 1680, dur: 120 }, // 56-60 CTA
};
