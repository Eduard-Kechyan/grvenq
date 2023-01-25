import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import styles from "./entry.module.scss";

import validate from '../../utilities/validate';

import Input from '../../components/form/Input';
import Button from '../../components/form/Button';

const SingUp = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        name: '',
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

    const ready = () => {
        let ready = true;

        if (user.name === '') {
            ready = false;
        }

        if (user.email === '') {
            ready = false;
        }

        if (user.password === '') {
            ready = false;
        }

        if (error.name !== '') {
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
            [property]: validate[property](user[property], t)
        })
    }

    const submit = (event) => {
        event.preventDefault();

        let newUser = {
            ...user,
            pic: null,
            chats: []
        }

        console.log(newUser);
    }

    return (
        <div className={styles.login_box}>
            {/* Title */}
            <div className={styles.title}>
                <h2>{t("entry.log_in")}</h2>
                <h3 >{t("entry.log_in")}</h3>
            </div>

            <form onSubmit={submit} className={styles.login_form}>
                {/* Name */}
                <Input
                    icon='user'
                    required
                    name={t("entry.name")}
                    property="name"
                    value={user.name}
                    error={error.name}
                    handleChange={handleChange}
                    onBlur={checkError} />

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

                {/* Sign Up */}
                <Button content="Create Account" submit centre top disabled={!ready()} />
            </form>

            <span className={styles.toggler}>
                {t("entry.sign_up_question")}
                <span onClick={() => props.setSignUp(false)} tabIndex='0' >{t("entry.log_in")}</span>
            </span>
        </div>
    );
};

export default SingUp;