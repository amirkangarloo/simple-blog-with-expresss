'use strict';

const postModel = require('@models/posts');
const userModel = require('@models/users');
const commentModel = require('@models/comments');
const dateService = require('@services/dateService');
const userService = require('@services/userService');

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
    res.render('front/posts/singleBlog', {
        layout: 'front',
        post: presentedPost,
        comment: peresentedComments,
        userImage,
        auther
    })
};