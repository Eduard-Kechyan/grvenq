import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setError } from '../../store/mainSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './error.module.scss';

const ErrorMessage = () => {
    const error = useSelector((state) => state.main.error);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (show === false && error !== '') {
            setShow(true);

            setTimeout(() => {
                clearError()
            }, 60000);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    const clearError = () => {
        setShow(false);

        setTimeout(() => {
            dispatch(setError(''));
        }, 400)
    }

    return (
        <div id={styles.ErrorMessage} className={show ? styles.show : null}>
            {/* Source */}
            <div className={styles.source}>
                An error occurred!

                {/* Close */}
                <span className={styles.close} onClick={clearError}>
                    <FontAwesomeIcon icon={['fas', 'xmark']} />
                </span>
            </div>

            {/* Message */}
            <div className={styles.message}>
                {error}
            </div>
        </div>
    );
};

export default ErrorMessage;