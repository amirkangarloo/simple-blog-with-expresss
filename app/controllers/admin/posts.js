'use strict';

const postModel = require('@models/posts');
const userModel = require('@models/users');
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

exports.create = async (req, res) => {
    const users = await userModel.findAll(['id', 'full_name']);
    res.render(
        'admin/posts/create',
        {
            layout: "admin",
            users
        }
    );
};

exports.store = async (req, res) => {
    const postData = {
        title: req.body.postTitle,
        author_id: req.body.author,
        slug: req.body.postSlug,
        content: req.body.editor1,
        status: req.body.status
    };
    const result = await postModel.create(postData);
    res.send(req.body);
};