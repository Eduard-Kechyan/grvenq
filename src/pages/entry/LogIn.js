import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { setError } from '../../store/mainSlice';
import { useDispatch } from 'react-redux'
import styles from "./entry.module.scss";
import localForage from "localforage";

import validate from '../../utilities/validate';
import axios from '../../utilities/axios';

import Input from '../../components/form/Input';
import CheckBox from '../../components/form/CheckBox';
import Button from '../../components/form/Button';
import Loader from '../../components/Loader';

const LogIn = (props) => {
    const [loading, setLoading] = useState(false);
    const [keepLoggedin, setKeepLoggedin] = useState(true);
    const [user, setUserLocal] = useState({
        email: '',
        password: ''
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (property, value) => {
        setUserLocal({
            ...user,
            [property]: value
        })
    }

    const ready = () => {
        if (user.email === '' || user.password === '') {
            return ready;
        }

        let emailValidation = validate.email(user.email, t);
        let passwordValidation = validate.password(user.password, t);

        setEmailError(emailValidation);
        setPasswordError(passwordValidation);

        if (emailValidation !== '' || passwordValidation !== '') {
            return ready;
        }

        return true;
    }

    const readyAlt = () => {
        let ready = true;

        if (user.email === '') {
            ready = false;
        }

        if (user.password === '') {
            ready = false;
        }

        return ready;
    }

    const emailLogIn = (event) => {
        event.preventDefault();

        if (ready()) {
            setLoading(true);

            axios.logIn(user)
                .then((userId) => {
                    finalizeLoggingIn(userId);
                })
                .catch(err => {
                    if (err.message.includes('email')) {
                        setEmailError(t("validate.email.non_existent"));
                    }

                    if (err.message.includes('password')) {
                        setPasswordError(t("validate.password.wrong"));
                    }

                    setLoading(false);
                });
        }
    }

    const quickLogIn = () => {
        setLoading(true);

        let newUser = {
            email: 'test@test.com',
            password: 'testtest!'
        }

        axios.logIn(newUser)
            .then((userId) => {
                finalizeLoggingIn(userId);
            })
            .catch(err => {
                if (err === 'email') {
                    dispatch(setError(t("validate.email.non_existent")));
                }

                if (err === 'password') {
                    dispatch(setError(t("validate.password.wrong")));
                }

                setLoading(false);
            });
    }

    const finalizeLoggingIn = (userId) => {
        props.setEntryLoading(true);

        if (keepLoggedin) {
            localForage.setItem('user', userId);
        }

        setTimeout(() => {
            navigate("/main/welcome");
        }, 3000);
    }

    return (
        <div className={styles.entry_box}>
            {/* Title */}
            <div className={styles.title}>
                <h2>{t("entry.log_in")}</h2>
                <h3>{t("entry.log_in_text")}</h3>
            </div>

            {loading ?
                <Loader className={styles.entry_loader} />
                :
                <>
                    <form onSubmit={emailLogIn} className={styles.entry_form} noValidate>
                        {/* Email */}
                        <Input
                            icon='at'
                            required
                            type="email"
                            name={t("entry.email")}
                            property="email"
                            value={user.email}
                            error={emailError}
                            handleChange={handleChange} />

                        {/* Password */}
                        <Input
                            required
                            icon='unlock-keyhole'
                            name={t("entry.password")}
                            property="password"
                            type="password"
                            value={user.password}
                            error={passwordError}
                            handleChange={handleChange} />

                        {/* Keep logged in */}
                        <CheckBox
                            name={t("entry.keep_logged_in")}
                            property="keepLoggedin"
                            value={keepLoggedin}
                            handleChange={(property, value) => setKeepLoggedin(value)} />

                        {/* Sign Up */}
                        <Button content={t("entry.log_in")} submit centre top disabled={!readyAlt()} />
                        <Button content={t("entry.log_in_quick")} centre top onClick={quickLogIn} />
                    </form>

                    <span className={styles.toggler}>
                        {t("entry.log_in_question")}
                        <span onClick={() => props.setSignUp(true)} tabIndex='0'>{t("entry.sing_up")}</span>
                    </span>
                </>
            }
        </div>
    );
};

export default LogIn;