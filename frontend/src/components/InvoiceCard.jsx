import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteInvoice } from '../services/invoice';

const InvoiceCard = ({ invoice, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            try {
                await deleteInvoice(invoice._id);
                if (onDelete) {
                    onDelete(invoice._id);
                } else {
                    window.location.reload();
                }
            } catch (error) {
                console.error('Failed to delete invoice:', error);
                alert('Failed to delete invoice. Please try again.');
            }
        }
    };

    const invoiceDate = new Date(invoice.date || invoice.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 flex flex-col h-full group">
            <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {invoice.customerName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{invoiceDate}</p>
                </div>
                <span className="text-xs font-mono bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-md text-blue-600 dark:text-blue-400 font-semibold ml-2">
                    {invoice.invoiceNumber || `#${invoice._id.slice(-6)}`}
                </span>
            </div>
            <div className="mb-6 flex-grow">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Items</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{invoice.items.length}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Amount</span>
                    <span className="font-bold text-lg text-green-600 dark:text-green-400">₹{invoice.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>
            <div className="flex space-x-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                    onClick={() => navigate(`/invoices/${invoice._id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow"
                >
                    View
                </button>
                <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default InvoiceCard;
