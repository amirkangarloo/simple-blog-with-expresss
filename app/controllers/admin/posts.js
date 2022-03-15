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
        'admin/posts/index', {
            layout: "admin",
            posts: peresentedPosts,
            users: users,
            helpers: {
                counter: (index) => {
                    return index + 1;
                }
            }
        }
    );
}

exports.create = async (req, res) => {
    const users = await userModel.findAll(['id', 'full_name']);
    res.render(
        'admin/posts/create', {
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
            'admin/posts/create', {
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
    if (parseInt(postId) === 0) {
        return res.redirect('/admin/posts');
    }
    const result = await postModel.delete(postId);
    res.redirect('/admin/posts');
};

exports.edit = async (req, res) => {
    const postId = req.params.postId;
    if (parseInt(postId) === 0) {
        return res.redirect('/admin/posts');
    }
    const post = await postModel.find(postId);
    const users = await userModel.findAll(['id', 'full_name']);
    res.render(
        'admin/posts/edit', {
            layout: "admin",
            users: users,
            post: post,
            helpers: {
                isPostAuthor: (userId, options) => {
                    return post.author_id === userId ? options.fn(this) : options.inverse(this);
                },
                postStatus: (status, options) => {
                    return post.status === status ? options.fn(this) : options.inverse(this);
                }
            }
        }
    );
};

exports.update = async (req, res) => {
    const postId = req.params.postId;
    const postData = {
        title: req.body.postTitle,
        author_id: req.body.author,
        slug: req.body.postSlug,
        content: req.body.editor1,
        status: req.body.status
    };
    if (parseInt(postId) === 0) {
        return res.redirect('/admin/posts');
    }
    const result = await postModel.update(postId, postData);
    res.redirect('/admin/posts');
};