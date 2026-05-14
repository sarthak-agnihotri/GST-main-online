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

            {/* KEEP YOUR REMAINING JSX EXACTLY SAME */}
        </div>
    );
};

export default Profile;