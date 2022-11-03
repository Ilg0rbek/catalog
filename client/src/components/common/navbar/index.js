import React from "react";
import { Drawer, Button } from "antd";
import { appRoute, ButtonSize, ButtonType } from "../../../common/enum";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { MenuItems } from "./components/MenuItems";
import styles from './styles.module.scss'
import { SoundButton } from "../hoc/sounds/tap-ui-sound";

const Navbar = () => {
  const { user } = useSelector((state) => ({
    user: state.profile.user,
  }));

  const [state, setState] = React.useState({
    current: "mail",
    visible: false,
  });

  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      visible: false,
    });
  };

  return (
    <nav className={styles.menuBar}>
      <div className={styles.logo}>
        <NavLink to={appRoute.BASE}>
          <h4>Mnemoria</h4>
        </NavLink>
      </div>
      <div className={styles.menuCon}>
        <div className={styles.hrMenu}>
          <MenuItems user={user} />
        </div>

        <SoundButton
          className={styles.barsMenu}
          type={ButtonType.TEXT}
          size={ButtonSize.MIDDLE}
          onClick={showDrawer}
        >
          <span className={styles.barsBtn}></span>
        </SoundButton>
        <Drawer
          title="Mnemoria"
          placement="right"
          closable={true}
          onClose={onClose}
          visible={state.visible}
          width="60%"
          bodyStyle={{ padding: '0px' }}
        >
          <MenuItems user={user} closeMenu={onClose} />
        </Drawer>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
