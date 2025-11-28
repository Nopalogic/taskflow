"use client";

import { useProjectDialogs } from "../../stores/use-project-dialog";
import { CreateProjectDialog } from "./create-project";
import { UpdateProjectDialog } from "./update-dialog";

export function ProjectDialogs() {
  const { open, setOpen, project } = useProjectDialogs();
  return (
    <>
      <CreateProjectDialog
        open={open === "project-create"}
        onOpenChange={() => setOpen("project-create")}
      />

      {project && (
        <UpdateProjectDialog
          open={open === "project-update"}
          onOpenChange={() => setOpen("project-update")}
          project={project}
        />
      )}
    </>
  );
}
