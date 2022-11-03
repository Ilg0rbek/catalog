import React from "react";
import { stylesParse } from "../../../../../helpers";
import styles from "./styles.module.css";
import { AudioPlayer, Loader } from "../../../../common";
import { Button } from "antd";
import { ErrorSoundSoundButton, RightSoundSoundButton, SoundButton } from "../../../../common/hoc/sounds/tap-ui-sound";

export const Iteration1Card = ({
  word,
  onSuccess,
  onError,
  groupKey,
  innerKey,
}) => {
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
          ): (
            <>
              <p className={styles.boldText}> Идиома:</p>
              <p className={styles.text}>{word.word.text}</p>
            </>
          )}

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
