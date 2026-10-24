const express = require('express');
const router = express.Router();
const { login, register, getMe, updatePassword, logout } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/login', authLimiter, login);
router.post('/register', register);
router.get('/me', verifyToken, getMe);
router.put('/update-password', verifyToken, updatePassword);
router.post('/logout', logout);

module.exports = router;
