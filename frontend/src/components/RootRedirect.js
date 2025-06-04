import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RootRedirect = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (user) {
        return user.role === 'banker' ? <Navigate to="/banker" /> : <Navigate to="/dashboard" />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default RootRedirect; 