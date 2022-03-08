'use strict';

const express = require('express');
const router = express.Router();
const dashboardControllers = require('../../controllers/admin/dashboard');

router.get('/', dashboardControllers.index);

module.exports = router;