import React from 'react';
import styles from './form.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isBrowser } from 'react-device-detect';

const Button = (props) => {
    return (
        <button
            type={props.submit ? "submit" : "button"}
            disabled={props.disabled}
            onClick={props.onClick}
            className={[
                styles.button,
                props.className,
                props.full ? styles.fluid : null,
                props.centre ? styles.centre : null,
                props.icon ? styles.icon : null,
                props.image ? styles.image : null
            ].join(' ')} >
            {props.icon ?
                <FontAwesomeIcon icon={[props.far ? "far" : 'fas', props.icon]} />
                :
                props.content
            }

            {props.tooltip && isBrowser && <span className={[styles.tooltip, props.left ? styles.left : null].join(' ')} >
                {props.tooltip}
            </span>}
        </button>
    );
};

export default Button;