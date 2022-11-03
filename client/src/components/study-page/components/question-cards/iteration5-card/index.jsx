import React from "react";
import { stylesParse } from "../../../../../helpers";
import styles from "./styles.module.css";
import { AudioPlayer, Loader } from "../../../../common";
import { Button } from "antd";
import { ErrorSoundSoundButton, RightSoundSoundButton, SoundButton } from "../../../../common/hoc/sounds/tap-ui-sound";

export const Iteration5Card = ({
  word,
  onSuccess,
  onError,
  groupKey,
  innerKey,
}) => {
  if (!word) {
    return <Loader />;
  }
  const getCurrentTranslation = (translations) => {
    //get first right translate
    const translation = translations.find((el) => el.to.lang == "RU");
    return translation;
  };
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.infoWrapper}>
        <div className={styles.contentWrapper}>
          <p className={styles.boldText}> Перевод:</p>
          <p className={styles.text}>
            {word?.to?.text || word.word.text}
          </p>
        </div>
      </div>

      <div className={styles.contentWrapper}></div>
      <div className={styles.buttonWrapper}>
        <RightSoundSoundButton
          className={styles.button}
          onClick={() => onSuccess({ word, groupKey, key: innerKey })}
        >
          Знаю
        </RightSoundSoundButton>
        <ErrorSoundSoundButton
          className={styles.button}
          onClick={() => onError({ word, groupKey, key: innerKey })}
        >
          Не знаю
        </ErrorSoundSoundButton>
      </div>
    </div>
  );
};
