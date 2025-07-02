import {
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Settings,
  Trash,
} from "lucide-react";

import { SidebarData } from "@/types/sidebar";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/u",
          icon: LayoutDashboard,
        },
        {
          title: "Projects",
          url: "/u/projects",
          icon: FolderKanban,
        },
        {
          title: "Tasks",
          url: "/u/tasks",
          icon: ListTodo,
        },
        {
          title: "Trash",
          url: "/u/trash",
          badge: "3",
          icon: Trash,
        },
        {
          title: "Settings",
          url: "/u/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
