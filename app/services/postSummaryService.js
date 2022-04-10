'use strict';

exports.summary = (content, wordsLimit = 20) => {
    const words = content.split(' ');
    return words.slice(0, wordsLimit - 1).join(' ') + ' ...';
}