import { Navigate, Outlet } from "react-router-dom";
import { getRole, getToken } from "../utils/token";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/account/login" replace />;
  }

  const role = getRole() || ""

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};