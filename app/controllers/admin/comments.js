'use strict';

const commentModel = require('@models/comments');
const {commentStatus} = require('@models/comments/commentStatus');
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
            comments: peresentComments,
            helpers: {
                commentConfirmStatus: (status) => {
                    if (status === commentStatus.CONFIRM) {
                        return 'glyphicon-ok';
                    }
                    if (status === commentStatus.REJECT) {
                        return 'glyphicon-remove';
                    }
                    return '';
                }
            }
        }
    );
}

exports.confirm = async (req, res) => {
    const commentId = req.params.commentId;
    const result = await commentModel.confirm(commentId);
    return res.redirect('/admin/comments');
};

exports.reject = async (req, res) => {
    const commentId = req.params.commentId;
    const result = await commentModel.reject(commentId);
    return res.redirect('/admin/comments');
};

exports.delete = async (req, res) => {
    const commentId = req.params.commentId;
    const result = await commentModel.delete(commentId);
    return res.redirect('/admin/comments');
};