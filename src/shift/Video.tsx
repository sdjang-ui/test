import React from "react";
import { AbsoluteFill, Sequence, continueRender, delayRender } from "remotion";
import { SC } from "./theme";
import { S1, S2, S3, S4, S5, S6, S7, S8 } from "./scenes";

import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/600.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/800.css";
import "@fontsource/noto-sans-kr/900.css";

export const ShiftIntro: React.FC = () => {
  const [handle] = React.useState(() => delayRender("Loading Korean fonts"));
  React.useEffect(() => {
    const fonts = (document as any).fonts;
    if (fonts && fonts.ready) {
      fonts.ready.then(() => continueRender(handle));
    } else {
      continueRender(handle);
    }
  }, [handle]);

  const scenes = [S1, S2, S3, S4, S5, S6, S7, S8];
  const keys = Object.keys(SC) as (keyof typeof SC)[];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0E1320" }}>
      {scenes.map((Comp, i) => {
        const cfg = SC[keys[i]];
        return (
          <Sequence key={i} from={cfg.from} durationInFrames={cfg.dur}>
            <Comp dur={cfg.dur} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
