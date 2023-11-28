import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/signin" />;
    }

    return children; // If token exists, proceed to the requested route
};

export default ProtectedRoute;
