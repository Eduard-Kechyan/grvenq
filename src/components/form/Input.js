import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './form.module.scss';

const Input = (props) => {
    return (
        <label className={[
            styles.input_label,
            props.value !== '' ? styles.text : null,
            props.icon !== undefined ? styles.icon : null,
            props.error !== undefined && props.error !== '' ? styles.error : null,
            props.required ? styles.required : null,
        ].join(' ')}>
            {/* Name */}
            <span className={styles.name}>
                {props.name}
            </span>

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
                type={props.type === undefined ? "text" : props.type}
                value={props.value}
                onBlur={() => props.onBlur !== undefined && props.onBlur(props.property)}
                onChange={event => props.handleChange(props.property, event.target.value)} />

            {/* Error text */}
            {props.error !== undefined && props.error !== '' && <span className={styles.err}>
                {props.error}
            </span>}
        </label>
    );
};

export default Input;