const Invoice = require('../models/Invoice');


const getMonthlyReport = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        // Find invoices for the current user created in the current year
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

        const invoices = await Invoice.find({
            user: req.user.id,
            createdAt: { $gte: startOfYear, $lte: endOfYear }
        });

        // Initialize all 12 months with 0
        const allMonths = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const monthlyData = allMonths.reduce((acc, month) => {
            acc[month] = 0;
            return acc;
        }, {});

        // Aggregate data
        invoices.forEach(invoice => {
            const date = new Date(invoice.createdAt);
            const monthName = date.toLocaleString('default', { month: 'short' });

            // Use stored gstAmount if available, otherwise calculate from items
            const gstAmount = invoice.gstAmount || invoice.items.reduce((sum, item) => {
                return sum + (item.price * item.quantity * item.gstRate) / 100;
            }, 0);

            if (monthlyData[monthName] !== undefined) {
                monthlyData[monthName] += gstAmount;
            }
        });

        const chartData = allMonths.map(month => ({
            name: month,
            gst: monthlyData[month]
        }));

        res.status(200).json(chartData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getYearlyReport = async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.user.id });

        const yearlyData = invoices.reduce((acc, invoice) => {
            const year = new Date(invoice.createdAt).getFullYear();
            // Use stored gstAmount if available, otherwise calculate from items
            const gstAmount = invoice.gstAmount || invoice.items.reduce((sum, item) => {
                return sum + (item.price * item.quantity * item.gstRate) / 100;
            }, 0);

            if (!acc[year]) {
                acc[year] = 0;
            }
            acc[year] += gstAmount;
            return acc;
        }, {});

        const chartData = Object.keys(yearlyData).map(year => ({
            name: year.toString(),
            gst: yearlyData[year]
        }));

        res.status(200).json(chartData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const { generateReportPDF } = require('../utils/pdfGenerator');


const exportReportPDF = async (req, res) => {
    const { type } = req.query; // 'monthly' or 'yearly'

    try {
        const invoices = await Invoice.find({ user: req.user.id });
        let title = '';
        let headers = [];
        let data = [];

        if (type === 'monthly') {
            console.log('Generating Monthly Report...');
            title = 'Monthly GST Collection Report';
            headers = ['Month', 'GST Collected (Rs)'];

            const monthlyData = invoices.reduce((acc, invoice) => {
                const month = new Date(invoice.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
                // Use stored gstAmount if available, otherwise calculate from items
                const gstAmount = invoice.gstAmount || invoice.items.reduce((sum, item) => {
                    return sum + (item.price * item.quantity * item.gstRate) / 100;
                }, 0);

                if (!acc[month]) acc[month] = 0;
                acc[month] += gstAmount;
                return acc;
            }, {});

            data = Object.keys(monthlyData).map(month => ({
                month,
                gst: monthlyData[month].toFixed(2)
            }));

        } else {
            console.log('Generating Yearly Report...');
            title = 'Yearly GST Collection Report';
            headers = ['Year', 'GST Collected (Rs)'];

            const yearlyData = invoices.reduce((acc, invoice) => {
                const year = new Date(invoice.createdAt).getFullYear();
                // Use stored gstAmount if available, otherwise calculate from items
                const gstAmount = invoice.gstAmount || invoice.items.reduce((sum, item) => {
                    return sum + (item.price * item.quantity * item.gstRate) / 100;
                }, 0);

                if (!acc[year]) acc[year] = 0;
                acc[year] += gstAmount;
                return acc;
            }, {});

            data = Object.keys(yearlyData).map(year => ({
                year: year.toString(),
                gst: yearlyData[year].toFixed(2)
            }));
        }

        console.log(`Report Data: ${JSON.stringify(data)}`);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=report-${type}-${Date.now()}.pdf`);

        console.log('Calling generateReportPDF...');
        generateReportPDF(title, headers, data, res);
        console.log('PDF Generation initiated.');

    } catch (error) {
        console.error('Export PDF Error:', error); // Log error for debugging
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMonthlyReport,
    getYearlyReport,
    exportReportPDF
};
