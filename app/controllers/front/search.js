'use strict';

const postModel = require('@models/posts');
const dateService = require('@services/dateService');
const paginationService = require('@services/paginationService');
const postSummary = require('@services/postSummaryService');
const settingService = require('@services/settingService');

exports.index = async (req, res) => {
    const posts = await postModel.findByKeyword(req.query.keyword);
    const peresentedPosts = posts.map((post) => {
        post.created = dateService.normalDate(post.created_at);
        post.summary = postSummary.summary(post.content);
        return post;
    });

    res.render('front/search', {
        layout: 'front',
        post: peresentedPosts,
        keyword: req.query.keyword
    });
};