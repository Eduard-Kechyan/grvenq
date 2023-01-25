import React from 'react';
import { useTranslation } from "react-i18next";
import styles from './info.module.scss';

const getYear = () => {
    let date = new Date();
    let year = date.getFullYear();

    return year;
}

const Info = (props) => {
    const { t } = useTranslation();

    return (
        <div id={styles.LayoutInfo} className={[props.main ? styles.main : null].join(' ')}>
            <span>@ {getYear()} <a href="none" target="_blank">
                {t("other.info.eduard_kechyan")}</a>, {t("other.info.rights")}</span>
            <span className={styles.links}>
                <a href="none" target="_blank">{t("other.info.about")}</a>
                <span> - </span>
                <a href="none" target="_blank">{t("other.info.privacy")}</a>
                <span> - </span>
                <a href="none" target="_blank">{t("other.info.more")}</a>
            </span>
        </div>
    );
};

export default Info;