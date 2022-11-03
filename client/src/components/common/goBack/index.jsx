import * as React from "react";
import { NavLink } from "react-router-dom";
import { appRoute } from "../../../common/enum";

import styles from "./styles.module.css";

const GoBack = () => {
    return (
        <>
            <NavLink to={appRoute.BASE} className={styles.goBack}>Назад</NavLink>
        </>
    );
};

export default GoBack;
