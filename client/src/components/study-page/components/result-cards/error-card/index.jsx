import React from "react";
import { stylesParse } from "../../../../../helpers";
import styles from "./styles.module.css";
import { AudioPlayer, Loader } from "../../../../common";
import { Button } from "antd";
import { SoundButton } from "../../../../common/hoc/sounds/tap-ui-sound";

export const ErrorStudyCard = ({ word, onResult }) => {
  const getCurrentTranslation = (translations) => {
    //get first right translate
    const translation = translations.find((el) => el.to.lang == "RU");
    return translation;
  };
  if (!word) {
    return <Loader />;
  }
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.infoWrapper}>
        <div className={styles.contentWrapper}>
          <p className={styles.boldText}> Слово:</p>
          <p className={styles.text}>{word.from.text}</p>
        </div>

        <div className={styles.contentWrapper}>
          <p className={styles.boldText}> Перевод:</p>
          <p className={styles.text}>{word.to.text}</p>
        </div>
        {!word.from.noAudio ? (
          <div className={styles.contentWrapper}>
            <p className={styles.boldText}> Воспроизвести:</p>
            <AudioPlayer
              disabled={!!!word?.from.audios[0]?.src}
              url={word?.from.audios[0]?.src}
            />
          </div>
        ) : null}
      </div>

      <div className={styles.memoWrapper}>
        <p className={styles.boldText}> СЮЖЕТ:</p>
        <p className={styles.memoText}>{`${word?.story?.text}`}</p>
      </div>

      <div>
        <img
          className={styles.imgIllustration}
          src={`${process.env.REACT_APP_API_URL_WORDS_STATIC}/${word?.illustration?.image}`}
          alt={"illustration"}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <SoundButton className={styles.button} onClick={() => onResult(false)}>
          Дальше
        </SoundButton>
      </div>
    </div>
  );
};
