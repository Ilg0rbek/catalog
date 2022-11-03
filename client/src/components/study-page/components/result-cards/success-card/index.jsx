import React from "react";
import { stylesParse } from "../../../../../helpers";
import styles from "./styles.module.css";
import { AudioPlayer, Loader } from "../../../../common";
import { Button } from "antd";
import { ErrorSoundSoundButton, RightSoundSoundButton, SoundButton } from "../../../../common/hoc/sounds/tap-ui-sound";

export const SuccessStudyCard = ({ word, onResult }) => {
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
          {word?.from?.text ? (
            <>
              <p className={styles.boldText}> Слово:</p>
              <p className={styles.text}>{word.from.text}</p>
            </>
          ) : (
            <>
              <p className={styles.boldText}> Идиома:</p>
              <p className={styles.text}>{word.word.text}</p>
            </>
          )}

        </div>
        {(word?.from?.transcription || word?.word?.transcription) && (
          <div className={styles.contentWrapper}>
            <p className={styles.boldText}> Транскрипция: </p>
            <p className={styles.text}>{word?.from?.transcription || word?.word?.transcription}</p>
          </div> 
        )}
        <div className={styles.contentWrapper}>
          <p className={styles.boldText}> Перевод:</p>
          <p className={styles.text}>{word?.to?.text || word.literalTranslation}</p>
        </div>

        {word?.from && !word.from.noAudio ? (
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
        <RightSoundSoundButton className={styles.button} onClick={() => onResult(true)}>
          Правильно
        </RightSoundSoundButton>
        <ErrorSoundSoundButton
          className={styles.button}
          danger
          onClick={() => onResult(false)}
        >
          Не правильно
        </ErrorSoundSoundButton>
      </div>
    </div>
  );
};
