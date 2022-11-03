import { Divider } from "antd";
import * as React from "react";
import { MainCard, SpecialCard } from "./components";
import styles from "./styles.module.css";
export const SpecialCards = React.memo(({ cards, isMobile, modalActive }) => {
  return (
    <div>
      <div className="centered">
        <Divider>
          <p className={styles.title}>Популярные темы</p>
        </Divider>
      </div>

      <SpecialCard cards={cards} isMobile={isMobile} />
    </div>
  );
});
