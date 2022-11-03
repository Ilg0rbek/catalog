import * as React from "react";
import { Divider, Select } from "antd";
import styles from "./styles.module.css";
import { ButtonSize } from "../../../../../../common/enum";
import { useSelector } from "react-redux";
import { stylesParse } from "../../../../../../helpers";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const { Option } = Select;

export const ThemeSelector = ({ scrolle, data, title, handler, defaultValues }) => {
  const { approwed } = useSelector((state) => ({
    approwed: true //state.profile.user.isApproved
  }));

  const [isSearching, setIsSearching] = React.useState(false)
  const ref = React.useRef(null)

  React.useEffect(() => {
    const targetEl = document.querySelector('#search-input');
    if (isSearching) {
      disableBodyScroll(targetEl)
    } else {
      enableBodyScroll(targetEl)
    }
  })

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
  const handleFocus = () => {
    // ref.current.scrollIntoView({ behavior: "smooth" });
    setIsSearching(true)
    scrolle = true
  }
  const handleChange = (value) => {
    let filtered = data.filter((el) => value.includes(el.name));
    if (filtered.length === 0) {
      filtered = null;
    }
    handler(filtered);
  };
  return (
    <div className={stylesParse(
      styles.selectorWrapper, 
      isSearching ? styles.wrapperFix : ''
      )}>
      <div ref={ref}></div>
      <div className="centered">
        <Divider>
          <p className={styles.title}>{title}</p>
        </Divider>
      </div>
      <Select
        onClick={() => handleFocus()}
        mode="multiple"
        allowClear
        id={'search-input'}
        className={styles.selector}
        placeholder="Выберите темы"
        defaultValue={getDefaultValues()}
        onDropdownVisibleChange={open => !open && (setIsSearching(false))}
        size={ButtonSize.LARGE}
        onChange={handleChange}
      >
        {renderItems()}
      </Select>
    </div>
  );
};
