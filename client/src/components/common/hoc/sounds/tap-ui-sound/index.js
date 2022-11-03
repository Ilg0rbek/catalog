import { Button } from "antd";
import * as React from "react";
import tapSound from "../../../../../assets/sound/ui/ui_tap-variant.wav";
import taskRigthSound from "../../../../../assets/sound/ui/task-right.wav";
import taskCompleteSound from "../../../../../assets/sound/ui/task-completed.wav";
import alertErrorSound from "../../../../../assets/sound/ui/alert_error.wav";
import { Howl } from 'howler'

const TapSoundBuilder = (sound) => {
  return (Component) => (props) => {
    const audio = new Howl({
      src: [sound]
    })
    const handleClick = () => {
      //sound
      audio.play();
      //handle event
      if (props.onClick && typeof props.onClick == "function") props?.onClick();
    };
    return <Component {...props} onClick={handleClick} />;
  };
};
const TapSoundHOC = TapSoundBuilder(tapSound);
const TaskRightSoundHOC = TapSoundBuilder(taskRigthSound);
const TaskErrorSoundHOC = TapSoundBuilder(alertErrorSound);
const TaskCompleteSoundHOC = TapSoundBuilder(taskCompleteSound);

//Buttons
export const SoundButton = TapSoundHOC(Button);
export const RightSoundSoundButton = TaskRightSoundHOC(Button);
export const ErrorSoundSoundButton = TaskErrorSoundHOC(Button);
export const TaskCompletedSoundButton = TaskCompleteSoundHOC(Button);
