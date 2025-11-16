"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NAV_ITEMS } from "@/constants/nav-items";
import { authClient } from "@/lib/auth-client";
import { ComponentProps } from "react";
import { NavItems } from "./nav-items";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: authData } = authClient.useSession();

  return (
    <Sidebar {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavItems items={NAV_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={authData?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
