import React from 'react';
import { Link } from 'react-router-dom';

const InvoiceManagementHelp = () => {
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
                                <span className="ml-4 text-sm font-medium text-gray-500">Invoice Management</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-2xl leading-6 font-bold text-gray-900 dark:text-white">
                            Invoice Management Guide
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                            Everything you need to know about creating, sending, and managing invoices.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
                        <div className="space-y-8">
                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Creating an Invoice</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    To create a new invoice, navigate to the <strong>Invoices</strong> section from the sidebar or dashboard. Click on the <strong>Create New Invoice</strong> button. Fill in the customer details, add line items with their respective HSN/SAC codes, quantities, and prices. The GST will be calculated automatically based on your settings.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Editing Invoices</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    You can edit an invoice as long as it has not been marked as 'Filled' or 'Paid'. Select the invoice from the list and click the <strong>Edit</strong> icon. Make your changes and save. Note that modifying a finalized invoice might affect your GST reports.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Sending Invoices</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Once an invoice is created, you can send it directly to your client via email using the <strong>Send Email</strong> button on the invoice details page. You can also download the invoice as a PDF to print or share manually.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceManagementHelp;
