import * as React from "react";
import styles from "./styles.module.css";

export const InfoPage = ({ message }) => {
  return (
    <div className={styles.centered}>
      <h3 className={styles.text} dangerouslySetInnerHTML={{__html: message}}></h3>
    </div>
  );
};
