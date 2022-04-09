'use strict';

const express = require('express');
const router = express.Router();
const frontControllers = require('@controllers/front');

router.get('/', frontControllers.index);

module.exports = router;