const mongoose = require('mongoose');

const thresholdSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'global_thresholds',
      unique: true
    },
    excellent: {
      type: Number,
      default: 75,
      min: 0,
      max: 100
    },
    average: {
      type: Number,
      default: 40,
      min: 0,
      max: 100
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ThresholdSetting', thresholdSettingSchema);
