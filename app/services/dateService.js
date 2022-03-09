'use strict';

const moment = require('moment');

exports.normalDate = (date, format = 'MMM DD, YYYY') => {
    return moment(date).format(format);
};