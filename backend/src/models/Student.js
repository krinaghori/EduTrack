const mongoose = require('mongoose');

const subjectItemSchema = new mongoose.Schema(
  {
    total: {
      type: Number,
      default: 100
    },
    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    topics: {
      type: Map,
      of: Number,
      default: {}
    }
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    rollNo: {
      type: String,
      required: [true, 'Roll number is required'],
      trim: true
    },
    class: {
      type: String,
      required: [true, 'Class is required'],
      trim: true,
      default: 'Class 4'
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      trim: true,
      default: 'A'
    },
    parentName: {
      type: String,
      trim: true,
      default: 'Parent / Guardian'
    },
    parentEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'parent@edutrack.edu'
    },
    attendance: {
      type: Number,
      default: 90,
      min: 0,
      max: 100
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
    },
    remarks: {
      type: String,
      default: 'Active classroom participation and steady progress.'
    },
    subjects: {
      type: Map,
      of: subjectItemSchema,
      default: {}
    },
    overallAvg: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Helper to calculate overall average
const calcAvg = function (doc) {
  if (doc && doc.subjects) {
    let sum = 0;
    let count = 0;
    const items = doc.subjects instanceof Map ? Array.from(doc.subjects.values()) : Object.values(doc.subjects);
    for (const subj of items) {
      if (subj && typeof subj.marks === 'number') {
        sum += subj.marks;
        count++;
      }
    }
    if (count > 0) {
      doc.overallAvg = Math.round(sum / count);
    }
  }
};

// Pre-save hook to calculate overallAvg across subjects
studentSchema.pre('save', function (next) {
  calcAvg(this);
  next();
});

studentSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update && update.$set) {
    calcAvg(update.$set);
  } else if (update) {
    calcAvg(update);
  }
  next();
});

// Virtual `id` getter mapped to studentId
studentSchema.virtual('id').get(function () {
  return this.studentId;
});

studentSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.studentId;
    return ret;
  }
});

module.exports = mongoose.model('Student', studentSchema);
