import React from "react";
import { stylesParse } from "../../../../../helpers";
import styles from "./styles.module.css";
import { AudioPlayer, Loader } from "../../../../common";
import { Button } from "antd";
import { ErrorSoundSoundButton, RightSoundSoundButton, SoundButton } from "../../../../common/hoc/sounds/tap-ui-sound";

export const Iteration2Card = ({
  word,
  onSuccess,
  onError,
  groupKey,
  innerKey,
}) => {
  if (!word) {
    return (
      <div className="centered">
        <Loader />
      </div>
    );
  }
  const getCurrentTranslation = (translations) => {
    //get first right translate
    const translation = translations.find((el) => el.to.lang == "RU" || el.lang === "RU");
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

      <div className={styles.contentWrapper}>
        <img
          className={styles.imgIllustration}
          src={`${process.env.REACT_APP_API_URL_WORDS_STATIC}/${word?.illustration?.image}`}
          alt={"illustration"}
        />
      </div>
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
