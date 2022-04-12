'use strict';

const db = require('@database/mysql');
const {commentStatus} = require('./commentStatus');

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

exports.confirm = async (commentId) => {
    const [result] = await db.query(`
        UPDATE comments SET
        status=?
        WHERE id=?
        LIMIT 1
    `, [commentStatus.CONFIRM, commentId]);

    return result.affectedRows > 0;
};

exports.reject = async (commentId) => {
    const [result] = await db.query(`
        UPDATE comments SET
        status=?
        WHERE id=?
        LIMIT 1
    `, [commentStatus.REJECT, commentId]);

    return result.affectedRows > 0;
};

exports.delete = async (commentId) => {
    const [result] = await db.query(`
        DELETE FROM comments
        WHERE id=?
        LIMIT 1
    `, [commentId]);

    return result.affectedRows > 0;
};

exports.create = async (commentData) => {
    const [rows] = await db.query(
        `INSERT INTO comments SET ?`,
        [commentData]
    );
    return rows.affectedRows;
};