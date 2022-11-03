import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { appRoute } from "../../common/enum";
import { Divider } from "antd";
import { LoginForm, RegistrationForm } from "./components/components";

import styles from "./styles.module.css";

export const Login = (props) => {
  const params = new URLSearchParams(props.location.search);
  const code = params.get('code')
  const { pathname } = useLocation();
  const handleRegister = () => {};

  const getScreen = (path) => {
    let ref = path.match(/(\/ref)\/([0-9]+)/);
    if(ref) {
    path = 'REF'; 
    ref = ref[2];
    }

    switch (path) {
      case appRoute.LOGIN: {
        return <LoginForm referer={ref} vkCode={code}/>;
      }
      case 'REF':
      case appRoute.REGISTRATION: {
        return <RegistrationForm referer={ref} vkCode={code}/>; 
      }
      default: {
        return null;
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={"centered"}>
          {/* <h3 className={styles.logoWrapper}>М - ВЧ «Изучение» Мемория</h3> */}
          <Divider />
        </div>
        <div className={styles.form}>{getScreen(pathname)}</div>
        <div className={"centered"}>
          <div className={styles.forgotPasswordWrapper}>
            <NavLink to={appRoute.RESET_PASSWORD} activeClassName="selected">
              <a href={appRoute.RESET_PASSWORD} className={styles.forgotPass}>
                Забыли пароль?
              </a>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
