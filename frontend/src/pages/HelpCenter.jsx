import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const categories = [
        { id: 'all', name: 'All Topics', icon: '📚' },
        { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
        { id: 'invoices', name: 'Invoices', icon: '📄' },
        { id: 'gst', name: 'GST & Tax', icon: '💰' },
        { id: 'reports', name: 'Reports', icon: '📊' },
        { id: 'account', name: 'Account', icon: '👤' },
    ];

    const faqs = [
        {
            id: 1,
            category: 'getting-started',
            question: 'How do I get started with GST Software?',
            answer: 'To get started, first register for an account using your business details and GSTIN. Once registered, log in to your dashboard where you can start creating invoices, tracking GST, and generating reports. We recommend starting with the Dashboard tour to familiarize yourself with all features.'
        },
        {
            id: 2,
            category: 'getting-started',
            question: 'What information do I need to register?',
            answer: 'You need your business name, email address, password, and valid GSTIN (Goods and Services Tax Identification Number). Make sure your GSTIN is active and valid before registration.'
        },
        {
            id: 3,
            category: 'invoices',
            question: 'How do I create a new invoice?',
            answer: 'Navigate to the Invoices section and click on "Create Invoice". Fill in the customer details, add items with their HSN/SAC codes, quantities, and rates. The GST will be automatically calculated based on the tax rates you specify. You can then save, download, or email the invoice.'
        },
        {
            id: 4,
            category: 'invoices',
            question: 'Can I edit or delete an invoice after creation?',
            answer: 'Yes, you can edit invoices that haven\'t been finalized or filed. Go to the invoice details page and click "Edit". However, once an invoice is included in a GST return filing, it\'s recommended to create a credit/debit note instead of editing it directly to maintain proper audit trails.'
        },
        {
            id: 5,
            category: 'invoices',
            question: 'How do I export invoices to PDF?',
            answer: 'Open the invoice you want to export, and click the "Download PDF" button at the top right. The PDF will be generated with all invoice details, GST breakdown, and your business information formatted professionally.'
        },
        {
            id: 6,
            category: 'gst',
            question: 'How is GST calculated on my invoices?',
            answer: 'GST is calculated based on the tax rate you specify for each item. For inter-state transactions, IGST is applied. For intra-state transactions, CGST and SGST are applied (each at half the total GST rate). The system automatically determines the applicable tax based on your GSTIN and customer location.'
        },
        {
            id: 7,
            category: 'gst',
            question: 'What is the GST Calculator and how do I use it?',
            answer: 'The GST Calculator is a tool to quickly calculate GST amounts. Enter the base amount and select the GST rate (5%, 12%, 18%, or 28%). The calculator will show you the GST amount and total amount including tax. It\'s useful for quick calculations before creating invoices.'
        },
        {
            id: 8,
            category: 'gst',
            question: 'How do I prepare for GSTR-1 and GSTR-3B filing?',
            answer: 'Go to the Reports section and select "GST Returns". Choose the return period and type (GSTR-1 or GSTR-3B). The system will automatically aggregate your invoice data and prepare the return summary. You can review, validate, and export the data in JSON format to upload to the GST portal.'
        },
        {
            id: 9,
            category: 'reports',
            question: 'What types of reports can I generate?',
            answer: 'You can generate various reports including Sales Summary, Purchase Summary, GST Summary (monthly/quarterly), Tax Liability reports, and detailed transaction reports. All reports can be filtered by date range and exported to PDF or Excel format.'
        },
        {
            id: 10,
            category: 'reports',
            question: 'How do I export reports to Excel?',
            answer: 'In the Reports section, select the report type and date range you want. Click the "Export to Excel" button at the top of the report. The data will be downloaded as an Excel file with all columns and calculations preserved.'
        },
        {
            id: 11,
            category: 'account',
            question: 'How do I update my business information?',
            answer: 'Go to the Profile section from the navigation menu. Here you can update your business name, contact details, address, and other information. Note that GSTIN cannot be changed after registration for security reasons.'
        },
        {
            id: 12,
            category: 'account',
            question: 'How do I reset my password?',
            answer: 'On the login page, click "Forgot Password". Enter your registered email address, and you\'ll receive a password reset link. Click the link in the email and set a new password. Make sure to use a strong password with a combination of letters, numbers, and special characters.'
        },
        {
            id: 13,
            category: 'gst',
            question: 'What are HSN and SAC codes?',
            answer: 'HSN (Harmonized System of Nomenclature) codes are used for goods, and SAC (Services Accounting Code) codes are used for services. These are standard codes used in GST to classify products and services. You need to enter the appropriate code when creating invoices for proper GST compliance.'
        },
        {
            id: 14,
            category: 'reports',
            question: 'Can I schedule automated reports?',
            answer: 'Currently, automated report scheduling is not available. However, you can manually generate and export reports anytime from the Reports section. We\'re working on adding scheduled reports in future updates.'
        },
    ];

    const helpTopics = [
        {
            title: 'Invoice Management',
            description: 'Learn how to create, edit, and manage invoices',
            icon: '📝',
            link: '/help/invoices'
        },
        {
            title: 'GST Compliance',
            description: 'Understanding GST calculations and return filing',
            icon: '✓',
            link: '/help/gst'
        },
        {
            title: 'Reports & Analytics',
            description: 'Generate and export various business reports',
            icon: '📈',
            link: '/help/reports'
        },
        {
            title: 'Account Settings',
            description: 'Manage your profile and business information',
            icon: '⚙️',
            link: '/help/account'
        },
    ];

    const filteredFAQs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = searchQuery === '' ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleFAQ = (id) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Help Center
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Find answers to common questions and learn how to make the most of your GST Software
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 pl-14 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <svg
                            className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Quick Help Topics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {helpTopics.map((topic, index) => (
                        <Link
                            key={index}
                            to={topic.link}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 group block"
                        >
                            <div className="text-4xl mb-3">{topic.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {topic.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {topic.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Category Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === category.id
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500'
                                    }`}
                            >
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'} found
                        </p>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredFAQs.length > 0 ? (
                            filteredFAQs.map((faq) => (
                                <div key={faq.id} className="p-6">
                                    <button
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="w-full flex items-center justify-between text-left group"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-4">
                                            {faq.question}
                                        </h3>
                                        <svg
                                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0 ${expandedFAQ === faq.id ? 'transform rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {expandedFAQ === faq.id && (
                                        <div className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed animate-fadeIn">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    No questions found matching your search
                                </p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                                    Try adjusting your search or category filter
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Support Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Still Need Help?
                    </h2>
                    <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                        Can't find what you're looking for? Our support team is here to help you with any questions or issues.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="mailto:support@gstsoftware.com"
                            className="inline-flex items-center px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-md"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email Support
                        </a>
                        <a
                            href="tel:+911800XXXXXX"
                            className="inline-flex items-center px-6 py-3 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-200 shadow-md"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Us
                        </a>
                    </div>
                    <div className="mt-6 text-blue-100 text-sm">
                        <p>Support Hours: Monday - Friday, 9:00 AM - 6:00 PM IST</p>
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl mb-3">📖</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Documentation
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Detailed guides and API documentation for developers
                        </p>
                        <Link to="/help/documentation" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                            View Docs →
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl mb-3">🎥</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Video Tutorials
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Watch step-by-step video guides for common tasks
                        </p>
                        <Link to="/help/tutorials" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                            Watch Now →
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl mb-3">💬</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Community Forum
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Connect with other users and share best practices
                        </p>
                        <Link to="/help/forum" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                            Join Forum →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
