import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setError } from '../../store/errorSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './error.module.scss';

const ErrorMessage = () => {
    const source = useSelector((state) => state.error.source);
    const message = useSelector((state) => state.error.message);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (show === false && source !== '') {
            setShow(true);

            setTimeout(() => {
                clearError()
            }, 60000);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source])

    const clearError = () => {
        setShow(false);

        setTimeout(() => {
            dispatch(setError({ source: '', message: '' }));
        }, 400)
    }

    return (
        <div id={styles.ErrorMessage} className={show ? styles.show : null}>
            {/* Source */}
            <div className={styles.source}>
                {source}

                {/* Close */}
                <span className={styles.close} onClick={clearError}>
                    <FontAwesomeIcon icon={['fas', 'xmark']} />
                </span>
            </div>

            {/* Message */}
            <div className={styles.message}>
                {message}
            </div>
        </div>
    );
};

export default ErrorMessage;