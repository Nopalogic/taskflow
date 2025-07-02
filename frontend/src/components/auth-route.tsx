import { useAuthStore } from "@/stores/auth";
import { Navigate } from "react-router";

export function AuthenticatedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || "")) {
    return <Navigate to='/u' />;
  }

  return <>{children}</>;
}