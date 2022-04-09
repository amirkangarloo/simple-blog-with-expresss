'use strict';

const adminRouter = require('./admin');
const authRouter = require('./auth');
const frontRouter = require('./front');
const auth = require('@middlewares/auth');
const admin = require('@middlewares/admin');
const guest = require('@middlewares/guest');
const authController = require('@controllers/auth');

module.exports = (app) => {
    app.use('/', frontRouter);
    app.use('/admin', [auth, admin], adminRouter);
    app.use('/auth', [guest], authRouter);
    app.get('/logout', authController.logout);
};