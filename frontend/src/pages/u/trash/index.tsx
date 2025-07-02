import { useEffect, useState } from "react";

import { Main } from "@/components/layouts/main";
import {
  ProjectCard,
  ProjectCardSkeleton,
} from "@/components/project/project-card";

import { Button } from "@/components/ui/button";

import { getTrash } from "@/services/trash";
import { Project } from "@/types/project";


export default function TrashPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getTrash();
      if (response.success) {
        setProjects(response.data);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Main fixed>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trash</h1>
        <p className="text-muted-foreground">
          Here&apos;s a list of your trash!
        </p>
      </div>

      {isLoading ? (
        <>
          <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
          </ul>
        </>
      ) : (
        <div>
          {projects.length === 0 ? (
            <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </ul>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <p>Not found</p>
              <Button>Create Project</Button>
            </div>
          )}
        </div>
      )}
    </Main>
  );
}
