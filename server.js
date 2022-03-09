'use strict';

require('dotenv').config();
require('module-alias/register');
const startApplication = require('./app/index');

startApplication();