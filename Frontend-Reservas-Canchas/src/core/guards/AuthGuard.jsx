import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/app/store/authStore";

function AuthGuard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AuthGuard;