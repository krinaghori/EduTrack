const AuditLog = require('../models/AuditLog');

const logAction = async (req, action, details = {}) => {
  try {
    await AuditLog.create({
      userId: req.user ? req.user._id : null,
      userEmail: req.user ? req.user.email : req.body.email || 'anonymous',
      role: req.user ? req.user.role : 'guest',
      action,
      details,
      ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent']
    });
  } catch (err) {
    console.warn('⚠️ Failed to write audit log:', err.message);
  }
};

module.exports = { logAction };
