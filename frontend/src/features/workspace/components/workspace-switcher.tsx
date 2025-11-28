import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";
import { useGetWorkspaces } from "../api/get-workspaces";
import { WorkspaceDialog } from "./workspace-dialog";
import { useWorkspaceStore } from "../stores/workspace-store";
import { Workspace } from "../types";

const WorkspaceSkeleton = () => (
  <div className="flex flex-1 items-center space-x-2">
    <Skeleton className="h-8 w-8 rounded-lg" />
    <div className="grid flex-1 gap-1">
      <Skeleton className="h-3 w-[150px]" />
      <Skeleton className="h-3 w-[100px]" />
    </div>
  </div>
);

const WorkspaceDisplay = ({
  name,
  description,
}: {
  name: string;
  description?: string;
}) => (
  <>
    <div className="bg-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg">
      <div className="size-4" />
    </div>
    <div className="text-sidebar-primary-foreground grid flex-1 text-start text-sm leading-tight">
      <span className="line-clamp-1 truncate font-semibold">{name}</span>
      {description && (
        <span className="line-clamp-1 truncate text-xs">{description}</span>
      )}
    </div>
    <ChevronsUpDown className="ms-auto" />
  </>
);

export function WorkspaceSwitcher() {
  const { isMobile } = useSidebar();
  const { currentWorkspace, setCurrentWorkspace } = useWorkspaceStore();
  const { data: workspaces } = useGetWorkspaces();

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {currentWorkspace ? (
                  <WorkspaceDisplay {...currentWorkspace} />
                ) : (
                  <WorkspaceSkeleton />
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            {workspaces && workspaces.length > 0 && (
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="start"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-muted-foreground text-xs">
                  Workspaces
                </DropdownMenuLabel>
                {workspaces.map((workspace: Workspace) => (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => setCurrentWorkspace(workspace)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <div className="size-4 shrink-0" />
                    </div>
                    {workspace.name}
                  </DropdownMenuItem>
                ))}
                {workspaces.length < 3 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="gap-2 p-2"
                      onClick={() => setOpen(!open)}
                    >
                      <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                        <Plus className="size-4" />
                      </div>
                      <div className="text-muted-foreground font-medium">
                        Add team
                      </div>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <WorkspaceDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
