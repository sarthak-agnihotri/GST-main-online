import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser, getAllInvoices, deleteInvoice } from '../services/admin';
import { promoteToAdmin } from '../services/auth';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const [usersData, invoicesData] = await Promise.all([
                getAllUsers(),
                getAllInvoices()
            ]);
            setUsers(usersData);
            setInvoices(invoicesData);
        } catch (err) {
            setError(err.message || 'Failed to load admin data. ensure you have admin privileges.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                setUsers(users.filter(u => u._id !== id));
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const handleDeleteInvoice = async (id) => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            try {
                await deleteInvoice(id);
                setInvoices(invoices.filter(i => i._id !== id));
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const handlePromoteUser = async (id) => {
        if (window.confirm('Are you sure you want to promote this user to Admin?')) {
            try {
                await promoteToAdmin(id);
                // Update local state to reflect change without refetching
                setUsers(users.map(u => u._id === id ? { ...u, role: 'admin' } : u));
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading Admin Panel...</div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Admin Panel</h2>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Users ({users.length})</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded transition-colors">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="py-3 px-4 border-b dark:border-gray-600 text-left font-semibold text-gray-700 dark:text-gray-300">Name</th>
                                <th className="py-3 px-4 border-b dark:border-gray-600 text-left font-semibold text-gray-700 dark:text-gray-300">Email</th>
                                <th className="py-3 px-4 border-b dark:border-gray-600 text-left font-semibold text-gray-700 dark:text-gray-300">Role</th>
                                <th className="py-3 px-4 border-b dark:border-gray-600 text-left font-semibold text-gray-700 dark:text-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-0 transition-colors">
                                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{user.name}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                        <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 flex gap-2">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => handlePromoteUser(user._id)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                            >
                                                Promote
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">All Invoices ({invoices.length})</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded transition-colors">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="py-3 px-4 border-b dark:border-gray-600 text-left font-semibold text-gray-700 dark:text-gray-300">Invoice #</th>
                                <th className="py-3 px-4 border-b dark:border-gray-600 text-left font-semibold text-gray-700 dark:text-gray-300">Customer</th>
                                <th className="py-3 px-4 border-b dark:border-gray-600 text-left font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                                <th className="py-3 px-4 border-b dark:border-gray-600 text-left font-semibold text-gray-700 dark:text-gray-300">GST</th>
                                <th className="py-3 px-4 border-b dark:border-gray-600 text-left font-semibold text-gray-700 dark:text-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(invoice => (
                                <tr key={invoice._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-0 transition-colors">
                                    <td className="py-3 px-4 font-mono text-sm text-gray-500 dark:text-gray-400">{invoice.invoiceNumber || invoice._id.substring(0, 8)}</td>
                                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{invoice.customerName}</td>
                                    <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">₹{invoice.totalAmount.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">₹{(invoice.gstAmount || 0).toFixed(2)}</td>
                                    <td className="py-3 px-4 flex gap-2">
                                        <button
                                            onClick={() => navigate(`/invoices/${invoice._id}`)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDeleteInvoice(invoice._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
