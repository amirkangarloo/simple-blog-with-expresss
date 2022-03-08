'use strict';

exports.index = (req, res) => {
    const data = {
        totalUsers: 5,
        totalComments: 25,
        totalPosts: 10,
        totalVisitors: 1250
    }
    res.render(
        'admin/dashboard/index',
        {
            layout: "admin",
            ...data
        }
    );
}