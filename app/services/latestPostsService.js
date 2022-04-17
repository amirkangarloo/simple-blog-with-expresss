'use strict';

const postModel = require('@models/posts');
const dateService = require('@services/dateService');
const limit = 3;

exports.index = async () => {
    const latestPosts = await postModel.latestPosts(limit);
    const peresentedLatestPosts = latestPosts.map((post) => {
        post.created = dateService.normalDate(post.created_at);
        return post;
    });

    return peresentedLatestPosts;
};