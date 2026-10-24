const express = require('express');
const router = express.Router();
const {
  getOverview,
  getClassComparison,
  getSubjectComparison
} = require('../controllers/analyticsController');

router.get('/overview', getOverview);
router.get('/class-comparison', getClassComparison);
router.get('/subject-comparison', getSubjectComparison);

module.exports = router;
