const API_URL = 'http://localhost:5000/api/auth';

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/profile`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch profile');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (userData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update profile');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const promoteToAdmin = async (userId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/promote/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to promote user');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const enableAdmin = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/enable-admin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to enable admin');
        }
        return data;
    } catch (error) {
        throw error;
    }
};
