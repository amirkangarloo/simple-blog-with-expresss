'use strict';

const express = require('express');
const router = express.Router();
const postsControllers = require('../../controllers/admin/posts');

router.get('/', postsControllers.index);

module.exports = router;