import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { WordItem } from "./components";
import styles from "./styles.module.css";

export const WordsList = React.memo(({ words, lan, isMobile, inputValue, setWordStatus }) => {
  let history = useHistory();
  const location = useLocation();

  const redirect = (id) => {
    history.push(`${location.pathname}/${id}`);
  };

  const renderWords = () => {
    let wordHeader = [
      {
        id: "header",
        transcription: "Транскрипция",
        text: "Идиома",
        translation: "Дословный перевод",
        meaning: "Реальный смысл",
        onPress: {},
        isHeader: true,
      },
      ...words,
    ];

    return wordHeader.map((idiom) => {
      return (
        <WordItem
        key={idiom.id}
        innerWordId={idiom.id}
        wordId={idiom.id}
        transcription={
          idiom.isHeader ? idiom.transcription : idiom.word.transcription
        }
        text={idiom.isHeader ? idiom.text : idiom.word.text}
        isHeader={idiom.isHeader}
        modified={!!idiom.modified}
        progressType={!!idiom.modified ? idiom?.progress?.type : null}
        translation={idiom.isHeader ? idiom.translation : idiom.literalTranslation}
        meaning={idiom?.meaning}
        redirect={() => redirect(idiom.id)}
        setStatus={setWordStatus}
        isMobile={isMobile}
        inputValue={inputValue}
        />
      );
    });
  };
  return <ul className={styles.wordWrapper}>{renderWords()}</ul>;
});
