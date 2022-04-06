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
    req.session.user = user;
    const pathToRedirect = user.role === userRole.ADMIN || user.role === userRole.WRITER ? '/admin/dashboard' : '/';
    res.redirect(pathToRedirect);
};
exports.showRegister = (req, res) => {
    res.render('auth/register', {
        layout: "auth"
    });
};
exports.doRegister = async (req, res) => {
    const {email, password, confirm_password} = req.body;
    const newUserId = await authService.register(email, password);

    if (!newUserId) {
        return res.redirect('/auth/register');
    }

    return res.redirect('/auth/login');
};