'use strict';

const db = require('../../database/mysql');

exports.findAll = async () => {
    const [rows, fields] = await db.query('SELECT * FROM posts');
    return rows;
};