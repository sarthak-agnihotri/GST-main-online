
const calculateGST = (req, res) => {
    const { amount, rate } = req.body;

    if (!amount || !rate) {
        return res.status(400).json({ message: 'Please provide amount and rate' });
    }

    const baseAmount = parseFloat(amount);
    const gstRate = parseFloat(rate);

    if (isNaN(baseAmount) || isNaN(gstRate)) {
        return res.status(400).json({ message: 'Invalid amount or rate' });
    }

    const gstAmount = (baseAmount * gstRate) / 100;
    const totalAmount = baseAmount + gstAmount;

    res.status(200).json({
        baseAmount,
        gstRate,
        gstAmount,
        totalAmount,
    });
};

module.exports = {
    calculateGST,
};
