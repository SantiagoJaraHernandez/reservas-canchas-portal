import { Navigate } from "react-router-dom";
import useAuthStore from "@/app/store/authStore";

function RoleGuard({ allowedRoles, children }) {
  const user = useAuthStore((state) => state.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default RoleGuard;