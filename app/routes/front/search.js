'use strict';

const express = require('express');
const router = express.Router();
const searchControllers = require('@controllers/front/search');

router.get('/', searchControllers.index);

module.exports = router;