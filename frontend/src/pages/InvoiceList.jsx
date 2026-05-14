import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InvoiceCard from '../components/InvoiceCard';
import { getInvoices } from '../services/invoice';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const data = await getInvoices();
            setInvoices(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch invoices');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (invoiceId) => {
        setInvoices(invoices.filter(inv => inv._id !== invoiceId));
    };

    const filteredInvoices = invoices.filter(invoice =>
        invoice.customerName.toLowerCase().includes(filter.toLowerCase()) ||
        invoice._id.includes(filter)
    );

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-gray-500 dark:text-gray-400">Loading invoices...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">My Invoices</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Manage and track all your invoices</p>
                </div>
                <Link
                    to="/invoices/create"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center whitespace-nowrap"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create New Invoice
                </Link>
            </div>

            <div className="mb-6">
                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by customer name or invoice number..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white transition-all"
                    />
                    <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {invoices.length === 0 && !loading && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No invoices yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Get started by creating your first invoice</p>
                    <Link
                        to="/invoices/create"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Create Invoice
                    </Link>
                </div>
            )}

            {invoices.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredInvoices.length > 0 ? (
                        filteredInvoices.map(invoice => (
                            <InvoiceCard key={invoice._id} invoice={invoice} onDelete={handleDelete} />
                        ))
                    ) : (
                        <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400">No invoices found matching your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default InvoiceList;
