import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const ChartMonthlyGST = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Mock data if none provided
    const chartData = data || [
        { name: 'Jan', gst: 4000 },
        { name: 'Feb', gst: 3000 },
        { name: 'Mar', gst: 2000 },
        { name: 'Apr', gst: 2780 },
        { name: 'May', gst: 1890 },
        { name: 'Jun', gst: 2390 },
    ];

    if (!chartData || chartData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-sm">No data available for chart</p>
            </div>
        );
    }

    return (
        <div className="chart-container" style={{ width: '100%', height: 350 }}>
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Monthly GST Collection</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                    <XAxis 
                        dataKey="name" 
                        stroke={isDark ? "#9ca3af" : "#4b5563"}
                        tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }}
                    />
                    <YAxis 
                        stroke={isDark ? "#9ca3af" : "#4b5563"}
                        tick={{ fill: isDark ? "#9ca3af" : "#4b5563" }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#1f2937' : '#fff',
                            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '8px',
                            color: isDark ? '#f3f4f6' : '#000',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value) => `₹${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    />
                    <Legend 
                        wrapperStyle={{ color: isDark ? '#9ca3af' : '#4b5563', paddingTop: '20px' }}
                        iconType="circle"
                    />
                    <Bar 
                        dataKey="gst" 
                        fill="#3b82f6" 
                        name="GST Collected (₹)"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartMonthlyGST;
