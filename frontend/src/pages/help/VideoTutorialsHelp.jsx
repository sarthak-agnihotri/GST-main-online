import React from 'react';
import { Link } from 'react-router-dom';

const VideoTutorialsHelp = () => {
    // Placeholder video data
    const videos = [
        { id: 1, title: 'Getting Started Guide', duration: '5:30', thumbnail: 'bg-blue-100' },
        { id: 2, title: 'Creating Your First Invoice', duration: '3:45', thumbnail: 'bg-green-100' },
        { id: 3, title: 'Filing GSTR-1', duration: '8:15', thumbnail: 'bg-purple-100' },
        { id: 4, title: 'Exporting Reports', duration: '2:50', thumbnail: 'bg-yellow-100' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                <span className="ml-4 text-sm font-medium text-gray-500">Video Tutorials</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Video Tutorials
                    </h3>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                        Watch step-by-step guides to master the platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                            {/* Thumbnail Placeholder */}
                            <div className={`h-48 w-full ${video.thumbnail} flex items-center justify-center relative group cursor-pointer`}>
                                <svg className="w-16 h-16 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                    {video.duration}
                                </span>
                            </div>
                            <div className="p-4">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {video.title}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Learn the basics in this quick video guide.
                                </p>
                                <button className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                                    Watch Video &rarr;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoTutorialsHelp;
