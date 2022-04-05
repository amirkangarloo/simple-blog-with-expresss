'use strict';

const express = require('express');
const router = express.Router();
const authControllers = require('@controllers/auth');

router.get('/login', authControllers.showLogin);
router.post('/login', authControllers.doLogin);
router.get('/register', authControllers.showRegister);
router.post('/register', authControllers.doRegister);

module.exports = router;