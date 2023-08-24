import React from 'react';
import styles from './users.module.scss';

import PLACEHOLDER_PIC from '../../../assets/images/placeholder_pic.png';

const UserItem = (props) => {
    return (
        <button className={styles.user_item} type='button' onClick={() => props.startChat(props.user)}>
            {/* Pic */}
            <div className={styles.pic}>
                <img src={props.user.pic === 'unset' ? PLACEHOLDER_PIC : props.user.pic} alt="User" />
            </div>

            {/* Name */}
            <span className={styles.name}>{props.user.name}</span>
        </button>
    );
};

export default UserItem;