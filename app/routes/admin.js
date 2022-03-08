'use strict';

const express = require('express');
const router = express.Router();
const dashboardControllers = require('../controllers/admin/dashboard');

router.get('/dashboard', dashboardControllers.index);

module.exports = router;