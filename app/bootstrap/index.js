'use strict';

const hbs = require('express-handlebars');
const path = require('path');

module.exports = (app, express) => {
    app.engine('handlebars', hbs());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));
    app.use('/static', express.static(path.join(__dirname ,'../../public')));
};