import defaultIcon from '../assets/images/notification_icon.png';

let notification = null;

const notify = {
    init: () => {
        if (typeof Notification !== "undefined") {
            Notification.requestPermission();
        }
    },
    open: (title, body, icon) => {
        let permission = Notification.permission;

        if (permission) {
            if (document.visibilityState !== "visible") {
                notification = new Notification(title, { body, icon: icon !== undefined ? icon : defaultIcon });

                notification.onclick = () => {
                    notification.close();
                    window.parent.focus();
                }
            }
        }
    }
};

export default notify;