import { useEffect, useState } from "react";
import { Link } from "react-router";

import { Main } from "@/components/layouts/main";
import {
  ProjectCard,
  ProjectCardSkeleton,
} from "@/components/project/project-card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { formatLabel } from "@/lib/format";
import { getProjects } from "@/services/project";
import { Project } from "@/types/project";
import { Task } from "@/types/task";

type ProjectStatus =
  | "all"
  | "not_started"
  | "in_progress"
  | "completed"
  | "archived";

const projectStatus = (tasks: Task[] | undefined) => {
  if (tasks === undefined) {
    tasks = [];
  }
  const totalTasks = tasks.length;
  const tasksCompleted = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  if (totalTasks === 0 || tasksCompleted === 0) return "not_started";
  if (tasksCompleted === totalTasks) return "completed";
  return "in_progress";
};

const STATUS_FILTERS: Record<ProjectStatus, (project: Project) => boolean> = {
  all: (project) => project.archive === false,
  not_started: (project) =>
    projectStatus(project.tasks) === "not_started" && project.archive === false,
  in_progress: (project) =>
    projectStatus(project.tasks) === "in_progress" && project.archive === false,
  completed: (project) =>
    projectStatus(project.tasks) === "completed" && project.archive === false,
  archived: (project) => project.archive === true,
};

const getFilteredProjects = (
  projects: Project[],
  projectStatus: string,
  searchTerm: string,
) => {
  const statusFilter = STATUS_FILTERS[projectStatus] || (() => true);
  let filtered = projects.filter(statusFilter);

  if (searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    filtered = filtered.filter((project) =>
      project.title.toLowerCase().includes(searchTermLower),
    );
  }

  return filtered;
};

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectStatus, setProjectStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredProjects = getFilteredProjects(
    projects,
    projectStatus,
    searchTerm,
  );

  return (
    <Main fixed>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Here&apos;s a list of your projects!
        </p>
      </div>

      <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
        <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
          <Input
            placeholder="Filter products..."
            className="h-9 w-40 lg:w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={projectStatus} onValueChange={setProjectStatus}>
            <SelectTrigger className="w-36">
              <SelectValue>{formatLabel(projectStatus)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="not_started">Not Started</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link to="/u/projects/create">
          <Button>Create Project</Button>
        </Link>
      </div>

      {isLoading ? (
        <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
        </ul>
      ) : (
        <div>
          {filteredProjects.length > 0 ? (
            <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {filteredProjects.map((project) => (
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
