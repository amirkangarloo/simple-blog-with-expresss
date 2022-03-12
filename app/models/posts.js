'use strict';

const db = require('@database/mysql');

exports.findAll = async () => {
    const [rows, fields] = await db.query(`
        SELECT posts.*,users.full_name
        FROM posts
        INNER JOIN users
        ON posts.author_id=users.id
    `);
    return rows;
};

exports.create = async (postData) => {
    const [result] = await db.query(
        `INSERT INTO posts SET ?`,
        [postData]
    );
    console.log({result});
    return result;
};