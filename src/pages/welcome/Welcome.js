import React from 'react';
import { useTranslation } from "react-i18next";
import styles from "./welcome.module.scss";

const Welcome = () => {
    const { t } = useTranslation();

    return (
        <div id={styles.WelcomeContent}>
            <h2 className={styles.title}>{t("main.title")}</h2>
            <h3 className={styles.subtitle}>{t("other.welcome")}</h3>
        </div>
    );
};

export default Welcome;