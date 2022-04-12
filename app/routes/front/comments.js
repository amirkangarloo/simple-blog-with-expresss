'use strict';

const express = require('express');
const router = express.Router();
const commentsControllers = require('@controllers/front/comments');

router.post('/:post_slug/comment', commentsControllers.store);

module.exports = router;