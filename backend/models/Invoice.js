const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            unique: true,
            sparse: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        customerName: {
            type: String,
            required: [true, 'Please add a customer name'],
            trim: true,
        },
        items: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                gstRate: { type: Number, required: true },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        gstAmount: {
            type: Number,
            // required: true, // Optional, can be calculated
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Generate invoice number before saving
invoiceSchema.pre('save', async function () {
    // Skip if not a new document or invoice number already exists
    if (!this.isNew || this.invoiceNumber) {
        return;
    }
    
    try {
        const Invoice = mongoose.model('Invoice');
        const year = new Date().getFullYear();
        const count = await Invoice.countDocuments({});
        this.invoiceNumber = `INV-${year}-${String(count + 1).padStart(5, '0')}`;
    } catch (error) {
        // Re-throw error to prevent save
        throw error;
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
