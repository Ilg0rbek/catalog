import * as React from "react";
import { Button, Form, Input } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { actionTypes, appRoute, ButtonSize } from "../../../../common/enum";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailRules, passwordRules } from "../../../../common/rules";
import { CookieHelper } from "../../../../helpers";
import { cookieNames } from "../../../../common/constants";
import styles from "./styles.module.css";
import { SoundButton } from "../../../common/hoc/sounds/tap-ui-sound";
import VkSmallIcon from "../../../../assets/images/vk-small-icon";
import VK from "../../../../helpers/http/vk";
import GoogleAuthBtn from "../../../google-auth-button";
import AppleLogin from 'react-apple-login';
import { gapi } from 'gapi-script';
import dotenv from "dotenv";
 
dotenv.config();

const LoginForm = ({ referer, vkCode }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => ({
    isLoading: state.profile.isLoading,
  }));

  React.useEffect(() => {
    if (vkCode) {
      dispatch({
        type: actionTypes.VKOAUTH,
        payload: { code: vkCode, referer },
      })
    }
  }, [])

  const initialPassword = CookieHelper.getCookie(cookieNames.PASSWORD);
  const initialEmail = CookieHelper.getCookie(cookieNames.EMAIL);

  const [isForgot, setIsForgot] = React.useState(true);
  const [email, setEmail] = React.useState(initialEmail);
  const [password, setPassword] = React.useState(initialPassword);

  // const vk = new VK()

  // React.useEffect(() => {
  //   vk.init()
  // })

  React.useEffect(() => {
    function googleInit() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', googleInit);
  }, []);

  // const vkAuthInit = () => {
  //   const Window = (window)
  //   if (Window.VK) {
  //     const VK = Window.VK
  //     VK.Auth.login((r) => {
  //       if (r.session) {
  //         const vkId = r.session.user.id
  //         console.log('se', r)
  //         // dispatch({
  //         //   type: actionTypes.VK,
  //         //   payload: { vkId, referer },
  //         // })
  //       }
  //     });
  //   }
  // }

  const login = React.useCallback(
    () => (
      dispatch({
        type: actionTypes.LOGIN,
        payload: { email, password, isForgot },
      })
    ),
    [dispatch, email, isForgot, password]
  );
  const emailChanged = (data) => {
    setEmail(data);
  };
  const passwordChanged = (data) => {
    setPassword(data);
  };
  const forgotCheckBoxChanged = (data) => {
    setIsForgot(data);
  };

  const initialValues = {
    "password-item": password,
    "email-item": email,
  };
  return (
    <>
      <div className="centered">
        <h3 className={styles.title}>Вход в аккаунт</h3>
      </div>
      <Form
        name="form"
        scrollToFirstError={true}
        size={"middle"}
        layout={"vertical"}
        onFinish={login}
        initialValues={initialValues}
      >
        <Form.Item
          label="Email"
          rules={emailRules}
          className="mt1"
          name="email-item"
        >
          <Input
            name="email"
            autoFocus
            placeholder="email"
            prefix={<MailOutlined />}
            className={styles.input}
            onChange={(ev) => emailChanged(ev.target.value)}
          />
        </Form.Item>

        <Form.Item label="Пароль" rules={passwordRules} name="password-item">
          <Input.Password
            placeholder="пароль"
            name="password"
            prefix={<LockOutlined />}
            className={styles.input}
            onChange={(ev) => passwordChanged(ev.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox
            size={ButtonSize.SMALL}
            checked={isForgot}
            onChange={(ev) => forgotCheckBoxChanged(ev.target.checked)}
          >
            <p>Запомнить информацию для входа</p>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <div className={styles.buttons}>
            <SoundButton
              type="primary"
              htmlType="submit"
              size={ButtonSize.MIDDLE}
              className={styles.stretched}
              loading={isLoading}
            >
              Войти
            </SoundButton>
          </div>
          <br/>
          <div className={styles.buttons}>
            <a href={`https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_APP}&redirect_uri=${process.env.REACT_APP_URL}/login&scope=12&display=mobile`}>
              <SoundButton
                type="primary"
                size={ButtonSize.MIDDLE}
                className={styles.vk}
                loading={isLoading}
                // onClick={() => vkAuthInit()}
              >
                <VkSmallIcon />
              </SoundButton>
            </a>
            <GoogleAuthBtn referer={referer} />
            <AppleLogin clientId={`${process.env.REACT_APP_APPLE_CLIENT_ID}`} redirectURI={`${process.env.REACT_APP_URL}`} />
          </div>
        </Form.Item>
      </Form>
      <div className="centered">
        Впервые у нас?
        <NavLink exact to={appRoute.REGISTRATION}>
          Регистрация
        </NavLink>
      </div>
    </>
  );
};

export default LoginForm;
