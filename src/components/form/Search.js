import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './form.module.scss';

const Input = (props) => {
    return (
        <label className={[
            styles.search_label,
            props.value !== '' ? styles.text : null,
            props.loading ? styles.loading : null
        ].join(' ')}>
            {/* Name */}
            <span className={styles.name}>
                {props.name}
            </span>

            {/* Icon */}
            {<span className={styles.icon}>
                <FontAwesomeIcon icon={['fas', 'magnifying-glass']} />
            </span>}

            {/* Icon */}
            {props.clearable !== undefined &&
                <span className={[styles.clear, props.value !== '' ? styles.show : null].join(' ')}
                    onClick={() => props.handleChange('')}>
                    <FontAwesomeIcon icon={['fas', 'xmark']} />
                </span>}

            {/* Input */}
            <input
                type="text"
                placeholder={props.loading ? 'Loading...' : 'Search...'}
                value={props.value}
                onChange={event => props.handleChange(event.target.value)} />
        </label>
    );
};

export default Input;