'use strict';

const postModel = require('@models/posts');
const userModel = require('@models/users');
const commentModel = require('@models/comments');
const dateService = require('@services/dateService');
const userService = require('@services/userService');
const paginationService = require('@services/paginationService');
const postSummary = require('@services/postSummaryService');
const settingService = require('@services/settingService');
const _ = require('lodash');

exports.showSinglePost = async (req, res) => {
    const postSlug = req.params.post_slug;
    const post = await postModel.findByPostSlug(postSlug); 
    if (!post[0]) {
        return res.redirect('/404');
    };
    const auther = await userModel.find(post[0].author_id);
    const userImage = userService.userImage(auther.email);

    const presentedPost =  post.map((post) => {
        post.created = dateService.normalDate(post.created_at);
        return post;
    });
    const comments = await commentModel.findByPostId(post[0].id);
    const peresentedComments = comments.map((comment) => {
        comment.image = userService.userImage(comment.user_email);
        comment.created = dateService.normalDate(comment.created_at);
        return comment;
    });
    const newComments = _.groupBy(peresentedComments, 'parent');
    // return res.send(newComments);
    res.render('front/posts/singleBlog', {
        layout: 'front',
        post: presentedPost,
        comment: newComments[0],
        numberOfComments: peresentedComments.length,
        userImage,
        auther,
        helpers: {
            hasChildren: (commentId, options) => {
                return commentId in newComments;
            },
            getChildren: (commentId, options) => {
                return newComments[commentId];
            }
        }
    })
};

exports.showArchivedPosts = async (req, res) => {
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
    res.render('front/posts/archivedBlog', {
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