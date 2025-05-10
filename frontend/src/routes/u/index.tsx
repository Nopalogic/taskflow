import { logoutUser } from "@/services/auth";
import { useAuthStore } from "@/stores/auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/u/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.success) {
      logout();
      navigate({ to: "/auth/login" });
    }
  };

  return (
    <div className="p-3">
      <div>Hello "/u/"!</div>
      <button className="px-2 py-1 border rounded-sm" onClick={handleLogout}>Logout</button>
    </div>
  );
}
