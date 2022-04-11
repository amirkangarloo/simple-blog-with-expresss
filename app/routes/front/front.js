'use strict';

const express = require('express');
const router = express.Router();
const frontControllers = require('@controllers/front/home');

router.get('/', frontControllers.index);

module.exports = router;