'use strict';

const postModel = require('@models/posts');
const dateService = require('@services/dateService');
const postSummary = require('@services/postSummaryService');

exports.index = async (req, res) => {
    // const users = await userModel.findAll(['id', 'full_name']);
    const posts = await postModel.findAll();
    const peresentedPosts = posts.map((post) => {
        post.created = dateService.normalDate(post.created_at);
        post.summary = postSummary.summary(post.content);
        return post;
    });
    res.render('front/home', {
        layout: 'front',
        post: peresentedPosts
    });
};