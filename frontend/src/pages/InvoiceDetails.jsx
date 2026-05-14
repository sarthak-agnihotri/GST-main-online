import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInvoiceById, deleteInvoice, exportInvoiceExcel } from '../services/invoice';

const InvoiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [exporting, setExporting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const data = await getInvoiceById(id);
                setInvoice(data);
            } catch (err) {
                setError('Failed to fetch invoice details');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
            return;
        }

        setDeleting(true);
        setError(''); // Clear previous errors
        try {
            const result = await deleteInvoice(id);
            console.log('Delete successful:', result);
            // Navigate after successful deletion
            navigate('/invoices');
        } catch (err) {
            console.error('Delete error:', err);
            setError(err.message || 'Failed to delete invoice. Please try again.');
            setDeleting(false);
        }
    };

    const handleExportExcel = async () => {
        setExporting(true);
        try {
            await exportInvoiceExcel(id);
        } catch (err) {
            setError(err.message || 'Failed to export invoice');
        } finally {
            setExporting(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">Loading details...</div>
        );
    }

    // Don't return early on error - show error banner instead
    // if (error) {
    //     return (
    //         <div className="p-8">
    //             <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded">
    //                 {error}
    //             </div>
    //         </div>
    //     );
    // }

    if (!invoice) {
        return (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">Invoice not found</div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-4 md:my-8 bg-white dark:bg-gray-800 p-6 md:p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 transition-colors">
            {/* Error Banner */}
            {error && (
                <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded flex items-center justify-between">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                    <button
                        onClick={() => setError('')}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start border-b dark:border-gray-700 pb-6 mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">INVOICE</h1>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">{invoice.invoiceNumber || `#${invoice._id.slice(-8)}`}</p>
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{invoice.customerName}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Date: {new Date(invoice.date || invoice.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto mb-8 rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs font-bold tracking-wider">
                            <th className="py-4 px-6 border-b dark:border-gray-600">Item Name</th>
                            <th className="py-4 px-6 border-b dark:border-gray-600 text-center">Qty</th>
                            <th className="py-4 px-6 border-b dark:border-gray-600 text-right">Unit Price</th>
                            <th className="py-4 px-6 border-b dark:border-gray-600 text-right">GST %</th>
                            <th className="py-4 px-6 border-b dark:border-gray-600 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => {
                            const itemTotal = item.quantity * item.price;
                            const gstAmount = (itemTotal * item.gstRate) / 100;
                            const finalTotal = itemTotal + gstAmount;
                            return (
                                <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">{item.name}</td>
                                    <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-400">{item.quantity}</td>
                                    <td className="py-4 px-6 text-right text-gray-600 dark:text-gray-400">₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td className="py-4 px-6 text-right text-gray-600 dark:text-gray-400">{item.gstRate}%</td>
                                    <td className="py-4 px-6 text-right font-semibold text-gray-800 dark:text-gray-200">₹{finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end pt-6">
                <div className="w-full md:w-96 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600 space-y-3">
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Subtotal:</span>
                        <span className="font-semibold">₹{(invoice.totalAmount - (invoice.gstAmount || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span className="font-medium">GST:</span>
                        <span className="font-semibold">₹{(invoice.gstAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 dark:text-white font-bold text-xl pt-3 border-t-2 border-gray-300 dark:border-gray-600">
                        <span>Grand Total:</span>
                        <span className="text-3xl text-blue-600 dark:text-blue-400">₹{invoice.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap justify-end gap-3 print:hidden">
                <button
                    onClick={() => navigate('/invoices')}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-sm hover:shadow"
                >
                    Back to List
                </button>
                <button
                    onClick={() => navigate(`/invoices/${id}/edit`)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-sm hover:shadow"
                >
                    Edit Invoice
                </button>
                <button
                    onClick={handleExportExcel}
                    disabled={exporting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    {exporting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Exporting...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export Excel
                        </>
                    )}
                </button>
                <button
                    onClick={() => window.print()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-sm hover:shadow"
                >
                    Print Invoice
                </button>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    {deleting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Deleting...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default InvoiceDetails;
