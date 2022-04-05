'use strict';

const {userRole} = require('@models/users/userRole');

module.exports = (req, res, next) => {
    
    if (!req.session.hasOwnProperty('user') || req.session.user.role == userRole.SUBSCRIBER) {
        return res.redirect('/');
    }

    next();
};