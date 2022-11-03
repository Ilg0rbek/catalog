import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Input } from "antd";
import styles from './modalRef.module.scss';
import { SoundButton } from "../../common/hoc/sounds/tap-ui-sound";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes, ButtonSize } from "../../../common/enum";
import image from "../../../data/images/iconCopy.png";

export const ModalRef = ({modalActiveRef, modalActiveConfirm, lesson}) => { 


    const dispatch = useDispatch();

    const openConfirmModal = React.useCallback(
    () =>
     modalActiveConfirm(true),
    []
    );

     const copyPaste = React.useCallback(
    () => {
      document.getElementById('reflink').select()
      document.execCommand("copy")
      },
    []
    );

    const {isLoading, user, bonuses} = useSelector((state) => ({
    user:state.profile.user.id,
    bonuses:state.profile.user.bonuses,
    isLoading: state.profile.isLoading,
     })
    );   

    const cashoutButton = () => {
      if (bonuses >= 500) {
      return (
        <SoundButton
              type="primary"
              htmlType="button"
              size={ButtonSize.MIDDLE}
              className={styles.stretched}
              loading={isLoading}
              onClick={openConfirmModal}
            >
              Вывести
        </SoundButton>
      )
      }
    }

    const APP_URL = `${process.env.REACT_APP_URL}/ref/${user}`;

    const getScreen = () => {
      return (
    <>
      <Form
        name="form"
        scrollToFirstError={true}
        size={"middle"}
        layout={"vertical"}
      >

      <Form.Item name="refLink">
       <Input
            id="reflink"
            defaultValue={APP_URL}
            className={styles.input}
          />

        <div className={styles.iconCopy} onClick={() => copyPaste()}>
        <img src={image}/>
        </div>
        </Form.Item>
        <div className={styles.bonuses}>Моё вознаграждение: {bonuses} р.</div>
        <Form.Item>
          <div className="centered">
          
          {cashoutButton()}

          </div>
        </Form.Item>
      </Form>
    </>
  );

}

   return (
        <div className={!lesson ? styles.modalBuy : styles.lesson}>
            <div className={styles.modalBuyContent}>
                <p onClick={() => modalActiveRef(false)} className={styles.close}>✖</p>
                    <div className={styles.listen}>
                    <h3>Реферальная ссылка</h3>
                        {getScreen()}
                    </div>

            </div>
        </div>
    )


}
