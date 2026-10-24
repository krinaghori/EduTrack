const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema(
  {
    doubtId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => 'DOUBT-' + Date.now().toString().slice(-4)
    },
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      trim: true
    },
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    parentName: {
      type: String,
      required: [true, 'Parent name is required'],
      trim: true
    },
    parentEmail: {
      type: String,
      required: [true, 'Parent email is required'],
      lowercase: true,
      trim: true
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true
    },
    category: {
      type: String,
      enum: ['Academic Doubt', 'Marks Clarification', 'Homework', 'Attendance', 'Other'],
      default: 'Academic Doubt'
    },
    question: {
      type: String,
      required: [true, 'Question or concern text is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Replied', 'Resolved'],
      default: 'Pending'
    },
    reply: {
      type: String,
      default: null
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    repliedAt: {
      type: Date
    },
    date: {
      type: String,
      default: () =>
        new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ' ' +
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  },
  {
    timestamps: true
  }
);

doubtSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.doubtId;
    return ret;
  }
});

module.exports = mongoose.model('Doubt', doubtSchema);
