"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { ComponentProps } from "react";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: authData } = authClient.useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser user={authData?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
