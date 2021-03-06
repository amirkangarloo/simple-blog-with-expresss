'use strict';

const db = require('@database/mysql');

exports.findAll = async (columes = []) => {
    const sqlColumes = columes.length > 0 ? columes.join(',') : '*';
    const [rows, fields] = await db.query(`
        SELECT ${sqlColumes}
        FROM settings
    `);
    return rows;
};

exports.update = async (updateFields) => {
    Object.keys(updateFields).forEach((setting_name) => {
        db.query(`
            UPDATE settings SET setting_value=? WHERE setting_name=?`,
            [updateFields[setting_name], setting_name]
        );
    })
};

exports.get = async (key) => {
    const [rows] = await db.query(`
        SELECT setting_value
        FROM settings
        WHERE setting_name=?
        LIMIT 1
    `,[key]);
    return rows.length > 0 ? rows[0].setting_value : null
};