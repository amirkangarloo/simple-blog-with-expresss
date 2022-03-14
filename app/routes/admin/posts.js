'use strict';

const express = require('express');
const router = express.Router();
const postsControllers = require('@controllers/admin/posts');

router.get('/', postsControllers.index);
router.get('/create', postsControllers.create);
router.post('/store', postsControllers.store);
router.get('/delete/:postId', postsControllers.remove);
router.get('/edit/:postId', postsControllers.edit);
router.post('/update/:postId', postsControllers.update);

module.exports = router;