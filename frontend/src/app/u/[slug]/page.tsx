"use client";

import { Button } from "@/components/ui/button";
import { extractIdFromSlug, slugify } from "@/utils/slug";
import { Settings } from "lucide-react";
import { notFound, redirect, useParams } from "next/navigation";
import { useGetProjectDetail } from "@/features/project/api/get-project";
import { useProjectDialogs } from "@/features/project/stores/use-project-dialog";
import { ProjectPageSkeleton } from "@/features/project/components/project-skeleton";

export default function ProjectPage() {
  const { setOpen, setProject } = useProjectDialogs();
  const { slug } = useParams<{ slug: string }>();
  const id = extractIdFromSlug(slug);

  if (!slug || !id) {
    notFound();
  }

  const { data: project, isLoading } = useGetProjectDetail({
    projectId: id as string,
    queryConfig: {
      enabled: !!id,
    },
  });

  if (isLoading) {
    return <ProjectPageSkeleton />;
  }

  const projectSlug = slugify(project.name, project.id);

  if (slug !== projectSlug) {
    redirect(projectSlug);
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-muted-foreground text-sm">PROJECT</h3>
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.name}
          </h1>
        </div>
        <Button
          size="icon"
          onClick={() => {
            setProject(project);
            setOpen("project-update");
          }}
        >
          <Settings />
        </Button>
      </header>
    </>
  );
}
