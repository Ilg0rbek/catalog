import { Breadcrumb, Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionTypes,
  appRoute,
  progressStudyEnum,
  StudyTestTypes,
} from "../../common/enum";
import { getRandomInt, isObjectEmpty, stylesParse } from "../../helpers";
import { GoBack, Loader } from "../common";
import {
  ErrorStudyCard,
  Iteration1Card,
  SuccessStudyCard,
  Iteration2Card,
  Iteration3Card,
  Iteration4Card,
  Iteration5Card,
} from "./components";
import { Modal } from "antd";
import styles from "./styles.module.css";
import { setCustomWordStatus } from "../../store/actions/words";
import { NavLink } from "react-router-dom";
import completeAudio from "../../assets/sound/ui/task-completed.wav";
import { Howl } from "howler";
export const StudyPage = () => {
  const dispatch = useDispatch();
  const {
    customWords,
    loading,
    REPEAT_START_PERIOD,
    REPEAT_PERIOD_ITERATIONS_COUNT,
    REPEAT_PERIOD_COEFFICIENT,
  } = useSelector((state) => ({
    customWords: state.words.customWordsStudy,
    loading: state.words.loading,
    REPEAT_START_PERIOD: state.settings.REPEAT_START_PERIOD,
    REPEAT_PERIOD_ITERATIONS_COUNT:
      state.settings.REPEAT_PERIOD_ITERATIONS_COUNT,
    REPEAT_PERIOD_COEFFICIENT: state.settings.REPEAT_PERIOD_COEFFICIENT,
  }));
  const audioFile = new Howl({
    src: [completeAudio]
  });
  const [modalOptions, setModalOptions] = React.useState({
    isModalVisible: false,
    modalHeader: "",
    modalContent: "",
  });
  const [resultScreenOptions, setResultScreenOptions] = React.useState({
    show: false,
    isSuccess: true,
  });
  const [state, setState] = React.useState({
    wordsTasks: null,
    testGroupIndex: 0,
    testIndex: 0,
    currentItem: null,
    finish: false,
    ready: false,
  });
  React.useEffect(() => {
    if (!loading && customWords && state.ready) {
      let initObject = {};
      if (customWords.length !== 0) {
        for (let i = 0; i < customWords.length; i++) {
          initObject[customWords[i].id] = {};
          if (customWords[i].progress.type === progressStudyEnum.ON_REPEAT) {
            initObject[customWords[i].id][StudyTestTypes.FOURTH_TYPE] = {
              type: StudyTestTypes.FOURTH_TYPE,
              word: customWords[i],
            };
          } else {
            for (let y = 0; y < Object.keys(StudyTestTypes).length; y++) {
              initObject[customWords[i].id][
                StudyTestTypes[Object.keys(StudyTestTypes)[y]]
              ] = {
                type: Object.keys(StudyTestTypes)[y],
                word: customWords[i],
              };
            }
          }
        }
        setState((prevState) => ({ ...prevState, wordsTasks: initObject }));
      } else {
        setState({ finish: true });
      }
    }
  }, [customWords, loading, state.ready]);
  React.useEffect(() => {
    setState((prevState) => ({ ...prevState, ready: true }));
  }, [dispatch]);
  const playCompleteAudio = () => {
    audioFile.play();
  };
  const setWordStatus = React.useCallback(
    ({
      innerWordId,
      wordId,
      type,
      modified,
      days,
      isFinish,
      lastRepeatDate,
    }) => {
      dispatch(
        setCustomWordStatus({
          innerWordId,
          wordId,
          type,
          modified,
          days,
          isFinish,
          lastRepeatDate,
        })
      );
    },
    [dispatch]
  );

  const wordStatusAnalyzer = (word) => {
    if (word.progress.type !== progressStudyEnum.ON_REPEAT) {
      return {
        type: progressStudyEnum.ON_REPEAT,
        days: 1,
        isFinish: false,
        lastRepeatDate: new Date(),
      };
    } else {
      if (
        word.progress.days !==
        REPEAT_START_PERIOD +
          REPEAT_PERIOD_ITERATIONS_COUNT * REPEAT_PERIOD_COEFFICIENT
      ) {
        return {
          type: progressStudyEnum.ON_REPEAT,
          days: word.progress.days * 2,
          isFinish: false,
          lastRepeatDate: new Date(),
        };
      } else {
        return {
          type: progressStudyEnum.LEARNED,
          days: null,
          isFinish: true,
          lastRepeatDate: new Date(),
        };
      }
    }
  };

  const setWordStatusHandler = ({ word, innerWordId, wordId }) => {
    const status = wordStatusAnalyzer(word);
    return setWordStatus({
      innerWordId,
      wordId,
      modified: true,
      ...status,
    });
  };
  const nextClickHandler = (value, result) => {
    if (result) {
      setState((prevState) => {
        let prevWordsTasks = prevState.wordsTasks;
        if (prevWordsTasks[value.groupKey]) {
          delete prevWordsTasks[value.groupKey][value.key];
        }

        if (isObjectEmpty(prevWordsTasks[value.groupKey])) {
          delete prevWordsTasks[value.groupKey];

          setWordStatusHandler({
            word: value.word,
            innerWordId: value.word?.id,
            wordId: value.word?.wordId,
          });
          playCompleteAudio();
          setModalOptions({
            isModalVisible: true,
            modalHeader: `Слово "${value.word?.from?.text || value.word.word.text}" было успешно изучено!!!`,
            modalContent: "Пройдено 5 из 5 тестов",
          });
        }
        if (isObjectEmpty(prevWordsTasks)) {
          return { ...prevState, wordsTasks: null, finish: true };
        }
        return { ...prevState, wordsTasks: prevWordsTasks };
      });
    }
    if (state.wordsTasks) {
      setState((prevState) => {
        let prevWordsTasks = prevState.wordsTasks;
        if (prevWordsTasks) {
          let index = getRandomInt(Object.keys(prevWordsTasks).length);
          return { ...prevState, testGroupIndex: index };
        }
        return prevState;
      });
      setState((prevState) => {
        let prevWordsTasks = prevState.wordsTasks;
        if (prevWordsTasks) {
          let prevGroupIndex = prevState.testGroupIndex;
          let index = getRandomInt(
            Object.keys(
              prevWordsTasks[Object.keys(prevWordsTasks)[prevGroupIndex]]
            ).length
          );
          return { ...prevState, testIndex: index };
        }
        return prevState;
      });
    } else {
    }
  };
  const handleResultClickHosting = (testData) => {
    return function (result) {
      handleHideResultScreen();
      nextClickHandler(testData, result);
    };
  };
  const handleRenderSuccessResultPage = (word) => {
    setResultScreenOptions({
      show: true,
      isSuccess: true,
    });
    setState((prevState) => {
      return { ...prevState, currentItem: word };
    });
  };
  const handleRenderErrorResultPage = (word) => {
    setResultScreenOptions({
      show: true,
      isSuccess: false,
    });
    setState((prevState) => {
      return { ...prevState, currentItem: word };
    });
  };
  const handleHideResultScreen = () => {
    setResultScreenOptions({
      show: false,
      isSuccess: true,
    });
  };
  let handleResultClick = handleResultClickHosting(state.currentItem);
  const testGenerator = (testGroupIndex, testIndex, wordsTasks) => {
    let currentTestGroup = wordsTasks[Object.keys(wordsTasks)[testGroupIndex]];

    let testData = {
      item: currentTestGroup[Object.keys(currentTestGroup)[testIndex]],
      key: Object.keys(currentTestGroup)[testIndex],
      groupKey: Object.keys(wordsTasks)[testGroupIndex],
    };

    switch (testData.key) {
      case StudyTestTypes.FIRST_TYPE: {
        return (
          <Iteration1Card
            onSuccess={handleRenderSuccessResultPage}
            onError={handleRenderErrorResultPage}
            groupKey={testData.groupKey}
            innerKey={testData.key}
            word={testData.item.word}
          />
        );
      }
      case StudyTestTypes.SECOND_TYPE: {
        return (
          <Iteration2Card
            onSuccess={handleRenderSuccessResultPage}
            onError={handleRenderErrorResultPage}
            groupKey={testData.groupKey}
            innerKey={testData.key}
            word={testData.item.word}
          />
        );
      }
      case StudyTestTypes.THIRD_TYPE: {
        return (
          <Iteration3Card
            onSuccess={handleRenderSuccessResultPage}
            onError={handleRenderErrorResultPage}
            groupKey={testData.groupKey}
            innerKey={testData.key}
            word={testData.item.word}
          />
        );
      }
      case StudyTestTypes.FOURTH_TYPE: {
        return (
          <Iteration4Card
            onSuccess={handleRenderSuccessResultPage}
            onError={handleRenderErrorResultPage}
            groupKey={testData.groupKey}
            innerKey={testData.key}
            word={testData.item.word}
          />
        );
      }
      case StudyTestTypes.FIFTH_TYPE: {
        return (
          <Iteration5Card
            onSuccess={handleRenderSuccessResultPage}
            onError={handleRenderErrorResultPage}
            groupKey={testData.groupKey}
            innerKey={testData.key}
            word={testData.item.word}
          />
        );
      }
      default:
        return <h1>DEFAULT</h1>;
    }
  };
  //Modal
  const renderModal = ({ content, header }) => {
    return (
      <Modal
        title={header}
        visible={modalOptions.isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {content}
      </Modal>
    );
  };
  const showModal = () => {
    setModalOptions({ isModalVisible: true });
  };

  const handleOk = () => {
    setModalOptions({ isModalVisible: false });
  };

  const handleCancel = () => {
    setModalOptions({ isModalVisible: false });
  };
  if (state.finish) {
    return (
      <div className={"centered"}>
        <h1 className={styles.info}>
          все слова в данном уроке успешно изучены
        </h1>
      </div>
    );
  }
  if (!state.wordsTasks || loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.breadCrumpWrapper}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to={appRoute.BASE}>
              <a href={appRoute.BASE}>Главная страница</a>
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to={appRoute.LESSONS}>
              <a href={appRoute.LESSONS}>Уроки</a>
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Урок</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={stylesParse(styles.container, styles.centered)}>
        {renderModal({
          content: modalOptions.modalContent,
          header: modalOptions.modalHeader,
        })}
        {resultScreenOptions.show ? (
          resultScreenOptions.isSuccess ? (
            <SuccessStudyCard
              onResult={handleResultClick}
              word={state.currentItem.word}
              groupKey={state.currentItem.groupKey}
              innerKey={state.currentItem.key}
            />
          ) : (
            <ErrorStudyCard
              onResult={handleResultClick}
              word={state.currentItem.word}
              groupKey={state.currentItem.groupKey}
              innerKey={state.currentItem.key}
            />
          )
        ) : (
          <div className={styles.topCentered}>
            {testGenerator(
              state.testGroupIndex,
              state.testIndex,
              state.wordsTasks
            )}
          </div>
        )}
        <GoBack/>
      </div>
    </>
  );
};
