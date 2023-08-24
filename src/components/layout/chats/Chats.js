import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import styles from './chats.module.scss';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';

import axios from '../../../utilities/axios';
import notify from '../../../utilities/notifications';

import UserItem from './UserItem';

const Chats = (props) => {
    const user = useSelector((state) => state.main.user);
    const chats = useSelector((state) => state.main.chats);
    const [loading, setLoading] = useState(true);
    const [fetchin, setFetching] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        fetchUserChats();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (fetchin) {
            fetchUserChats();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        props.socket.on('message-received-init', (args) => {
            if (args.receiver === user._id) {
                notify.open("Grvenq? - " + args.senderName, args.message);

                setLoading(true);
                setFetching(true);

                axios.getUser(user._id).catch(() => {
                    setLoading(false);
                    setFetching(false);
                })
            }
        });

        return () => {
            props.socket.off('message-received-init');
        };
    })

    const fetchUserChats = () => {
        axios.getUsers(user._id, user.chats).then(() => {
            setLoading(false);
            setFetching(false);
        }).catch(() => {
            setLoading(false);
            setFetching(false);
        })
    }

    return (
        <div className={styles.chats}>
            {/* Showing chats */}
            {loading ? <div className="loader_alt" /> :
                chats.length > 0 ?
                    chats.map(chat => <UserItem key={chat._id} chat={chat} />)
                    :
                    <p className={styles.empty}>{isMobile ? t("chats.empty_mobile") : t("chats.empty")}</p>}
        </div>
    );
};

export default Chats;