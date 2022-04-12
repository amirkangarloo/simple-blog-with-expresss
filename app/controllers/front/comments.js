'use strict';

const postModel = require('@models/posts');
const commentModel = require('@models/comments');

exports.store = async (req, res) => {
    const authorId = 'user' in req.session ? req.session.user.author_id : null;
    const postSlug = req.params.post_slug;
    const posts = await postModel.findByPostSlug(postSlug);
    const post = posts[0];
    if (!post) {
        return res.redirect('/404');
    }
    const {
        user_name,
        user_email,
        comment
    } = req.body;
    const commentData = {
        author_id: authorId,
        post_id: post.id,
        user_name,
        user_email,
        comment
    };

    const result = await commentModel.create(commentData);
    if (result) {
        return res.redirect(`/blog/${postSlug}`);
    }
};