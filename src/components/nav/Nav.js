import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import styles from './nav.module.scss';
import { isMobile } from 'react-device-detect';

import Search from '../form/Search';
import Button from '../form/Button';

import DUMMY_IMG from '../../assets/images/login_box_background.jpg';

const Nav = (props) => {
    //eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <nav className={[
            isMobile ? styles.mobile : null,
            props.navOpen ? styles.open : null
        ].join(' ')}>
            {/* Nav options */}
            <div className={styles.nav_head}>
                <Button tooltip={t("nav.options.new_chat")} icon="plus" />
                <Button image tooltip={t("nav.options.profile")} content={
                    <img src={DUMMY_IMG} alt={t("nav.profile")} />
                } />
                <Button tooltip={t("nav.options.settings")} icon="cog" />

                {/* Sign Out */}
                <Button
                    tooltip={t("nav.options.sign_out")} icon="arrow-right-from-bracket"
                    onClick={() => navigate("/")} />
            </div>

            {/* Search */}
            <div className={styles.nav_search}>
                <Search
                    clearable
                    loading={loading}
                    value={query}
                    onChange={setQuery}
                    handleChange={setQuery} />
            </div>

            {/* Chats */}
            <div className={styles.nav_chats}>
                <p className={styles.empty}>{t("nav.empty")}</p>
            </div>
        </nav>
    );
};

export default Nav;