import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './form.module.scss';

const Input = forwardRef((props, ref) => {
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

            {/* Clear */}
            {props.clearable !== undefined &&
                <span className={[styles.clear, props.value !== '' ? styles.show : null].join(' ')}
                    onClick={() => props.handleChange('')}>
                    <FontAwesomeIcon icon={['fas', 'xmark']} />
                </span>}

            {/* Input */}
            <input
                type="text"
                ref={ref}
                placeholder={props.loading ? 'Loading...' : 'Search...'}
                value={props.value}
                onChange={event => props.handleChange(event.target.value)} />
        </label>
    );
});

export default Input;