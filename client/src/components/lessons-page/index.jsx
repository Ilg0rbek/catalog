import { Modal, Collapse, Breadcrumb } from "antd";
import * as React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  actionTypes,
  appRoute,
  ButtonColor,
  ButtonSize,
  progressStudyEnum,
} from "../../common/enum";
import { redirect } from "../../store/actions/app";
import { addCustomStudyWord } from "../../store/actions/words";
import { GoBack, Loader } from "../common";
import {
  BookTwoTone,
  CheckCircleTwoTone,
  CheckOutlined,
  WarningTwoTone,
} from "@ant-design/icons";
import styles from "./styles.module.css";
import { isExpire } from "../../helpers/utils/is_date_expire";
import { SoundButton } from "../common/hoc/sounds/tap-ui-sound";
import { ModalBuy } from "../common/modalBuy/modalBuy";
const { Panel } = Collapse;
export const LessonsPage = () => {
  const dispatch = useDispatch();
  const [isTestModalVisible, setTestModalVisible] = React.useState(false);
  const [isRepeatModalVisible, setIsRepeatModalVisible] = React.useState(false);
  const { customWords, wordInLesson } = useSelector((state) => ({
    customWords: state.words.customWords,
    loading: state.words.loading,
    wordInLesson: state.settings.WORDS_IN_LESSON,
  }));

  const { approwed } = useSelector((state) => ({
    approwed: true //state.profile.user.isApproved
  }));

  const [state, setState] = React.useState({
    readyData: false,
    ready: false,
    lessonsCards: [],
    activeLessonsIndex: 0,
    renewedQ: 0,
    renewedArr: [],
  });
  const typesSeparator = (chunk) => {
    let learnedQ = 0;
    let inProgressQ = 0;
    let renewedQ = 0;
    let renewedWords = [];
    chunk.forEach((word) => {
      if (
          word.progress.type === progressStudyEnum.LEARNED ||
          word.progress.type === progressStudyEnum.ON_REPEAT
      )
        learnedQ++;
      if (word.progress.type === progressStudyEnum.IN_PROGRESS) inProgressQ++;
      if (word.progress.type === progressStudyEnum.ON_REPEAT) {
        if (
            isExpire({
              date: word.progress.lastRepeatDate,
              days: word.progress.days,
            })
        ) {
          renewedQ++;
          renewedWords.push(word);
        }
      }
    });
    return {
      learnedQ,
      inProgressQ,
      renewedQ,
      renewedWords,
    };
  };
  const [active, setActive] = React.useState(false)
  React.useEffect(() => {
    dispatch({ type: actionTypes.FETCH_CUSTOM_WORDS_ASYNC });
    setState((prevState) => ({ ...prevState, readyData: true }));
  }, [dispatch]);
  React.useEffect(() => {
    if (state.readyData) {
      let customWordsMock = [...customWords];
      let customWordsLessonsChunks = [];
      while (customWordsMock.length > 0)
      if (!approwed) {
        customWordsLessonsChunks.push(
            customWordsMock.splice(0, 3)
        );
      } else {
        customWordsLessonsChunks.push(
            customWordsMock.splice(0, wordInLesson.value)
        );
      }
      customWordsLessonsChunks = customWordsLessonsChunks.map((chunk) => {
        const { learnedQ, inProgressQ, renewedQ, renewedWords } =
            typesSeparator(chunk);
        setState((prevState) => ({
          renewedQ: prevState.renewedQ + renewedQ,
          renewedArr: [...prevState.renewedArr, ...renewedWords],
        }));
        return {
          array: chunk,
          learnedQ,
          inProgressQ,
          length: chunk.length,
        };
      });
      setState((prevState) => ({
        ...prevState,
        lessonsCards: customWordsLessonsChunks,
      }));
      setState((prevState) => ({ ...prevState, ready: true }));
    }
  }, [customWords, wordInLesson]);
  const setModalVisibleHandle = (flag, index) => {
    setState((prevState) => ({
      ...prevState,
      activeLessonsIndex: index,
    }));
    setTestModalVisible(flag);
  };
  const onRedirectHandle = () => {
    dispatch(
        addCustomStudyWord([
          ...state.lessonsCards[state.activeLessonsIndex].array.filter(
              (word) =>
                  word.progress.type === progressStudyEnum.IN_PROGRESS ||
                  progressStudyEnum.ON_REPEAT
          ),
          ...state.renewedArr,
        ])
    );
    dispatch(redirect(appRoute.STUDY));
  };

  const renderLessonsCards = () => {
    if (!state.ready) {
      return <Loader />;
    }
    return (
      <>
        {active && <ModalBuy lesson={true} modalActive={setActive}/>}
        {state.lessonsCards.map((card, index) => {
      if (!approwed) {
        if (index === 0) {
          return (

              <ReactCSSTransitionGroup
                  className={styles.item}
                  transitionName="show"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnter={true}
                  transitionLeave={true}
                  className={styles.lessonsWrapper}
              >
                <div
                    className={styles.lessonBlockProgressBar}
                    style={
                      (card.length - card.inProgressQ) / card.length === 1
                          ? {
                            background: "rgb(2, 48, 246)",
                            background: `linear-gradient(90deg, rgba(154,246,2,0.9304096638655462) 0%, rgba(72,189,84,1) 100%, rgba(255,255,255,1) 100%)`,
                          }
                          : {
                            background: "rgb(2, 48, 246)",
                            background: `linear-gradient(
                  90deg,
                  rgba(2, 48, 246, 0.9304096638655462) 0%,
                  rgba(180, 180, 180, 0.93) ${card.length !== 0
                                ? ((card.length - card.inProgressQ) / card.length) * 100
                                : 0
                            }%,
                  rgb(255, 255, 255) 100%
                )`,
                          }
                    }
                ></div>
                <div className={styles.lessonBlockWrapper}>
                  <h3>Урок {index + 1}</h3>
                  <div className={styles.lessonBlockBody}>
                    <p className={styles.text}>
                      {`пройдено ${card.length - card.inProgressQ}/${card.length
                      } слов`}{" "}
                      {card.length - card.inProgressQ === card.length ? (
                          <CheckOutlined color={"green"} />
                      ) : null}
                    </p>
                  </div>
                  <div className={styles.buttonsWrapper}>
                    <div className={styles.btnWrapper}>
                      <SoundButton
                          color={ButtonColor.BLUE}
                          size={ButtonSize.LARGE}
                          onClick={() => setModalVisibleHandle(true, index)}
                      >
                        Начать
                      </SoundButton>
                    </div>
                    <SoundButton
                        color={ButtonColor.BLUE}
                        size={ButtonSize.LARGE}
                        onClick={() => setIsRepeatModalVisible(true, index)}
                    >
                      Слова для повторения
                    </SoundButton>
                  </div>
                </div>
              </ReactCSSTransitionGroup>
          )
        } else {
          return (
              <ReactCSSTransitionGroup
                  className={styles.item}
                  transitionName="show"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnter={true}
                  transitionLeave={true}
                  className={styles.lessonsWrapperDesactive}
              >
                <div
                    className={styles.lessonBlockProgressBar}
                    style={
                      (card.length - card.inProgressQ) / card.length === 1
                          ? {
                            background: "rgb(2, 48, 246)",
                            background: `linear-gradient(90deg, rgba(154,246,2,0.9304096638655462) 0%, rgba(72,189,84,1) 100%, rgba(255,255,255,1) 100%)`,
                          }
                          : {
                            background: "rgb(2, 48, 246)",
                            background: `linear-gradient(
                  90deg,
                  rgba(2, 48, 246, 0.9304096638655462) 0%,
                  rgba(180, 180, 180, 0.93) ${card.length !== 0
                                ? ((card.length - card.inProgressQ) / card.length) * 100
                                : 0
                            }%,
                  rgb(255, 255, 255) 100%
                )`,
                          }
                    }
                ></div>

                <div onClick={() => setActive(true)} className={styles.lessonBlockWrapper}>
                  <div className={styles.block_flex_lock}>
                    <div className={styles.lockFromBuy}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" role="img"
                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                           className="svg-inline--fa fa-lock fa-w-14 fa-7x">
                        <path fill="currentColor"
                              d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                              className=""></path>
                      </svg>
                    </div>
                    <h3>Урок {index + 1}</h3>
                  </div>
                  <div className={styles.lessonBlockBody}>
                    <p className={styles.text}>
                      {`пройдено ${card.length - card.inProgressQ}/${card.length
                      } слов`}{" "}
                      {card.length - card.inProgressQ === card.length ? (
                          <CheckOutlined color={"green"} />
                      ) : null}
                    </p>
                  </div>
                  <div onClick={() => setActive(true)} className={styles.buttonsWrapper}>
                    <div onClick={() => setActive(true)} className={styles.btnWrapper}>
                      <SoundButton
                          size={ButtonSize.LARGE}
                      >
                        Начать
                      </SoundButton>
                    </div>
                    <SoundButton
                        size={ButtonSize.LARGE}
                    >
                      Слова для повторения
                    </SoundButton>
                  </div>
                </div>
              </ReactCSSTransitionGroup>
          )
        }
      } else {
        return (
            <ReactCSSTransitionGroup
                className={styles.item}
                transitionName="show"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={true}
                transitionLeave={true}
                className={styles.lessonsWrapper}
            >
              <div
                  className={styles.lessonBlockProgressBar}
                  style={
                    (card.length - card.inProgressQ) / card.length === 1
                        ? {
                          background: "rgb(2, 48, 246)",
                          background: `linear-gradient(90deg, rgba(154,246,2,0.9304096638655462) 0%, rgba(72,189,84,1) 100%, rgba(255,255,255,1) 100%)`,
                        }
                        : {
                          background: "rgb(2, 48, 246)",
                          background: `linear-gradient(
                  90deg,
                  rgba(2, 48, 246, 0.9304096638655462) 0%,
                  rgba(180, 180, 180, 0.93) ${card.length !== 0
                              ? ((card.length - card.inProgressQ) / card.length) * 100
                              : 0
                          }%,
                  rgb(255, 255, 255) 100%
                )`,
                        }
                  }
              ></div>
              <div className={styles.lessonBlockWrapper}>
                <h3>Урок {index + 1}</h3>
                <div className={styles.lessonBlockBody}>
                  <p className={styles.text}>
                    {`пройдено ${card.length - card.inProgressQ}/${card.length
                    } слов`}{" "}
                    {card.length - card.inProgressQ === card.length ? (
                        <CheckOutlined color={"green"} />
                    ) : null}
                  </p>
                </div>
                <div className={styles.buttonsWrapper}>
                  <div className={styles.btnWrapper}>
                    <SoundButton
                        color={ButtonColor.BLUE}
                        size={ButtonSize.LARGE}
                        onClick={() => setModalVisibleHandle(true, index)}
                    >
                      Начать
                    </SoundButton>
                  </div>
                  <SoundButton
                      color={ButtonColor.BLUE}
                      size={ButtonSize.LARGE}
                      onClick={() => setIsRepeatModalVisible(true, index)}
                  >
                    Слова для повторения
                  </SoundButton>
                </div>
              </div>
            </ReactCSSTransitionGroup>
        )
      }
    })}</>);
  }
  const renderWordsTable = (words, isLarge = false) => {
    return words.map((word) => {
      return (
          <div className={styles.tableRowBody}>
            <div className={styles.tableRowBodyItem}>
              <p className={isLarge ? styles.large : ""}>{word?.from?.text || word.word.text}</p>
            </div>
            <div className={styles.tableRowBodyItem}>
              <p className={isLarge ? styles.large : ""}>
                {word?.from?.transcription || word?.word?.transcription}
              </p>
            </div>
            <div className={styles.tableRowBodyItem}>
              <p className={isLarge ? styles.large : ""}>{word?.to?.text || word?.literalTransliation}</p>
            </div>
          </div>
      );
    });
  };

  if (state.ready && state.lessonsCards.length === 0) {
    return (
        <div className={"centered"}>
          <h1 className={styles.info}>
            Добавьте слова для обучения что бы перейти к урокам
          </h1>
        </div>
    );
  }
  return (
      <>
        <div className={styles.breadCrumpWrapper}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to={appRoute.BASE}>
                <a href="">Главная страница</a>
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Уроки</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.rootWrapper}>
          {isTestModalVisible && state.ready && (
              <Modal
                  style={{ top: 20 }}
                  centered
                  visible={isTestModalVisible}
                  onOk={onRedirectHandle}
                  okText={"Начать обучение"}
                  cancelText={"Отмена"}
                  onCancel={() => setTestModalVisible(false)}
              >
                <div className={styles.rootModalWrapper}>
                  <div className={styles.modalTextBlock}>
                    <p className={styles.title}>Общая информация</p>
                    <div className={styles.modalInfo}>
                      <div className={styles.infoField}>
                        <p>
                          Общее количество слов <BookTwoTone twoToneColor="blue" />
                        </p>
                        <p>{state.lessonsCards[state.activeLessonsIndex].length}</p>
                      </div>
                      <div className={styles.infoField}>
                        <p>
                          Пройдено слов{" "}
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                        </p>
                        <p>
                          {state.lessonsCards[state.activeLessonsIndex].length -
                          state.lessonsCards[state.activeLessonsIndex]
                              .inProgressQ}
                        </p>
                      </div>
                      <div className={styles.infoField}>
                        <p>
                          Слов следует повторить{" "}
                          <WarningTwoTone twoToneColor="#e0cd00" />
                        </p>
                        <p>{state.renewedQ}</p>
                      </div>
                    </div>
                    <p className={styles.title}>Cтатистика слов</p>

                    <Collapse defaultActiveKey={[]} onChange={() => { }}>
                      <Panel header="Слова, которые надо повторить" key="1">
                        {state.renewedQ > 0 ? (
                            <div className={styles.tableWrapper}>
                              <div className={styles.tableHeader}>
                                <div className={styles.headerItem}>
                                  <p className={styles.boldText}>Слово</p>
                                </div>
                                <div className={styles.headerItem}>
                                  <p className={styles.boldText}>Транскрипция</p>
                                </div>
                                <div className={styles.headerItem}>
                                  <p className={styles.boldText}>Перевод</p>
                                </div>
                              </div>
                              {renderWordsTable(state.renewedArr)}
                            </div>
                        ) : (
                            <h3 className={styles.emptyText}>
                              Соответствующих слов нет
                            </h3>
                        )}
                      </Panel>
                      <Panel header="Пройденые слова" key="2">
                        {state.lessonsCards[state.activeLessonsIndex].learnedQ >
                        0 ? (
                            <div className={styles.tableWrapper}>
                              <div className={styles.tableHeader}>
                                <div className={styles.headerItem}>
                                  <p className={styles.boldText}>Слово</p>
                                </div>
                                <div className={styles.headerItem}>
                                  <p className={styles.boldText}>Транскрипция</p>
                                </div>
                                <div className={styles.headerItem}>
                                  <p className={styles.boldText}>Перевод</p>
                                </div>
                              </div>
                              {renderWordsTable(
                                  state.lessonsCards[
                                      state.activeLessonsIndex
                                      ].array.filter(
                                      (word) =>
                                          word.progress.type ===
                                          progressStudyEnum.LEARNED ||
                                          word.progress.type === progressStudyEnum.ON_REPEAT
                                  )
                              )}
                            </div>
                        ) : (
                            <h3 className={styles.emptyText}>
                              Соответствующих слов нет
                            </h3>
                        )}
                      </Panel>
                      <Panel header="Не пройденые слова" key="3">
                        {state.lessonsCards[state.activeLessonsIndex].inProgressQ >
                        0 ? (
                            <div className={styles.tableWrapper}>
                              <div className={styles.tableHeader}>
                                <div className={styles.headerItem}>
                                  <p className={styles.boldText}>Слово</p>
                                </div>
                                <div className={styles.headerItem}>
                                  <p className={styles.boldText}>Транскрипция</p>
                                </div>
                                <div className={styles.headerItem}>
                                  <p className={styles.boldText}>Перевод</p>
                                </div>
                              </div>
                              {renderWordsTable(
                                  state.lessonsCards[
                                      state.activeLessonsIndex
                                      ].array.filter(
                                      (word) =>
                                          word.progress.type ===
                                          progressStudyEnum.IN_PROGRESS
                                  )
                              )}
                            </div>
                        ) : (
                            <h3 className={styles.emptyText}>
                              Соответствующих слов нет
                            </h3>
                        )}
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </Modal>
          )}
          {isRepeatModalVisible && state.ready && (
              <Modal
                  style={{ top: 20 }}
                  centered
                  visible={isRepeatModalVisible}
                  onOk={onRedirectHandle}
                  okText={"Начать обучение"}
                  cancelText={"Отмена"}
                  onCancel={() => setIsRepeatModalVisible(false)}
                  footer={null}
              >
                <p className={styles.modalTitle}>Слова, которые надо повторить</p>
                <div className={styles.rootModalWrapper}>
                  {state.renewedQ > 0 ? (
                      <div className={styles.tableWrapper}>
                        <div className={styles.tableHeader}>
                          <div className={styles.headerItem}>
                            <p className={styles.boldTextLarge}>Слово</p>
                          </div>
                          <div className={styles.headerItem}>
                            <p className={styles.boldTextLarge}>Транскрипция</p>
                          </div>
                          <div className={styles.headerItem}>
                            <p className={styles.boldTextLarge}>Перевод</p>
                          </div>
                        </div>
                        {renderWordsTable(state.renewedArr, true)}
                      </div>
                  ) : (
                      <h3 className={styles.emptyText}>Соответствующих слов нет</h3>
                  )}
                </div>
              </Modal>
          )}
          <h1>Уроки</h1>
          <div className={styles.lessonsRootWrapper}>{renderLessonsCards()}</div>

          <GoBack />
        </div>
      </>
  );
};
