const express = require('express');
const router = express.Router();
const gstController = require('../controllers/gstController');

// GST calculator is public - no auth required
router.post('/calculate', gstController.calculateGST);

module.exports = router;
