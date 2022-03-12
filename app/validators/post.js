'use strict';

exports.create = (request) => {
    const errors = [];
    if (request.status == null) {
        errors.push('Status is NULL! Please select status.')
    }
    if (request.content == '') {
        errors.push('Content can not be empty.')
    }

    return errors;
};