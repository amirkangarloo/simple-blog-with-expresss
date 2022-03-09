'use strict';

const postModel = require('@models/posts');
const dateService = require('@services/dateService');

exports.index = async (req, res) => {
    const posts = await postModel.findAll();
    const peresentedPosts = posts.map((post) => {
        post.created = dateService.normalDate(post.created_at);
        return post;
    });
    res.render(
        'admin/posts/index',
        {
            layout: "admin",
            posts: peresentedPosts
        }
    );
}