import { Navigate, Route } from 'react-router-dom';

const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return !!user;
};

function ProtectedRoute({ element, ...rest }) {
  return isAuthenticated() ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
