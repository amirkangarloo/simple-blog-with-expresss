'use strict';

const statistics = require('../../models/statistics');

exports.index = async (req, res) => {
    const data = {
        totalUsers: await statistics.totalUsers(),
        totalComments: await statistics.totalComments(),
        totalPosts: await statistics.totalPosts(),
        totalVisitors: await statistics.totalVisitors()
    }
    res.render(
        'admin/dashboard/index',
        {
            layout: "admin",
            ...data
        }
    );
}