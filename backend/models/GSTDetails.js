const mongoose = require('mongoose');

const gstDetailsSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },
        calculatedGST: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
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

module.exports = mongoose.model('GSTDetails', gstDetailsSchema);
