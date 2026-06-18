// Visual theme for the 루아크 brand intro — quiet, literary, "breath/wind".
// NOTE: palette/typography are an independent editorial choice for this video,
// NOT claimed to be the publisher's official brand identity (site assets could
// not be downloaded — see RUACH_SOURCES.md).

export const SANS = '"Noto Sans KR", system-ui, sans-serif';
export const SERIF = '"Noto Serif KR", serif';

export const C = {
  ink: "#0F1620", // deep night
  ink2: "#18222E",
  paper: "#EFEAE0", // warm off-white
  sub: "#9FB0BC", // muted blue-grey
  wind: "#86B4C9", // soft wind blue
  gold: "#C9A86A", // warm gold accent
  line: "rgba(159,176,188,0.18)",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 1800; // 60s

// 11 scenes
export const SC = {
  s1: { from: 0, dur: 150 }, // 0-5    Hook: 조용히 스며드는 책
  s2: { from: 150, dur: 150 }, // 5-10   이름 '루아크'
  s3: { from: 300, dur: 180 }, // 10-16  이름 뜻: 숨/바람
  s4: { from: 480, dur: 180 }, // 16-22  분야: 인문·역사·교양
  s5: { from: 660, dur: 150 }, // 22-27  2017, 한 권의 책
  s6: { from: 810, dur: 180 }, // 27-33  경성의 건축가들 (도서)
  s7: { from: 990, dur: 180 }, // 33-39  관점: 삶에 주목
  s8: { from: 1170, dur: 180 }, // 39-45 가려진 이야기 복원
  s9: { from: 1350, dur: 150 }, // 45-50 느리지만 단단한 책
  s10: { from: 1500, dur: 150 }, // 50-55 오래 곁에 두는 책
  s11: { from: 1650, dur: 150 }, // 55-60 CTA
};
