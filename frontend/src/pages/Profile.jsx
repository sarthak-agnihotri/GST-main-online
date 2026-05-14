import React, { useState, useEffect, useCallback } from 'react';
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
        businessAddress: {
            street: '',
            city: '',
            state: '',
            pinCode: ''
        },
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

    const [message, setMessage] = useState({
        type: '',
        text: ''
    });

    const [initialChar, setInitialChar] = useState('');
    const [hsnInput, setHsnInput] = useState('');

    // FIXED: useCallback added
    const fetchProfile = useCallback(async () => {
        try {
            const data = await getProfile();

            setUser(prevUser => ({
                ...prevUser,
                ...data,
                businessAddress: data.businessAddress || {
                    street: '',
                    city: '',
                    state: '',
                    pinCode: ''
                },
                preferences: data.preferences || prevUser.preferences,
                hsnCodes: data.hsnCodes || []
            }));

            setInitialChar(
                data?.name?.charAt(0)?.toUpperCase() || ''
            );
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Failed to load profile'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    // FIXED: dependency added
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    // Auto-dismiss messages
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({
                    type: '',
                    text: ''
                });
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        setMessage({
            type: '',
            text: ''
        });

        try {
            const updatedData = { ...user };

            if (password) {
                updatedData.password = password;
            }

            const data = await updateProfile(updatedData);

            const storedUser = JSON.parse(
                localStorage.getItem('user')
            );

            if (storedUser) {
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        ...storedUser,
                        ...data
                    })
                );
            }

            setUser(prev => ({
                ...prev,
                ...data
            }));

            setMessage({
                type: 'success',
                text: 'Profile updated successfully'
            });

            setPassword('');
        } catch (err) {
            setMessage({
                type: 'error',
                text:
                    err.message ||
                    'Failed to update profile'
            });
        }
    };

    const handleMakeAdmin = async () => {
        try {
            const data = await enableAdmin();

            setUser(prev => ({
                ...prev,
                role: data.role
            }));

            const storedUser = JSON.parse(
                localStorage.getItem('user')
            );

            if (storedUser) {
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        ...storedUser,
                        role: data.role
                    })
                );
            }

            setMessage({
                type: 'success',
                text:
                    'You are now an Admin! Refresh the page to see Admin options.'
            });
        } catch (err) {
            setMessage({
                type: 'error',
                text:
                    err.message ||
                    'Failed to enable admin access'
            });
        }
    };

    const addHsnCode = () => {
        const trimmed = hsnInput.trim();

        if (
            trimmed &&
            !user.hsnCodes.includes(trimmed)
        ) {
            setUser(prev => ({
                ...prev,
                hsnCodes: [
                    ...prev.hsnCodes,
                    trimmed
                ]
            }));

            setHsnInput('');
        }
    };

    const removeHsnCode = (code) => {
        setUser(prev => ({
            ...prev,
            hsnCodes: prev.hsnCodes.filter(
                c => c !== code
            )
        }));
    };

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Loading profile...
            </div>
        );
    }

    const tabs = [
        {
            id: 'overview',
            name: 'Overview',
            icon: '👤'
        },
        {
            id: 'business',
            name: 'Business Info',
            icon: '🏢'
        },
        {
            id: 'gst',
            name: 'GST Details',
            icon: '📋'
        },
        {
            id: 'security',
            name: 'Security',
            icon: '🔒'
        },
        {
            id: 'preferences',
            name: 'Preferences',
            icon: '⚙️'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Account Settings
            </h1>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
                <div className="flex overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() =>
                                setActiveTab(tab.id)
                            }
                            className={`flex-1 min-w-max px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                                activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                            }`}
                        >
                            <span className="mr-2">
                                {tab.icon}
                            </span>
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            {message.text && (
                <div
                    className={`p-4 rounded-lg mb-6 ${
                        message.type === 'success'
                            ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                    }`}
                >
                    {message.text}
                </div>
            )}

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Personal Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                                <input type="tel" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alternate Email</label>
                                <input type="email" value={user.alternateEmail} onChange={(e) => setUser({ ...user, alternateEmail: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                            </div>
                        </div>
                        <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">Save Changes</button>
                    </div>
                )}

                {/* Business Info Tab */}
                {activeTab === 'business' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Business Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Name</label>
                                <input type="text" value={user.businessName} onChange={(e) => setUser({ ...user, businessName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Type</label>
                                <input type="text" value={user.businessType} onChange={(e) => setUser({ ...user, businessType: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                            </div>
                        </div>
                        <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">Save Changes</button>
                    </div>
                )}

                {/* GST Details Tab */}
                {activeTab === 'gst' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">GST Details</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GSTIN</label>
                                <input type="text" value={user.gstin} onChange={(e) => setUser({ ...user, gstin: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PAN</label>
                                <input type="text" value={user.panNumber} onChange={(e) => setUser({ ...user, panNumber: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                            </div>
                        </div>
                        <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">Save Changes</button>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Security Settings</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" placeholder="Enter new password" />
                        </div>
                        <button onClick={async () => { if (password.length < 6) { setMessage({ type: 'error', text: 'Password must be at least 6 characters' }); return; } try { await updateProfile({ password }); setMessage({ type: 'success', text: 'Password updated successfully' }); setPassword(''); } catch (error) { setMessage({ type: 'error', text: error.message }); } }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">Change Password</button>
                    </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Preferences</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                                <select value={user.preferences?.theme || 'system'} onChange={(e) => setUser({ ...user, preferences: { ...user.preferences, theme: e.target.value } })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                                    <option>system</option>
                                    <option>light</option>
                                    <option>dark</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                                <select value={user.preferences?.language || 'en'} onChange={(e) => setUser({ ...user, preferences: { ...user.preferences, language: e.target.value } })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                                    <option value="en">English</option>
                                    <option value="hi">Hindi</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">Save Preferences</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;