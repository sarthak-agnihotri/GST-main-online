import React, { useState } from 'react';

const GSTCalculator = () => {
    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState(18);
    const [result, setResult] = useState(null);

    const calculate = (e) => {
        e.preventDefault();
        const baseAmount = parseFloat(amount);
        const gstRate = parseFloat(rate);

        if (isNaN(baseAmount)) return;

        const gstAmount = (baseAmount * gstRate) / 100;
        const totalAmount = baseAmount + gstAmount;

        setResult({
            baseAmount,
            gstAmount,
            totalAmount
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg my-4 md:my-8 transition-colors border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">GST Calculator</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Calculate GST quickly and accurately</p>
            </div>
            <form onSubmit={calculate}>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Amount (₹):</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition-colors"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">GST Rate (%):</label>
                    <select
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition-colors"
                    >
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                    Calculate GST
                </button>
            </form>

            {result && (
                <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border-2 border-green-200 dark:border-green-800 transition-colors">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-3">Calculation Result</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">Base Amount:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">₹{result.baseAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">GST Amount ({rate}%):</span>
                            <span className="font-semibold text-gray-900 dark:text-white">₹{result.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-3 mt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">Total Amount:</span>
                                <span className="text-2xl font-bold text-green-600 dark:text-green-400">₹{result.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GSTCalculator;
