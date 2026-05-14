import React from 'react';
import { Link } from 'react-router-dom';

const DocumentationHelp = () => {
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
                                <span className="ml-4 text-sm font-medium text-gray-500">Documentation</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-2xl leading-6 font-bold text-gray-900 dark:text-white">
                            Technical Documentation
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                            Detailed guides and API references for developers and integrators.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
                        <div className="space-y-8">
                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">API Introduction</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Our platform offers a RESTful API to integrate GST features directly into your existing ERP or accounting systems. All API requests require authentication via a JWT token.
                                </p>
                                <div className="mt-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                                    <code className="text-sm text-gray-800 dark:text-gray-200">
                                        GET https://api.gstsoftware.com/v1/invoices
                                    </code>
                                </div>
                            </section>

                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Authentication</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    To authenticate, send a POST request to <code>/api/auth/login</code> with your credentials. You will receive a bearer token that must be included in the Authorization header of subsequent requests.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Rate Limits</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    The API is rate-limited to 100 requests per minute per user. Exceeding this limit will result in a 429 Too Many Requests response.
                                </p>
                            </section>

                            <div className="pt-4">
                                <Link to="/help/documentation/api" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    View Full API Reference &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentationHelp;
