import { Button } from "antd";
import * as React from "react";
import { stylesParse } from "../../../../../../helpers";
import { FireOutlined,ArrowRightOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import {
  ButtonColor,
  ButtonSize,
  ButtonType,
} from "../../../../../../common/enum";
import { SoundButton } from "../../../../../common/hoc/sounds/tap-ui-sound";

export const MainCard = () => {
  return (
    <div className={styles.container}>
      <img
        src="https://picsum.photos/800/200"
        alt="Avatar"
        className={styles.image}
        style={{ width: "100%" }}
      />
      <div className={stylesParse(styles.middle, styles.post)}>
        <p className={styles.title}>
          <FireOutlined />
          1000 самых популярных слов
          <FireOutlined />
        </p>
        <p className={styles.description}>some description here</p>
        <SoundButton type="primary" size={ButtonSize.LARGE} color={ButtonColor.BLUE}>
          Перейти
          <ArrowRightOutlined />
        </SoundButton>
      </div>
      <div className={stylesParse(styles.middle, styles.pre)}>
        <div>
          <p className={styles.title}>
            <FireOutlined />
            1000 самых популярных слов
            <FireOutlined />
          </p>
        </div>
      </div>
    </div>
  );
};
