import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './form.module.scss';

const Input = (props) => {
    const [show, setShow] = useState(false);

    return (
        <label className={[
            styles.input_label,
            props.value !== '' ? styles.text : null,
            props.icon !== undefined ? styles.icon : null,
            props.error !== undefined && props.error !== '' ? styles.error : null,
            props.required ? styles.required : null,
            props.type === "password" ? styles.password : null,
        ].join(' ')}>
            {/* Name */}
            <span className={styles.name}>
                {props.name}
            </span>

            {props.type === "password" &&
                <span className={styles.show_password} onClick={() => setShow(!show)}>
                    {show ?
                        <FontAwesomeIcon icon={['fas', "eye-slash"]} />
                        :
                        <FontAwesomeIcon icon={['fas', "eye"]} />
                    }
                </span>
            }

            {/* Required */}
            {props.required && <span className={styles.req}>
                <FontAwesomeIcon icon={['fas', "asterisk"]} />
            </span>}

            {/* Icon */}
            {props.icon !== undefined && <span className={styles.icon}>
                <FontAwesomeIcon icon={[props.far ? "far" : 'fas', props.icon]} />
            </span>}

            {/* Input */}
            <input
                type={
                    props.type === "password" ? show ? "text" : "password" : props.type
                }
                formNoValidate={props.type === 'email'}
                value={props.value}
                onChange={event => props.handleChange(props.property, event.target.value)} />

            {/* Error text */}
            {props.error !== undefined && props.error !== '' && <span className={styles.err}>
                {props.error}
            </span>}
        </label>
    );
};

export default Input;