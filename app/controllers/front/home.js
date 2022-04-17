'use strict';

const postModel = require('@models/posts');
const dateService = require('@services/dateService');
const paginationService = require('@services/paginationService');
const postSummary = require('@services/postSummaryService');
const settingService = require('@services/settingService');

exports.index = async (req, res) => {
    const totalPosts = await postModel.count();
    const postsPerPage = await settingService.postsPerPage();
    const pagination = paginationService.pagination(req, totalPosts, postsPerPage);

    // when we have only 3 pages and use requested ?page=4
    if ('page' in req.query && parseInt(req.query.page) > pagination.totalPages) {
        return res.redirect('/404');
    }
    
    const posts = await postModel.findAll(pagination.page, postsPerPage);
    const peresentedPosts = posts.map((post) => {
        post.created = dateService.normalDate(post.created_at);
        post.summary = postSummary.summary(post.content);
        return post;
    });
    res.render('front/home', {
        layout: 'front',
        post: peresentedPosts,
        pagination,
        helpers: {
            hideItem: (isHide, options) => {
                return isHide ? '' : 'none';
            }
        }
    });
};