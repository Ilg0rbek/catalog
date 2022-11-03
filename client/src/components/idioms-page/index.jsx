import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { appRoute, ButtonSize } from "../../common/enum";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Breadcrumb, Input, Pagination } from "antd";
import { WordsList } from "./components";
import {
  setCurrentWord,
} from "../../store/actions/words";
import styles from "./styles.module.css";
import {GoBack, Loader} from "../common";
import { NavLink } from "react-router-dom";
import { SoundButton } from "../common/hoc/sounds/tap-ui-sound";
import { setCustomWordStatus } from "../../store/actions/words";

const { Search } = Input;
export const IdiomsPage = React.memo(() => {
  const { user, words, currentTheme, loading, loadingAllWords } =
    useSelector((state) => ({
      user: state.profile.user,
      words: state.words.words,
      loading: state.words.loading,
      currentTheme: state.words.currentTheme,
      loadingAllWords: state.words.allWordsLoading,
    }));

  const [isMobile, setIsMobileScreen] = React.useState(false);
  const [isLazyAllWordsLoadExecute, setIsLazyAllWordsLoadExecute] = React.useState(true);
  const [currentWords, setCurrentWords] = React.useState(null);
  const [customWords, setCustomWords] = React.useState([]);
  const [foundWords, setFoundWords] = React.useState(null);  
  const [inputValue, setInputValue] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [total, setTotal] = React.useState(null);

  const dispatch = useDispatch();

  const fetchWords = ({limit, page, noImage, subjectId}) => {
      fetch(`${process.env.REACT_APP_API_URL_WORDS}/idiom/all?` + new URLSearchParams({
        apiKey: process.env.REACT_APP_WORD_SERVICE_ACCESS_KEY,
        page,
        limit
      })
      ).then(response => {
        return response.json();
      })
      .then(
        (result) => {
          setTotal(result.total);
          let words = compareWords(result.data, window.customWords ?? []);
          setCurrentWords(words);
          window.currentWords = words;
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log(error);
        }
      )
  }

  React.useEffect(() => {
    fetchWords({ limit, page, noImage: false, subjectId: currentTheme.id });
  }, [page, limit]);

  const setWordStatus = React.useCallback(
    ({ innerWordId, wordId, type, modified, isReplace }) => {
      dispatch(
        setCustomWordStatus({
          innerWordId,
          wordId,
          type,
          modified,
          isReplace
        })
      );

      let newArr = window.currentWords;
      let val = false;


      for (var index in newArr) {
        if (newArr[index].id == innerWordId) {
          let word = newArr[index];
          let status = (!!word.modified ? word?.progress?.type : false);

          if (status) {
            val = (status != 'На изучении');
          } else {
            val = true;
          }

          newArr[index].modified = val;

          if (val) {
            if (typeof(newArr[index].progress) === 'undefined') {
              newArr[index].progress = {type: type};
            } else {
              newArr[index].progress.type = type;
            }
          }
        }
      }

      setCurrentWords(newArr);
      window.currentWords = newArr;

      /* поиск */
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

  const onPaginationChangeHandler = React.useCallback((page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
    executeScroll();
  }, []);

  React.useEffect(() => {
    dispatch(setCurrentWord(null));
  }, []);

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

    fetch(`${process.env.REACT_APP_API_URL_USERS}/users/get/words?id=${user.id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setCustomWords(result.words);
          window.customWords = result.words;

          if (currentWords) {
            let words = compareWords(currentWords, result.words);
            setCurrentWords(words);
            window.currentWords = words;
          }
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

  const scroll = React.useRef(null);

  const executeScroll = () =>
    scroll.current.scrollIntoView({ behavior: "smooth" });

  const renderWords = () => {
      return (
          <WordsList
              inputValue={inputValue}
              words={currentWords}
              lan={"RU"}
              isMobile={isMobile}
              setWordStatus={setWordStatus}
          />
      );
  }

    if (!currentWords) {
      return (
        <div className={styles.scrollWrapper}>
          <div ref={scroll}></div>
          <Loader />
        </div>
      );
    }

  const onSearchButtonPressHandler = () => {};
  
  const onSearchInputChangeHandler = (event) => {
    const { value } = event.target;
    setInputValue(value);

    getSearch(value);
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

  const getSearch = (word) => {
    if (word.length >= 3) {
        fetch(`${process.env.REACT_APP_API_URL_WORDS}/idiom/all?` + new URLSearchParams({
          apiKey: process.env.REACT_APP_WORD_SERVICE_ACCESS_KEY,
          filterBy: `{"text": "${word}"}`
        }))
        .then(response => {
          return response.json();
        })
        .then(
          (result) => {
            let words = compareWords(result.data, window.customWords ?? []);

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

    }
  }

  const renderSearch = () => {
    return (foundWords ? <WordsList
        inputValue={inputValue}
        words={foundWords}
        lan={"RU"}
        isMobile={isMobile}
        setWordStatus={setWordStatus}
      /> : <Loader />
    );
  };

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
              <Breadcrumb.Item>Идиомы</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className={styles.headerItemWrapperInput}>
          <Input.Search
            onChange={onSearchInputChangeHandler}
            placeholder={
              !loadingAllWords && isLazyAllWordsLoadExecute
                ? "Введите слово для поиска"
                : "Подождите загрузка слов в процессе"
            }
            allowClear
            enterButton="Найти"
            disabled={!(!loadingAllWords && isLazyAllWordsLoadExecute)}
            size={isMobile ? ButtonSize.SMALL : ButtonSize.MIDDLE}
            onSearch={onSearchButtonPressHandler}
          />
        </div>
      </div>

      <div className={styles.centered}>
        <div className={styles.wordListWrapper}>
          <div ref={scroll}></div>
          { inputValue ? renderSearch() : renderWords() }
        </div>
        <div className={styles.topBtnWrapper}>
          <SoundButton
            type="primary"
            icon={<ArrowUpOutlined />}
            className={styles.rowBtn}
            onClick={executeScroll}
          />
        </div>
        <div className={styles.paginationWrapper}>
          {!inputValue && <Pagination
            defaultCurrent={page}
            total={total}
            defaultPageSize={limit}
            onChange={onPaginationChangeHandler}
          />}
        </div>
        <div className={styles.wordListWrapper}>
          <GoBack />
        </div>
      </div>
    </>
  );
});
