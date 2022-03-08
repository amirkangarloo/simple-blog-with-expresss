'use strict';

const db = require('../../database/mysql');

exports.totalUsers = async () => {
    const [result] = await db.query('SELECT COUNT(id) as totalUsers FROM users');
    
    return result[0].totalUsers;
};

exports.totalComments = async () => {
    const [result] = await db.query('SELECT COUNT(id) as totalComments FROM comments');
    
    return result[0].totalComments;
};

exports.totalPosts = async () => {
    const [result] = await db.query('SELECT COUNT(id) as totalPosts FROM posts');
    
    return result[0].totalPosts;
};

exports.totalVisitors = async () => {
    const [result] = await db.query('SELECT SUM(views) as totalVisitors FROM posts');
    if (result[0].totalVisitors === null) {
        // when you have not any posts in blog.
        return 0;
    }
    return result[0].totalVisitors;
};