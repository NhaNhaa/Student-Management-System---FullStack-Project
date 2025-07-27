const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Login
router.post('/login', authController.login);

// Register (for admin use)
router.post('/register', authController.register);

module.exports = router;