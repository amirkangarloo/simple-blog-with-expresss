'use strict';

const express = require('express');
const app = express();
require('./bootstrap')(app, express);

app.get('/', (req, res) => {
    res.render('main', {
        layout: false,
        cost: "200$"
    });
});

module.exports = () => {
    const port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`App is runing and listen on port ${port}`);
    });
};