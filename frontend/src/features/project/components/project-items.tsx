import { NavItems } from "@/components/sidebar/nav-items";
import { Grid } from "lucide-react";
import { useState } from "react";
import { useGetProjects } from "../api/get-projects";
import { useWorkspaceStore } from "@/features/workspace/stores/use-workspace";
import { slugify } from "@/utils/slug";
import { CreateProjectDialog } from "./dialogs/create-project";

export function ProjectItems() {
  const [open, setOpen] = useState(false);
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
    <>
      <NavItems
        title={
          <div className="flex w-full items-center justify-between">
            <span>Projects</span>
            <span
              className="hover:text-accent-foreground cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              Add
            </span>
          </div>
        }
        items={formatedProjects}
      />
      <CreateProjectDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
