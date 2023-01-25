import React, { useState, useEffect } from 'react';
import styles from './test.module.scss';
import { isBrowser } from 'react-device-detect';
import utilites from '../../utilities/utilites';
import notify from '../../utilities/notifications';

import Input from '../../components/form/Input';
import Button from '../../components/form/Button';

const Test = (props) => {
    const [connected, setConnected] = useState(props.socket.connected);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const userId = isBrowser ? "userA" : "userB";

    useEffect(() => {
        if (connected) {
            sendUserId();
        }

        props.socket.on('connect', () => {
            setConnected(true);
            sendUserId();
        });

        props.socket.on('disconnect', () => {
            setConnected(false);
        });

        return () => {
            props.socket.off('connect');
            props.socket.off('disconnect');
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connected]);

    useEffect(() => {
        props.socket.on('message-received', (message) => {
            updateChat(message);

            notify.open("Grvenq? - " + message.userId, message.content);
        });

        return () => {
            props.socket.off('message-received');
        };
    })

    const sendUserId = () => {
        props.socket.emit('set-user', userId);
    }

    const handleChange = (property, value) => {
        setMessage(value);
    }

    const updateChat = (newMessage) => {
        setChat([
            ...chat,
            newMessage
        ]);
    }

    const submit = (event) => {
        event.preventDefault();

        if (message !== "") {
            let newMessage = {
                content: message,
                userId: userId,
                hour: utilites.getHour()
            }

            updateChat(newMessage);

            props.socket.emit('message-sent', newMessage);

            setMessage('');
        }
    }

    return (
        < >
            <div className={styles.test}>
                <div className={styles.chatbox}>
                    {chat.map((item, index) =>
                        <div key={index} className={item.userId === userId ? styles.user : null}>
                            <span className={styles.message}>{item.message} <span>{item.hour}</span></span>
                        </div>)
                    }
                </div >

                <form className={styles.input} onSubmit={submit}>
                    <Input
                        icon='comment-dots'
                        name={"Message"}
                        property="message"
                        value={message}
                        handleChange={handleChange} />
                    <Button content="Send" submit centre top disabled={message === ""} />
                </form>
            </div>
        </>
    );
};

export default Test;