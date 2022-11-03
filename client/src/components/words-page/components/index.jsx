import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { actionTypes } from "../../../common/enum";
import { setCustomWordStatus } from "../../../store/actions/words";
import { WordItem } from "./components";
import styles from "./styles.module.css";

export const WordsList = React.memo(({ words, lan, isMobile, inputValue, setWordStatus }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const redirect = (id) => {
    history.push(`${location.pathname}/${id}`);
  };

  // const setWordStatus = React.useCallback(
  //   ({ innerWordId, wordId, type, modified, isReplace }) => {
  //     dispatch(
  //       setCustomWordStatus({ innerWordId, wordId, type, modified, isReplace })
  //     );
  //   },
  //   [dispatch]
  // );

  // const setWordStatus = React.useCallback(
  //   ({ innerWordId, wordId, type, modified, isReplace, key, isDictionary }) => {
  //     console.log(innerWordId, wordId, type, modified, isReplace, key, isDictionary);

  //     console.log(window.foundWords);

  //     // console.log(newArr2);

  //     dispatch(
  //       setCustomWordStatus({
  //         innerWordId,
  //         wordId,
  //         type,
  //         modified,
  //         isReplace,
  //         key
  //       })
  //     );

  //     let newArr = dictionaryWords;
  //     let val = false;
  //     let letter = key;

  //     // for (var letter in newArr) {
  //       for (var index in newArr[letter]) {
  //         // console.log(newArr[letter][index]);

  //         // console.log(newArr[letter][index].id + ' -- ' + innerWordId);

  //         if (newArr[letter][index].id == innerWordId) {
  //           let word = newArr[letter][index];
  //           let status = (!!word.modified ? word?.progress?.type : false);

  //           if (status) {
  //             val = (status != 'На изучении');
  //           } else {
  //             val = true;
  //           }

  //           // console.log(newArr[letter][index]);
  //           newArr[letter][index].modified = val;

  //           if (val) {
  //             // console.log('Добавим');
  //             // добавим
  //             // console.log(newArr[letter][index]);
  //             if (typeof(newArr[letter][index].progress) === 'undefined') {
  //             // if (!newArr[letter][index].progress.type) {
  //               newArr[letter][index].progress = {type: type};
  //             } else {
  //               newArr[letter][index].progress.type = type;
  //             }
  //             // console.log(newArr[letter][index]);
  //           }
  //         }
  //       }
  //     // }
  //     setDictionaryWords(newArr);

  //     /* поиск */
  //     let newArr2 = window.foundWords;
  //     let val2 = false;

  //     // console.log(searchWords);
  //     // console.log(newArr2);

  //     for (var index in newArr2) {
  //       // console.log(newArr2[index]);

  //       // console.log(newArr2[index].id + ' -- ' + innerWordId);

  //       if (newArr2[index].id == innerWordId) {
  //         let word = newArr2[index];
  //         let status = (!!word.modified ? word?.progress?.type : false);

  //         if (status) {
  //           val2 = (status != 'На изучении');
  //         } else {
  //           val2 = true;
  //         }

  //         // console.log(newArr2[index]);
  //         newArr2[index].modified = val2;

  //         if (val2) {
  //           // console.log('Добавим');
  //           // добавим
  //           // console.log(newArr2[index]);
  //           if (typeof(newArr2[index].progress) === 'undefined') {
  //           // if (!newArr2[index].progress.type) {
  //             newArr2[index].progress = {type: type};
  //           } else {
  //             newArr2[index].progress.type = type;
  //           }
  //           // console.log(newArr2[index]);
  //         }
  //       }
  //     }

  //     // console.log(searchWords);
  //     // console.log(newArr2);

  //     setFoundWords(newArr2);
  //     window.foundWords = newArr2;

  //     // newArr2[letter];
  //   },
  //   [dispatch]
  // );

  const getCurrentTranslation = (translations) => {
    //get first right translate
    const translation = translations.find((el) => el.to.lang == lan);
    return translation;
  };
  const renderWords = () => {
    let wordHeader = [
      {
        id: "header",
        transcription: "Транскрипция",
        text: "Слово",
        translation: "Перевод",
        onPress: {},
        isHeader: true,
      },
      ...words,
    ];
    //refactor
    return wordHeader.map((word) => {
      return (
        <WordItem
          key={word.id}
          innerWordId={word.id}
          wordId={word.wordId}
          transcription={
            word.isHeader ? word.transcription : word.from.transcription
          }
          text={word.isHeader ? word.text : word.from.text}
          isHeader={word.isHeader}
          modified={!!word.modified}
          progressType={!!word.modified ? word?.progress?.type : null}
          translation={word.isHeader ? word.translation : word.to.text}
          redirect={() => redirect(word.id)}
          setStatus={setWordStatus}
          isMobile={isMobile}
          inputValue={inputValue}
        />
      );
    });
  };
  return <ul className={styles.wordWrapper}>{renderWords()}</ul>;
});
