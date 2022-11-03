import React, { useState } from "react";
import { Menu, Grid, Select } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionTypes, appRoute, linksTypes } from "../../../../../common/enum";
import { userRoles } from "../../../../../common/enum/user";
import styles from "./styles.module.scss";
import { SoundButton } from "../../../hoc/sounds/tap-ui-sound";
import { SoundNavLink } from "../../../hoc/sounds/links-move";
import tapSound from '../../../../../assets/sound/ui/navigation_hover.wav'

const audioFile = new Audio(tapSound);
const { useBreakpoint } = Grid;
const { Option } = Select;
export const MenuItems = ({ user, closeMenu }) => {
  const dispatch = useDispatch();

  const logout = React.useCallback(() => {
    dispatch({ type: actionTypes.LOGOUT });
  });
  const renderLeftLinks = () => {
    let links = [];
    if (user && user.isActivated) {
      links.push({
        type: linksTypes.LINK,
        key: "word_list",
        to: appRoute.BASE,
        title: "Списки слов для изучения",
      });
      links.push({
        type: linksTypes.LINK,
        key: "idiom_list",
        to: appRoute.IDIOMS_PAGE,
        title: "Идиомы",
      });
      links.push({
        type: linksTypes.LINK,
        key: "dictionary",
        to: appRoute.DICTIONARY,
        title: "Словарь",
      });
      links.push({
        type: linksTypes.LINK,
        key: "study",
        to: appRoute.LESSONS,
        title: "Изучение",
      });
    }
    if (user && user.role === userRoles.ADMIN) {
      links.push({
        type: linksTypes.LINK,
        key: "admin",
        to: appRoute.ADMIN,
        title: "Панель Администратора",
      });
    }
    return renderLinks({ links, classNames: [styles.left] });
  };

  const renderRightLinks = () => {
    let links = [];
    if (user) {
      links.push({
        type: linksTypes.BUTTON,
        key: "logout",
        title: "Выйти",
        onClick: logout,
      });
    } else {
      links = [
        ...links,
        {
          type: linksTypes.LINK,
          key: "registration",
          to: appRoute.REGISTRATION,
          title: "Регистрация",
        },
        {
          type: linksTypes.LINK,
          key: "login",
          to: appRoute.LOGIN,
          title: "Вход",
        },
      ];
    }
    return renderLinks({ links, classNames: [styles.right] });
  };


  const renderLinks = ({ links, classNames }) => {

    classNames.push(styles.wordwrap);
  
    return links.map((link) => {
      switch (link.type) {
        case linksTypes.LINK:
          return (
            <Menu.Item key={link.key} className={classNames.join(" ")} onClick={!!closeMenu && (() => closeMenu())}>
              <NavLink to={link.to}>
                <SoundNavLink>
                  <a className={styles.large}>
                    {link.title}
                  </a>
                </SoundNavLink>
              </NavLink>
            </Menu.Item>
          );
        case linksTypes.BUTTON:
          return (
            <Menu.Item key={link.key} className={classNames.join(" ")} onClick={!!closeMenu && (() => closeMenu())}>
              <SoundButton onClick={link.onClick}>{link.title}</SoundButton>
            </Menu.Item>
          );
        case linksTypes.SELECT:
          return (
            <Menu.Item key={link.key} className={classNames.join(" ")} onClick={!!closeMenu && (() => closeMenu())}>
              <Select defaultValue={link.defaultValue} style={{ width: 60 }}>
                {link.items.map((item) => (
                  <Option value={item.key}>{item.title}</Option>
                ))}
              </Select>
            </Menu.Item>
          );

        default:
          return null;
      }
    });
  };

  const { md } = useBreakpoint();
  return (
    <Menu
      mode={md ? "horizontal" : "inline"}
      style={{ display: "inline-block", minWidth: "100%", border: "none" }}
      className={styles.left}
    > 
      {renderLeftLinks()}
      {renderRightLinks()}
    </Menu>
  );
};
