const ThresholdSetting = require('../models/ThresholdSetting');
const { logAction } = require('../middleware/auditLogger');

// @desc    Get performance thresholds
// @route   GET /api/v1/settings/thresholds
// @access  Public / Authenticated
exports.getThresholds = async (req, res, next) => {
  try {
    let setting = await ThresholdSetting.findOne({ key: 'global_thresholds' });
    if (!setting) {
      setting = await ThresholdSetting.create({
        key: 'global_thresholds',
        excellent: 75,
        average: 40
      });
    }

    res.status(200).json({
      success: true,
      data: {
        excellent: setting.excellent,
        average: setting.average,
        updatedAt: setting.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update performance thresholds
// @route   PUT /api/v1/settings/thresholds
// @access  Authenticated (Teacher / Admin)
exports.updateThresholds = async (req, res, next) => {
  try {
    const { excellent, average } = req.body;

    if (excellent === undefined || average === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Both excellent and average threshold percentages are required.'
      });
    }

    const exc = Number(excellent);
    const avg = Number(average);

    if (exc <= avg || exc > 100 || avg < 0) {
      return res.status(400).json({
        success: false,
        message: 'Excellent threshold must be strictly greater than average threshold (between 0% and 100%).'
      });
    }

    const setting = await ThresholdSetting.findOneAndUpdate(
      { key: 'global_thresholds' },
      {
        excellent: exc,
        average: avg,
        updatedBy: req.user ? req.user._id : null
      },
      { upsert: true, new: true }
    );

    await logAction(req, 'THRESHOLDS_UPDATED', { excellent: exc, average: avg });

    res.status(200).json({
      success: true,
      message: 'Mastery thresholds updated successfully.',
      data: {
        excellent: setting.excellent,
        average: setting.average
      }
    });
  } catch (err) {
    next(err);
  }
};
