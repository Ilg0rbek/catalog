import { Button } from "antd";
import * as React from "react";
import tapSound from '../../../../../assets/sound/ui/ui_tap-variant.wav'
import { Howl } from 'howler'

const audio = new Howl({
    src: [tapSound]
})
export const tapSoundExecute = () => {
    audio.play();
}
