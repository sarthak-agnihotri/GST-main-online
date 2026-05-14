import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicById, addReply } from '../../utils/forumData';

const ForumTopicDetail = () => {
    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        const foundTopic = getTopicById(id);
        setTopic(foundTopic);
    }, [id]);

    const handleReplySubmit = (e) => {
        e.preventDefault();

        const updatedTopic = addReply(id, {
            content: replyContent,
            author: 'Current User' // Simulating logged-in user
        });

        setTopic(updatedTopic);
        setReplyContent('');
    };

    if (!topic) {
        return <div className="p-8 text-center text-gray-600 dark:text-gray-400">Topic not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                <span className="ml-4 text-sm font-medium text-gray-500 truncate max-w-xs">{topic.title}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Main Topic */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-8 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {topic.title}
                            </h1>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                                Discussion
                            </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                            <span className="font-medium text-gray-900 dark:text-white mr-2">{topic.author}</span>
                            <span>&bull;</span>
                            <span className="ml-2">{topic.date}</span>
                        </div>
                        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                            <p>{topic.content}</p>
                        </div>
                    </div>
                </div>

                {/* Replies */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        {topic.replies.length} Replies
                    </h3>
                    <div className="space-y-4">
                        {topic.replies.map((reply) => (
                            <div key={reply.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-semibold text-gray-900 dark:text-white">{reply.author}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{reply.date}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{reply.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reply Form */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Post a Reply
                    </h3>
                    <form onSubmit={handleReplySubmit}>
                        <div className="mb-4">
                            <label htmlFor="reply" className="sr-only">Your Reply</label>
                            <textarea
                                id="reply"
                                rows={4}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-3"
                                placeholder="Type your reply here..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Post Reply
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForumTopicDetail;
