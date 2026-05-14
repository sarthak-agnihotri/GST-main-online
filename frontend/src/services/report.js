const API_URL = 'http://localhost:5000/api/reports';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const getMonthlyReport = async () => {
    try {
        const response = await fetch(`${API_URL}/monthly`, {
            headers: getHeaders(),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch monthly report');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const getYearlyReport = async () => {
    try {
        const response = await fetch(`${API_URL}/yearly`, {
            headers: getHeaders(),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch yearly report');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const exportReportPDF = async (type) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/export-pdf?type=${type}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    return response.blob();
};
