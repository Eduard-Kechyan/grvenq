import React from 'react';
import styles from './chat.module.scss';
import { isBrowser } from 'react-device-detect';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatMessageItem = (props) => {
    // Extract hours and minutes from the created date
    const messageTime = () => {
        let date = JSON.parse(props.chat.created);

        let hours = date.hours;
        let minutes = date.minutes;

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return hours + ":" + minutes;
    }

    return (
        <div className={[
            styles.chat_message_item,
            props.chat.userId === props.userId ? styles.user : null
        ].join(' ')}>
            {/* Message */}
            <div className={styles.message_box}  >
                <span className={styles.message} dangerouslySetInnerHTML={{ __html: props.chat.message }} />
                <span className={styles.time}  >{messageTime()}</span>
                <span className={styles.delete} onClick={() => props.deleteMessage(props.chat.messageId)} >
                    <FontAwesomeIcon icon={['fas', "trash-alt"]} />
                    {isBrowser && <span className={styles.tooltip}>Delete</span>}
                </span>
            </div>
        </div>
    );
};

export default ChatMessageItem;