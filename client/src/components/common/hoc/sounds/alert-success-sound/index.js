import { Alert, Button } from "antd";
import * as React from "react";
import alertSuccessSound from "../../../../../assets/sound/ui/notification_success.wav";
import alertErrorSound from "../../../../../assets/sound/ui/alert_error.wav";
import { Howl } from 'howler';

export const EffectSuccessHOC = (Component) =>
  function Comp(props) {
    const audio = new Howl({
      src: [alertSuccessSound]
    })
    React.useEffect(() => {
      audio.play();
    }, []);
    return <Component {...props} />;
  };
export const EffectErrorHOC = (Component) =>
  function Comp(props) {
    const audio = new Howl({
      src: [alertErrorSound]
    })
    React.useEffect(() => {
      audio.play();
    }, []);
    return <Component {...props} />;
  };
export const SoundAlertSuccess = EffectSuccessHOC(Alert);
export const SoundAlertError = EffectErrorHOC(Alert);
