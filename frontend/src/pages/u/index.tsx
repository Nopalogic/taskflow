import { logoutUser } from "@/services/auth";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.success) {
      logout();
      navigate("/auth/login");
    }
  };

  return (
    <div className="p-3">
      <div>Hello "/u/"!</div>
      <button className="rounded-sm border px-2 py-1" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
