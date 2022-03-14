'use strict';

const express = require('express');
const router = express.Router();
const commentsControllers = require('@controllers/admin/comments');

router.get('/', commentsControllers.index);

module.exports = router;