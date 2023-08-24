import store from '../store/store';
import { setUser, setChats, setError } from '../store/mainSlice';
import Axios from "axios";

import utilites from './utilites';

const axios_instance = Axios.create({
    baseURL: "https://grvenq-backend.onrender.com:7014"
});

const axios = {
    // Auth
    singUp: (user) => {
        return new Promise((resolve, reject) => {
            axios_instance
                .post("/api/auth/signup/", { email: user.email, name: user.name })
                .then(() => {
                    axios.addUser(user)
                        .then((res) => {
                            resolve(res);
                        })
                        .catch(() => {
                            reject();
                        });
                })
                .catch((error) => {
                    reject(error);

                    console.log(error);

                    store.dispatch(setError(error.message));
                });
        });
    },
    logIn: (user) => {
        return new Promise((resolve, reject) => {
            axios_instance
                .post("/api/auth/login/", { email: user.email, password: user.password })
                .then((response) => {
                    axios.getUser(response.data)
                        .then((res) => {
                            resolve(res._id);
                        })
                        .catch(() => {
                            reject();
                        });
                })
                .catch((error) => {
                    reject(error);

                    console.log(error);

                    store.dispatch(setError(error.message));
                });
        });
    },

    // User
    addUser: (user) => {
        return new Promise((resolve, reject) => {
            let newUser = {
                name: user.name.trim(),
                email: user.email.trim(),
                password: user.password.trim(),
                pic: 'unset',
                created: utilites.getDate(),
                chat: []
            }

            axios_instance
                .post("/api/users/", newUser)
                .then((response) => {
                    resolve(response.data._id);

                    store.dispatch(setUser(response.data));
                })
                .catch((error) => {
                    reject();

                    console.log(error);

                    store.dispatch(setError(error.message));
                });
        });
    },
    getUser: (userId, other) => {
        return new Promise((resolve, reject) => {
            axios_instance
                .get("/api/users/_id/" + userId)
                .then((response) => {
                    resolve(response.data);

                    if (other === undefined || !other) {
                        if (response.data === null) {
                            store.dispatch(setError("User not found from localForage! Signing out!"));
                        } else {
                            store.dispatch(setUser(response.data));
                        }
                    }
                })
                .catch((error) => {
                    reject();

                    console.log(error);

                    store.dispatch(setError(error.message));
                });
        });
    },
    getUsers: (userId, chats) => {
        return new Promise((resolve, reject) => {
            axios.getChats(chats)
                .then((response) => {
                    if (response.length > 0) {
                        let newChats = response;
                        let users = [];

                        for (let i = 0; i < newChats.length; i++) {
                            if (newChats[i].users[0] === userId) {
                                newChats[i].user = newChats[i].users[1];
                                users.push(newChats[i].users[1]);
                            } else {
                                newChats[i].user = newChats[i].users[0];
                                users.push(newChats[i].users[0]);
                            }

                            delete newChats[i].users;
                        }

                        axios_instance
                            .post("/api/users/chat-users/", { users: users })
                            .then((res) => {
                                for (let i = 0; i < newChats.length; i++) {
                                    for (let j = 0; j < res.data.length; j++) {
                                        if (newChats[i].user === res.data[j]._id) {
                                            newChats[i].user = res.data[j]
                                        }
                                    }
                                }

                                resolve();
                                store.dispatch(setChats(newChats));
                            })
                            .catch((error) => {
                                reject();

                                console.log(error);

                                store.dispatch(setError(error.message));
                            });
                    }

                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    },
    findUsers: (chats, query) => {
        return new Promise((resolve, reject) => {
            axios_instance
                .post("/api/users/find/", { chats: chats, query: query })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject();

                    console.log(error);

                    store.dispatch(setError(error.message));
                });
        });
    },

    // Chats
    addChat: (user, userOther) => {
        return new Promise((resolve, reject) => {
            let date = utilites.getDateAlt();

            let newChat = {
                users: [user._id, userOther._id],
                content: [],
                created: JSON.stringify(date),
                last: JSON.stringify(date),
                background: 'unset',
            }

            axios_instance
                .post("/api/chats/", newChat)
                .then((response) => {
                    let newUser = store.getState().main.user;

                    axios.addChatToUser(response.data._id, newUser._id, true).then(() => {
                        resolve(response.data._id);
                    }).catch(() => {
                        reject();
                    });
                })
                .catch((error) => {
                    reject();

                    console.log(error);

                    store.dispatch(setError(error.message));
                });
        });
    },
    addChatToUser: (chatId, userId, currentUser) => {
        return new Promise((resolve, reject) => {
            axios_instance
                .patch("/api/users/chats/" + userId, { chatId: chatId, add: true })
                .then(() => {
                    if (currentUser) {
                        let user = store.getState().main.user;

                        let newUser = { ...user }

                        newUser.chats = [
                            ...newUser.chats,
                            chatId
                        ];

                        store.dispatch(setUser(newUser));

                        resolve();
                    } else {
                        resolve();
                    }
                }).catch((error) => {
                    reject();

                    console.log(error);

                    store.dispatch(setError(error.message));
                });
        });
    },
    getChats: (chats) => {
        return new Promise((resolve, reject) => {
            axios_instance
                .post("/api/chats/find/", { chats: chats })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject();

                    console.log(error);

                    store.dispatch(setError(error.message));
                });
        });
    },
    setChatContent: (chatId, content) => {
        return new Promise((resolve, reject) => {
            let chats = store.getState().main.chats;

            let chat = chats.filter(c => c._id === chatId);

            let newChat = {
                ...chat[0],
                last: JSON.stringify(utilites.getDateAlt()),
                content: content
            };

            axios_instance
                .patch("/api/chats/" + chatId, newChat)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject();

                    console.log(error);

                    store.dispatch(setError(error.message));
                });
        });
    }
};

export default axios;