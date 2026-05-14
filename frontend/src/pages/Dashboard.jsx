import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChartMonthlyGST from '../components/ChartMonthlyGST';
import InvoiceCard from '../components/InvoiceCard';
import { getInvoices } from '../services/invoice';
import { getMonthlyReport } from '../services/report';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalGST: 0, totalInvoices: 0 });
    const [recentInvoices, setRecentInvoices] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch invoices and monthly report in parallel
                const [invoices, monthlyData] = await Promise.all([
                    getInvoices(),
                    getMonthlyReport()
                ]);

                setRecentInvoices(invoices.slice(0, 5)); // Get last 5
                setChartData(monthlyData);

                // Calculate simple stats
                const totalGST = invoices.reduce((acc, inv) => {
                    // Use stored gstAmount if available, otherwise calculate from items
                    const invoiceGST = inv.gstAmount || inv.items.reduce((sum, item) => {
                        return sum + ((item.quantity * item.price * item.gstRate) / 100);
                    }, 0);
                    return acc + invoiceGST;
                }, 0);
                setStats({
                    totalGST,
                    totalInvoices: invoices.length
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-gray-500 dark:text-gray-400">Loading Dashboard...</div>
                </div>
            </div>
        );
    }

    const totalRevenue = recentInvoices.reduce((acc, inv) => acc + inv.totalAmount, 0);

    return (
        <div className="p-4 md:p-6 relative">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 bg-pattern-financial pointer-events-none z-0" style={{ opacity: 0.08 }}></div>

            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                    <Link
                        to="/invoices/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center whitespace-nowrap"
                    >
                        <span className="mr-2">+</span> Create Invoice
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Total GST Collected</h3>
                                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">₹{stats.totalGST.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className="bg-blue-500 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl shadow-lg border border-green-200 dark:border-green-800 hover:shadow-xl transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Total Invoices</h3>
                                <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">{stats.totalInvoices}</p>
                            </div>
                            <div className="bg-green-500 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl shadow-lg border border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">Total Revenue</h3>
                                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-2">₹{totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className="bg-purple-500 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md mb-8 transition-colors">
                    <ChartMonthlyGST data={chartData} />
                </div>

                <div className="recent-invoices">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Invoices</h2>
                        {recentInvoices.length > 0 && (
                            <Link to="/invoices" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                                View All →
                            </Link>
                        )}
                    </div>
                    {recentInvoices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentInvoices.map(invoice => (
                                <InvoiceCard key={invoice._id} invoice={invoice} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center transition-colors">
                            <p className="text-gray-500 dark:text-gray-400 italic mb-4">No recent invoices found.</p>
                            <Link
                                to="/invoices/create"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                            >
                                Create Your First Invoice
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Dashboard;
