const express = require('express');
const router = express.Router();
const { getAdvice, createAdvice, updateAdviceStatus, deleteAdvice } = require('../controllers/adviceController');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', getAdvice);
router.post('/', verifyToken, requireRole('coordinator', 'admin'), createAdvice);
router.put('/:id/status', verifyToken, requireRole('coordinator', 'principal', 'admin'), updateAdviceStatus);
router.delete('/:id', verifyToken, requireRole('coordinator', 'admin'), deleteAdvice);

module.exports = router;
