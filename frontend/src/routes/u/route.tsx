import { AuthenticatedRoute } from "@/components/auth-route";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/u")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthenticatedRoute allowedRoles={["user", "admin"]}>
      <Outlet />
    </AuthenticatedRoute>
  );
}
