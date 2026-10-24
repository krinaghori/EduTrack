const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  bulkImportStudents
} = require('../controllers/studentController');
const { verifyToken, requireRole, optionalAuth } = require('../middleware/auth');

router.get('/', optionalAuth, getStudents);
router.get('/:id', optionalAuth, getStudentById);
router.post('/', verifyToken, requireRole('teacher', 'admin'), createStudent);
router.put('/:id', verifyToken, requireRole('teacher', 'admin'), updateStudent);
router.delete('/:id', verifyToken, requireRole('teacher', 'admin'), deleteStudent);
router.post('/bulk', verifyToken, requireRole('teacher', 'admin'), bulkImportStudents);

module.exports = router;
