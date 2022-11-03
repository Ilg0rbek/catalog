import * as React from "react";
import { Divider, Select } from "antd";
import styles from "./styles.module.css";
import { ButtonSize } from "../../../../../../common/enum";
import {useState} from "react";
import {useSelector} from "react-redux";
const { Option } = Select;

export const ThemeSelector = ({ scrolle, data, title, handler, defaultValues }) => {

  const { approwed } = useSelector((state) => ({
    approwed: true //state.profile.user.isApproved
  }));

  const renderItems = () => {
    if (approwed) {
      return data.map((el, i) => (
          <Option value={el.name} key={el.id}>
            {el.name}
          </Option>
      ));
    } else {
      let indexes = [data[0], data[1], data[2]]
      return indexes.map((el, i) => (
          <Option value={el.name} key={el.id}>
            {el.name}
          </Option>
      ));
    }
  };
  const getDefaultValues = () => {
    if (defaultValues) {
      return defaultValues.map((el) => {
        return el.name;
      });
    }
    return undefined;
  };
  const handleChange = (value) => {
    let filtered = data.filter((el) => value.includes(el.name));
    if (filtered.length === 0) {
      filtered = null;
    }
    handler(filtered);
  };
  return (
    <div className={styles.selectorWrapper}>
      <div className="centered">
        <Divider>
          <p className={styles.title}>{title}</p>
        </Divider>
      </div>

      <Select
          onClick={() => scrolle = true}
        mode="multiple"
        allowClear
        className={styles.selector}
        placeholder="Выберите темы"
        defaultValue={getDefaultValues()}
        size={ButtonSize.LARGE}
        onChange={handleChange}
      >
        {renderItems()}
      </Select>
    </div>
  );
};
