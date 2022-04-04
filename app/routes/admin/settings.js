'use strict';

const express = require('express');
const router = express.Router();
const settingsControllers = require('@controllers/admin/settings');

router.get('/', settingsControllers.index);
router.post('/', settingsControllers.store);

module.exports = router;