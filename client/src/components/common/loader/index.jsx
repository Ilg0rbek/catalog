import * as React from "react";
import { Space, Spin } from "antd";
import { stylesParse } from "../../../helpers";
import styles from './styles.module.css'
const Loader = () => {
  return (
    <div className={styles.centered}>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Loader;
