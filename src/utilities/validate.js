const validate = {
    name: (name, t) => {
        // Empty
        if (name === '') {
            return t('validate.name.req')
        }

        // Wrong characters
        if (!/^[A-Za-z0-9_\s]*$/.test(name)) {
            return t('validate.name.letters')
        }

        // Too short
        if (name.length < 2) {
            return t('validate.name.short')
        }

        // Too long
        if (name.length > 20) {
            return t('validate.name.long')
        }

        // Valid name
        return '';
    },
    email: (email, t) => {
        // Empty
        if (email === '') {
            return t('validate.email.req')
        }

        // Wrong characters
        if (!email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            return t('validate.email.invalid')
        }

        // Valid email
        return '';
    },
    password: (password, t) => {
        // Empty
        if (password === '') {
            return t('validate.password.req')
        }

        // Too short
        if (password.length < 8) {
            return t('validate.password.short')
        }

        // Too Long
        if (password.length > 20) {
            return t('validate.password.long')
        }

        // Weak password
        if (/^[a-z]+$/i.test(password)) {
            return t('validate.password.special')
        }

        // Valid password
        return '';
    },
};

export default validate;
