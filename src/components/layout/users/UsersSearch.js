import React, { useState, forwardRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import styles from './users.module.scss';

import axios from '../../../utilities/axios';

import Search from '../../form/Search';
import UserItem from './UserItem';

const UsersSearch = forwardRef((props, ref) => {
    const user = useSelector((state) => state.main.user);
    const chats = useSelector((state) => state.main.chats);
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (query === '') {
            setUsers(null);
        } else {
            searchQuery();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const searchQuery = () => {
        setLoading(true);

        if (query !== '' && user._id !== undefined) {
            let newChats = [];

            if (chats.length > 0) {
                for (let i = 0; i < chats.length; i++) {
                    newChats.push(chats[i].user._id);
                }

                newChats.push(user._id);
            } else {
                newChats = chats;
            }

            axios.findUsers(newChats, query).then(response => {
                setUsers(response);

                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }).catch(() => {
                setLoading(false);
            })
        }
    }

    const startChat = (userOther) => {
        setLoading(true);

        axios.addChat(user, userOther).then((chatId) => {
            navigate('/main/chat/' + userOther._id, { state: { init: true, chatId: chatId } });
            props.setAdding(false);
        }).catch(() => {
            setLoading(false);
        })
    }

    return (
        <>
            {/* Search */}
            <div className={[styles.users_search, props.adding ? styles.adding : null].join(' ')}>
                <Search
                    ref={ref}
                    clearable
                    value={query}
                    onChange={setQuery}
                    loading={loading}
                    handleChange={setQuery} />
            </div>

            {/* Users */}
            <div className={styles.users_box}>
                {loading ? <div className="loader_alt" />
                    :
                    query === '' || users === null ?
                        <p className={styles.empty}>{t('users.search')}</p>
                        :
                        users.length === 0 ?
                            <p className={styles.empty}>{t('users.search_not_found')}</p>
                            :
                            users.map(user => <UserItem key={user._id} user={user} startChat={startChat} />)
                }
            </div>

        </>
    );
});

export default UsersSearch;