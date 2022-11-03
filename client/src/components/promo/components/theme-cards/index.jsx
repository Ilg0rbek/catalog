import * as React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { ThemeItem } from "./components";
import styles from "./styles.module.css";
import {useSelector} from "react-redux";
import {LockItem} from "./components/theme-item/lockitem";

export const ThemeCards = React.memo(({ cards, modalActive }) => {

  const { approwed } = useSelector((state) => ({
    approwed: true //state.profile.user.isApproved
  }));
  const renderCards = () => {
  if (approwed) {
    return cards.map((el, index) => (
        <ReactCSSTransitionGroup
        className={styles.item}
        transitionName="show"
        transitionAppear={true}
        transitionAppearTimeout={1200}
        transitionEnter={true}
        transitionLeave={true}
      >
        {el && <ThemeItem data={el} />}

      </ReactCSSTransitionGroup>
    ));
  }
  if (!approwed) {
    return cards.map((el, index) => {
      if (index <= 2) {
        return (
        <ReactCSSTransitionGroup
            className={styles.item}
            transitionName="show"
            transitionAppear={true}
            transitionAppearTimeout={1200}
            transitionEnter={true}
            transitionLeave={true}
        >
          <ThemeItem data={el}/>
        </ReactCSSTransitionGroup>
        )
      } else {
        return (
            <ReactCSSTransitionGroup
                className={styles.item}
                transitionName="show"
                transitionAppear={true}
                transitionAppearTimeout={1200}
                transitionEnter={true}
                transitionLeave={true}
                onClick={() => modalActive(true)}
            >
              <LockItem data={el}/>
            </ReactCSSTransitionGroup>
        )
      }
    });
  }
  };
  return <div className={styles.itemsGroup}>{renderCards()}</div>;
});
