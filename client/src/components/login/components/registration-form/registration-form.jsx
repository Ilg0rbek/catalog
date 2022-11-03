import * as React from "react";
import { actionTypes, appRoute, ButtonSize } from "../../../../common/enum";
import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailRules, passwordRules } from "../../../../common/rules";
import styles from "./styles.module.css";
import { SoundButton } from "../../../common/hoc/sounds/tap-ui-sound";
import VkSmallIcon from "../../../../assets/images/vk-small-icon";
import VK from "../../../../helpers/http/vk";
import GoogleAuthBtn from "../../../google-auth-button";
import { gapi } from 'gapi-script';
import dotenv from "dotenv";
 
dotenv.config();

const LoginForm = ({ referer, vkCode }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => ({
    isLoading: state.profile.isLoading,
  }));
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (vkCode) {
      dispatch({
        type: actionTypes.VKOAUTH,
        payload: { code: vkCode, referer },
      })
    }
  })

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
  //         dispatch({
  //           type: actionTypes.VK,
  //           payload: { vkId, referer },
  //         })
  //       }
  //     });
  //   }
  // }


  const registration = React.useCallback(
    () => (
        dispatch({
            type: actionTypes.REGISTRATION,
            payload: { email, password, referer },
        }),
        [dispatch, email, password]
    )
  );

  const emailChanged = (data) => {
    setEmail(data);
  };

  const passwordChanged = (data) => {
    setPassword(data);
  };

  return (
    <>
      <div className="centered">
        <h3 className={styles.title}>Создать новый аккаунт</h3>
      </div>
      <div className={styles.authButtons}>
      {/* <a href={`https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_APP}&redirect_uri=${process.env.REACT_APP_URL}/login&scope=12&display=mobile`}>
        <SoundButton
          type="primary"
          size={ButtonSize.MIDDLE}
          className={styles.vk}
          loading={isLoading}
          // onClick={() => vkAuthInit()}
        >
          <VkSmallIcon />
          Войти через Vkontakte 
        </SoundButton>
      </a> */}
        {/* <GoogleAuthBtn referer={referer} useText /> */}
      </div>
      <Form
        name="form"
        scrollToFirstError={true}
        size={"middle"}
        layout={"vertical"}
        onFinish={registration}
      >
        <Form.Item label="Email" name="email" rules={emailRules}>
          <Input
            autoFocus
            placeholder="email"
            prefix={<MailOutlined />}
            className={styles.input}
            onChange={(ev) => emailChanged(ev.target.value)}
          />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={passwordRules}>
          <Input.Password
            placeholder="пароль"
            prefix={<LockOutlined />}
            className={styles.input}
            onChange={(ev) => passwordChanged(ev.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <div className="centered">
            <SoundButton
              type="primary"
              htmlType="submit"
              size={ButtonSize.MIDDLE}
              className={styles.stretched}
              loading={isLoading}
            >
              Регистрация
            </SoundButton>
          </div>
        </Form.Item>
      </Form>
      <div className="centered">
        Уже есть аккаунт?
        <NavLink exact to={appRoute.LOGIN}>
          Вход
        </NavLink>
      </div>
    </>
  );
};

export default LoginForm;
