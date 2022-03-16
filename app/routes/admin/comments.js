'use strict';

const express = require('express');
const router = express.Router();
const commentsControllers = require('@controllers/admin/comments');

router.get('/', commentsControllers.index);
router.get('/confirm/:commentId', commentsControllers.confirm);
router.get('/reject/:commentId', commentsControllers.reject);
router.get('/delete/:commentId', commentsControllers.delete);

module.exports = router;