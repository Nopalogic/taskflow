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
import { NavItems } from "./nav-items";
import { NavUser } from "./nav-user";
import { NAV_ITEMS } from "./constants";
import { WorkspaceSwitcher } from "@/features/workspace/components/workspace-switcher";
import { ProjectItems } from "@/features/project/components/project-items";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: authData } = authClient.useSession();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavItems items={NAV_ITEMS} />
        <ProjectItems />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={authData?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
