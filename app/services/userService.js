'use strict';

const gravatar = require('gravatar');

exports.userImage = (email) => {
    return gravatar.url(email);
}