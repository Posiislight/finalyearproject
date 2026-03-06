import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BlockLoader from './ui/block-loader';

const ProtectedRoute = ({ children, allowedRole = null }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <BlockLoader size={30} gap={4} />
            </div>
        );
    }

    if (!user) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRole) {
        if (allowedRole === 'employer' && !user.is_employer) {
            return <Navigate to="/jobseeker-home" replace />;
        }
        if (allowedRole === 'job_seeker' && !user.is_job_seeker) {
            return <Navigate to="/employer-dashboard" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
