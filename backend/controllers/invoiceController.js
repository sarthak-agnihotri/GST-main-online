const Invoice = require('../models/Invoice');


const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select('-__v');
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createInvoice = async (req, res) => {
    const { customerName, items, totalAmount } = req.body;

    if (!customerName || !items || !totalAmount) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Invoice must have at least one item' });
    }

    // Validate each item
    for (const item of items) {
        if (!item.name || !item.quantity || !item.price || item.gstRate === undefined) {
            return res.status(400).json({ message: 'Each item must have name, quantity, price, and gstRate' });
        }
        if (item.quantity <= 0 || item.price < 0) {
            return res.status(400).json({ message: 'Quantity must be positive and price must be non-negative' });
        }
        if (![5, 12, 18, 28].includes(item.gstRate)) {
            return res.status(400).json({ message: 'GST rate must be 5, 12, 18, or 28' });
        }
    }

    // Calculate total GST amount and verify total
    const calculatedGstAmount = items.reduce((acc, item) => {
        const itemTotal = item.quantity * item.price;
        const itemGst = (itemTotal * item.gstRate) / 100;
        return acc + itemGst;
    }, 0);

    const calculatedTotal = items.reduce((acc, item) => {
        const itemTotal = item.quantity * item.price;
        const itemGst = (itemTotal * item.gstRate) / 100;
        return acc + itemTotal + itemGst;
    }, 0);

    // Use calculated total to ensure accuracy
    const finalTotal = calculatedTotal;

    try {
        const invoice = await Invoice.create({
            user: req.user.id,
            customerName: customerName.trim(),
            items,
            totalAmount: finalTotal,
            gstAmount: calculatedGstAmount
        });
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvoiceById = async (req, res) => {
    try {
        // Validate ObjectId format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid invoice ID format' });
        }

        const invoice = await Invoice.findById(req.params.id).populate('user', 'name email');

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Check for user (invoice.user can be ObjectId or populated object)
        const userId = invoice.user._id ? invoice.user._id.toString() : invoice.user.toString();
        if (userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        // Validate ObjectId format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid invoice ID format' });
        }

        const invoice = await Invoice.findById(req.params.id);

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Check for user authorization (handle both ObjectId and populated user)
        let userId;
        if (invoice.user._id) {
            userId = invoice.user._id.toString();
        } else if (invoice.user.toString) {
            userId = invoice.user.toString();
        } else {
            userId = String(invoice.user);
        }

        if (userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'User not authorized to delete this invoice' });
        }

        // Use findByIdAndDelete instead of remove (which is deprecated)
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);

        if (!deletedInvoice) {
            return res.status(404).json({ message: 'Invoice not found or already deleted' });
        }

        console.log('Invoice deleted successfully:', req.params.id);
        res.status(200).json({
            id: req.params.id,
            message: 'Invoice deleted successfully',
            success: true
        });
    } catch (error) {
        console.error('Delete invoice error:', error);
        res.status(500).json({
            message: error.message || 'Internal server error while deleting invoice',
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};


const updateInvoice = async (req, res) => {
    try {
        // Validate ObjectId format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid invoice ID format' });
        }

        const invoice = await Invoice.findById(req.params.id);

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Check for user authorization
        if (invoice.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { customerName, items, totalAmount } = req.body;

        // Validate items if provided
        if (items) {
            if (!Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: 'Invoice must have at least one item' });
            }

            for (const item of items) {
                if (!item.name || !item.quantity || !item.price || item.gstRate === undefined) {
                    return res.status(400).json({ message: 'Each item must have name, quantity, price, and gstRate' });
                }
                if (item.quantity <= 0 || item.price < 0) {
                    return res.status(400).json({ message: 'Quantity must be positive and price must be non-negative' });
                }
                if (![5, 12, 18, 28].includes(item.gstRate)) {
                    return res.status(400).json({ message: 'GST rate must be 5, 12, 18, or 28' });
                }
            }

            // Recalculate GST and total if items are updated
            const calculatedGstAmount = items.reduce((acc, item) => {
                const itemTotal = item.quantity * item.price;
                const itemGst = (itemTotal * item.gstRate) / 100;
                return acc + itemGst;
            }, 0);

            const calculatedTotal = items.reduce((acc, item) => {
                const itemTotal = item.quantity * item.price;
                const itemGst = (itemTotal * item.gstRate) / 100;
                return acc + itemTotal + itemGst;
            }, 0);

            invoice.items = items;
            invoice.gstAmount = calculatedGstAmount;
            invoice.totalAmount = calculatedTotal;
        }

        if (customerName) {
            invoice.customerName = customerName.trim();
        }

        const updatedInvoice = await invoice.save();
        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const exportInvoiceExcel = async (req, res) => {
    try {
        // Validate ObjectId format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid invoice ID format' });
        }

        const invoice = await Invoice.findById(req.params.id);

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Check for user authorization
        const userId = invoice.user._id ? invoice.user._id.toString() : invoice.user.toString();
        if (userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { exportInvoiceToExcel } = require('../utils/excelExport');
        const buffer = exportInvoiceToExcel(invoice);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber || invoice._id}-${Date.now()}.xlsx`);

        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getInvoices,
    createInvoice,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    exportInvoiceExcel,
};
