import { Button, Select } from "antd";
import * as React from "react";
import { useSelector } from "react-redux";
import {
  ButtonSize,
  ButtonType,
  progressStudyEnum,
} from "../../../../common/enum";
import { stylesParse } from "../../../../helpers/utils/styles-parse.util";
import { SoundButton } from "../../../common/hoc/sounds/tap-ui-sound";
import styles from "./styles.module.css";

export const WordItem = React.memo(({
  innerWordId,
  wordId,
  translation,
  text,
  meaning,
  redirect,
  isHeader,
  modified,
  progressType,
  setStatus,
  isMobile,
  transcription,
  inputValue,
}) => {
  const { customWordLoading } = useSelector((state) => ({
    customWordLoading: state.words.customWordLoading,
  }));

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
  const renderText = (text) => {
    if (text.includes(inputValue)) {
      const index = text.indexOf(inputValue);
      const prefix = text.substr(0, index);
      const postFix = text.substr(
        index + inputValue.length,
        text.length - (index + inputValue.length)
      );
      return (
        <div className={styles.textRow}>
          <p>{prefix}</p>
          <p className={styles.decorateText}>{inputValue}</p>
          <p>{postFix}</p>
        </div>
      );
    }
    return text;
  };
  const setStatusHandler = () => {
    setIsLoading(true);
    if (progressType && progressType == progressStudyEnum.IN_PROGRESS) {
      setStatus({
        type: progressStudyEnum.NOT_LEARNED,
        wordId,
        modified,
        innerWordId,
        isReplace: false,
      });
    } else {
      setStatus({
        type: progressStudyEnum.IN_PROGRESS,
        wordId,
        innerWordId,
        modified,
        isReplace: false,
      });
    }
  };
  const renderHeaderItem = () => {
    return (
      <div className={stylesParse(styles.wrapper, styles.bc)}>
        <div className={styles.textWrapper}>{text}</div>
        <div className={styles.textWrapper}>{translation}</div>
        {meaning && (
          <div className={styles.textWrapper}>{meaning}</div>
        )}
        {!isMobile ? (
          <div className={styles.textWrapper}>{transcription}</div>
        ) : null}
        {!isMobile ? (
          <div className={styles.textWrapper}>{"Статус"}</div>
        ) : null}

        <div className={styles.textWrapper}>{"Добавить к изучению"}</div>
      </div>
    );
  };
  const renderContentItem = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.textWrapper}>
          <p
            className={stylesParse(styles.link, styles.text)}
            onClick={redirect}
          >
            {renderText(text)}
          </p>
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.text}>{renderText(translation)}</p>
        </div>
        {meaning && (
          <div className={styles.textWrapper}>
            <p className={styles.text}>{renderText(meaning)}</p>
        </div>
        )}
        {!isMobile ? (
          <div className={styles.textWrapper}>
            <p className={styles.text}>{transcription}</p>
          </div>
        ) : null}
        {!isMobile ? (
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              {progressType ? progressType : progressStudyEnum.NOT_LEARNED}
            </p>
          </div>
        ) : null}

        <div className={styles.textWrapper}>
          <SoundButton
            size={isMobile ? ButtonSize.SMALL : ButtonSize.MIDDLE}
            type={ButtonType.DEFAULT}
            className={styles.button}
            loading={loading}
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
  };
  return <>{isHeader ? renderHeaderItem() : renderContentItem()}</>;
});
