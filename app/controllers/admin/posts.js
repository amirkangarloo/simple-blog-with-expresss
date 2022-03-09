'use strict';

const postModel = require('@models/posts');

exports.index = async (req, res) => {
    const posts = await postModel.findAll();
    res.render(
        'admin/posts/index',
        {
            layout: "admin",
            posts
        }
    );
}