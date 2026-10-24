const express = require('express');
const router = express.Router();
const { getThresholds, updateThresholds } = require('../controllers/settingsController');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/thresholds', getThresholds);
router.put('/thresholds', verifyToken, requireRole('teacher', 'admin'), updateThresholds);

module.exports = router;
