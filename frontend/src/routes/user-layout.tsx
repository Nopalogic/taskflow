import { AuthenticatedRoute } from "@/components/auth-route";
import { Header } from "@/components/layouts/header";
import { AppSidebar } from "@/components/layouts/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router";

export default function UserLayout() {
  return (
    <AuthenticatedRoute allowedRoles={["user", "admin"]}>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div
          id="content"
          className={cn(
            "ml-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "transition-[width] duration-200 ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh",
          )}
        >
          <Header fixed />
          <Outlet />
        </div>
      </SidebarProvider>
    </AuthenticatedRoute>
  );
}
