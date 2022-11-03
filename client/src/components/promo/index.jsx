import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { actionTypes, ButtonSize } from "../../common/enum";
import { Form, Input, Divider } from "antd";
import { SoundButton } from "../common/hoc/sounds/tap-ui-sound";
import { promoRules } from "../../common/rules";
import { GoBack } from "../common";

export const Promo = () => {
  const dispatch = useDispatch();
  const {id, isLoading} = useSelector((state) => ({
    id:state.profile.user.id,
    settingPromo:state.settings.PROMO.value,
    userPromo:state.profile.user.promo,
    isLoading: state.profile.isLoading,
     })
    );

  const key = 'PROMO';
  const enterPromo = React.useCallback(
    ({promo}) =>
      dispatch({
        type: actionTypes.CHECKPROMO,
        payload: { id, key, value: promo },
      }),
    []
  );

  const getScreen = () => {
      return (
    <>
      <div className="centered">
        <h3 className={styles.title}>Промокод</h3>
      </div>
      <Form
        name="form"
        scrollToFirstError={true}
        size={"middle"}
        layout={"vertical"}
        onFinish={enterPromo}
      >

      <Form.Item name="promo" rules={promoRules}>
          <Input
            placeholder="Введите промокод"
            className={styles.input}
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
              Применить
            </SoundButton>
          </div>
        </Form.Item>
      </Form>
    </>
  );
  }

   return (
       <div className={styles.wrapper}>
           <div className={styles.formWrapper}>
               <div className={"centered"}>
                   <Divider/>
               </div>
               <div className={styles.form}>{getScreen()}</div>
           </div>

           <GoBack/>
       </div>
    );
};

 

