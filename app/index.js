'use strict';

const express = require('express');
const app = express();

require('./bootstrap')(app, express);
require('./routes')(app);

module.exports = () => {
    const port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`App is runing and listen on port ${port}`);
    });
};