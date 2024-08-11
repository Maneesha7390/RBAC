const express = require('express');
const userController = require('./userController');
const authMiddleware = require('../../middlewares/authMiddleware');
const userExists = require('./userController').userExists
const router = express.Router();

router.post('/register', userExists, userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
