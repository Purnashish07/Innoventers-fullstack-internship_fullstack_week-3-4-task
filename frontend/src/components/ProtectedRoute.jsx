import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Layout from './Layout';

export default function ProtectedRoute({ children, roles }) {
  const { user } = useSelector(s => s.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Layout>{children}</Layout>;
}
