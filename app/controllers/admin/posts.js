'use strict';

const postModel = require('@models/posts');
const userModel = require('@models/users');
const dateService = require('@services/dateService');
const postValidator = require('@validators/post');

exports.index = async (req, res) => {
    const users = await userModel.findAll(['id', 'full_name']);
    const posts = await postModel.findAll();
    const peresentedPosts = posts.map((post) => {
        post.created = dateService.normalDate(post.created_at);
        return post;
    });
    res.render(
        'admin/posts/index',
        {
            layout: "admin",
            posts: peresentedPosts,
            users
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
    const users = await userModel.findAll(['id', 'full_name']);
    const postData = {
        title: req.body.postTitle,
        author_id: req.body.author,
        slug: req.body.postSlug,
        content: req.body.editor1,
        status: req.body.status
    };
    const validation = postValidator.create(postData);
    if (validation.length > 0) {
        return res.render(
                'admin/posts/create',
                {
                    layout: "admin",
                    errors: validation,
                    hasError: validation.length > 0,
                    users
                }
        );
    }
    const result = await postModel.create(postData);
    res.redirect('/admin/posts');
};

exports.remove = async (req, res) => {
    const postId = req.params.postId;
    const result = await postModel.delete(postId);
    res.redirect('/admin/posts');
};