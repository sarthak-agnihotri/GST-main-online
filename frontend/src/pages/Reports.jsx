import React, { useState, useEffect } from 'react';
import ChartMonthlyGST from '../components/ChartMonthlyGST';
import { getMonthlyReport, getYearlyReport, exportReportPDF } from '../services/report';
import { utils, writeFile } from 'xlsx';

const Reports = () => {
    const [reportType, setReportType] = useState('monthly');
    const [data, setData] = useState([]); // Initialize as empty array for Chart component
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let reportData;
                if (reportType === 'monthly') {
                    reportData = await getMonthlyReport();
                } else {
                    reportData = await getYearlyReport();
                }
                setData(reportData);
            } catch (error) {
                console.error('Error fetching report:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [reportType]);

    const handleExportPDF = async () => {
        try {
            const blob = await exportReportPDF(reportType);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `gst-report-${reportType}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Failed to export PDF:', error);
            alert(`Failed to export PDF: ${error.message}`);
        }
    };

    const handleExportExcel = () => {
        if (!data || data.length === 0) {
            alert('No data to export!');
            return;
        }

        try {
            // Flatten data if needed or select specific fields
            // Assuming data is an array of objects suitable for export
            const worksheet = utils.json_to_sheet(data);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, "GST Report");
            
            // Generate Excel file
            writeFile(workbook, `GST_Report_${reportType}_${new Date().toISOString().split('T')[0]}.xlsx`);
        } catch (error) {
            console.error('Error exporting Excel:', error);
            alert('Failed to export Excel file');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">GST Reports</h2>

            <div className="flex flex-wrap gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded shadow-sm transition-colors">
                <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition-colors"
                >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
                <div className="ml-auto flex gap-2">
                    <button
                        onClick={handleExportPDF}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                    >
                        Export PDF
                    </button>
                    <button
                        onClick={handleExportExcel}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                    >
                        Export Excel
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md min-h-[400px] transition-colors">
                {loading ? (
                    <div className="flex justify-center items-center h-full text-gray-500 dark:text-gray-400">Loading Chart...</div>
                ) : (
                    <ChartMonthlyGST data={data} />
                )}
            </div>
        </div>
    );
};

export default Reports;
