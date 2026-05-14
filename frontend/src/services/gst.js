const API_URL = 'http://localhost:5000/api/gst';

export const calculateGST = async (amount, rate) => {
    try {
        const response = await fetch(`${API_URL}/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, rate }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'GST calculation failed');
        }
        return data;
    } catch (error) {
        throw error;
    }
};
