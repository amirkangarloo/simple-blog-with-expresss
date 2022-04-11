'use strict';

const express = require('express');
const router = express.Router();

//routers
const frontRouter = require('./front');
const postsRouter = require('./posts');
const notFoundRouter = require('./404');


router.use('/', frontRouter);
router.use('/blog', postsRouter);
router.use('/404', notFoundRouter);


module.exports = router;