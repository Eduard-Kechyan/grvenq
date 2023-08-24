import React from 'react';
import styles from './chats.module.scss';
import { NavLink } from "react-router-dom";

import PLACEHOLDER_PIC from '../../../assets/images/placeholder_pic.png';

const UserItem = (props) => {
    return (
        <NavLink to={'/main/chat/' + props.chat._id} state={{ init: false, chatId: props.chat._id }}
            className={({ isActive }) =>
                isActive ? styles.selected + ' ' + styles.chat_user_item : styles.chat_user_item
            }>
            {/* Pic */}
            <div className={styles.pic}>
                <img src={props.chat.user.pic === 'unset' ? PLACEHOLDER_PIC : props.chat.user.pic} alt="User item" />
            </div>

            {/* Name */}
            <span className={styles.name}>{props.chat.user.name}</span>
        </NavLink>
    );
};

export default UserItem;