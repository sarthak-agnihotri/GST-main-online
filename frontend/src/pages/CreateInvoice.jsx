import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInvoice } from '../services/invoice';

const CreateInvoice = () => {
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState('');
    const [items, setItems] = useState([{ name: '', quantity: 1, price: 0, gstRate: 18 }]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        if (field === 'quantity' || field === 'price' || field === 'gstRate') {
            newItems[index][field] = Number(value);
        } else {
            newItems[index][field] = value;
        }
        setItems(newItems);
    };

    const validateItems = () => {
        for (const item of items) {
            if (!item.name.trim()) {
                setError('All items must have a name');
                return false;
            }
            if (item.quantity <= 0) {
                setError('Item quantity must be greater than 0');
                return false;
            }
            if (item.price < 0) {
                setError('Item price cannot be negative');
                return false;
            }
        }
        return true;
    };

    const addItem = () => {
        setItems([...items, { name: '', quantity: 1, price: 0, gstRate: 18 }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => {
            const itemTotal = item.quantity * item.price;
            const gstAmount = (itemTotal * item.gstRate) / 100;
            return acc + itemTotal + gstAmount;
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        if (!customerName.trim()) {
            setError('Please enter a customer name');
            setLoading(false);
            return;
        }

        if (!validateItems()) {
            setLoading(false);
            return;
        }

        try {
            const invoiceData = {
                customerName: customerName.trim(),
                items: items.map(item => ({
                    ...item,
                    name: item.name.trim()
                })),
                totalAmount: calculateTotal()
            };
            await createInvoice(invoiceData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/invoices');
            }, 1000);
        } catch (err) {
            setError(err.message || 'Failed to create invoice');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-4 md:my-8 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg transition-colors border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Create New Invoice</h2>
                <p className="text-gray-500 dark:text-gray-400">Fill in the details below to create a new invoice</p>
            </div>
            {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-3 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-3 rounded mb-4">Invoice created successfully! Redirecting...</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Customer Name:</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white transition-colors"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Items</h3>
                    <div className="space-y-3">
                        {/* Items Header */}
                        {items.length > 0 && (
                            <div className="flex gap-4 items-center px-3 mb-2 font-medium text-gray-600 dark:text-gray-400 text-sm hidden md:flex">
                                <div className="flex-1">Item Name</div>
                                <div className="w-24">Qty</div>
                                <div className="w-32">Price</div>
                                <div className="w-24">GST</div>
                                <div className="w-8"></div> {/* Spacer for delete button */}
                            </div>
                        )}
                        
                        {items.map((item, index) => (
                            <div key={index} className="flex flex-wrap md:flex-nowrap gap-4 items-center bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600 transition-colors">
                                <div className="w-full md:flex-1">
                                    <label className="block md:hidden text-xs text-gray-500 mb-1">Item Name</label>
                                    <input
                                        placeholder="Item Name"
                                        value={item.name}
                                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white transition-colors"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div className="w-1/3 md:w-24">
                                    <label className="block md:hidden text-xs text-gray-500 mb-1">Qty</label>
                                    <input
                                        type="number"
                                        placeholder="Qty"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                                        min="1"
                                        step="1"
                                        className="w-full p-2 border rounded focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white transition-colors"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div className="w-1/3 md:w-32">
                                    <label className="block md:hidden text-xs text-gray-500 mb-1">Price</label>
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                                        min="0"
                                        step="0.01"
                                        className="w-full p-2 border rounded focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white transition-colors"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div className="w-1/3 md:w-24">
                                    <label className="block md:hidden text-xs text-gray-500 mb-1">GST</label>
                                    <select
                                        value={item.gstRate}
                                        onChange={(e) => handleItemChange(index, 'gstRate', Number(e.target.value))}
                                        className="w-full p-2 border rounded focus:outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white transition-colors"
                                        disabled={loading}
                                    >
                                        <option value="5">5%</option>
                                        <option value="12">12%</option>
                                        <option value="18">18%</option>
                                        <option value="28">28%</option>
                                    </select>
                                </div>
                                {items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 transition-colors md:ml-2 mt-4 md:mt-0"
                                        title="Remove Item"
                                        disabled={loading}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={addItem}
                        className="mt-3 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm flex items-center transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        + Add Another Item
                    </button>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 mt-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">Total Amount (inc. GST)</span>
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{calculateTotal().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/invoices')}
                        disabled={loading}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </span>
                        ) : (
                            'Create Invoice'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateInvoice;
