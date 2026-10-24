const Doubt = require('../models/Doubt');
const Student = require('../models/Student');
const { logAction } = require('../middleware/auditLogger');

// @desc    Get parent doubts & queries
// @route   GET /api/v1/doubts
// @access  Public / Authenticated
exports.getDoubts = async (req, res, next) => {
  try {
    const { studentId, parentEmail, status, subject } = req.query;
    const query = {};

    if (studentId) query.studentId = studentId;
    if (parentEmail) query.parentEmail = parentEmail.toLowerCase().trim();
    if (status) query.status = status;
    if (subject) query.subject = subject;

    // Parent restricted to their own email or linked students
    if (req.user && req.user.role === 'parent') {
      query.$or = [
        { parentEmail: req.user.email.toLowerCase() },
        { studentId: { $in: req.user.linkedStudentIds || [] } }
      ];
    }

    const doubts = await Doubt.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doubts.length,
      data: doubts
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Submit a new parent doubt
// @route   POST /api/v1/doubts
// @access  Public / Authenticated
exports.createDoubt = async (req, res, next) => {
  try {
    const { studentId, subject, category, question, parentName, parentEmail } = req.body;

    if (!studentId || !subject || !question) {
      return res.status(400).json({
        success: false,
        message: 'Student, subject, and question text are required.'
      });
    }

    // Look up student details
    const student = await Student.findOne({ studentId });
    const sName = student ? student.name : 'Student';
    const pName = parentName || (student ? student.parentName : (req.user ? req.user.name : 'Parent'));
    const pEmail = parentEmail || (student ? student.parentEmail : (req.user ? req.user.email : 'parent@edutrack.edu'));

    const newDoubt = await Doubt.create({
      studentId,
      studentName: sName,
      parentName: pName,
      parentEmail: pEmail.toLowerCase().trim(),
      subject,
      category: category || 'Academic Doubt',
      question: question.trim()
    });

    await logAction(req, 'DOUBT_SUBMITTED', { doubtId: newDoubt.doubtId, studentId });

    res.status(201).json({
      success: true,
      message: 'Your question was successfully recorded and submitted to school review.',
      data: newDoubt
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Reply to a parent doubt
// @route   PUT /api/v1/doubts/:id/reply
// @access  Authenticated (Teacher / Admin)
exports.replyToDoubt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Reply text cannot be empty.'
      });
    }

    let doubt = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      doubt = await Doubt.findById(id);
    }
    if (!doubt) {
      doubt = await Doubt.findOne({ doubtId: id });
    }

    if (!doubt) {
      return res.status(404).json({
        success: false,
        message: `Doubt query '${id}' not found.`
      });
    }

    doubt.reply = reply.trim();
    doubt.status = 'Replied';
    doubt.repliedAt = new Date();
    doubt.repliedBy = req.user ? req.user._id : null;

    await doubt.save();
    await logAction(req, 'DOUBT_REPLIED', { doubtId: doubt.doubtId, studentId: doubt.studentId });

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully.',
      data: doubt
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update doubt status (Pending, Replied, Resolved)
// @route   PUT /api/v1/doubts/:id/status
// @access  Authenticated (Teacher / Admin)
exports.updateDoubtStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Replied', 'Resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    let doubt = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      doubt = await Doubt.findById(id);
    }
    if (!doubt) {
      doubt = await Doubt.findOne({ doubtId: id });
    }

    if (!doubt) {
      return res.status(404).json({
        success: false,
        message: `Doubt query '${id}' not found.`
      });
    }

    doubt.status = status;
    await doubt.save();

    res.status(200).json({
      success: true,
      message: `Doubt status updated to '${status}'.`,
      data: doubt
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a doubt query
// @route   DELETE /api/v1/doubts/:id
// @access  Authenticated (Admin)
exports.deleteDoubt = async (req, res, next) => {
  try {
    const { id } = req.params;

    let doubt = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      doubt = await Doubt.findById(id);
    }
    if (!doubt) {
      doubt = await Doubt.findOne({ doubtId: id });
    }

    if (!doubt) {
      return res.status(404).json({
        success: false,
        message: `Doubt query '${id}' not found.`
      });
    }

    await doubt.deleteOne();
    await logAction(req, 'DOUBT_DELETED', { doubtId: doubt.doubtId });

    res.status(200).json({
      success: true,
      message: `Doubt '${doubt.doubtId}' deleted.`
    });
  } catch (err) {
    next(err);
  }
};
