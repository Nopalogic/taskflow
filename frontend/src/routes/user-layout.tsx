import { AuthenticatedRoute } from "@/components/auth-route";
import { Outlet } from "react-router";

export default function UserLayout() {
  return (
    <AuthenticatedRoute allowedRoles={["user", "admin"]}>
      <Outlet />
    </AuthenticatedRoute>
  );
}
