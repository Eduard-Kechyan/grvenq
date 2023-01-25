import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./form.module.scss";

const CheckBox = (props) => {
    return (
        <label className={[
            styles.checkbox_label,
            props.value ? styles.checked : null,
            props.required ? styles.required : null,
        ].join(' ')}>
            {/* Checkbox */}
            <div className={styles.checkbox}>
                <span><FontAwesomeIcon icon={['fas', "check"]} /></span>
            </div>

            {/* Input */}
            <input
                type='checkbox'
                checked={props.value}
                onChange={event => props.handleChange(props.property, event.target.checked)} />

            {/* Name */}
            <span className={styles.name}>
                {props.name}
            </span>

            {/* Required */}
            {props.required && <span className={styles.req}>
                <FontAwesomeIcon icon={['fas', "asterisk"]} />
            </span>}
        </label>
    );
};

export default CheckBox;