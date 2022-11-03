import React, { useState, useEffect } from "react";
import { SoundOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./styles.module.css";
import { SoundButton } from "../hoc/sounds/tap-ui-sound";
import { stylesParse } from "../../../helpers";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url))
  const ctx =  new (window.AudioContext || window.webkitAudioContext)()
  function unlockAudioContext(audioCtx) {
    if (audioCtx.state !== 'suspended') return;
    const b = document.body;
    const events = ['touchstart','touchend', 'mousedown','keydown'];
      events.forEach(e => b.addEventListener(e, unlock, false));
      function unlock() { audioCtx.resume().then(clean); }
      function clean() { events.forEach(e => b.removeEventListener(e, unlock)); 
    }
  }
  const [playing, setPlaying] = useState(false);
  const startPlay = () => {
    unlockAudioContext(ctx)
    setPlaying(true);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, startPlay];
};

const Player = ({ url, disabled, extraStyles, extraIconStyles }) => {
  const [playing, startPlay] = useAudio(url);

  return (
    <>
      {playing ? (
        <SoundButton
          className={stylesParse(extraStyles, styles.rowBtn)}
          onClick={startPlay}
          disabled={disabled}
        >
          <SoundOutlined className={styles.icon} />
        </SoundButton>
      ) : (
        <SoundButton
          className={stylesParse(extraStyles, styles.rowBtn)}
          onClick={startPlay}
          disabled={disabled}
        >
          <SoundOutlined
            className={stylesParse(extraIconStyles, styles.icon)}
          />
        </SoundButton>
      )}
    </>
  );
};

export default Player;
