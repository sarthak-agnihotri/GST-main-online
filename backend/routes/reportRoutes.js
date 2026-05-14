const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

router.get('/monthly', protect, reportController.getMonthlyReport);
router.get('/yearly', protect, reportController.getYearlyReport);
router.get('/export-pdf', protect, reportController.exportReportPDF);

module.exports = router;
