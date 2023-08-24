import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setError } from '../../store/mainSlice';
import localForage from "localforage";
import { isMobile } from 'react-device-detect';
import styles from "./entry.module.scss";

import axios from '../../utilities/axios';

import Loader from '../../components/Loader';
import Info from '../../components/info/Info';
import Login from './LogIn';
import SingUp from './SingUp';

const Entry = () => {
    //eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true); // Needs to be true initialy
    const [signUp, setSignUp] = useState(false);

    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        checkLoggedInUser()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkLoggedInUser = () => {
        localForage.getItem("user").then(response => {
            if (response === null) {
                //navigate("/main/welcome"); // TODO - Remove this line
                // Not logged in
                setTimeout(() => {
                    setLoading(false);
                }, 100); // TODO - Needs to be at least 3500
            } else {
                // Logged in
                axios.getUser(response).then((res) => {
                    if (res === null) {
                        signOutNotFoundUser();
                    } else {
                        navigate("/main/welcome");
                        /* if (isMobile) {
                             navigate("/main/chat/63d392aab1e423df86c2c45f", { state: { init: true } });
                         } else {
                             navigate("/main/chat/63d2d0636946ba21f8052f02", { state: { init: true } });
                         }*/
                        // navigate("/main/chat/63d392aab1e423df86c2c45f", { state: { init: true } });
                    }
                }).catch(() => {
                    signOutNotFoundUser();
                })
            }

        }).catch(error => {
            dispatch(setError({ source: 'Entry.js - checkLoggedInUser()', message: error }))
        })
    }

    const signOutNotFoundUser = () => {
        localForage.removeItem("user").then(() => {
            setLoading(false);
        })
    }

    return (
        <main id={styles.EntryContainer} className={[loading ? styles.loading : null].join(' ')}>
            {/* Title */}
            <div className={styles.entry_title} >
                <h1 >{t("main.title")}</h1>
                <Loader className={styles.loader} />
            </div>

            {/* Login box */}
            {signUp ?
                <SingUp setSignUp={setSignUp} setEntryLoading={setLoading} />
                :
                <Login setSignUp={setSignUp} setEntryLoading={setLoading} />
            }

            {/* Info */}
            <Info />
        </main>
    );
};

export default Entry;