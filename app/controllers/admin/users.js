'use strict';

const userModel = require('@models/users');
const {
    userRole
} = require('@models/users/userRole');
const dateService = require('@services/dateService');

exports.index = async (req, res) => {
    const users = await userModel.findAll(['full_name', 'email', 'created_at', 'id']);
    const peresentedUsers = users.map((user) => {
        user.created = dateService.normalDate(user.created_at);
        return user;
    });
    res.render(
        'admin/users/index', {
            layout: "admin",
            users: peresentedUsers,
            helpers: {
                counter: (index) => {
                    return index + 1;
                }
            }
        }
    );
}

exports.create = async (req, res) => {
    res.render(
        'admin/users/create', {
            layout: "admin",
            userRole: userRole
        }
    );
};

exports.store = async (req, res) => {
    const userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };

    const result = await userModel.create(userData);
    res.redirect('/admin/users');
};

exports.remove = async (req, res) => {
    const userId = req.params.userId;
    if (parseInt(userId) === 0) {
        return res.redirect('/admin/users');
    }
    const result = await userModel.delete(userId);
    res.redirect('/admin/users');
};

exports.edit = async (req, res) => {
    const userId = req.params.userId;
    if (parseInt(userId) === 0) {
        return res.redirect('/admin/users');
    }
    const user = await userModel.find(userId);
    res.render(
        'admin/users/edit', {
            layout: "admin",
            user: user,
            userRole: userRole,
            helpers: {
                userRole: (role, options) => {
                    return user.role === role ? options.fn(this) : options.inverse(this);
                }
            }
        }
    );
};

exports.update = async (req, res) => {
    const userId = req.params.userId;
    const userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };

    if (parseInt(userId) === 0) {
        return res.redirect('/admin/users');
    }

    const result = await userModel.update(userId, userData);
    res.redirect('/admin/users');
};