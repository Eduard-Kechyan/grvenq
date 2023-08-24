import React from 'react';
import { useTranslation } from "react-i18next";
import styles from './profile.module.scss';
import { isMobile } from 'react-device-detect';

const Profile = (props) => {
    const { t } = useTranslation();

    return (
        <div className={[styles.profile_wrapper, props.profileOpen ? styles.open : null, isMobile ? styles.mobile : null].join(' ')}>
            <div className={styles.profile_head}>
                <h3>{t('profile.title')}</h3>
            </div>
        </div>
    );
};

export default Profile;