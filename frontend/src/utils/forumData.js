// Initial data to populate if storage is empty
const INITIAL_TOPICS = [
    {
        id: 1,
        title: 'Best practices for monthly filing',
        author: 'Rajesh Kumar',
        date: '2 hours ago',
        category: 'gst',
        content: 'I am new to GST filing. What are the best practices to ensure I don\'t miss any deadlines and maximize my ITC claim? Any checklists you experienced folks follow?',
        replies: [
            {
                id: 1,
                author: 'Support Team',
                date: '1 hour ago',
                content: 'Hi Rajesh! Great question. We recommend maintaining a folder for all your purchase invoices and reconciling them weekly. Also, filing GSTR-1 by the 10th of every month helps your buyers get their credit on time.'
            },
            {
                id: 2,
                author: 'Anita Singh',
                date: '45 mins ago',
                content: 'Always double-check the HSN codes. Incorrect HSN can lead to penalties. The software has a built-in search which is very helpful.'
            }
        ]
    },
    {
        id: 2,
        title: 'How to handle credit notes?',
        author: 'Vikram Singh',
        date: '1 day ago',
        category: 'invoices',
        content: 'I issued an invoice last month but the customer returned some goods. How do I adjust this in the current month\'s return?',
        replies: [
            {
                id: 1,
                author: 'Support Team',
                date: '1 day ago',
                content: 'You should issue a Credit Note against the original invoice. In the software, go to Invoices > Create Credit Note. This will automatically adjust your liability in the GSTR-3B for the current month.'
            }
        ]
    },
    {
        id: 3,
        title: 'Export to Tally feature request',
        author: 'Meera Patel',
        date: '2 days ago',
        category: 'features',
        content: 'Is there a way to export data directly to Tally XML format? My CA uses Tally and asking for data in that format.',
        replies: []
    }
];

const STORAGE_KEY = 'gst_forum_topics';

export const getTopics = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TOPICS));
        return INITIAL_TOPICS;
    }
    return JSON.parse(stored);
};

export const getTopicById = (id) => {
    const topics = getTopics();
    return topics.find(t => t.id === Number(id));
};

export const createTopic = (topicData) => {
    const topics = getTopics();
    const newTopic = {
        id: Date.now(), // Simple unique ID
        ...topicData,
        date: 'Just now',
        replies: []
    };
    const updatedTopics = [newTopic, ...topics];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTopics));
    return newTopic;
};

export const addReply = (topicId, replyData) => {
    const topics = getTopics();
    const updatedTopics = topics.map(topic => {
        if (topic.id === Number(topicId)) {
            return {
                ...topic,
                replies: [
                    ...topic.replies,
                    {
                        id: Date.now(),
                        ...replyData,
                        date: 'Just now'
                    }
                ]
            };
        }
        return topic;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTopics));
    return getTopicById(topicId); // Return updated topic
};
