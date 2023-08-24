import React from 'react';
import styles from './chat.module.scss';
import { isMobile } from 'react-device-detect';

import PLACEHOLDER_PIC from '../../assets/images/placeholder_pic.png';

const CharHead = (props) => {
    return (
        <div className={[styles.chat_head, isMobile ? styles.mobile : null].join(' ')}>
            {!props.loading &&
                <>
                    <div className={styles.user_pic}>
                        <img src={props.user.pic === 'unset' ? PLACEHOLDER_PIC : props.user.pic} alt="User Other" />
                    </div>
                    <h2 className={styles.user_name}>
                        {props.user.name}
                    </h2>
                </>
            }
        </div>
    );
};

export default CharHead;