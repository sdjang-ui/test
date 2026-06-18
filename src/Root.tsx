import React from "react";
import { Composition } from "remotion";
import { WikibookIntro } from "./Video";
import { DURATION, FPS, HEIGHT, WIDTH } from "./theme";
import { ShiftIntro } from "./shift/Video";
import { DURATION as SHIFT_DURATION } from "./shift/theme";
import { DabanIntro } from "./daban/Video";
import { DURATION as DABAN_DURATION } from "./daban/theme";
import { RuachIntro } from "./ruach/Video";
import { DURATION as RUACH_DURATION } from "./ruach/theme";
import { MytomoIntro } from "./mytomo/Video";
import { DURATION as MYTOMO_DURATION } from "./mytomo/theme";

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
      <Composition
        id="DabanIntro"
        component={DabanIntro}
        durationInFrames={DABAN_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="RuachIntro"
        component={RuachIntro}
        durationInFrames={RUACH_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="MytomoIntro"
        component={MytomoIntro}
        durationInFrames={MYTOMO_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
