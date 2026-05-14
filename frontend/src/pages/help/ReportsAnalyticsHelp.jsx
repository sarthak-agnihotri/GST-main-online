import React from 'react';
import { Link } from 'react-router-dom';

const ReportsAnalyticsHelp = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <div>
                                <Link to="/help-center" className="text-gray-400 hover:text-gray-500">
                                    <svg className="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    <span className="sr-only">Home</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                                <span className="ml-4 text-sm font-medium text-gray-500">Reports & Analytics</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-2xl leading-6 font-bold text-gray-900 dark:text-white">
                            Reports & Analytics
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                            Generating insights and summaries for your business.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
                        <div className="space-y-8">
                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Available Reports</h4>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li><strong>Sales Report:</strong> Detailed list of all invoices issued within a selected date range.</li>
                                    <li><strong>Purchase Report:</strong> Summary of all expenses and purchases recorded.</li>
                                    <li><strong>Tax Liability Report:</strong> Shows total CGST, SGST, and IGST collected and paid.</li>
                                    <li><strong>Product Sales Report:</strong> Performance analysis of individual products or services.</li>
                                </ul>
                            </section>

                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Exporting Data</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    All reports can be exported to <strong>Excel</strong> or <strong>PDF</strong> formats. Look for the 'Export' button on the top right corner of the report view. This is useful for sharing data with your accountant or for offline archiving.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Dashboard Analytics</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    The main dashboard provides a real-time snapshot of your business health. It includes charts for monthly revenue, top-selling items, and outstanding payments. You can customize the date range for these widgets to view weekly, monthly, or yearly trends.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalyticsHelp;
