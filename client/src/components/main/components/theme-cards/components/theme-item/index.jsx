import * as React from "react";
import { Card } from "antd";

import { useDispatch } from "react-redux";
import {
  clearWords,
  setCurrentTheme,
} from "../../../../../../store/actions/words";
import {
  redirect,
  setWordsPageCount,
} from "../../../../../../store/actions/app";
import { appRoute } from "../../../../../../common/enum";
import image from "../../../../../../data/en.jpg";
import dotenv from "dotenv";
import styles from "./styles.module.css";
dotenv.config();

const { Meta } = Card;
export const ThemeItem = ({ data }) => {
  const dispatch = useDispatch();
  const itemClickHandler = React.useCallback(() => {
    dispatch(clearWords());
    dispatch(setWordsPageCount(1));
    dispatch(setCurrentTheme(data));
    dispatch(redirect(appRoute.WORD_CATALOG));
  });
  return (
    <Card
      hoverable
      onClick={itemClickHandler}
      cover={
        <img
          alt="example"
          src={
            data.image
              ? `${process.env.REACT_APP_API_URL_USER_STATIC}/${data.image.name}`
              : image
          }
          className={styles.img}
        />
      }
    >
      <Meta title={data.name} description="" />
    </Card>
  );
};
