import * as React from "react";
import { Breadcrumb, Input, Pagination } from "antd";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../common";
import { NavLink } from "react-router-dom";
import { appRoute, ButtonSize } from "../../common/enum";
import { SoundButton } from "../common/hoc/sounds/tap-ui-sound";
import { ArrowUpOutlined } from "@ant-design/icons";
import { setCustomWordStatus } from "../../store/actions/words";
import { isObjectEmpty } from "../../helpers";
import { stylesParse } from "../../helpers/utils/styles-parse.util";
import { WordItem } from "./components/word-item";

import Collapsible from 'react-collapsible';

export const DictionaryPageSecond = () => {
  const dispatch = useDispatch();
  const { approwed } = useSelector((state) => ({
    approwed: state.profile.user.isApproved
  }));

  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const [words, setWords] = React.useState([]);
  const [activeLetter, setActiveLetter] = React.useState(LETTERS[0]);
  const [isMobile, setIsMobileScreen] = React.useState(false);
  const [currentPageNumber, setCurrentPageNumber] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(null);
  const [pageLimit, setPageLimit] = React.useState(10);
  const [isSearching, setIsSearching] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [dictionaryLetters, setDictionaryLetters] = React.useState(null);
  const [dictionaryWords, setDictionaryWords] = React.useState([]);
  const customWords = React.useRef([])
  const timeout = React.useRef(null)
  // const [customWords, setCustomWords] = React.useState([]);
  const [foundWords, setFoundWords] = React.useState([]);

  const inputValue = React.useRef(null)
  const handleLetterClick = (l) => {
    if (l === activeLetter) return
    setActiveLetter(l)
    setCurrentPageNumber(1)
  }

  const onSearchInputChangeHandler = (event) => {
    const { value } = event.target;
    if (value === inputValue.current) return
    inputValue.current = value
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

      let newArr = words;
      let val = false;
      let letter = key;

      for (var index in newArr[letter]) {
        if (newArr[letter].id == innerWordId) {
          let word = newArr[letter];
          let status = (!!word.modified ? word?.progress?.type : false);

          if (status) {
            val = (status != 'На изучении');
          } else {
            val = true;
          }

          newArr[letter].modified = val;

          if (val) {
            if (typeof(newArr[letter].progress) === 'undefined') {
              newArr[letter].progress = {type: type};
            } else {
              newArr[letter].progress.type = type;
            }
          }
        }
      }
      customWords.current =newArr;

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
    [dispatch, words]
  );

  const { user, toasts, redirect, isAuth } = useSelector((state) => ({
    user: state.profile.user,
    toasts: state.app.toasts,
    redirect: state.app.redirect,
    isAuth: state.auth.isAuth,
  }));

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

    fetch(`${process.env.REACT_APP_API_URL_USERS}/users/get/words?id=` + user.id)
      .then(res => res.json())
      .then(
        (result) => {
          customWords.current = result.words;
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
  }, [activeLetter]);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL_USERS}/users/get/words?id=` + user.id)
    .then(res => res.json())
    .then(
      (result) => {
        customWords.current = result.words;
      },
      // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
      // чтобы не перехватывать исключения из ошибок в самих компонентах.
      (error) => {
        console.log(error);
      }
    )
  }, []);
  

  React.useEffect(() => {
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_API_URL_WORDS}/translation/letter?`+ new URLSearchParams({
      apiKey: process.env.REACT_APP_WORD_SERVICE_ACCESS_KEY,
      letter: inputValue.current || activeLetter,
      page: currentPageNumber,
      limit: pageLimit,
    }))
      .then(res => res.json())
      .then(
        (result) => {
          setWords(compareWords(result.data, customWords.current));
          setTotalCount(result.total)
          setIsLoading(false)
        },
        (error) => {
          console.log(error);
        }
      )
  }, [activeLetter, currentPageNumber, pageLimit])

  const onPaginationChangeHandler = React.useCallback((pageNum, limit) => {
    setCurrentPageNumber(pageNum);
    setPageLimit(limit);
    executeScroll()
  }, []);

  const getSearch = (word) => {
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_API_URL_WORDS}/translation/letter?`+ new URLSearchParams({
      apiKey: process.env.REACT_APP_WORD_SERVICE_ACCESS_KEY,
      letter: word || activeLetter,
      page: 1,
      limit: pageLimit,
    }))
      .then(response => {
        return response.json();
      })
      .then(
        (result) => {
          let words = compareWords(result.data, customWords.current);
          setCurrentPageNumber(1)

          setWords(words)
          setTotalCount(result.total)
          setIsLoading(false)
          window.foundWords = words;
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log(error);
        }
      )
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const WORDS = React.useMemo(() => (
    words.length > 0 ? (
      words.map((word, index) => (
        <WordItem
          key={index}
          word={word}
          id={word.id}
          progressType={!!word.modified ? word?.progress?.type : null}
          isMobile={isMobile}
          innerWordId={word.id}
          wordId={word.wordId}
          modified={!!word.modified}
          renderText={renderText}
          setWordStatus={setWordStatus}
          keyId={index}
        />
      ))) : (
        <div>Слова не найдены</div>
      )
  ), [words, isMobile, renderText, setWordStatus]);

  return (
    <div className={styles.wordListWrapper}>   
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
            onChange={(e) => {
              clearTimeout(timeout.current)
              timeout.current = setTimeout(() => {
                onSearchInputChangeHandler(e)
              }, 200)
            }}
            placeholder={
              words
                ? "Введите слово для поиска"
                : "Подождите загрузка слов в процессе"
            }
            allowClear
            enterButton="Найти"
            disabled={!words}
            size={isMobile ? ButtonSize.SMALL : ButtonSize.MIDDLE}
          />
        </div>
      </div>
      <div className={styles.rootWrapper}>
        <div className={styles.searchButtons}>
          {LETTERS.split('').map(l => (
            <button onClick={() => handleLetterClick(l)} key={l} className={stylesParse(styles.searchButton, activeLetter === l && styles.activeButton)}>{l}</button>
          ))}
        </div>
 
        <> 
          <div className={stylesParse(styles.wrapper, styles.bc)} ref={scroll}>
            <div className={styles.textWrapper}>Слово</div>
            <div className={styles.textWrapper}>Перевод</div>
            {!isMobile ? (
              <div className={styles.textWrapper}>Транскрипция</div>
            ) : null}
            {!isMobile ? (
              <div className={styles.textWrapper}>{"Статус"}</div>
            ) : null}

            <div className={styles.textWrapper}>{"Добавить к изучению"}</div>
          </div>
            {isLoading ? <Loader /> : WORDS }
          </>

      </div>
      <div className={styles.pagination}>
        {totalCount > 0 && !isSearching && (
          <Pagination
            defaultCurrent={currentPageNumber}
            total={totalCount}
            defaultPageSize={pageLimit}
            onChange={onPaginationChangeHandler}
        />
        )}
      </div>
    </div>
  );
};
