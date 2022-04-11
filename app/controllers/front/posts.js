'use strict';

const postModel = require('@models/posts');
const userModel = require('@models/users');
const dateService = require('@services/dateService');
const userService = require('@services/userService');

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
    const auther = await userModel.find(post.author_id);
    const userImage = userService.userImage(auther.email);

    res.render('front/posts/singleBlog', {
        layout: 'front',
        post: presentedPost[0],
        userImage,
        auther
    })
};