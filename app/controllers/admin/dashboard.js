'use strict';

const statistics = require('@models/statistics');
const userModel = require('@models/users');

exports.index = async (req, res) => {
    const data = {
        totalUsers: await statistics.totalUsers(),
        totalComments: await statistics.totalComments(),
        totalPosts: await statistics.totalPosts(),
        totalVisitors: await statistics.totalVisitors()
    }
    const users = await userModel.findAll(['id', 'full_name']);
    res.render(
        'admin/dashboard/index',
        {
            layout: "admin",
            currentUser: req.session.user.full_name,
            ...data,
            users
        }
    );
}