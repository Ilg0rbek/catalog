import { Pagination } from "antd";
import * as React from "react";
import { ThemeCards, ThemeSelectors } from "./components";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { setSelectedThemes } from "../../store/actions/words";
import { Loader } from "../common";
import { setThemesLimit, setThemesPageCount } from "../../store/actions/app";
import { SpecialCards } from "./components/special-cards";
import { actionTypes } from "../../common/enum";
import {tapSoundExecute} from '../common/hoc/sounds/tab-move'
import {useState} from "react";
import {ModalBuy} from "../common/modalBuy/modalBuy";
export const MainPage = () => {
  const dispatch = useDispatch();
  const scroll = React.useRef(null);
  const { selectedThemes, page, limit, cards, defaultCardsSizeType } =
    useSelector((state) => (
    {
      page: state.app.themes_page,
      limit: state.app.themes_limit,
      selectedThemes: state.words.selectedThemes,
      cards: state.design.cards,
      cardsSizeTypes: state.design.cardsSizeTypes,
      defaultCardsSizeType: state.design.defaultCardsSizeType,
    }));
  const { approwed } = useSelector((state) => ({
    approwed: true //state.profile.user.isApproved
  }));
  const [active, setActive] = React.useState(true)
  const [state, setState] = React.useState({
    customCards: null,
    planeCards: null,
  });
  const [isMobile, setIsMobileScreen] = React.useState(false);
  React.useEffect(() => {
    let customCards = [];
    let planeCards = [];
    if (cards) {
      const filterCards = () => {
        cards.forEach((el) => {
          el.size ? customCards.push(el) : planeCards.push(el);
        });
      };
      filterCards();
      setState((prevState) => ({
        ...prevState,
        customCards,
        planeCards,
      }));
    }
  }, [cards]);
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1000) {
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
  React.useEffect(() => {
    dispatch({ type: actionTypes.FETCH_CARDS_ASYNC });
    dispatch({ type: actionTypes.FETCH_CARDS_SIZE_TYPES_ASYNC });
  }, [dispatch]);

  const themeChangeHandler = React.useCallback(
    (themes) => {
      dispatch(setSelectedThemes(themes));
      dispatch(setThemesPageCount(1));
    },
    [dispatch]
  );

  const admin = React.useEffect(() => {
    if (approwed) setActive(false)
  }, [])

  const paginationChangeHandler = (page, pageSize) => {
    dispatch(setThemesLimit(pageSize));
    dispatch(setThemesPageCount(page));
    executeScroll();
    tapSoundExecute();
  };

  const sliceData = ({ count, arr, offset }) => {
    return arr.slice(count * (offset - 1), count * (offset - 1) + count);
  };
  const executeScroll = () =>
    scroll.current.scrollIntoView({ behavior: "smooth" });
  const selectors = [
    {
      title: "Темы",
      data: state.planeCards,
      handler: themeChangeHandler,
      defaultValues: selectedThemes,
    },
  ];
  if (!cards || !state.customCards || !state.planeCards) {
    return <Loader />;
  }
  const getSpecialCards = () => {
    return state.customCards.filter(
      (customCard) => customCard.size.id !== defaultCardsSizeType.id
    );
  };

  const scrolle = false

  if (!cards || !defaultCardsSizeType) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className={!scrolle ? styles.wrapper : styles.positionFix}>
      {!approwed &&
      <div onClick={() => setActive(true)} className={styles.specialCardsWrapper}>
        <SpecialCards cards={getSpecialCards()} isMobile={isMobile}/>
      </div>
      }
      {approwed &&
      <div  className={styles.specialCardsWrapper}>
        <SpecialCards cards={getSpecialCards()} isMobile={isMobile}/>
      </div>
      }
      {active && <ModalBuy modalActive={setActive}/>}

      <div className={styles.selectorWrapper}>
        <div ref={scroll}></div>
        <ThemeSelectors scrolle={scrolle} selectors={selectors} />
      </div>
      <div className={styles.themeListWrapper}>
        <ThemeCards
            modalActive={setActive}
          cards={
            selectedThemes
              ? sliceData({
                  arr: selectedThemes,
                  offset: page,
                  count: limit,
                })
              : sliceData({
                  arr: state.planeCards,
                  offset: page,
                  count: limit,
                })
          }
        />
        <div className={`centered ${styles.paginationWrapper}`}>
          {approwed && <Pagination
            defaultCurrent={page ? page : 1}
            total={
              selectedThemes ? selectedThemes.length : state.planeCards.length
            }
            defaultPageSize={limit ? limit : 10}
            onChange={paginationChangeHandler}
            style={{ marginTop: "15px", marginBottom: "35px" }}

          />
          }
        </div>
      </div>
    </div>
  );
};
