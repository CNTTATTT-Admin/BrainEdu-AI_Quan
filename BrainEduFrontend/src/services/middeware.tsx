import { Navigate, Outlet } from "react-router";
import { getToken } from "../utils/token";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const token = getToken();

    if (!token) {
        return <Navigate to="/account/login" replace />;
    }

    return children;
};


export const ProtectedRoute = () => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
