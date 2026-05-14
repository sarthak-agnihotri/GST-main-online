const { generateReportPDF } = require('./utils/pdfGenerator');
const fs = require('fs');

console.log('Testing PDF Generation...');

try {
    const title = 'Test Report';
    const headers = ['Col 1', 'Col 2'];
    const data = [{ col1: 'Val 1', col2: 'Val 2' }];
    const stream = fs.createWriteStream('test_report.pdf');

    generateReportPDF(title, headers, data, stream);
    console.log('PDF Generation successful!');
} catch (error) {
    console.error('PDF Generation failed:', error);
}
