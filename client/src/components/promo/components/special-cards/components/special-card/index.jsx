import * as React from "react";
import { appRoute } from "../../../../../../common/enum";
import { stylesParse } from "../../../../../../helpers";
import {
  redirect,
  setWordsPageCount,
} from "../../../../../../store/actions/app";
import {
  clearWords,
  setCurrentTheme,
} from "../../../../../../store/actions/words";
import { dispatch } from "../../../../../../store/store";
import { Loader } from "../../../../../common";
import styles from "./styles.module.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {useSelector} from "react-redux";

export const SpecialCard = ({ cards, isMobile, modalActive }) => {
  const itemClickHandler = React.useCallback((theme, key) => {
    if(key == 0)
    dispatch(redirect(appRoute.REFPROGRAM));
    else {
    dispatch(clearWords());
    dispatch(setWordsPageCount(1));
    dispatch(setCurrentTheme(theme));
    dispatch(redirect(appRoute.WORD_CATALOG));
    }
  });

  const { approwed } = useSelector((state) => ({
    approwed: true //state.profile.user.isApproved
  }));
  const renderBoxes = ({ cards, isMobile }) => {
    const maxBoxSize = isMobile ? 1 : 5; //размер подмассива
    let boxes = []; //массив в который будет выведен результат.
    for (let i = 0; i < Math.ceil(cards.length / maxBoxSize); i++) {
      boxes[i] = cards.slice(i * maxBoxSize, i * maxBoxSize + maxBoxSize);
    }
    //more pretier cards separate
    if (boxes[boxes.length - 1].length === 1 && !isMobile && boxes.length > 1) {
      let lastElement = boxes[boxes.length - 2].splice(-1);
      boxes[boxes.length - 1].push(lastElement[0]);
    }
    return boxes.map((box, index) => {
      return (
        <ReactCSSTransitionGroup
          transitionName="show"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={true}
          transitionLeave={true}
        >
          {renderImages({ items: box, isReverse: index % 2 })}
        </ReactCSSTransitionGroup>
      );
    });
  };
  const renderImages = ({ items, isReverse }) => {
    console.log('items', items);
    switch (items.length) {
      case 1:
        return <div className={styles.box}>{renderItem(items[0], 0)}</div>;
      case 2:
        return (
          <div className={styles.box}>
            <div className={styles.box}>{renderItem(items[0], 0)}</div>
            <div className={styles.box}>{renderItem(items[1], 1)}</div>
          </div>
        );
      case 3:
        return (
          <div
            className={stylesParse(
              styles.box,
              isReverse ? styles.reverse : styles.row
            )}
          >
            <div className={styles.box}>{renderItem(items[0], 0)}</div>
            <div className={stylesParse(styles.box, styles.row)}>
              <div className={styles.box}>{renderItem(items[1], 1)}</div>
              <div className={styles.box}>{renderItem(items[2], 2)}</div>
            </div>
          </div>
        );
      case 4:
        return (
          <div
            className={stylesParse(
              styles.box,
              isReverse ? styles.reverse : styles.row
            )}
          >
            <div
              className={stylesParse(
                styles.box,
                isReverse ? styles.reverse : styles.row
              )}
            >
              {renderItem(items[0], 0)}
            </div>
            <div className={stylesParse(styles.box, styles.column)}>
              <div className={styles.box}>{renderItem(items[1], 1)}</div>
              <div className={stylesParse(styles.box, styles.row)}>
                <div className={styles.box}>{renderItem(items[2], 2)}</div>
                <div className={styles.box}>{renderItem(items[3], 3)}</div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div
            className={stylesParse(
              styles.box,
              isReverse ? styles.reverse : styles.row
            )}
          >
            {renderItem(items[0], 0)}
            <div className={stylesParse(styles.box, styles.column)}>
              <div className={stylesParse(styles.box, styles.row)}>
                {renderItem(items[1], 1)}
                {renderItem(items[2], 2)}
              </div>
              <div className={stylesParse(styles.box, styles.row)}>
                {renderItem(items[3], 3)}
                {renderItem(items[4], 4)}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const renderItem = (item, key) => {
    if (approwed) {
      return (
          <div onClick={() => itemClickHandler(item, key)} className={styles.box}>
            {renderImage(item)}
          </div>
      );
    } else {
      return (
          <div className={styles.box}>
            {renderImage(item)}
            <div className={styles.boxLock}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" role="img"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                   className="svg-inline--fa fa-lock fa-w-14 fa-7x">
                <path fill="currentColor"
                      d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                      className=""></path>
              </svg>
            </div>
          </div>
      );
    }
  };
  const renderImage = (card) => {
    const { name: title, description } = card;
    return (
      <div className={styles.imagesWrapper}>
        <img
          src={
            card.image
              ? `${process.env.REACT_APP_API_URL_USER_STATIC}/${card.image.name}`
              : `https://picsum.photos/800/400`
          }
          alt="Avatar"
          className={styles.image}
        />
        {
          <div className={styles.textBox}>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>
        }
      </div>
    );
  };
  return (
    <div className={styles.wrapper}>
      {cards?.length > 0 ? (
        renderBoxes({ cards, isMobile })
      ) : (
        <div className="centered"> ПОКА ПУСТО </div>
      )}
    </div>
  );
};
