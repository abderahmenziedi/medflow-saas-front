import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role, user } = useContext(authContext);
    const location = useLocation();

    const isAuthenticated = !!token && !!user;
    const hasRequiredRole = allowedRoles.includes(role);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!hasRequiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
