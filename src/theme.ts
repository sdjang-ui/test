// Visual theme for the Wikibook brand intro.
// NOTE: These colors are an independent, neutral "trustworthy tech" palette
// chosen for this video. They are NOT claimed to be Wikibook's official brand
// colors (the actual site assets could not be downloaded — see README/SOURCES).

export const FONT = '"Noto Sans KR", system-ui, sans-serif';

export const COLORS = {
  ink: "#0B1220", // deep navy background
  ink2: "#121C30",
  paper: "#F5F7FB",
  white: "#FFFFFF",
  sub: "#9FB0CC", // muted blue-grey for secondary text
  accent: "#2DD4BF", // teal accent
  accent2: "#3B82F6", // blue accent
  line: "rgba(159,176,204,0.18)",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 1800; // 60s

// Scene layout in frames (fps = 30)
export const SCENES = {
  s1: { from: 0, dur: 240 }, // 0-8s   Hook
  s2: { from: 240, dur: 270 }, // 8-17s  Who we are (tagline)
  s3: { from: 510, dur: 330 }, // 17-28s Fields / categories
  s4: { from: 840, dur: 300 }, // 28-38s Real books
  s5: { from: 1140, dur: 270 }, // 38-47s Trust / open example code
  s6: { from: 1410, dur: 240 }, // 47-55s Series
  s7: { from: 1650, dur: 150 }, // 55-60s CTA / logo
};
