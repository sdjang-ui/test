import React from "react";
import { AbsoluteFill, Sequence, continueRender, delayRender } from "remotion";
import { SCENES } from "./theme";
import {
  Scene1,
  Scene2,
  Scene3,
  Scene4,
  Scene5,
  Scene6,
  Scene7,
} from "./scenes";

import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/600.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/800.css";
import "@fontsource/noto-sans-kr/900.css";

export const WikibookIntro: React.FC = () => {
  const [handle] = React.useState(() => delayRender("Loading Korean fonts"));
  React.useEffect(() => {
    const fonts = (document as any).fonts;
    if (fonts && fonts.ready) {
      fonts.ready.then(() => continueRender(handle));
    } else {
      continueRender(handle);
    }
  }, [handle]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B1220" }}>
      <Sequence from={SCENES.s1.from} durationInFrames={SCENES.s1.dur}>
        <Scene1 dur={SCENES.s1.dur} />
      </Sequence>
      <Sequence from={SCENES.s2.from} durationInFrames={SCENES.s2.dur}>
        <Scene2 dur={SCENES.s2.dur} />
      </Sequence>
      <Sequence from={SCENES.s3.from} durationInFrames={SCENES.s3.dur}>
        <Scene3 dur={SCENES.s3.dur} />
      </Sequence>
      <Sequence from={SCENES.s4.from} durationInFrames={SCENES.s4.dur}>
        <Scene4 dur={SCENES.s4.dur} />
      </Sequence>
      <Sequence from={SCENES.s5.from} durationInFrames={SCENES.s5.dur}>
        <Scene5 dur={SCENES.s5.dur} />
      </Sequence>
      <Sequence from={SCENES.s6.from} durationInFrames={SCENES.s6.dur}>
        <Scene6 dur={SCENES.s6.dur} />
      </Sequence>
      <Sequence from={SCENES.s7.from} durationInFrames={SCENES.s7.dur}>
        <Scene7 dur={SCENES.s7.dur} />
      </Sequence>
    </AbsoluteFill>
  );
};
