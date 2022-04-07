'use strict';

const sessionStore = (session) => {
    const MySQLStore = require('express-mysql-session')(session);
    const options = {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        clearExpired: true,
        checkExpirationInterval: 900000,
        expiration: 86400000
    };

    return new MySQLStore(options);
};

module.exports = sessionStore;