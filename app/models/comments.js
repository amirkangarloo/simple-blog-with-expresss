'use strict';

const db = require('@database/mysql');

exports.findAll = async () => {
    const [rows, fields] = await db.query(`
        SELECT comments.*,posts.title
        FROM comments
        INNER JOIN posts
        ON comments.post_id=posts.id
        ORDER BY posts.created_at DESC
    `);
    return rows;
};