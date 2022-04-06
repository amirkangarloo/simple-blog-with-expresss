'use strict';

const userModel = require('@models/users');
const {userRole} = require('@models/users/userRole');
const hashService = require('@services/hashService');

exports.login = async (email, plainPassword) => {
    const user = await userModel.findByEmail(email);
    // check vaild email
    if (!user) {
        return false;
    }
    const {password} = user;
    
    return hashService.comparePassword(plainPassword, password) ? user : false;
};

exports.register = async (email, plainPassword) => {
    const insertId = await userModel.create({
        full_name: '',
        email: email,
        password: plainPassword,
        role: userRole.SUBSCRIBER
    });
    return insertId;
};