import * as React from "react";
import { useSelector } from "react-redux";
import {
  ButtonSize,
  ButtonType,
  progressStudyEnum,
} from "../../../../common/enum";
import { AudioPlayer } from "../../../common";
import { SoundButton } from "../../../common/hoc/sounds/tap-ui-sound";
import styles from "./styles.module.css";

export const WordItem = React.memo(
  ({
    word,
    renderText,
    progressType,
    isMobile,
    wordId,
    innerWordId,
    modified,
    setWordStatus,
    keyId,
    id,
  }) => {
    const { customWordLoading } = useSelector((state) => ({
      customWordLoading: state.words.customWordLoading,
    }));
    const setStatusHandler = () => {
      setIsLoading(true);
      if (progressType && progressType == progressStudyEnum.IN_PROGRESS) {
        setWordStatus({
          type: progressStudyEnum.NOT_LEARNED,
          wordId,
          modified,
          innerWordId,
          isReplace: true,
          key: keyId,
          isDictionary: true,
        });
      } else {
        setWordStatus({
          type: progressStudyEnum.IN_PROGRESS,
          wordId,
          innerWordId,
          modified,
          isReplace: true,
          key: keyId,
          isDictionary: true,
        });
      }
    };
    const [disable, setIsDisable] = React.useState(customWordLoading);
    const [loading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
      if (customWordLoading === false) {
        setIsLoading(false);
        setIsDisable(false);
      }
      if (customWordLoading === true) {
        setIsDisable(true);
      }
    }, [customWordLoading]);
    return (
      <div className={styles.tableRowBody} key={id}>
        <div className={styles.tableRowBodyItem}>
          <p className={styles.text}>{renderText(word.from.text)}</p>
        </div>
        <div className={styles.tableRowBodyItem}>
          <p className={styles.text}>{word.from.transcription}</p>
        </div>
        <div className={styles.tableRowBodyItem}>
          <p className={styles.text}>{renderText(word.to.text)}</p>
        </div>
        {!isMobile && (
          <div className={styles.tableRowBodyItem}>
            {!word.from.noAudio ? (
              <AudioPlayer
                url={word.from.audios[0].src}
                extraStyles={styles.rowBtn}
                extraIconStyles={styles.icon}
              />
            ) : (
              <AudioPlayer
                url={"null"}
                extraStyles={styles.rowBtn}
                extraIconStyles={styles.icon}
                disabled={true}
              />
            )}
          </div>
        )}

        <div className={styles.tableRowBodyItem}>
          <SoundButton
            size={isMobile ? ButtonSize.SMALL : ButtonSize.MIDDLE}
            type={ButtonType.DEFAULT}
            className={styles.button}
            loading={loading}
            disabled={disable}
            danger={
              progressType && progressType == progressStudyEnum.IN_PROGRESS
            }
            onClick={setStatusHandler}
          >
            {progressType &&
            (progressType == progressStudyEnum.IN_PROGRESS ||
              progressType == progressStudyEnum.ON_REPEAT)
              ? !isMobile
                ? "Убрать из обучения"
                : "Убрать"
              : !isMobile
              ? "Добавить к изучению"
              : "Добавить"}
          </SoundButton>
        </div>
      </div>
    );
  }
);
