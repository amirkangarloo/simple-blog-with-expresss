'use strict';

const db = require('@database/mysql');

exports.findAll = async (columes = []) => {
    const sqlColumes = columes.length > 0 ? columes.join(',') : '*';
    const [rows, fields] = await db.query(`
        SELECT ${sqlColumes}
        FROM users
    `);
    return rows;
};