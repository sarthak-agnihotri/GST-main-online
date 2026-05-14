const API_URL = 'http://localhost:5000/api/admin';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: getHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to delete user');
        return data;
    } catch (error) {
        throw error;
    }
};

export const getAllInvoices = async () => {
    try {
        const response = await fetch(`${API_URL}/invoices`, {
            headers: getHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch invoices');
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteInvoice = async (id) => {
    try {
        const response = await fetch(`${API_URL}/invoices/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to delete invoice');
        return data;
    } catch (error) {
        throw error;
    }
};
