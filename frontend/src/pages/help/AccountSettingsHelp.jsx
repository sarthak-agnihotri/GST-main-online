import React from 'react';
import { Link } from 'react-router-dom';

const AccountSettingsHelp = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <div>
                                <Link to="/help-center" className="text-gray-400 hover:text-gray-500">
                                    <svg className="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    <span className="sr-only">Home</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                                <span className="ml-4 text-sm font-medium text-gray-500">Account Settings</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-2xl leading-6 font-bold text-gray-900 dark:text-white">
                            Account & Profile Settings
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                            Manage your business profile, security, and preferences.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
                        <div className="space-y-8">
                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Business Profile</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Your business name, address, and GSTIN are displayed on all your invoices. To update this information, go to <strong>Profile</strong>. Note that changing your GSTIN might require re-verification or contacting support if it affects historical data.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Changing Password</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    For security, we recommend updating your password regularly. Go to <strong>Settings {'>'} Security</strong> to change your password. You will need to enter your current password to confirm the change.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Theme Preferences</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    You can toggle between Light Mode and Dark Mode using the toggle switch in the navigation bar. This preference is saved locally on your device.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AccountSettingsHelp;
