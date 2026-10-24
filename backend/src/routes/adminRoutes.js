const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getAuditLogs,
  seedDatabase
} = require('../controllers/adminController');
const { verifyToken, requireRole } = require('../middleware/auth');

// All admin routes strictly require 'admin' role
router.use(verifyToken, requireRole('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/audit-logs', getAuditLogs);
router.post('/seed', seedDatabase);

module.exports = router;
