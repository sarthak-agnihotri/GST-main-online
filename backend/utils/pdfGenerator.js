const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = (invoice, path) => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(path));

    // Header
    doc
        .fontSize(20)
        .text('Invoice', { align: 'center' })
        .moveDown();

    // Customer Details
    doc
        .fontSize(12)
        .text(`Customer Name: ${invoice.customerName}`)
        .text(`Date: ${new Date(invoice.date).toLocaleDateString()}`)
        .moveDown();

    // Items Header
    doc
        .text('Items:', { underline: true })
        .moveDown();

    // Items List
    invoice.items.forEach(item => {
        doc.text(
            `${item.name} - Qty: ${item.quantity} - Price: ${item.price} - GST: ${item.gstRate}%`
        );
    });

    doc.moveDown();

    // Total
    doc
        .fontSize(14)
        .text(`Total Amount: ${invoice.totalAmount}`, { align: 'right' });

    doc.end();
};

const generateReportPDF = (title, headers, data, stream) => {
    const doc = new PDFDocument();
    doc.pipe(stream);

    // Header
    doc
        .fontSize(20)
        .text(title, { align: 'center' })
        .moveDown();

    // Table Header
    let y = doc.y;
    doc.fontSize(12).font('Helvetica-Bold');
    headers.forEach((header, i) => {
        doc.text(header, 50 + i * 200, y);
    });

    doc.moveDown();
    doc.font('Helvetica');

    // Table Data
    data.forEach(row => {
        y = doc.y;
        Object.values(row).forEach((text, i) => {
            doc.text(text.toString(), 50 + i * 200, y);
        });
        doc.moveDown(0.5);
    });

    doc.end();
};

module.exports = { generatePDF, generateReportPDF };
