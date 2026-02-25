import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentRole, getIsAuthenticated, roleRouteMap } from '../features/role/roleSlice';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentRole = useSelector(getCurrentRole);

  if (!isAuthenticated) {
    return <Navigate to="/login?mode=signin" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to={roleRouteMap[currentRole] || '/investor'} replace />;
  }

  return children;
};

export default ProtectedRoute;
