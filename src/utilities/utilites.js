const utilites = {
    getHour: () => {
        let date = new Date();

        return date.getHours() + ":" + date.getMinutes();
    },
};

export default utilites;
