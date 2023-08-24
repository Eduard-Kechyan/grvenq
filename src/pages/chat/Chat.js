import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { v4 as uuid } from 'uuid';
import styles from './chat.module.scss';

import axios from '../../utilities/axios';
import utilites from '../../utilities/utilites';

import Modal from '../../components/modal/Modal';

import ChatHead from './ChatHead';
import ChatInput from './ChatInput';
import ChatMessageItem from './ChatMessageItem';
import notify from '../../utilities/notifications';

const Chat = (props) => {
    const [connected, setConnected] = useState(props.socket.connected);
    const user = useSelector((state) => state.main.user);
    const chats = useSelector((state) => state.main.chats);
    const [userOther, setUserOther] = useState(null);
    const [messageToRemove, setMessageToRemove] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [chatId, setChatId] = useState('');
    const [message, setMessage] = useState('<p><br></p>');
    const [content, setContent] = useState([]);
    const chatBottom = useRef(null)
    const chatTop = useRef(null)

    const location = useLocation();
    const navigate = useNavigate();

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
        props.socket.on('message-received', (args) => {
            if (args.receiver === user._id && args.sender === userOther._id) {
                setContent([
                    ...content,
                    args.message
                ]);

                notify.open("Grvenq? - " + args.senderName, args.message);
            }
        });

        return () => {
            props.socket.off('message-received');
        };
    })

    useEffect(() => {
        getData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (chatBottom.current !== null) {
            setTimeout(() => {
                chatBottom.current.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [content]);

    const sendUserId = () => {
        props.socket.emit('set-user', user._id);
    }

    const getData = () => {
        let Id = location.pathname.replace('/main/chat/', "")

        setChatId(location.state.chatId);

        if (location.state.init !== undefined && location.state.init) {
            axios.getUser(Id, true).then((repsonse) => {
                setUserOther(repsonse);

                setLoading(false);
            }).catch(() => {
                navigate('/main/welcome');
            })
        } else {
            let chat = chats.filter(chat => chat._id === Id);

            setContent(chat[0].content);

            axios.getUser(chat[0].user._id, true).then((repsonse) => {
                setUserOther(repsonse);

                setLoading(false);
            }).catch(() => {
                navigate('/main/welcome');
            })
        }
    }

    const handleChange = (value) => {
        let newValue = value;

        if (value !== '<p><br></p>') {
            newValue = value.replace('<p><br></p>', '')
        }

        if (value === '<p><br></p><p><br></p>') {
            newValue = "<p><br></p>"
        }

        setMessage(newValue);
    }

    const sendMessage = (event) => {
        if (event !== undefined) {
            event.preventDefault();
        }

        if (message !== "<p><br></p>") {
            let newMessage = {
                messageId: uuid(),
                message: message,
                userId: user._id,
                created: JSON.stringify(utilites.getDateAlt()),
                type: 'text'
            }

            let init = content.length === 0;

            let newContent = [
                ...content,
                newMessage
            ];

            setContent(newContent);

            axios.setChatContent(chatId, newContent).then(() => {
                sendMessageThrougSocket(newMessage);

                if (init) {
                    handleInitialMessage(newMessage);
                }

                setMessage('<p><br></p>');
            })
        }
    }

    const sendImages = () => {
        console.log('a');
    }

    const sendFiles = () => {
        console.log('b');
    }

    const sendMessageThrougSocket = (newMessage) => {
        props.socket.emit('message-sent', {
            message: newMessage,
            sender: user._id,
            senderName: user.name,
            receiver: userOther._id,
            init: false
        });
    }

    const handleInitialMessage = (newMessage) => {
        axios.addChatToUser(chatId, userOther._id, false).then(() => {
            props.socket.emit('message-sent', {
                message: newMessage,
                sender: user._id,
                senderName: user.name,
                receiver: userOther._id,
                init: true
            });
        });
    }

    const reverseContent = () => {
        let newContent = [...content];

        newContent = newContent.reverse();

        return newContent;
    }

    const deleteMessageAttempt = (messageId) => {
        setMessageToRemove(messageId);
        toggleModal();
    }

    const deleteMessage = () => {
        toggleModal();

        let newContent = [...content];

        newContent = newContent.filter(item => item.messageId !== messageToRemove);

        setContent(newContent);

        axios.setChatContent(chatId, newContent).then(() => {
            setMessageToRemove(null);
        }).catch(() => {
            setMessageToRemove(null);
        });
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <div className={styles.chat_wrapper}>
            {/* Head */}
            <ChatHead user={userOther} loading={loading} />

            {/* Container */}
            <div className={styles.chat_contaiener}>
                {loading ?
                    <>
                        {/* Content */}
                        <div className={[styles.chat_content, styles.loading].join(' ')}>
                            <div className={["loader_alt", styles.loader].join(' ')} />
                        </div>
                    </>
                    :
                    <>
                        {/* Content */}
                        <div className={[styles.chat_content, isMobile ? styles.mobile : null].join(' ')}>
                            <div ref={chatBottom} className={styles.chat_bottom} />
                            {reverseContent().map(chat => <ChatMessageItem key={chat.messageId} chat={chat} userId={user._id} deleteMessage={deleteMessageAttempt} />)}
                            <div ref={chatTop} className={styles.chat_top} />
                        </div>

                        {/* Input box */}
                        <ChatInput
                            message={message}
                            sendMessage={sendMessage}
                            sendImages={sendImages}
                            sendFiles={sendFiles}
                            handleChange={handleChange} />
                    </>
                }
            </div>

            {/* Confirm modal */}
            <Modal
                open={modalOpen}
                text="Are you sure you want to delete this message?"
                confirm={deleteMessage}
                toggle={toggleModal}
            />
        </div>
    );
};

export default Chat;