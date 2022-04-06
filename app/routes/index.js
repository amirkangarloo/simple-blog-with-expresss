'use strict';

const adminRouter = require('./admin');
const authRouter = require('./auth');
const auth = require('@middlewares/auth');
const admin = require('@middlewares/admin');
const guest = require('@middlewares/guest');

module.exports = (app) => {
    app.use('/admin', [auth, admin], adminRouter);
    app.use('/auth', [guest], authRouter);
};