const Student = require('../models/Student');
const Doubt = require('../models/Doubt');
const Advice = require('../models/Advice');
const ThresholdSetting = require('../models/ThresholdSetting');

// @desc    Get macro school metrics & overview analytics
// @route   GET /api/v1/analytics/overview
// @access  Public / Authenticated
exports.getOverview = async (req, res, next) => {
  try {
    const { className } = req.query;
    const filter = {};
    if (className && className !== 'All') {
      filter.class = className;
    }

    const students = await Student.find(filter);
    const thresholds = (await ThresholdSetting.findOne({ key: 'global_thresholds' })) || {
      excellent: 75,
      average: 40
    };

    let totalSum = 0;
    let excellentCount = 0;
    let averageCount = 0;
    let supportCount = 0;

    students.forEach((s) => {
      const avg = s.overallAvg || 0;
      totalSum += avg;
      if (avg >= thresholds.excellent) {
        excellentCount++;
      } else if (avg >= thresholds.average) {
        averageCount++;
      } else {
        supportCount++;
      }
    });

    const totalStudents = students.length;
    const overallAverage = totalStudents > 0 ? Math.round((totalSum / totalStudents) * 10) / 10 : 74.2;

    const totalDoubts = await Doubt.countDocuments();
    const pendingDoubts = await Doubt.countDocuments({ status: 'Pending' });
    const totalAdvice = await Advice.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        overallAverage,
        excellentCount,
        averageCount,
        supportCount,
        totalDoubts,
        pendingDoubts,
        totalAdvice,
        thresholds: {
          excellent: thresholds.excellent,
          average: thresholds.average
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get comparison across Class 1 to 8
// @route   GET /api/v1/analytics/class-comparison
// @access  Public / Authenticated
exports.getClassComparison = async (req, res, next) => {
  try {
    const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'];
    const results = [];

    for (const c of classes) {
      const students = await Student.find({ class: c });
      if (students.length > 0) {
        const sum = students.reduce((acc, s) => acc + (s.overallAvg || 0), 0);
        results.push({
          class: c,
          studentCount: students.length,
          average: Math.round(sum / students.length)
        });
      } else {
        // Fallback baseline distribution
        const defaults = {
          'Class 1': 78,
          'Class 2': 74,
          'Class 3': 69,
          'Class 4': 72,
          'Class 5': 76,
          'Class 6': 71,
          'Class 7': 68,
          'Class 8': 75
        };
        results.push({
          class: c,
          studentCount: 0,
          average: defaults[c] || 70
        });
      }
    }

    res.status(200).json({
      success: true,
      data: results
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get comparison across 5 primary subjects
// @route   GET /api/v1/analytics/subject-comparison
// @access  Public / Authenticated
exports.getSubjectComparison = async (req, res, next) => {
  try {
    const { className } = req.query;
    const filter = {};
    if (className && className !== 'All') {
      filter.class = className;
    }

    const students = await Student.find(filter);
    const subjects = ['Mathematics', 'English', 'Gujarati', 'Hindi', 'EVS (Environmental Studies)'];

    const subjectScores = {
      Mathematics: { sum: 0, count: 0 },
      English: { sum: 0, count: 0 },
      Gujarati: { sum: 0, count: 0 },
      Hindi: { sum: 0, count: 0 },
      'EVS (Environmental Studies)': { sum: 0, count: 0 }
    };

    students.forEach((s) => {
      if (s.subjects) {
        subjects.forEach((subj) => {
          const item = s.subjects.get ? s.subjects.get(subj) : s.subjects[subj];
          if (item && typeof item.marks === 'number') {
            subjectScores[subj].sum += item.marks;
            subjectScores[subj].count++;
          }
        });
      }
    });

    const results = subjects.map((subj) => {
      const data = subjectScores[subj];
      const avg = data.count > 0 ? Math.round(data.sum / data.count) : 70;
      return {
        subject: subj,
        average: avg,
        evaluatedStudents: data.count
      };
    });

    res.status(200).json({
      success: true,
      data: results
    });
  } catch (err) {
    next(err);
  }
};
