import * as React from "react";
import { Breadcrumb, Collapse, Input } from "antd";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GoBack, Loader } from "../common";
import { NavLink } from "react-router-dom";
import { appRoute, ButtonSize } from "../../common/enum";
import { SoundButton } from "../common/hoc/sounds/tap-ui-sound";
import { ArrowUpOutlined } from "@ant-design/icons";
import { setCustomWordStatus } from "../../store/actions/words";
import { WordItem } from "./components";
import { isObjectEmpty } from "../../helpers";

const { Panel } = Collapse;

export const DictionaryPage = () => {
  const dispatch = useDispatch();

  const { approwed } = useSelector((state) => ({
    approwed: true //state.profile.user.isApproved
  }));

  const [dictionaryLetters, setDictionaryLetters] = React.useState(null);
  const [dictionaryWords, setDictionaryWords] = React.useState([]);
  const [customWords, setCustomWords] = React.useState([]);
  const [foundWords, setFoundWords] = React.useState([]);
  const [inputValue, setInputValue] = React.useState(null);
  const [isMobile, setIsMobileScreen] = React.useState(false);

  const onSearchInputChangeHandler = (event) => {
    const { value } = event.target;
    setInputValue(value);

    getSearch(value);
  };

  const scroll = React.useRef(null);
  const executeScroll = () =>
    scroll.current.scrollIntoView({ behavior: "smooth" });
  const onSearchButtonPressHandler = () => {};

  const setWordStatus = React.useCallback(
    ({ innerWordId, wordId, type, modified, isReplace, key, isDictionary }) => {
      dispatch(
        setCustomWordStatus({
          innerWordId,
          wordId,
          type,
          modified,
          isReplace,
          key
        })
      );

      let newArr = dictionaryWords;
      let val = false;
      let letter = key;

      for (var index in newArr[letter]) {
        if (newArr[letter][index].id == innerWordId) {
          let word = newArr[letter][index];
          let status = (!!word.modified ? word?.progress?.type : false);

          if (status) {
            val = (status != 'На изучении');
          } else {
            val = true;
          }

          newArr[letter][index].modified = val;

          if (val) {
            if (typeof(newArr[letter][index].progress) === 'undefined') {
              newArr[letter][index].progress = {type: type};
            } else {
              newArr[letter][index].progress.type = type;
            }
          }
        }
      }
      setDictionaryWords(newArr);

      let newArr2 = window.foundWords;
      let val2 = false;

      for (var index in newArr2) {
        if (newArr2[index].id == innerWordId) {
          let word = newArr2[index];
          let status = (!!word.modified ? word?.progress?.type : false);

          if (status) {
            val2 = (status != 'На изучении');
          } else {
            val2 = true;
          }

          newArr2[index].modified = val2;

          if (val2) {
            if (typeof(newArr2[index].progress) === 'undefined') {
              newArr2[index].progress = {type: type};
            } else {
              newArr2[index].progress.type = type;
            }
          }
        }
      }

      setFoundWords(newArr2);
      window.foundWords = newArr2;
    },
    [dispatch]
  );

  const { user, toasts, redirect, isAuth } = useSelector((state) => ({
    user: state.profile.user,
    toasts: state.app.toasts,
    redirect: state.app.redirect,
    isAuth: state.auth.isAuth,
  }));

  React.useEffect(() => {
    console.log('useEffect foundWords');
  }, [foundWords]);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 756) {
        setIsMobileScreen(true);
      } else {
        setIsMobileScreen(false);
      }
    }

    handleResize();
    
    window.addEventListener("resize", handleResize);

    fetch("/api/users/get/words?id=" + user.id)
      .then(res => res.json())
      .then(
        (result) => {
          setCustomWords(result.words);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log(error);
        }
      )
    
    fetch("https://memorialanguage.ru/api_v2/dictionary/index")
      .then(res => res.json())
      .then(
        (result) => {
          setDictionaryLetters(result);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log(error);
        }
      )

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getSearch = (word) => {
    if (word.length >= 3) {
      fetch("https://memorialanguage.ru/api_v2/search/?query=" + word)
        .then(response => {
          return response.json();
        })
        .then(
          (result) => {
            let words = compareWords(result.data, customWords);

            setFoundWords(words);
            window.foundWords = words;
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            console.log(error);
          }
        )
    } else {
      setFoundWords([]);
      window.foundWords = [];
    }
  }

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

  const renderWordsTable = (words, key) => {
    return words.map((word) => {
      // console.log(word);
      return (
        <WordItem
          word={word}
          renderText={renderText}
          id={word.id}
          progressType={!!word.modified ? word?.progress?.type : null}
          isMobile={isMobile}
          innerWordId={word.id}
          wordId={word.wordId}
          modified={!!word.modified}
          setWordStatus={setWordStatus}
          keyId={key}
        />
      );
    });
  };
  
  function compareWords(
    words,
    customWords,
    onlyCustom = false,
    override = false) {
    let modifyWords = [];
    let noModifyWords = [];
    
    for (let i = 0; i < words.length; i++) {
      noModifyWords.push({ ...words[i], modified: false });
    }
    for (let i = 0; i < customWords.length; i++) {
      let elem = Object.entries(noModifyWords).find(
        ([index, el]) => el.id == customWords[i].wordId && { word: el, index }
      );

      if (elem) {
        const [index, word] = elem;
        if (word) {
          modifyWords.push({
            ...customWords[i],
            ...word,
            progress: customWords[i].progress,
            modified: true,
            wordId: customWords[i].id,
          });
          noModifyWords.splice(index, 1);
        }
      }
    }
    if (onlyCustom) {
      return [...modifyWords];
    }
    if (override) {
      return [...noModifyWords, ...modifyWords];
    }

    return [...modifyWords, ...noModifyWords];
  };

  const getDictionaryLetter = (letter) => {
    if (!dictionaryWords[letter]) {
      fetch("https://memorialanguage.ru/api_v2/dictionary/" + letter)
        .then(response => {
          return response.json();
        })
        .then(
          (result) => {
            let newArr = dictionaryWords;
            setDictionaryWords([]);

            let words = compareWords(result, customWords);

            newArr[letter] = words; // replace e.target.value with whatever you want to change it to

            setDictionaryWords(newArr);
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            console.log(error);
          }
        )
    }
  };

  const renderParagraphs = (dictionaryWords) => {
    if(!isObjectEmpty(dictionaryWords)){
      return Object.keys(dictionaryWords).map((key) => {
        return (
          <Panel header={key} key={key} className={styles.collapsePanel}>
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
                {!isMobile && (
                  <div className={styles.headerItem}>
                    <p className={styles.boldText}>Прослушать</p>
                  </div>
                )}
  
                <div className={styles.headerItem}>
                  <p className={styles.boldText}>
                    {isMobile ? "Изучить" : "Добавить к изучению"}
                  </p>
                </div>
              </div>
            </div>
          </Panel>
        );
      });
    }else{
      return <h2>Слов удовлетворяющих поиску не найдено</h2>
    }
  };

  const renderLetters = (dictionaryLetters) => {
    if(!isObjectEmpty(dictionaryLetters)) {
      return dictionaryLetters.map((key) => {
        return (
          <Panel header=<a className={styles.headerHref} onClick={()=>{ getDictionaryLetter(key) }}>{key}</a> key={key} className={styles.collapsePanel}>
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
                {!isMobile && (
                  <div className={styles.headerItem}>
                    <p className={styles.boldText}>Прослушать</p>
                  </div>
                )}
                <div className={styles.headerItem}>
                  <p className={styles.boldText}>
                    {isMobile ? "Изучить" : "Добавить к изучению"}
                  </p>
                </div>
              </div>

              {dictionaryWords[key] ? renderWordsTable(dictionaryWords[key], key) : <Loader />}
            </div>
          </Panel>
        );
      });
    }else{
      return <h2>Слов удовлетворяющих поиску не найдено</h2>
    }
  }

  const renderSearch = () => {
    let key = 'Поиск';

    return (
      <Collapse activeKey={key}>
        <Panel header={key} key={key} className={styles.collapsePanel}>
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
              {!isMobile && (
                <div className={styles.headerItem}>
                  <p className={styles.boldText}>Прослушать</p>
                </div>
              )}
              <div className={styles.headerItem}>
                <p className={styles.boldText}>
                  {isMobile ? "Изучить" : "Добавить к изучению"}
                </p>
              </div>
            </div>

            {foundWords ? renderWordsTable(foundWords, key) : <Loader />}
          </div>
        </Panel>
      </Collapse>
    );
  };

  if (!dictionaryLetters) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.headerItemWrapper}>
          <div className={styles.breadCrumpWrapper}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <NavLink to={appRoute.BASE}>
                  <a href="">Главная страница</a>
                </NavLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Словарь</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className={styles.headerItemWrapperInput}>
          <Input.Search
            onChange={onSearchInputChangeHandler}
            placeholder={
              dictionaryLetters
                ? "Введите слово для поиска"
                : "Подождите загрузка слов в процессе"
            }
            allowClear
            enterButton="Найти"
            size={isMobile ? ButtonSize.SMALL : ButtonSize.MIDDLE}
            onSearch={onSearchButtonPressHandler}
          />
        </div>
      </div>
      <div className={styles.rootWrapper}>
        <div ref={scroll}></div>
        <p className={styles.title}>Словарь</p>

        {approwed ? <Collapse
          defaultActiveKey={[]}
          bordered={false}
          className={styles.collapseWrapper}
        >
          {inputValue ? renderSearch() : (dictionaryLetters ? renderLetters(dictionaryLetters) : <Loader/>)}
        </Collapse> : <p>Для получения доступа к словарю вам нужно оплатить подписку</p>}
        <GoBack />
        {approwed && <div className={styles.topBtnWrapper}>
          <SoundButton
            type="primary"
            icon={<ArrowUpOutlined />}
            className={styles.rowBtnWrapper}
            onClick={executeScroll}
          />
        </div>}
      </div>
    </>
  );
};
