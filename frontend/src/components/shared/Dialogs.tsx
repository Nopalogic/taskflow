"use client";

import { CreateProjectDialog } from "@/features/project/components/dialogs/create-dialog";
import { DeleteProjectDialog } from "@/features/project/components/dialogs/delete-dialog";
import { UpdateProjectDialog } from "@/features/project/components/dialogs/update-dialog";
import { projectDialogs } from "@/features/project/stores/project-store";

export function Dialogs() {
  const {
    open: projectOpen,
    setOpen: setProjectOpen,
    data: projectData,
  } = projectDialogs();

  return (
    <>
      <CreateProjectDialog
        open={projectOpen === "project-create"}
        onOpenChange={() => setProjectOpen("project-create")}
      />
      {projectData && (
        <>
          <UpdateProjectDialog
            open={projectOpen === "project-update"}
            onOpenChange={() => setProjectOpen("project-update")}
            project={projectData}
          />
          <DeleteProjectDialog
            open={projectOpen === "project-delete"}
            onOpenChange={() => setProjectOpen("project-delete")}
            project={projectData}
          />
        </>
      )}
    </>
  );
}
