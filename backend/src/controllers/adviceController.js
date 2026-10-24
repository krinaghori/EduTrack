const Advice = require('../models/Advice');
const { logAction } = require('../middleware/auditLogger');

// @desc    Get coordinator directives / advice
// @route   GET /api/v1/advice
// @access  Public / Authenticated
exports.getAdvice = async (req, res, next) => {
  try {
    const { className, class: cClass } = req.query;
    const query = {};

    const targetClass = className || cClass;
    if (targetClass && targetClass !== 'All') {
      query.class = targetClass;
    }

    const adviceList = await Advice.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: adviceList.length,
      data: adviceList
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new pedagogical directive
// @route   POST /api/v1/advice
// @access  Authenticated (Coordinator / Admin)
exports.createAdvice = async (req, res, next) => {
  try {
    const { className, class: cClass, advice, coordinatorName } = req.body;
    const targetClass = className || cClass;

    if (!targetClass || !advice) {
      return res.status(400).json({
        success: false,
        message: 'Class and directive advice text are required.'
      });
    }

    const newAdvice = await Advice.create({
      class: targetClass,
      advice: advice.trim(),
      coordinatorName: coordinatorName || (req.user ? req.user.name : 'Shri R.K. Mehta (BRC Coordinator)'),
      coordinatorId: req.user ? req.user._id : null
    });

    await logAction(req, 'ADVICE_CREATED', { adviceId: newAdvice.adviceId, class: newAdvice.class });

    res.status(201).json({
      success: true,
      message: `Directive successfully issued for ${newAdvice.class}.`,
      data: newAdvice
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update advice status
// @route   PUT /api/v1/advice/:id/status
// @access  Authenticated (Coordinator / Principal / Admin)
exports.updateAdviceStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Submitted', 'Reviewed', 'In Progress', 'Implemented'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    let item = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      item = await Advice.findById(id);
    }
    if (!item) {
      item = await Advice.findOne({ adviceId: id });
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Advice record '${id}' not found.`
      });
    }

    item.status = status;
    await item.save();

    await logAction(req, 'ADVICE_STATUS_UPDATED', { adviceId: item.adviceId, status });

    res.status(200).json({
      success: true,
      message: `Advice status updated to '${status}'.`,
      data: item
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete advice
// @route   DELETE /api/v1/advice/:id
// @access  Authenticated (Coordinator / Admin)
exports.deleteAdvice = async (req, res, next) => {
  try {
    const { id } = req.params;

    let item = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      item = await Advice.findById(id);
    }
    if (!item) {
      item = await Advice.findOne({ adviceId: id });
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Advice record '${id}' not found.`
      });
    }

    await item.deleteOne();
    await logAction(req, 'ADVICE_DELETED', { adviceId: item.adviceId });

    res.status(200).json({
      success: true,
      message: `Directive '${item.adviceId}' deleted.`
    });
  } catch (err) {
    next(err);
  }
};
