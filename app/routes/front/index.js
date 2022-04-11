'use strict';

const express = require('express');
const router = express.Router();

//routers
const frontRouter = require('./front');
const postsRouter = require('./posts');


router.use('/', frontRouter);
router.use('/blog', postsRouter);


module.exports = router;