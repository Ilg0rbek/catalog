import React from "react";
import { useHistory } from "react-router-dom";
import styles from './modalConfirm.module.scss'
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../../../common/enum";

export const ModalConfirm = ({modalActiveConfirm, lesson}) => {  

    const dispatch = useDispatch();

    const {user, email, bonuses} = useSelector((state) => ({
    user:state.profile.user.id,
    email:state.profile.user.email,
    bonuses:state.profile.user.bonuses,
     })
    );   

    const confirmCashout = React.useCallback(() => {

    dispatch({ type: actionTypes.CASHOUT,  payload: {
        id: user,
        data: {
         bonuses:bonuses,
         email:email     
              }
        }});  
        modalActiveConfirm(false);
    });

    const confirmClose = () => {
         modalActiveConfirm(false);
      };

   return (
        <div className={!lesson ? styles.modalBuy : styles.lesson}>
            <div className={styles.modalBuyContent}>
                <p onClick={() => modalActiveConfirm(false)} className={styles.close}>✖</p>
                    <div className={styles.listen}>
                        <h3>Подтвердите вывод</h3>
                     <div>
                        <button onClick={() => confirmCashout()}>Подтверждаю</button>
                        <button onClick={() => confirmClose()}>Я передумал</button>
                    </div>
                  </div>  
            </div>
        </div>
    )
}