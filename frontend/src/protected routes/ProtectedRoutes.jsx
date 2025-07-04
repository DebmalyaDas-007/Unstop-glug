import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('access_token');
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
