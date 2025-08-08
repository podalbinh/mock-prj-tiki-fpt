import { useAuth } from "@/hooks/useAuth";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireRoleProps {
  children: JSX.Element;
  role: "admin" | "user";
}

const RequireRole = ({ children, role }: RequireRoleProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return;
  }

  if (!user || !isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default RequireRole;
