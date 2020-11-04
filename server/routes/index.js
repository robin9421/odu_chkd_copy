var express = require('express');
var router = express.Router();
var authentication = require('./authentication');
var user = require('./user');
var surgeryTypes = require('./surgeryTypes');

router.use('/auth', authentication);
router.use('/user', user);
router.use('/surgeryTypes', surgeryTypes);

module.exports = router;