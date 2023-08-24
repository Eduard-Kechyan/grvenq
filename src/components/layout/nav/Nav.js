import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import styles from './nav.module.scss';
import { setUser } from '../../../store/mainSlice';
import { isMobile } from 'react-device-detect';
import localForage from "localforage";
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../form/Button';
import Chats from '../chats/Chats';
import UsersSearch from '../users/UsersSearch';

import PLACEHOLDER_PIC from '../../../assets/images/placeholder_pic.png';

const Nav = (props) => {
    const user = useSelector((state) => state.main.user);
    const [adding, setAdding] = useState(false);
    const searchRef = useRef(null)

    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (adding) {
            searchRef.current.focus();
        }
    }, [adding])

    const sign_out = () => {
        localForage.removeItem("user").then(() => {
            navigate("/");

            setTimeout(() => {
                dispatch(setUser(''));
            }, 1000);
        })
    }

    return (
        <nav className={[
            isMobile ? styles.mobile : null,
            props.navOpen ? styles.open : null
        ].join(' ')}>
            {/* Nav options */}
            <div className={styles.nav_head}>
                {/* Profile button */}
                <Button image tooltip={t("nav.options.profile")} content={
                    <img src={user.pic === 'unset' ? PLACEHOLDER_PIC : user.pic} alt={t("nav.profile")} />
                } onClick={props.toggleProfile} />

                {/* Add button */}
                {adding ?
                    <Button tooltip={t("nav.options.cancel")} icon="xmark" onClick={() => setAdding(!adding)} />
                    :
                    <Button tooltip={t("nav.options.new_chat")} icon="plus" onClick={() => setAdding(!adding)} />
                }

                {/* Settings button */}
                <Button tooltip={t("nav.options.settings")} icon="cog" onClick={props.toggleSettings} />

                {/* Sign Out button */}
                <Button
                    tooltip={t("nav.options.sign_out")} icon="arrow-right-from-bracket"
                    onClick={sign_out} />
            </div>

            {/* Searching and Chats */}
            {adding ?
                <UsersSearch adding={adding} ref={searchRef} setAdding={setAdding} />
                :
                <Chats socket={props.socket} />
            }
        </nav>
    );
};

export default Nav;