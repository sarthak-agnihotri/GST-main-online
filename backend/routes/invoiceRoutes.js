const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, invoiceController.getInvoices);
router.post('/', protect, invoiceController.createInvoice);
router.get('/:id/export-excel', protect, invoiceController.exportInvoiceExcel);
router.get('/:id', protect, invoiceController.getInvoiceById);
router.put('/:id', protect, invoiceController.updateInvoice);
router.delete('/:id', protect, invoiceController.deleteInvoice);

module.exports = router;
