import * as React from "react";
import { AudioPlayer, Loader } from "../common";
import { NavLink, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import dotenv from "dotenv";
import { sideSizeAnalyzer, stylesParse } from "../../helpers";
import { Breadcrumb } from "antd";
import { appRoute } from "../../common/enum";
dotenv.config();

export const WordPage = React.memo(() => {
  const { innerWidth: width, innerHeight: height } = window;
  const [state, setState] = React.useState({
    windowWidth: width,
    windowHeight: height,
    imageKoef: null,
    blockSize: null,
  });
  let imgRef = React.useRef();
  let rootContentRef = React.useRef();
  const { id } = useParams();

  const [word, setWord] = React.useState(false);

  // const { word } = useSelector((state) => ({
  //   word: state.words.currentWord,
  // }));

  const imageSizeAnalyze = () => {
    let styles = { minHeight: 150, marginBottom: 15 };
    if (state.blockSize && state.imageKoef) {
      if (
        (state.windowHeight - state.blockSize) / state.windowWidth <=
        state.imageKoef
      ) {
        return { ...styles, height: state.windowHeight - state.blockSize };
      }
      if (
        (state.windowHeight - state.blockSize) / state.windowWidth >
        state.imageKoef
      ) {
        return { ...styles, width: state.windowWidth - 120 };
      }
    } else {
      return { ...styles };
    }
  };

  React.useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL_WORDS}/translation/detail/${id}?apiKey=${process.env.REACT_APP_WORD_SERVICE_ACCESS_KEY}`)
        .then(response => {
          return response.json();
        })
        .then(
          (result) => {
            setWord(result.data);
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            console.log(error);
          }
        )

    }
  // }, [dispatch, id]);
  }, [id]);

  React.useEffect(() => {
    function handleResize() {
      setState((prevState) => ({
        ...prevState,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      }));
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (rootContentRef && imgRef) {
      setState((prevState) => ({
        ...prevState,
        blockSize: rootContentRef?.current?.clientHeight + 225, //padding
      }));
      setState((prevState) => ({
        ...prevState,
        imageKoef: sideSizeAnalyzer({
          height: imgRef?.current?.naturalHeight,
          width: imgRef?.current?.naturalWidth,
        }),
      }));
    }
  }, [rootContentRef, imgRef]);

  if (!word) {
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
            <NavLink to={appRoute.WORD_CATALOG}>
              <a href={appRoute.WORD_CATALOG}>Список слов</a>
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{word.from.text}</Breadcrumb.Item>

          <Breadcrumb.Item>{word.text}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.columnRootWrapper}>
        <div className={styles.infoWrapper} ref={rootContentRef}>
          <div className={styles.paragraph}>
            <p className={styles.boldText}>
              СЛОВО: {word.from.text.toUpperCase()}
            </p>
            <div className={stylesParse(styles.textWrapper)}>
              <div className={styles.infoBlockWrapper}>
                <p className={styles.boldText}> Перевод:</p>
                <p className={styles.text}>{word.to.text.toUpperCase()}</p>
              </div>

              {word.from.transcription ? (
                <div className={styles.infoBlockWrapper}>
                  <p className={styles.boldText}> Транскрипция:</p>
                  <p className={styles.text}>{word.from.transcription}</p>
                </div>
              ) : (
                <div></div>
              )}

              {!word.from.noAudio ? (
                <div className={styles.infoBlockWrapper}>
                  <p className={styles.boldText}> Воcпроизвести:</p>
                  <AudioPlayer url={word.from.audios[0].src} />
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.paragraph}>
            <p className={styles.boldText}> СЮЖЕТ:</p>
            <p className={styles.text}>{`${word?.story?.text}`}</p>
          </div>
        </div>
        <div className={styles.imgWrapperColumn}>
          {word?.illustration?.image ? (
            <div className={styles.paragraph}>
              <p className={styles.boldText}> Иллюстрация:</p>
              <img
                style={imageSizeAnalyze()}
                className={styles.imgIllustration}
                src={`${process.env.REACT_APP_API_URL_WORDS_STATIC}/${word?.illustration?.image}`}
                alt={
                  "Создание иллюстрации в процессе, скоро добавится иллюстрация"
                }
                ref={imgRef}
              />
            </div>
          ) : (
            "Создание иллюстрации в процессе, скоро добавится иллюстрация"
          )}
        </div>
      </div>
    </>
  );
});
