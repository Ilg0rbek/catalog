import React from "react";
import styles from './modalBuy.module.scss'

export const ModalBuy = ({modalActive, lesson}) => {
    let selectedAmount = 1000;

    const setAmount = (amount) => {
        selectedAmount = amount;
    }

    return (
        <div className={!lesson ? styles.modalBuy : styles.lesson}>
            <div className={styles.modalBuyContent}>
                <div onClick={() => modalActive(false)} className={styles.close}>✖</div>
                <img className={styles.logo} src="https://media.discordapp.net/attachments/920928424980254722/920928484807819334/photo5208879385778698789.jpg?width=150&height=83" />
                <div className={styles.switcher}>
                    <div className={styles.subscribe}>
                        <div className={styles.radio}>
                            <input id="radio-2" checked name="radio" type="radio" onChange={setAmount(1000)} />
                            <label htmlFor="radio-2" className={styles.radioLabel}>1 год</label>
                        </div>
                        <div>1 000,00 ₽</div>
                    </div>
                    <div className={styles.subscribe}>
                        <div className={styles.radio}>
                            <input id="radio-3" checked name="radio" type="radio" onChange={setAmount(99)} />
                            <label htmlFor="radio-3" className={styles.radioLabel}>1 месяц</label>
                        </div>
                        <div>99,00 ₽</div>
                    </div>
                </div>
                <div className={styles.listen}>
                    <h4>Оформите подписку и вы получите</h4>
                    <ol>
                        <li>Доступ к полному функционалу создания уроков и списков слов для запоминания</li>
                        <li>Доступ к базе из более чем 4000 ассоциативных иллюстраций для запоминания слов</li>
                        <li>Постоянное пополнение базы слов, не ограниченное по количеству и времени!</li>
                        <li>Доступ к реферальной программе и бонусы* за приглашенных друзей:
                            <ul>
                                <li>500 ₽ за каждую оформленную годовую подписку друга по вашей рекомендации</li>
                                <li>100 ₽ при оформлении другом месячной подписки</li>
                            </ul>
                        </li>
                    </ol>
                    <p>* вывод средств возможен при сумме от 500 ₽</p>
                    <p>** разовый бонус начисляется за каждого нового пользователя, воспользовавшегося вашей реферальной ссылкой</p>
                </div>
                <div className={styles.lastPosition}>
                    <button onClick={() => {window.open(`/api/auth/order/${selectedAmount}`, '_self');}}>Отправить заявку</button>
                    <span onClick={() => modalActive(false)}>Продолжить с ограниченной версией</span>
                </div>
            </div>
        </div>
    )
}
