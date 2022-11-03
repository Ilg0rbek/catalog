import * as React from "react";
import { AudioPlayer, Loader } from "../common";
import { NavLink, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import dotenv from "dotenv";
import { sideSizeAnalyzer, stylesParse } from "../../helpers";
import { Breadcrumb } from "antd";
import { appRoute } from "../../common/enum";
dotenv.config();

export const IdiomPage = React.memo(() => {
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

  const [idiom, setIdiom] = React.useState(false);

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
      fetch(`${process.env.REACT_APP_API_URL_WORDS}/idiom/detail/${id}?apiKey=${process.env.REACT_APP_WORD_SERVICE_ACCESS_KEY}`)
        .then(response => {
          return response.json();
        })
        .then(
          (result) => {
            setIdiom(result.data);
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

  if (!idiom) {
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
            <NavLink to={appRoute.IDIOMS_PAGE}>
              <a href={appRoute.IDIOMS_PAGE}>Список идиом</a>
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{idiom.word.text}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.columnRootWrapper}>
        <div className={styles.infoWrapper} ref={rootContentRef}>
          <div className={styles.paragraph}>
            <p className={styles.boldText}>
              ИДИОМА: {idiom.word.text.toUpperCase()}
            </p>
            <div className={stylesParse(styles.textWrapper)}>
              <div className={styles.infoBlockWrapper}>
                <p className={styles.boldText}> Дословный перевод:</p>
                <p className={styles.text}>{idiom.literalTranslation.toUpperCase()}</p>
              </div>

              <div className={styles.infoBlockWrapper}>
                <p className={styles.boldText}> Реальный смысл:</p>
                <p className={styles.text}>{idiom.meaning.toUpperCase()}</p>
              </div>

              {idiom.word?.transcription && (
                <div className={styles.infoBlockWrapper}>
                  <p className={styles.boldText}> Транскрипция:</p>
                  <p className={styles.text}>{idiom.word.transcription}</p>
                </div>
              )}

              {!idiom.word.noAudio && (
                <div className={styles.infoBlockWrapper}>
                  <p className={styles.boldText}> Воcпроизвести:</p>
                  <AudioPlayer url={idiom.word.audios[0].src} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.paragraph}>
            <p className={styles.boldText}> СЮЖЕТ:</p>
            <p className={styles.text}>{`${idiom?.story?.text}`}</p>
          </div>
        </div>
        {/*<div className={styles.imgWrapperColumn}>
          {idiom?.illustration?.image ? (
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
        </div>*/}
      </div>
    </>
  );
});
