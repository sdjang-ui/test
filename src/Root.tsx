import React from "react";
import { Composition } from "remotion";
import { WikibookIntro } from "./Video";
import { DURATION, FPS, HEIGHT, WIDTH } from "./theme";
import { ShiftIntro } from "./shift/Video";
import { DURATION as SHIFT_DURATION } from "./shift/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WikibookIntro"
        component={WikibookIntro}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ShiftIntro"
        component={ShiftIntro}
        durationInFrames={SHIFT_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
