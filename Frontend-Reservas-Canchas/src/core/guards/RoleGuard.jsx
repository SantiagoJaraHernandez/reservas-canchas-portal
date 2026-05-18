import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/authStore';

export default function RoleGuard({
  allowedRoles,
  children,
}) {
  const user = useAuthStore((state) => state.user);

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return children;
}