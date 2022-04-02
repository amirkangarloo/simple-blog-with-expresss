'use strict';

const userModel = require('@models/users');
const {userRole} = require('@models/users/userRole');
const dateService = require('@services/dateService');

exports.index = async (req, res) => {
    const users = await userModel.findAll(['full_name', 'email', 'created_at']);
    const peresentedUsers = users.map((user) => {
        user.created = dateService.normalDate(user.created_at);
        return user;
    });
    res.render(
        'admin/users/index', {
            layout: "admin",
            users: peresentedUsers,
            helpers: {
                counter: (index) => {
                    return index + 1;
                }
            }
        }
    );
}

exports.create = async (req, res) => {
    res.render(
        'admin/users/create', {
            layout: "admin",
            userRole: userRole
        }
    );
};

exports.store = async (req, res) => {
    const userData = {
        full_name: req.body.userFullName,
        email: req.body.userEmail,
        password: req.body.userPassword,
        role: req.body.role
    };

    const result = await userModel.create(userData);
    res.redirect('/admin/users');
};

// exports.remove = async (req, res) => {
//     const postId = req.params.postId;
//     if (parseInt(postId) === 0) {
//         return res.redirect('/admin/posts');
//     }
//     const result = await postModel.delete(postId);
//     res.redirect('/admin/posts');
// };

// exports.edit = async (req, res) => {
//     const postId = req.params.postId;
//     if (parseInt(postId) === 0) {
//         return res.redirect('/admin/posts');
//     }
//     const post = await postModel.find(postId);
//     const users = await userModel.findAll(['id', 'full_name']);
//     res.render(
//         'admin/posts/edit', {
//             layout: "admin",
//             users: users,
//             post: post,
//             postStatus: postStatus,
//             helpers: {
//                 isPostAuthor: (userId, options) => {
//                     return post.author_id === userId ? options.fn(this) : options.inverse(this);
//                 },
//                 postStatus: (status, options) => {
//                     return post.status === status ? options.fn(this) : options.inverse(this);
//                 }
//             }
//         }
//     );
// };

// exports.update = async (req, res) => {
//     const postId = req.params.postId;
//     const postData = {
//         title: req.body.postTitle,
//         author_id: req.body.author,
//         slug: req.body.postSlug,
//         content: req.body.editor1,
//         status: req.body.status
//     };
//     if (parseInt(postId) === 0) {
//         return res.redirect('/admin/posts');
//     }
//     const result = await postModel.update(postId, postData);
//     res.redirect('/admin/posts');
// };