'use strict';

const db = require('@database/mysql');
const hashService = require('@services/hashService');

exports.findAll = async (columes = []) => {
    const sqlColumes = columes.length > 0 ? columes.join(',') : '*';
    const [rows, fields] = await db.query(`
        SELECT ${sqlColumes}
        FROM users
    `);
    return rows;
};

exports.create = async (userData) => {
    const hashedPassword = hashService.hashPassword(userData.password);
    const updatedUserData = {
        ...userData,
        password: hashedPassword
    };

    const [result] = await db.query(
        `INSERT INTO users SET ?`,
        [updatedUserData]
    );
    return result;
};