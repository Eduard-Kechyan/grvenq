import React from 'react';
import { useTranslation } from "react-i18next";

const Loader = (props) => {
    const { t } = useTranslation();

    return (
        <div className={["loader", props.className, props.dark ? "dark" : null].join(' ')}>
            <span>{t("other.loader.g")}</span>
            <span>{t("other.loader.r")}</span>
            <span>{t("other.loader.v")}</span>
            <span>{t("other.loader.e")}</span>
            <span>{t("other.loader.n")}</span>
            <span>{t("other.loader.q")}</span>
            <span>{t("other.loader.?")}</span>
        </div>
    );
};

export default Loader;