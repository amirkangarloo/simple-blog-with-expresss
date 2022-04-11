'use strict';

const db = require('@database/mysql');

exports.findAll = async (page=1, postsPerPage=10) => {
    
    const offset = (page - 1) * postsPerPage;

    const [rows, fields] = await db.query(`
        SELECT posts.*,users.full_name
        FROM posts
        LEFT JOIN users
        ON posts.author_id=users.id
        ORDER BY posts.created_at DESC
        LIMIT ${offset},${postsPerPage}
    `);
    return rows;
};

exports.count = async () => {
    const [rows, fields] = await db.query(`
        SELECT COUNT(id) as postsCount FROM posts 
    `);
    return rows[0].postsCount;
};

exports.find = async (postId) => {
    const [rows, fields] = await db.query(`
        SELECT posts.*,users.full_name
        FROM posts
        INNER JOIN users
        ON posts.author_id=users.id
        WHERE posts.id=? LIMIT 1
    `, [postId]);
    return rows.length > 0 ? rows[0] : false;
};

exports.findByPostSlug = async (postSlug) => {
    const [rows] = await db.query(`
        SELECT posts.*,users.full_name
        FROM posts
        LEFT JOIN users
        ON posts.author_id=users.id
        WHERE slug=? LIMIT 1
    `, [postSlug]);
    return rows.length > 0 ? rows[0] : false;
};

exports.create = async (postData) => {
    const [result] = await db.query(
        `INSERT INTO posts SET ?`,
        [postData]
    );
    return result;
};

exports.delete = async (postId) => {
    const [result] = await db.query(
        `DELETE FROM posts WHERE id=? LIMIT 1`,
        [postId]
    );
    return result.length > 0 ? result[0] : false;
};

exports.update = async (postId, updateFields) => {
    const [result] = await db.query(
        `UPDATE posts set ? WHERE id=? LIMIT 1`,
        [updateFields, postId]
    );
    return result.length > 0 ? result[0] : false;
};