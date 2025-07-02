import { Main } from "@/components/layouts/main";
import {
  ProjectCard,
  ProjectCardSkeleton,
} from "@/components/project/project-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjects } from "@/services/project";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects();
      if (response.success) {
        setProjects(response.data);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Main>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Link to="/u/tasks/create">
            <Button>New Task</Button>
          </Link>
          <Link to="/u/projects/create">
            <Button>New Project</Button>
          </Link>
        </div>
      </div>

      <Tabs orientation="vertical" defaultValue="all" className="space-y-4">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="not_started">Not Started</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="compeleted">Compeleted</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <ul className="grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
            </ul>
          ) : (
            <div>
              {projects.length > 0 ? (
                <ul className="grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
                  {projects.slice(0, 4).map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </ul>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="mb-8 leading-relaxed text-gray-600">
                    Sorry, the page you are looking for doesn't exist or has
                    been removed.
                  </p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="not_started" className="space-y-4">
          {isLoading ? (
            <ul className="grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
            </ul>
          ) : (
            <div>
              {projects.filter((project) => project.tasks?.length === 0)
                .length > 0 ? (
                <ul className="grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
                  {projects
                    .filter((project) => project.tasks?.length === 0)
                    .slice(0, 4)
                    .map((project) => (
                      <ProjectCard key={project.id} {...project} />
                    ))}
                </ul>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="mb-8 leading-relaxed text-gray-600">
                    Sorry, the page you are looking for doesn't exist or has
                    been removed.
                  </p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="in_progress" className="space-y-4">
          {isLoading ? (
            <ul className="grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
            </ul>
          ) : (
            <div>
              {projects.filter((project) => project.tasks!.length > 0).length >
              0 ? (
                <ul className="grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
                  {projects
                    .filter((project) => project.tasks!.length > 0)
                    .slice(0, 4)
                    .map((project) => (
                      <ProjectCard key={project.id} {...project} />
                    ))}
                </ul>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="mb-8 leading-relaxed text-gray-600">
                    Sorry, the page you are looking for doesn't exist or has
                    been removed.
                  </p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {isLoading ? (
            <ul className="grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
            </ul>
          ) : (
            <div>
              {projects.filter(
                (project) =>
                  project.tasks?.length ===
                  project.tasks?.filter((task) => task.status === "completed").length,
              ).length > 0 ? (
                <ul className="grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
                  {projects
                    .filter(
                      (project) =>
                        project.tasks?.length ===
                        project.tasks?.filter(
                          (task) => task.status === "completed",
                        ).length,
                    )
                    .slice(0, 4)
                    .map((project) => (
                      <ProjectCard key={project.id} {...project} />
                    ))}
                </ul>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="mb-8 leading-relaxed text-gray-600">
                    Sorry, the page you are looking for doesn't exist or has
                    been removed.
                  </p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="archived" className="space-y-4">
          {isLoading ? (
            <ul className="grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
            </ul>
          ) : (
            <div>
              {projects.filter((project) => project.archive === true).length > 0 ? (
                <ul className="grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
                  {projects
                    .slice(0, 4)
                    .filter((project) => project.archive === true)
                    .map((project) => (
                      <ProjectCard key={project.id} {...project} />
                    ))}
                </ul>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="mb-8 leading-relaxed text-gray-600">
                    Sorry, the page you are looking for doesn't exist or has
                    been removed.
                  </p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Main>
  );
}
