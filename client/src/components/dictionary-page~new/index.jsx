import * as React from "react";
import { Breadcrumb, Input } from "antd";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../common";
import { NavLink } from "react-router-dom";
import { appRoute, ButtonSize } from "../../common/enum";
import { SoundButton } from "../common/hoc/sounds/tap-ui-sound";
import { ArrowUpOutlined } from "@ant-design/icons";
import { setCustomWordStatus } from "../../store/actions/words";
import { isObjectEmpty } from "../../helpers";

import Collapsible from 'react-collapsible';

export const DictionaryPage = () => {
  const dispatch = useDispatch();
  const { approwed } = useSelector((state) => ({
    approwed: true //state.profile.user.isApproved
  }));

  const [dictionaryLetters, setDictionaryLetters] = React.useState(null);
  const [isMobile, setIsMobileScreen] = React.useState(false);
  const setWordStatus = React.useCallback(
    ({ innerWordId, wordId, type, modified, isReplace, key, isDictionary }) => {
      dispatch(
        setCustomWordStatus({
          innerWordId,
          wordId,
          type,
          modified,
          isReplace,
          key,
          isDictionary,
        })
      );
    },
    [dispatch]
  );

  React.useEffect(() => {
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

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderLetters = (dictionaryLetters) => {
    if(!isObjectEmpty(dictionaryLetters)){
      return dictionaryLetters.map((key) => {
        return (
          <Collapsible 
            trigger={key} 
            lazyRender={true}
            className={styles.collapsePanel} 
            openedClassName={styles.collapsePanel} 
            triggerClassName={styles.Collapsible__trigger} 
            triggerOpenedClassName={styles.Collapsible__trigger}>
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
          </Collapsible>
        );
      });
    }else{
      return <h2>Слов удовлетворяющих поиску не найдено</h2>
    }
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
            placeholder={
              dictionaryLetters
                ? "Введите слово для поиска"
                : "Подождите загрузка слов в процессе"
            }
            allowClear
            enterButton="Найти"
            disabled={!dictionaryLetters}
            size={isMobile ? ButtonSize.SMALL : ButtonSize.MIDDLE}
          />
        </div>
      </div>
      <div className={styles.rootWrapper}>
        <p className={styles.title}>Словарь</p>

        {approwed ? <div
          className={styles.collapseWrapper}
        >
          {renderLetters(dictionaryLetters)}
        </div> : <p>Для получения доступа к словарю вам нужно оплатить подписку</p>}

        {approwed && <div className={styles.topBtnWrapper}>
          <SoundButton
            type="primary"
            icon={<ArrowUpOutlined />}
            className={styles.rowBtnWrapper}
          />
        </div>}
      </div>
    </>
  );
};
