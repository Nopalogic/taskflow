import { Grid } from "lucide-react";
import { useGetProjects } from "../api/get-projects";
import { slugify } from "@/utils/slug";
import { useWorkspaceStore } from "@/features/workspace/stores/workspace-store";
import { NavItems } from "@/components/layout/main/nav-items";
import { useProjectDialogs } from "../stores/use-project-dialog";

export function ProjectItems() {
  const { setOpen } = useProjectDialogs();
  const { currentWorkspace } = useWorkspaceStore();
  const { data: projects } = useGetProjects({
    workspaceId: currentWorkspace?.id as string,
    queryConfig: {
      enabled: !!currentWorkspace?.id,
    },
  });

  const formatedProjects =
    (projects &&
      projects.map((project: { id: string; name: string }) => {
        return {
          title: project.name,
          url: `/u/${slugify(project.name, project.id)}`,
          icon: Grid,
        };
      })) ||
    [];

  return (
    <NavItems
      title={
        <div className="flex w-full items-center justify-between">
          <span>Projects</span>
          <span
            className="hover:text-accent-foreground cursor-pointer"
            onClick={() => setOpen("project-create")}
          >
            Add
          </span>
        </div>
      }
      items={formatedProjects}
    />
  );
}
