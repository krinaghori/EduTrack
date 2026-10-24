const mongoose = require('mongoose');

const adviceSchema = new mongoose.Schema(
  {
    adviceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => 'ADV-' + Date.now().toString().slice(-4)
    },
    class: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true
    },
    coordinatorName: {
      type: String,
      default: 'Shri R.K. Mehta (BRC Coordinator)',
      trim: true
    },
    coordinatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    advice: {
      type: String,
      required: [true, 'Directive or advice content is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['Submitted', 'Reviewed', 'In Progress', 'Implemented'],
      default: 'Submitted'
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    }
  },
  {
    timestamps: true
  }
);

adviceSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.adviceId;
    return ret;
  }
});

module.exports = mongoose.model('Advice', adviceSchema);
