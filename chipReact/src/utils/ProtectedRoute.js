import { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../UserContext';

function ProtectedRoute({ element, ...rest }) {
  const { user } = useContext(UserContext);

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
