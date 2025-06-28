
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../contextAPI/UserContext.jsx';

const PublicRoute = ({ children }) => {
  const userData = useContext(userContext);
  if (userData && userData.role) {
    if (userData.role === 'candidate') {
      return <Navigate to="/user-dashboard" />;
    }
    return <Navigate to="/admin-dashboard" />;
  }

  return children;
};

export default PublicRoute;
