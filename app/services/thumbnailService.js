'use strict';

const {
    v4: uuidv4
} = require('uuid');

exports.thumbnail = (file) => {
    const fileExt = file.name.split('.')[1];
    const newFileName = `${uuidv4()}.${fileExt}`;
    const fileNewPath = `${process.env.INIT_CWD}/public/upload/thumbnails/${newFileName}`;
    file.mv(fileNewPath);

    return newFileName
};