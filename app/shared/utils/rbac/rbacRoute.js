const express = require('express');
const rbacController = require('./rbacController');
const checkExistance = require('./rbacController').checkExistance
const router = express.Router();

router.post('/', checkExistance, rbacController.createPermission);

module.exports = router;
