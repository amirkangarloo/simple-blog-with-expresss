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

exports.find = async (userId) => {
    const [rows, fields] = await db.query(`
        SELECT * FROM users WHERE id=? LIMIT 1`,
        [userId]
    );
    return rows.length > 0 ? rows[0] : false;
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

exports.delete = async (userId) => {
    const [result] = await db.query(
        `DELETE FROM users WHERE id=? LIMIT 1`,
        [userId]
    );
    return result.length > 0 ? result[0] : false;
};

exports.update = async (userId, updateFields) => {
    const hashedPassword = hashService.hashPassword(updateFields.password);
    const updatedUserData = {
        ...updateFields,
        password: hashedPassword
    };

    const [result] = await db.query(
        `UPDATE users set ? WHERE id=? LIMIT 1`,
        [updatedUserData, userId]
    );
    return result.length > 0 ? result[0] : false;
};