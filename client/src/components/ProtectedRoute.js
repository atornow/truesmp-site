import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token'); // Simple auth check based on token presence
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;