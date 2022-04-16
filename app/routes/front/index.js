'use strict';

const express = require('express');
const router = express.Router();

//routers
const frontRouter = require('./front');
const searchRouter = require('./search');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const notFoundRouter = require('./404');


router.use('/', frontRouter);
router.use('/search', searchRouter);
router.use('/blog', postsRouter);
router.use('/blog', commentsRouter);
router.use('/404', notFoundRouter);


module.exports = router;