'use strict';

const express = require('express');
const router = express.Router();
const postsControllers = require('@controllers/front/posts');

router.get('/', postsControllers.showArchivedPosts);
router.get('/:post_slug', postsControllers.showSinglePost);

module.exports = router;