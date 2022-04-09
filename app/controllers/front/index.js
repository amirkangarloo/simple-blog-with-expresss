'use strict';

exports.index = async (req, res) => {
    res.render('front/home', {
        layout: 'front'
    });
};