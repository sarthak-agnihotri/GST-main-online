import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, enableAdmin } from '../services/auth';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        businessName: '',
        businessType: '',
        industry: '',
        businessAddress: { street: '', city: '', state: '', pinCode: '' },
        phone: '',
        alternateEmail: '',
        panNumber: '',
        registrationDate: '',
        gstin: '',
        gstRegistrationDate: '',
        stateOfRegistration: '',
        businessConstitution: '',
        hsnCodes: [],
        filingFrequency: '',
        preferences: {
            theme: 'system',
            language: 'en',
            dateFormat: 'DD/MM/YYYY',
            currency: 'INR',
            emailNotifications: true
        }
    });
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [initialChar, setInitialChar] = useState('');
    const [hsnInput, setHsnInput] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    // Auto-dismiss messages after 10 seconds
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 10000); // 10 seconds

            return () => clearTimeout(timer);
        }
    }, [message]);

    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            setUser({
                ...user,
                ...data,
                businessAddress: data.businessAddress || { street: '', city: '', state: '', pinCode: '' },
                preferences: data.preferences || user.preferences,
                hsnCodes: data.hsnCodes || []
            });
            setInitialChar(data.name.charAt(0).toUpperCase());
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to load profile' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            const updatedData = { ...user };
            if (password) updatedData.password = password;

            const data = await updateProfile(updatedData);
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                localStorage.setItem('user', JSON.stringify({ ...storedUser, ...data }));
            }

            setUser({ ...user, ...data });
            setMessage({ type: 'success', text: 'Profile updated successfully' });
            setPassword('');
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
        }
    };

    const handleMakeAdmin = async () => {
        try {
            const data = await enableAdmin();
            setUser({ ...user, role: data.role });

            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                localStorage.setItem('user', JSON.stringify({ ...storedUser, role: data.role }));
            }

            setMessage({ type: 'success', text: 'You are now an Admin! Refresh the page to see Admin options.' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Failed to enable admin access' });
        }
    };

    const addHsnCode = () => {
        if (hsnInput.trim() && !user.hsnCodes.includes(hsnInput.trim())) {
            setUser({ ...user, hsnCodes: [...user.hsnCodes, hsnInput.trim()] });
            setHsnInput('');
        }
    };

    const removeHsnCode = (code) => {
        setUser({ ...user, hsnCodes: user.hsnCodes.filter(c => c !== code) });
    };

    if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading profile...</div>;

    const tabs = [
        { id: 'overview', name: 'Overview', icon: '👤' },
        { id: 'business', name: 'Business Info', icon: '🏢' },
        { id: 'gst', name: 'GST Details', icon: '📋' },
        { id: 'security', name: 'Security', icon: '🔒' },
        { id: 'preferences', name: 'Preferences', icon: '⚙️' }
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Account Settings</h1>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
                <div className="flex overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 min-w-max px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            {message.text && (
                <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleUpdate}>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mx-auto mb-4 shadow-lg">
                                        {initialChar}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{user.name}</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{user.email}</p>
                                    <div className={`inline-block text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide ${user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'}`}>
                                        {user.role}
                                    </div>
                                </div>

                                {user.role !== 'admin' && (
                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-center">Developer Mode</p>
                                        <button
                                            type="button"
                                            onClick={handleMakeAdmin}
                                            className="w-full text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-colors"
                                        >
                                            Enable Admin Access
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={user.name}
                                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={user.email}
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={user.phone || ''}
                                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alternate Email</label>
                                        <input
                                            type="email"
                                            value={user.alternateEmail || ''}
                                            onChange={(e) => setUser({ ...user, alternateEmail: e.target.value })}
                                            placeholder="alternate@example.com"
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Business Info Tab */}
                {activeTab === 'business' && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Business Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Name</label>
                                <input
                                    type="text"
                                    value={user.businessName || ''}
                                    onChange={(e) => setUser({ ...user, businessName: e.target.value })}
                                    placeholder="ABC Company Pvt Ltd"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Type</label>
                                <select
                                    value={user.businessType || ''}
                                    onChange={(e) => setUser({ ...user, businessType: e.target.value })}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Proprietorship">Proprietorship</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="LLP">LLP</option>
                                    <option value="Private Limited">Private Limited</option>
                                    <option value="Public Limited">Public Limited</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Industry/Sector</label>
                                <input
                                    type="text"
                                    value={user.industry || ''}
                                    onChange={(e) => setUser({ ...user, industry: e.target.value })}
                                    placeholder="Software Services, Manufacturing, etc."
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PAN Number</label>
                                <input
                                    type="text"
                                    value={user.panNumber || ''}
                                    onChange={(e) => setUser({ ...user, panNumber: e.target.value.toUpperCase() })}
                                    placeholder="ABCDE1234F"
                                    maxLength="10"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white uppercase"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
                                <input
                                    type="text"
                                    value={user.businessAddress?.street || ''}
                                    onChange={(e) => setUser({ ...user, businessAddress: { ...user.businessAddress, street: e.target.value } })}
                                    placeholder="123 Main Street"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                                <input
                                    type="text"
                                    value={user.businessAddress?.city || ''}
                                    onChange={(e) => setUser({ ...user, businessAddress: { ...user.businessAddress, city: e.target.value } })}
                                    placeholder="Mumbai"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                                <input
                                    type="text"
                                    value={user.businessAddress?.state || ''}
                                    onChange={(e) => setUser({ ...user, businessAddress: { ...user.businessAddress, state: e.target.value } })}
                                    placeholder="Maharashtra"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PIN Code</label>
                                <input
                                    type="text"
                                    value={user.businessAddress?.pinCode || ''}
                                    onChange={(e) => setUser({ ...user, businessAddress: { ...user.businessAddress, pinCode: e.target.value } })}
                                    placeholder="400001"
                                    maxLength="6"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Registration Date</label>
                                <input
                                    type="date"
                                    value={user.registrationDate ? new Date(user.registrationDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setUser({ ...user, registrationDate: e.target.value })}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
                            >
                                Save Business Information
                            </button>
                        </div>
                    </div>
                )}

                {/* GST Details Tab */}
                {activeTab === 'gst' && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">GST Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GSTIN</label>
                                <input
                                    type="text"
                                    value={user.gstin || ''}
                                    onChange={(e) => setUser({ ...user, gstin: e.target.value.toUpperCase() })}
                                    placeholder="27ABCDE1234F1Z5"
                                    maxLength="15"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white uppercase"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">15-character GST Identification Number</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GST Registration Date</label>
                                <input
                                    type="date"
                                    value={user.gstRegistrationDate ? new Date(user.gstRegistrationDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setUser({ ...user, gstRegistrationDate: e.target.value })}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State of Registration</label>
                                <input
                                    type="text"
                                    value={user.stateOfRegistration || ''}
                                    onChange={(e) => setUser({ ...user, stateOfRegistration: e.target.value })}
                                    placeholder="Maharashtra"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Constitution</label>
                                <input
                                    type="text"
                                    value={user.businessConstitution || ''}
                                    onChange={(e) => setUser({ ...user, businessConstitution: e.target.value })}
                                    placeholder="Private Limited Company"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filing Frequency</label>
                                <select
                                    value={user.filingFrequency || ''}
                                    onChange={(e) => setUser({ ...user, filingFrequency: e.target.value })}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Select Frequency</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HSN/SAC Codes</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={hsnInput}
                                        onChange={(e) => setHsnInput(e.target.value)}
                                        placeholder="Enter HSN/SAC code"
                                        className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHsnCode())}
                                    />
                                    <button
                                        type="button"
                                        onClick={addHsnCode}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {user.hsnCodes.map((code, index) => (
                                        <span key={index} className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                                            {code}
                                            <button
                                                type="button"
                                                onClick={() => removeHsnCode(code)}
                                                className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
                            >
                                Save GST Details
                            </button>
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Security Settings</h3>
                        <div className="max-w-2xl">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Leave blank to keep current password"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Minimum 6 characters</p>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
                                >
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Preferences</h3>
                        <div className="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                                <select
                                    value={user.preferences?.theme || 'system'}
                                    onChange={(e) => setUser({ ...user, preferences: { ...user.preferences, theme: e.target.value } })}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="system">System</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                                <select
                                    value={user.preferences?.language || 'en'}
                                    onChange={(e) => setUser({ ...user, preferences: { ...user.preferences, language: e.target.value } })}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="en">English</option>
                                    <option value="hi">Hindi</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label>
                                <select
                                    value={user.preferences?.dateFormat || 'DD/MM/YYYY'}
                                    onChange={(e) => setUser({ ...user, preferences: { ...user.preferences, dateFormat: e.target.value } })}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                                <select
                                    value={user.preferences?.currency || 'INR'}
                                    onChange={(e) => setUser({ ...user, preferences: { ...user.preferences, currency: e.target.value } })}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="INR">INR (₹)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={user.preferences?.emailNotifications || false}
                                        onChange={(e) => setUser({ ...user, preferences: { ...user.preferences, emailNotifications: e.target.checked } })}
                                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Enable Email Notifications</span>
                                </label>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
                            >
                                Save Preferences
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Profile;
