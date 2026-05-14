const API_URL = 'http://localhost:5000/api/invoices';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const createInvoice = async (invoiceData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(invoiceData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create invoice');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const getInvoices = async () => {
    try {
        const response = await fetch(API_URL, {
            headers: getHeaders(),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch invoices');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const getInvoiceById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: getHeaders(),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch invoice');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateInvoice = async (id, invoiceData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(invoiceData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update invoice');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteInvoice = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete invoice' }));
            throw new Error(errorData.message || `Failed to delete invoice (${response.status})`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Delete invoice error:', error);
        throw error;
    }
};

export const exportInvoiceExcel = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}/export-excel`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to export invoice');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${id}-${Date.now()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        throw error;
    }
};
