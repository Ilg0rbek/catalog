import { Input, Form, Button } from "antd";
import * as React from "react";
import { passwordRules } from "../../../../common/rules";
import { LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes, ButtonSize } from "../../../../common/enum";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { SoundButton } from "../../../common/hoc/sounds/tap-ui-sound";

const ResetPasswordComponent = () => {
  const { userId, token } = useParams();

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => ({
    isLoading: state.app.resetLoading,
  }));
  const [password, setPassword] = React.useState("");
  const updatePassword = React.useCallback(() => {
    dispatch({
      type: actionTypes.UPDATE_PASSWORD,
      payload: { password, userId, token },
    });
  }, [dispatch, password, userId, token]);
  const passwordChanged = (data) => {
    setPassword(data);
  };
  return (
    <div className={styles.rootWrapper}>
      <div className="centered">
        <p className={styles.text}>Введите новый пароль</p>
      </div>
      <div className={styles.formWrapper}>
        <Form
          name="form"
          scrollToFirstError={true}
          size={"middle"}
          layout={"vertical"}
          onFinish={updatePassword}
        >
          <Form.Item
            label="Password"
            name="password"
            rules={passwordRules}
            className="mt1"
          >
            <Input.Password
              placeholder="password"
              prefix={<LockOutlined />}
              className={styles.input}
              value={password}
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
                Обновить
              </SoundButton>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
