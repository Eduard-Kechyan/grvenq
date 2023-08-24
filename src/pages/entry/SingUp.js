import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { setError } from '../../store/mainSlice';
import { useDispatch } from 'react-redux'
import styles from "./entry.module.scss";
import localForage from "localforage";

import validate from '../../utilities/validate';
import axios from '../../utilities/axios';
import utilites from '../../utilities/utilites';

import Input from '../../components/form/Input';
import CheckBox from '../../components/form/CheckBox';
import Button from '../../components/form/Button';
import Loader from '../../components/Loader';

const SingUp = (props) => {
    const [loading, setLoading] = useState(false);
    const [keepLoggedin, setKeepLoggedin] = useState(true);
    const [user, setUserLocal] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [nameError, setNameError] = useState('');
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
        if (user.name === '' || user.email === '' || user.password === '') {
            return ready;
        }

        let nameValidation = validate.name(user.name, t);
        let emailValidation = validate.email(user.email, t);
        let passwordValidation = validate.password(user.password, t);

        setNameError(nameValidation);
        setEmailError(emailValidation);
        setPasswordError(passwordValidation);

        if (nameValidation !== '' || emailValidation !== '' || passwordValidation !== '') {
            return ready;
        }

        return true;
    }

    const readyAlt = () => {
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

        return ready;
    }

    const emailSignUp = (event) => {
        event.preventDefault();

        if (ready()) {
            setLoading(true);

            axios.singUp(user)
                .then((userId) => {
                    finalizeSingUp(userId);
                })
                .catch(err => {
                    if (err.message.includes('email')) {
                        setEmailError(t("validate.email.exists"));
                        console.log("A");
                    }

                    if (err.message.includes('name')) {
                        setNameError(t("validate.name.exists"));
                    }

                    setLoading(false);
                });
        }
    }

    const quickSignUp = () => {
        setLoading(true);

        let newUser = utilites.genRandomUser();

        axios.singUp(newUser)
            .then((userId) => {
                finalizeSingUp(userId);
            })
            .catch(err => {
                if (err === 'email') {
                    dispatch(setError(t("validate.email.exists")));
                }

                if (err === 'name') {
                    dispatch(setError(t("validate.name.exists")));
                }

                setLoading(false);
            });
    }

    const finalizeSingUp = (userId) => {
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
                <h2>{t("entry.sing_up")}</h2>
                <h3 >{t("entry.sign_up_text")}</h3>
            </div>

            {loading ?
                <Loader className={styles.entry_loader} />
                :
                <>
                    <form onSubmit={emailSignUp} className={styles.entry_form}>
                        {/* Name */}
                        <Input
                            icon='user'
                            required
                            name={t("entry.name")}
                            property="name"
                            value={user.name}
                            error={nameError}
                            handleChange={handleChange} />

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
                        <Button content={t("entry.sing_up")} submit centre top disabled={!readyAlt()} />
                        <Button content={t("entry.sing_up_quick")} centre top onClick={quickSignUp} />
                    </form>

                    <span className={styles.toggler}>
                        {t("entry.sign_up_question")}
                        <span onClick={() => props.setSignUp(false)} tabIndex='0' >{t("entry.log_in")}</span>
                    </span>
                </>
            }
        </div>
    );
};

export default SingUp;