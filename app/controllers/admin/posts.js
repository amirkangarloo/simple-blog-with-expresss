'use strict';

const postModel = require('@models/posts');
const {postStatus} = require('@models/posts/postStatus');
const userModel = require('@models/users');
const dateService = require('@services/dateService');
const postValidator = require('@validators/post');
const thumbnailService = require('@services/thumbnailService')

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
            currentUser: req.session.user.full_name,
            posts: peresentedPosts,
            users: users,
            postStatus: postStatus,
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
            currentUser: req.session.user.full_name,
            postStatus: postStatus,
            users
        }
    );
};

exports.store = async (req, res) => {
    const users = await userModel.findAll(['id', 'full_name']);
    const file = req.files.thumbnail;
    const newFileName = thumbnailService.thumbnail(file);

    const postData = {
        title: req.body.postTitle,
        author_id: req.body.author,
        slug: req.body.postSlug,
        content: req.body.editor1,
        status: req.body.status,
        thumbnail: newFileName
    };
    const validation = postValidator.create(postData);
    if (validation.length > 0) {
        return res.render(
            'admin/posts/create', {
                layout: "admin",
                currentUser: req.session.user.full_name,
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
            currentUser: req.session.user.full_name,
            users: users,
            post: post,
            postStatus: postStatus,
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