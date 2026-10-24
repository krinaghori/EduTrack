const User = require('../models/User');
const Student = require('../models/Student');
const Doubt = require('../models/Doubt');
const Advice = require('../models/Advice');
const AuditLog = require('../models/AuditLog');
const { logAction } = require('../middleware/auditLogger');
const { runSeed } = require('../utils/seedData');

// @desc    Get admin dashboard metrics & summary
// @route   GET /api/v1/admin/dashboard
// @access  Authenticated (Admin)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalDoubts = await Doubt.countDocuments();
    const pendingDoubts = await Doubt.countDocuments({ status: 'Pending' });
    const totalAdvice = await Advice.countDocuments();
    const totalLogs = await AuditLog.countDocuments();

    // User breakdown by role
    const rolesCount = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const roleMap = {};
    rolesCount.forEach((r) => (roleMap[r._id] = r.count));

    // Recent activity logs
    const recentLogs = await AuditLog.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStudents,
        totalDoubts,
        pendingDoubts,
        totalAdvice,
        totalLogs,
        roleMap,
        recentLogs
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    List all registered users
// @route   GET /api/v1/admin/users
// @access  Authenticated (Admin)
exports.getUsers = async (req, res, next) => {
  try {
    const { role, search, page, limit } = req.query;
    const query = {};

    if (role && role !== 'All') {
      query.role = role;
    }

    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: regex }, { email: regex }];
    }

    let usersQuery = User.find(query).select('-password').sort({ createdAt: -1 });

    if (page && limit) {
      const p = parseInt(page, 10) || 1;
      const l = parseInt(limit, 10) || 20;
      usersQuery = usersQuery.skip((p - 1) * l).limit(l);
    }

    const users = await usersQuery;
    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Admin provision new user
// @route   POST /api/v1/admin/users
// @access  Authenticated (Admin)
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role, assignedClass, linkedStudentIds, isActive } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `An account with email '${email}' already exists.`
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || 'teacher',
      assignedClass: assignedClass || 'Class 4',
      linkedStudentIds: Array.isArray(linkedStudentIds) ? linkedStudentIds : [],
      isActive: isActive !== undefined ? isActive : true
    });

    await logAction(req, 'ADMIN_CREATED_USER', { targetEmail: user.email, role: user.role });

    res.status(201).json({
      success: true,
      message: `User '${user.name}' created with role '${user.role}'.`,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a user account
// @route   PUT /api/v1/admin/users/:id
// @access  Authenticated (Admin)
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role, assignedClass, linkedStudentIds, isActive, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User '${id}' not found.`
      });
    }

    if (name) user.name = name.trim();
    if (email) user.email = email.toLowerCase().trim();
    if (role) user.role = role;
    if (assignedClass !== undefined) user.assignedClass = assignedClass;
    if (linkedStudentIds !== undefined) user.linkedStudentIds = linkedStudentIds;
    if (isActive !== undefined) user.isActive = Boolean(isActive);
    if (password && password.length >= 4) user.password = password;

    await user.save();
    await logAction(req, 'ADMIN_UPDATED_USER', { targetEmail: user.email, role: user.role });

    res.status(200).json({
      success: true,
      message: `User '${user.name}' updated successfully.`,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a user account
// @route   DELETE /api/v1/admin/users/:id
// @access  Authenticated (Admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user && req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own administrative account.'
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User '${id}' not found.`
      });
    }

    await user.deleteOne();
    await logAction(req, 'ADMIN_DELETED_USER', { targetEmail: user.email });

    res.status(200).json({
      success: true,
      message: `User '${user.name}' deleted successfully.`
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get system audit logs
// @route   GET /api/v1/admin/audit-logs
// @access  Authenticated (Admin)
exports.getAuditLogs = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const p = parseInt(page, 10) || 1;
    const l = parseInt(limit, 10) || 30;

    const logs = await AuditLog.find().sort({ createdAt: -1 }).skip((p - 1) * l).limit(l);
    const total = await AuditLog.countDocuments();

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      data: logs
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Seed / reset initial database data
// @route   POST /api/v1/admin/seed
// @access  Authenticated (Admin) / Provisioning
exports.seedDatabase = async (req, res, next) => {
  try {
    const result = await runSeed();
    await logAction(req, 'DATABASE_SEEDED', result);

    res.status(200).json({
      success: true,
      message: 'Database seeded with default Gujarat school roster and user accounts.',
      data: result
    });
  } catch (err) {
    next(err);
  }
};
