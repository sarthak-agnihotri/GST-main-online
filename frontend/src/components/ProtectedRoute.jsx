import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const user = userStr ? JSON.parse(userStr) : null;
            setIsAuthenticated(true);
            setIsAdmin(user?.role === 'admin');
        } catch (error) {
            setIsAuthenticated(false);
        }
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
