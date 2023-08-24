import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './modal.module.scss';

import Button from '../form/Button';

const modalRoot = document.getElementById('modal');

const Modal = (props) => {
    useEffect(() => {
        document.addEventListener("keyup", (event) => {
            if (event.key === "Enter" && props.confirm !== undefined && props.open) {
                props.confirm();
            }

            if (event.key === "Escape" && props.toggle !== undefined && props.open) {
                props.toggle();
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open])

    // Render
    if (props.text !== undefined) {
        return ReactDOM.createPortal(
            <div id={styles.Modal} className={props.open ? styles.open : null}>
                {/* Backdrop */}
                <div className={styles.modal_backdrop} />

                {/* Content */}
                <div className={styles.model_content}>
                    {/* Title */}
                    <h3 className={styles.modal_title} >
                        Delete message!
                        <span onClick={props.toggle}><FontAwesomeIcon icon={["fas", "xmark"]} /></span>
                    </h3>

                    {/* Body */}
                    <div className={styles.model_body}>
                        <p className={styles.model_text}>{props.text}</p>
                        {props.confirm !== undefined && <Button content='Ok' onClick={props.confirm} />}
                        <Button className={styles.cancel} content='Cancel' onClick={props.toggle} />
                    </div>
                </div>
            </div>,
            modalRoot
        );
    }
};

export default Modal;