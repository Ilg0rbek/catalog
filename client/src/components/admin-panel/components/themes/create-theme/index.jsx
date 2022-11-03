import * as React from "react";
import styles from "./styles.module.css";
export const CreateTheme = () => {
  return (
    <div className={styles.rootWrapper}>
      <div className={styles.mainInfoWrapper}>
        <h1>Общая информация</h1>
         
      </div>
      <div className={styles.contentInfoWrapper}>
        <h1>Контент</h1>
      </div>
    </div>
  );
};
