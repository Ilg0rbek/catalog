import { Input, Form, Button } from "antd";
import * as React from "react";
import { emailRules } from "../../../../common/rules";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes, ButtonSize } from "../../../../common/enum";
import { stylesParse } from "../../../../helpers";
import styles from "./styles.module.css";
import { SoundButton } from "../../../common/hoc/sounds/tap-ui-sound";

const VerifyComponent = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => ({
    isLoading: state.app.resetLoading,
  }));
  const [email, setEmail] = React.useState("");
  const verifyHandler = React.useCallback(() => {
    dispatch({
      type: actionTypes.CHECK_EMAIL_RESET_PASSWORD,
      payload: { email },
    });
  }, [dispatch, email]);
  const passwordChanged = (data) => {
    setEmail(data);
  };
  return (
    <div className={styles.rootWrapper}>
      <div className="centered">
        <p className={styles.text}>Введите адрес электронной почты, на который мы отправим ссылку для сброса пароля</p>
      </div>
      <div className={styles.formWrapper}>
        <Form
          name="form"
          scrollToFirstError={true}
          size={"middle"}
          layout={"vertical"}
          onFinish={verifyHandler}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={emailRules}
            className="mt1"
          >
            <Input
              placeholder="email"
              prefix={<MailOutlined />}
              className={styles.input}
              value={email}
              onChange={(ev) => passwordChanged(ev.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div className="centered">
              <SoundButton
                type="primary"
                htmlType="submit"
                size={ButtonSize.MIDDLE}
                className="stretched"
                loading={isLoading}
              >
                Отправить
              </SoundButton>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyComponent;
