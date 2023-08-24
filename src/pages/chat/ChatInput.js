import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './chat.module.scss';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { isMobile } from 'react-device-detect';
import { useTranslation } from "react-i18next";

import emojisData from '../../assets/data/emojis.json';

const ChatInput = (props) => {
    const quill = useRef(null);
    const imagesRef = useRef(null);
    const [emojis, setEmojis] = useState(null);
    const [image, setImage] = useState([]);
    const [file, setFile] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        let quillElement = quill.current;
        quillElement.editingArea.children[0].addEventListener('click', handleImageSelection);

        initEmojis();

        return () => {
            if (quillElement.editingArea !== null) {
                quillElement.editingArea.children[0].removeEventListener('click', handleImageSelection);
            }
        };

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.message])

    const addEmoji = (emoji) => {
        let src = process.env.PUBLIC_URL + "/images/emojis/emoji_" + emoji + ".svg";

        let selection = quill.current.selection;

        if (selection === null) {
            selection = {
                index: 0,
                length: 0
            }
        }

        quill.current.editor.insertEmbed(selection.index, 'image', src)
    }

    const handleImageSelection = (event) => {
        if (props.message !== '<p><br></p>' && event.target.tagName === "IMG") {
            let image = Quill.find(event.target);

            const indexSelectedImage = quill.current.getEditor().getIndex(image);

            quill.current.getEditor().setSelection(indexSelectedImage);
        }
    }

    const initEmojis = () => {
        let emojisElements = emojisData.map((item) =>
            <span className={styles.chat_emoji_icon} key={item} onClick={() => addEmoji(item)} tabIndex='0'>
                <img src={process.env.PUBLIC_URL + '/images/emojis/emoji_' + item + '.svg'} alt={item + " emoji"} />
            </span>
        )

        setEmojis(emojisElements);
    }

    const handleEnter = (event) => {
        if (event.key === "Enter" && event.ctrlKey) {
            event.preventDefault();

            props.sendMessage();
        }
    }

    const handleImagesChange = (event) => {
        if (event.target.files && event.target.files.length === 1) {
            const fileReader = new FileReader();

            fileReader.onload = () => {
                setImage(fileReader.result);
                handleImages(fileReader.result);
                document.activeElement.blur();
            };

            fileReader.readAsDataURL(event.target.files[0]);
        }
    }

    const handleImages = (image) => {
        console.log(image);
    }

    const handleFiles = (event) => {
        document.activeElement.blur();
    }

    return (
        <form onSubmit={props.sendMessage} className={[styles.chat_input_box, isMobile ? styles.mobile : null].join(' ')}>
            <div className={styles.chat_input_box_content} >
                {/* Input */}
                <label className={styles.chat_input}>
                    <ReactQuill
                        ref={quill}
                        value={props.message}
                        placeholder='Type in a message...'
                        className='quill_box'
                        onKeyDown={event => handleEnter(event)}
                        onChange={(content) => props.handleChange(content)} />
                </label>

                {/* Clear */}
                {!isMobile && <button className={styles.clear} type='button' onClick={() => props.handleChange('<p><br></p>')} disabled={props.message === '<p><br></p>'}>
                    <FontAwesomeIcon icon={["fas", 'xmark']} />
                </button>}

                {/* Send */}
                <button className={styles.send} type='submit' disabled={props.message === '<p><br></p>'}>
                    <FontAwesomeIcon icon={["far", 'paper-plane']} />
                </button>
            </div>

            {/* Emojis */}
            <div tabIndex='0' className={styles.chat_bottom}>
                <div className={styles.content} tabIndex='0'>
                    <button type='button' className={styles.toggler}>
                        <FontAwesomeIcon icon={["far", 'face-smile']} />
                    </button>
                    {emojis}
                </div>
            </div>

            {/* Attach */}
            <div tabIndex='0' className={[styles.chat_bottom, styles.chat_bottom_attach].join(' ')}>
                <div className={styles.content} tabIndex='0'>
                    {/* Toggler */}
                    <button className={styles.toggler}>
                        <FontAwesomeIcon icon={["fas", 'paperclip']} />
                    </button>

                    {/* Camera */}
                    <button className={styles.attach_button}>
                        <FontAwesomeIcon icon={["fas", 'camera-retro']} />
                        <span>{t("chat.attach.camera")}</span>
                    </button>

                    {/* Images */}
                    <label className={styles.attach_label}>
                        <input
                            ref={imagesRef}
                            type="file"
                            onChange={handleImagesChange}
                            accept=".jpg,.jpeg,.png"
                        />
                        <span className={styles.attach_button}>
                            <FontAwesomeIcon icon={["fas", 'image']} />
                            <span>{t("chat.attach.image")}</span>
                        </span>
                    </label>

                    {/* Files */}
                    <label className={styles.attach_label}>
                        <input
                            ref={imagesRef}
                            type="file"
                            onChange={handleFiles}
                        />
                        <span className={styles.attach_button}>
                            <FontAwesomeIcon icon={["fas", 'file-lines']} />
                            <span>{t("chat.attach.file")}</span>
                        </span>
                    </label>
                </div>
            </div>
        </form >
    );
};

export default ChatInput;