'use strict';

const express = require('express');
const router = express.Router();
const notFoundControllers = require('@controllers/front/404');

router.get('/', notFoundControllers.showNotFoundPage);

module.exports = router;