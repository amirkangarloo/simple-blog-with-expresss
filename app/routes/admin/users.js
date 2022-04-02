'use strict';

const express = require('express');
const router = express.Router();
const usersControllers = require('@controllers/admin/users');

router.get('/', usersControllers.index);
router.get('/create', usersControllers.create);
router.post('/store', usersControllers.store);
router.get('/delete/:userId', usersControllers.remove);
router.get('/edit/:userId', usersControllers.edit);
router.post('/update/:userId', usersControllers.update);

module.exports = router;