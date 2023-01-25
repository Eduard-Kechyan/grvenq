import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setError } from '../../store/errorSlice';
import localForage from "localforage";
import styles from "./entry.module.scss";

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
                }, 100); // TODO - Needs to be at leaset3500
            } else {
                // Logged in
                navigate("/main/welcome");
            }

        }).catch(error => {
            dispatch(setError({ source: 'Entry.js - checkLoggedInUser()', message: error }))
        })
    }

    return (
        <main id={styles.LoginContainer} className={[loading ? styles.loading : null].join(' ')}>
            {/* Title */}
            <div className={styles.login_title} >
                <h1 >{t("main.title")}</h1>
                <Loader className={styles.loader} />
            </div>

            {/* Login box */}
            {signUp ?
                <SingUp setSignUp={setSignUp} />
                :
                <Login setSignUp={setSignUp} />
            }

            {/* Info */}
            <Info />
        </main>
    );
};

export default Entry;