const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logAction } = require('../middleware/auditLogger');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'edutrack_jwt_secret_dev_key_change_in_production_2026', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// @desc    Authenticate user & get token
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email address and password.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User with this email does not exist.'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact an administrator.'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Incorrect password.'
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    await logAction(req, 'USER_LOGIN', { email: user.email, role: user.role });

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        assignedClass: user.assignedClass,
        linkedStudentIds: user.linkedStudentIds,
        lastLogin: user.lastLogin
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Register a new user account
// @route   POST /api/v1/auth/register
// @access  Public / Admin
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, assignedClass, linkedStudentIds } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    // Security: Prevent public users from self-assigning 'admin' role
    let assignedRole = role || 'teacher';
    if (assignedRole === 'admin') {
      if (!req.user || req.user.role !== 'admin') {
        assignedRole = 'teacher';
      }
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address is already registered.'
      });
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: assignedRole,
      assignedClass: assignedClass || 'Class 4',
      linkedStudentIds: Array.isArray(linkedStudentIds) ? linkedStudentIds : []
    });

    const token = generateToken(newUser._id);
    await logAction(req, 'USER_REGISTERED', { email: newUser.email, role: newUser.role });

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        assignedClass: newUser.assignedClass,
        linkedStudentIds: newUser.linkedStudentIds
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update password
// @route   PUT /api/v1/auth/update-password
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new passwords.'
      });
    }

    if (newPassword.length < 4) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 4 characters.'
      });
    }

    const user = await User.findById(req.user._id);
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password does not match.'
      });
    }

    user.password = newPassword;
    await user.save();

    await logAction(req, 'PASSWORD_UPDATED', { email: user.email });

    res.status(200).json({
      success: true,
      message: 'Password updated successfully.'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Log user out / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Public
exports.logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully.'
  });
};
