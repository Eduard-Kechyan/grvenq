import React from 'react';
import { useTranslation } from "react-i18next";
import styles from './settings.module.scss';
import { isMobile } from 'react-device-detect';

const Settings = (props) => {
    const { t } = useTranslation();

    return (
        <div className={[styles.settings_wrapper, props.settingsOpen ? styles.open : null, isMobile ? styles.mobile : null].join(' ')}>
            <div className={styles.settings_head}>
                <h3>{t('settings.title')}</h3>
            </div>
        </div>
    );
};

export default Settings;