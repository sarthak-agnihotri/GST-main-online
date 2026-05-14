import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { createTopic } from '../../utils/forumData';

const CreateForumTopic = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('general');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        createTopic({
            title,
            category,
            content,
            author: 'Current User' // Simulating logged-in user
        });

        navigate('/help/forum');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <Link to="/help/forum" className="text-gray-400 hover:text-gray-500">
                                <svg className="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                <span className="sr-only">Home</span>
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                                <Link to="/help/forum" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Community Forum</Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                                <span className="ml-4 text-sm font-medium text-gray-500">Create Topic</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-white">
                            Create New Topic
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                            Ask a question or share something with the community.
                        </p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Topic Title
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2"
                                        placeholder="e.g., How to handle partial payments?"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Category
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="category"
                                        name="category"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="general">General Discussion</option>
                                        <option value="invoices">Invoices & Billing</option>
                                        <option value="gst">GST Filing</option>
                                        <option value="technical">Technical Support</option>
                                        <option value="features">Feature Requests</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Content
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="content"
                                        name="content"
                                        rows={8}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2"
                                        placeholder="Describe your question or topic in detail..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                                <Link
                                    to="/help/forum"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Create Topic
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateForumTopic;
