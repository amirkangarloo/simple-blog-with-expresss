'use strict';

const commentModel = require('@models/comments');
const dateService = require('@services/dateService');

exports.index = async (req, res) => {
    const comments = await commentModel.findAll();
    const peresentComments = comments.map((comment) => {
        comment.created = dateService.normalDate(comment.created_at);
        return comment
    });
    res.render(
        'admin/comments/index',
        {
            layout: "admin",
            comments: peresentComments
        }
    );
}