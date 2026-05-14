const xlsx = require('xlsx');

const exportExcel = (data, path) => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
    xlsx.writeFile(workbook, path);
};

// Export invoice to Excel buffer for web download
const exportInvoiceToExcel = (invoice) => {
    const workbook = xlsx.utils.book_new();

    // Invoice Summary Sheet
    const summaryData = [
        ['Invoice Number', invoice.invoiceNumber || `#${invoice._id}`],
        ['Customer Name', invoice.customerName],
        ['Date', new Date(invoice.date || invoice.createdAt).toLocaleDateString('en-IN')],
        ['Subtotal', `₹${(invoice.totalAmount - (invoice.gstAmount || 0)).toFixed(2)}`],
        ['GST Amount', `₹${(invoice.gstAmount || 0).toFixed(2)}`],
        ['Total Amount', `₹${invoice.totalAmount.toFixed(2)}`],
    ];
    const summarySheet = xlsx.utils.aoa_to_sheet(summaryData);
    xlsx.utils.book_append_sheet(workbook, summarySheet, 'Invoice Summary');

    // Items Sheet
    const itemsData = invoice.items.map((item, index) => {
        const itemTotal = item.quantity * item.price;
        const gstAmount = (itemTotal * item.gstRate) / 100;
        const finalTotal = itemTotal + gstAmount;
        return {
            'S.No': index + 1,
            'Item Name': item.name,
            'Quantity': item.quantity,
            'Unit Price': item.price,
            'GST Rate (%)': item.gstRate,
            'Item Total': itemTotal,
            'GST Amount': gstAmount,
            'Total (inc. GST)': finalTotal,
        };
    });
    const itemsSheet = xlsx.utils.json_to_sheet(itemsData);
    xlsx.utils.book_append_sheet(workbook, itemsSheet, 'Invoice Items');

    // Generate buffer
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    return buffer;
};

module.exports = { exportExcel, exportInvoiceToExcel };
