import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (!token) return null;

    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
            <div className="mb-6 px-3">
                <h2 className="text-xl font-bold tracking-wider">GST APP</h2>
                {user?.role === 'admin' && (
                    <span className="text-xs bg-purple-600 px-2 py-0.5 rounded text-white inline-block mt-1">
                        ADMIN
                    </span>
                )}
            </div>

            <ul className="space-y-2 flex-grow">
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `block p-3 rounded transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/create-invoice"
                        className={({ isActive }) => `block p-3 rounded transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        Create Invoice
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/invoices"
                        className={({ isActive }) => `block p-3 rounded transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        Invoice List
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/gst-calculator"
                        className={({ isActive }) => `block p-3 rounded transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        GST Calculator
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/reports"
                        className={({ isActive }) => `block p-3 rounded transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        Reports
                    </NavLink>
                </li>

                {user && user.role === 'admin' && (
                    <li className="pt-4 mt-4 border-t border-gray-700">
                        <NavLink
                            to="/admin"
                            className={({ isActive }) => `block p-3 rounded transition-colors ${isActive ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
                        >
                            Admin Panel
                        </NavLink>
                    </li>
                )}
            </ul>
        </aside>
    );
};

export default Sidebar;
