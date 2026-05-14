const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/users', protect, admin, adminController.getAllUsers);
router.delete('/users/:id', protect, admin, adminController.deleteUser);
router.get('/invoices', protect, admin, adminController.getAllInvoices);
router.delete('/invoices/:id', protect, admin, adminController.deleteInvoice);

module.exports = router;
