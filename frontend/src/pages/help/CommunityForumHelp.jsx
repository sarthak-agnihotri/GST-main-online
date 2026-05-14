import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../../utils/forumData';

const CommunityForumHelp = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        setTopics(getTopics());
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                <span className="ml-4 text-sm font-medium text-gray-500">Community Forum</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Forum Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Community Forum
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Connect with other users, ask questions, and share knowledge.
                        </p>
                    </div>
                    <Link
                        to="/help/forum/new"
                        className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
                    >
                        New Topic
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                    {topics.map((topic) => (
                        <div key={topic.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <Link
                                        to={`/help/forum/${topic.id}`}
                                        className="text-lg font-medium text-blue-600 dark:text-blue-400 truncate cursor-pointer hover:underline"
                                    >
                                        {topic.title}
                                    </Link>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <span className="truncate">By {topic.author}</span>
                                        <span className="mx-2">&bull;</span>
                                        <span className="truncate">{topic.date}</span>
                                        <span className="mx-2">&bull;</span>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200 uppercase">
                                            {topic.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center">
                                        <span className="mr-1.5 hidden sm:inline">Replies</span>
                                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-semibold">
                                            {topic.replies.length}
                                        </span>
                                    </div>
                                    <div className="hidden sm:block">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunityForumHelp;
