import { Divider } from "antd";
import * as React from "react";
import { MainCard, SpecialCard, modalReferal} from "./components";
import styles from "./styles.module.css";
export const SpecialCards = React.memo(({ cards, isMobile, modalActiveRef, modalActive }) => {
  return (
    <div>
      <div className="centered">
        <Divider>
          <p className={styles.title}>Популярные темы</p>
        </Divider>
      </div>
      <SpecialCard cards={cards} isMobile={isMobile} modalActiveRef={modalActiveRef} modalActive={modalActive}/>
    </div>
  );
});
