import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const token = localStorage.getItem('token');

    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!token) return null;

    return (
        <nav className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                            GST Software
                        </Link>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-1 items-center">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/invoices">Invoices</NavLink>
                        <NavLink to="/gst-calculator">Calculator</NavLink>
                        <NavLink to="/reports">Reports</NavLink>
                        <NavLink to="/help-center">Help Center</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                        {user?.role === 'admin' && (
                            <NavLink to="/admin" className="text-purple-600 dark:text-purple-400 font-medium">Admin</NavLink>
                        )}

                        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                                title="Toggle Theme"
                            >
                                {theme === 'dark' ? '🌞' : '🌙'}
                            </button>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                    >
                        <span className="sr-only">Open menu</span>
                        {mobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 space-y-1">
                        <MobileLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</MobileLink>
                        <MobileLink to="/invoices" onClick={() => setMobileMenuOpen(false)}>Invoices</MobileLink>
                        <MobileLink to="/gst-calculator" onClick={() => setMobileMenuOpen(false)}>Calculator</MobileLink>
                        <MobileLink to="/reports" onClick={() => setMobileMenuOpen(false)}>Reports</MobileLink>
                        <MobileLink to="/help-center" onClick={() => setMobileMenuOpen(false)}>Help Center</MobileLink>
                        <MobileLink to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</MobileLink>
                        {user?.role === 'admin' && (
                            <MobileLink to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-purple-600 dark:text-purple-400">Admin Panel</MobileLink>
                        )}
                        <div className="pt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 mt-2">
                             <button
                                onClick={toggleTheme}
                                className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300"
                            >
                                <span className="mr-2">{theme === 'dark' ? '🌞' : '🌙'}</span> Theme
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium mr-4"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

// Helper components for consistency
const NavLink = ({ to, children, className = "" }) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all";
    return (
        <Link to={to} className={`${baseClasses} ${className}`}>
            {children}
        </Link>
    );
};

const MobileLink = ({ to, onClick, children, className = "" }) => (
    <Link 
        to={to} 
        onClick={onClick}
        className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 ${className}`}
    >
        {children}
    </Link>
);

export default Navbar;
