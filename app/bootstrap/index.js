'use strict';

const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionStore = require('./sessionHandler/mysqlSession')(session);

module.exports = (app, express) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.engine('handlebars', hbs());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));
    app.use('/static', express.static(path.join(__dirname ,'../../public')));
    app.use(session({
        store: sessionStore,
        secret: 'd18aa321f3a54daa5fd4ddasa5343as',
        resave: true,
        saveUninitialized: true,
        name: 'my_session'
      }));
};