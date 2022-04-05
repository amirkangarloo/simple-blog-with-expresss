'use strict';

const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = (app, express) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.engine('handlebars', hbs());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));
    app.use('/static', express.static(path.join(__dirname ,'../../public')));
    app.use(session({
        secret: 'amir',
        resave: true,
        saveUninitialized: true,
        name: 'mySession'
      }));
};