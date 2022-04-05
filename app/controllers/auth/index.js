'use strict';

const authService = require('@services/authService');
const {userRole} = require('@models/users/userRole');

exports.showLogin = (req, res) => {
    res.render('auth/login', {
        layout: "auth"
    });
};
exports.doLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await authService.login(email, password);

    if (!user) {
        return res.redirect('/auth/login');
    }
    // req.session.user = user;
    const pathToRedirect = user.role === userRole.ADMIN || user.role === userRole.WRITER ? '/admin/dashboard' : '/';
    res.redirect(pathToRedirect);
};
exports.showRegister = (req, res) => {};
exports.doRegister = (req, res) => {};