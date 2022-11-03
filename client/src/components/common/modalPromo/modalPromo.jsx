import React from "react";
import styles from './modalRef.module.scss'

export const ModalRef = ({modalActivePromo, lesson}) => {

    const APP_URL = `${process.env.REACT_APP_URL}/?ref=1`

    return (
        <div className={!lesson ? styles.modalBuy : styles.lesson}>
            <div className={styles.modalBuyContent}>
                <p onClick={() => modalActivePromo(false)} className={styles.close}>✖</p>
                    <div className={styles.listen}>
                        <h4>Реферальная ссылка</h4>
                        <input type="text" name="reflink" value={APP_URL} readonly/><span onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}>копирвать</span>
                        <div>Моё вознаграждение 500р.</div>
                        <div><button>Вывести</button></div>
                    </div>
            </div>
        </div>
    )
}
