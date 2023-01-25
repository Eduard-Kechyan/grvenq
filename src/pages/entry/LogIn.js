import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import styles from "./entry.module.scss";

import validate from '../../utilities/validate';

import Input from '../../components/form/Input';
import CheckBox from '../../components/form/CheckBox';
import Button from '../../components/form/Button';

const LogIn = (props) => {
    const [keepLoggedin, setKeepLoggedin] = useState(true);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        email: '',
        password: ''
    });

    const { t } = useTranslation();

    const handleChange = (property, value) => {
        setUser({
            ...user,
            [property]: value
        })
    }

    const handleKeepLoggedIn = (property, value) => {
        setKeepLoggedin(value);
    }

    const ready = () => {
        let ready = true;

        if (user.email === '') {
            ready = false;
        }

        if (user.password === '') {
            ready = false;
        }

        if (error.email !== '') {
            ready = false;
        }

        if (error.password !== '') {
            ready = false;
        }

        return ready;
    }

    const checkError = (property) => {
        setError({
            ...error,
            [property]: validate[property](user[property], t, property === "email" && true)
        })
    }

    const submit = (event) => {
        event.preventDefault();
        console.log('Submited!');
    }

    return (
        <div className={styles.login_box}>
            {/* Title */}
            <div className={styles.title}>
                <h2>{t("entry.log_in")}</h2>
                <h3>{t("entry.log_in_text")}</h3>
            </div>

            <form onSubmit={submit} className={styles.login_form}>
                {/* Email */}
                <Input
                    icon='at'
                    required
                    name={t("entry.email")}
                    property="email"
                    value={user.email}
                    error={error.email}
                    handleChange={handleChange}
                    onBlur={checkError} />

                {/* Password */}
                <Input
                    required
                    icon='unlock-keyhole'
                    name={t("entry.password")}
                    property="password"
                    type="password"
                    value={user.password}
                    error={error.password}
                    handleChange={handleChange}
                    onBlur={checkError} />

                {/* Keep logged in */}
                <CheckBox
                    name={t("entry.keep_logged_in")}
                    property="keepLoggedin"
                    value={keepLoggedin}
                    handleChange={handleKeepLoggedIn} />

                {/* Sign Up */}
                <Button content={t("entry.log_in")} submit centre top disabled={!ready()} />
            </form>

            <span className={styles.toggler}>
                {t("entry.log_in_question")}
                <span onClick={() => props.setSignUp(true)} tabIndex='0'>{t("entry.sing_up")}</span>
            </span>
        </div>
    );
};

export default LogIn;