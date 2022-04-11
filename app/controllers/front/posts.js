'use strict';

const postModel = require('@models/posts');
const dateService = require('@services/dateService');

exports.showSinglePost = async (req, res) => {
    const postSlug = req.params.post_slug;
    const post = await postModel.findByPostSlug(postSlug);

    if (post === false) {
        return res.redirect('/');
    };
    
    const presentedPost =  [post].map((post) => {
        post.created = dateService.normalDate(post.created_at);
        return post;
    });

    res.render('front/posts/singleBlog', {
        layout: 'front',
        post: presentedPost[0]
    })
};