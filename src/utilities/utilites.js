const utilites = {
    getHour: () => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return hours + ":" + minutes;
    },
    getDate: () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = "0" + month;
        }

        return day + "-" + month + "-" + year;
    },
    getDateAlt: () => {
        let date = new Date();

        let newData = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        }

        return newData;
    },
    genRandomUser: () => {
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let randomName = '';
        let randomUser = {};

        for (let i = 0; i < 5; i++) {
            let char = letters.charAt(Math.floor(Math.random() * letters.length));

            randomName += char;
        }

        randomUser.name = "Quick " + randomName.charAt(0).toUpperCase() + randomName.slice(1);
        randomUser.email = "quick@" + randomName + ".com";
        randomUser.password = "Quick" + randomName + "!";

        return randomUser;
    },
    combineNames: (name1, name2) => {
        let namesArray = [name1, name2].sort();

        let combinedNames = namesArray[0] + "_" + namesArray[1];

        return combinedNames;
    }
};

export default utilites;
