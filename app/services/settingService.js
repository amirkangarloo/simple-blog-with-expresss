'use strict';

const settingsModle = require('@models/settings');
const status = require('@models/settings/settingStatus');

exports.postsPerPage = async () => {
    return parseInt(await settingsModle.get('posts_per_page'));
};

exports.websiteTitle = async () => {
    return await settingsModle.get('website_title');
};

exports.websiteDescription = async () => {
    return await settingsModle.get('website_description');
};

exports.usersCanRegister = async () => {
    const result = await settingsModle.get('users_can_register');
    if (result === status.settingStatus.TRUE) {
        return true;
    }
    return false;
};

exports.usersCanSubmitComments = async () => {
    const result = await settingsModle.get('users_can_submit_comments');
    if (result === status.settingStatus.TRUE) {
        return true;
    }
    return false;
};