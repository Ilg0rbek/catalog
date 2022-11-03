import * as React from "react";
import { Layout, Tabs, Input } from "antd";
import { BanUsers, UpdateUser } from "./components/users";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes, ButtonSize } from "../../common/enum";
import styles from "./styles.module.css";
import { stylesParse } from "../../helpers";
import { Loader } from "../common";
import { ManageThemes } from "./components/themes";
import { SettingsAdmin } from "./components/settings";
import { Promo } from "./components/promo";
import { tapSoundExecute } from "../common/hoc/sounds/tab-move";
import { useMemo, useState, useEffect, useCallback } from "react";

const { Content, Footer } = Layout;
const { TabPane } = Tabs;

export const AdminPanelPage = () => {
  const dispatch = useDispatch();
  const { users, cards, cardsSizeTypes, defaultCardsSizeType, settings } =
    useSelector((state) => ({
      users: state.users.users,
      settings: state.settings,
      cards: state.design.cards,
      cardsSizeTypes: state.design.cardsSizeTypes,
      defaultCardsSizeType: state.design.defaultCardsSizeType,
    }));
    
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    dispatch({ type: actionTypes.GET_ALL_USERS });
    dispatch({ type: actionTypes.FETCH_CARDS_ASYNC });
    dispatch({ type: actionTypes.FETCH_CARDS_SIZE_TYPES_ASYNC });
  }, [dispatch]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 756) {
        setIsMobileScreen(true);
      } else {
        setIsMobileScreen(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const approveHandler = useCallback(
    (id, isApproved) => {
      dispatch({ type: actionTypes.APPROVE_USER, payload: { id, isApproved } });
    },
    [dispatch]
  );

  const updateHandler = useCallback(
    (id, data) => {
      dispatch({
        type: actionTypes.UPDATE_USER_ASYNC,
        payload: { id, data },
      });
    },
    [dispatch]
  );

  const updateCardsDesignHandler = useCallback(
    (id, data) => {
      dispatch({
        type: actionTypes.UPDATE_CARD_ASYNC,
        payload: { id, data },
      });
    },
    [dispatch]
  );

  const banHandler = useCallback(
    (id, isBanned) => {
      dispatch({ type: actionTypes.BAN_USER, payload: { id, isBanned } });
    },
    [dispatch]
  );

  const renderUsersWithLoading = ({ component: Component, props }) => {
    if (users) {
      return <Component {...props} />;
    }
    return <Loader />;
  };

  const renderDesignWithLoading = ({ component: Component, props }) => {
    if (cards && cardsSizeTypes && defaultCardsSizeType) {
      return <Component {...props} />;
    }
    return <Loader />;
  };

  const setSettings = (property) => {
    dispatch({
      type: actionTypes.SET_SETTINGS_PROPERTIES_ASYNC,
      payload: { key: property.key, value: property.value },
    });
  };

  const [activeTabKey, setActiveTabKey] = useState("user_manage");
  const [themeQuery, setThemeQuery] = useState("")
  const onTabsChangeHandler = (activeKey) => {
    setActiveTabKey(activeKey);

    return tapSoundExecute();
  }

  const onThemeSearch = (value) => {
    setThemeQuery(value);
    if (value.length > 0) {
      setActiveTabKey("theme_manage");
    }
  }

  const OperationsSlot = {
    right: <Input.Search name="q" placeholder="Поиск по темам" onSearch={onThemeSearch} />
  };
  const [ position ] = useState(['left', 'right']);
  const slot = useMemo(() => {
    if (position.length === 0) return null;

    return position.reduce(
        (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
        {},
    );
  }, [position]);

  return (
    <Layout>
      <Content className={stylesParse(styles.siteLayout, styles.content)}>
        <div
          className={stylesParse(
            styles.siteLayoutBackground,
            styles.contentLayout
          )}
        >
          <Tabs
              activeKey={activeTabKey}
              defaultActiveKey="user_manage"
              size={ButtonSize.SMALL}
              tabBarExtraContent={slot}
              onChange={onTabsChangeHandler}
          >
            <TabPane tab="Управление пользователями" key="user_manage">
              <Tabs defaultActiveKey="user_approve" size={ButtonSize.SMALL}>
                <TabPane tab="Заблокированные пользователи" key="ban_user">
                  {renderUsersWithLoading({
                    component: BanUsers,
                    props: { users, banUser: banHandler, isMobileScreen },
                  })}
                </TabPane>
                <TabPane tab="Данные пользователей" key="change_user">
                  {renderUsersWithLoading({
                    component: UpdateUser,
                    props: {
                      users,
                      update: updateHandler,
                      banUser: banHandler,
                      isMobileScreen,
                    },
                  })}
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab="Управление словами" key="theme_manage">
              <Tabs defaultActiveKey="manage_theme" size={ButtonSize.SMALL}>
                <TabPane tab="Управление темами" key="manage_theme">
                  {renderDesignWithLoading({
                    component: ManageThemes,
                    props: {
                      cards,
                      cardsSizeTypes,
                      defaultCardsSizeType,
                      isMobileScreen,
                      updateCardsDesignHandler,
                      themeQuery
                    },
                  })}
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab="Настройки" key="s">
              {renderDesignWithLoading({
                component: SettingsAdmin,
                props: {
                  setSettings,
                  settings,
                  isMobileScreen,
                },
              })}
            </TabPane>
           <TabPane tab="Промокод" key="promo">
              {renderDesignWithLoading({
                component: Promo,
                props: {
                  setSettings,
                  settings,
                  isMobileScreen,
                },
              })}
            </TabPane> 
          </Tabs>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Mnemoria 2021</Footer>
    </Layout>
  );
};
