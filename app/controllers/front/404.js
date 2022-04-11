'use strict';

exports.showNotFoundPage = async (req, res) => {
    res.render('front/404', {
        layout: 'front'
    });
};