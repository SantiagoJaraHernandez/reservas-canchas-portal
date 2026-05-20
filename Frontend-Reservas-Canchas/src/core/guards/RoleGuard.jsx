import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/app/store/authStore";

function RoleGuard({ allowedRoles }) {
  const user = useAuthStore((state) => state.user);

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleGuard;