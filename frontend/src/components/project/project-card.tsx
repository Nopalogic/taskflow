import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { Link } from "react-router";
import { CustomBadge } from "../badge";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import { Task } from "@/types/task";

interface ProjectCardProps {
  id?: string;
  title: string;
  description?: string;
  priority: string;
  timeline_from: string;
  timeline_to: string;
  tasks: Task[];
}

export const ProjectCard = ({
  id,
  title,
  description,
  priority,
  timeline_from,
  timeline_to,
  tasks,
}: ProjectCardProps) => {
  const totalTasks = tasks?.length | 0;
  const tasksCompleted =
    tasks?.filter((task) => task.status === "completed").length | 0;
  const progressPercentage =
    totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;

  const projectStatus = () => {
    if (totalTasks === 0 && tasksCompleted === 0) return "not started";
    if (tasksCompleted === totalTasks) return "completed";
    return "in progress";
  };

  return (
    <Link to={`/u/projects/${id}`}>
      <Card className="w-full max-w-xs overflow-hidden shadow-none">
        <CardContent className="p-0">
          <div className="relative aspect-video border-b">
            <CustomBadge label={priority} className="absolute right-2 top-2" />
            <div className="h-full w-full bg-muted" />
          </div>
          <div className="px-6 pb-4 pt-3">
            <h2 className="line-clamp-1 font-semibold">{title}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
            <p className="mt-1 text-sm capitalize">{projectStatus()}</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-sm">{progressPercentage}%</p>
              <Progress value={progressPercentage} className="w-[25%]" />
            </div>
            <p className="mt-1 text-sm">
              {tasksCompleted}/{totalTasks} Tasks Completed
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {timeline_from && (
                <>
                  <span>{formatDate(timeline_from, "short")}</span>
                  <span className="mx-1">-</span>
                </>
              )}
              <span>{timeline_to && formatDate(timeline_to, "short")}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <Card className="w-full max-w-xs shadow-none">
      <CardContent className="p-0">
        {/* Image placeholder */}
        <div className="relative aspect-video border-b">
          <Skeleton className="absolute right-2 top-2 h-6 w-16 rounded-full" />
          <Skeleton className="h-full w-full" />
        </div>

        <div className="px-6 pb-4 pt-3">
          {/* Title */}
          <Skeleton className="h-5 w-3/4 rounded" />

          {/* Description */}
          <Skeleton className="mt-2 h-4 w-full rounded" />
          <Skeleton className="mt-1 h-4 w-5/6 rounded" />

          {/* Status */}
          <Skeleton className="mt-2 h-4 w-1/3 rounded" />

          {/* Progress */}
          <div className="mt-2 flex items-center gap-2">
            <Skeleton className="h-4 w-8 rounded" />
            <Skeleton className="h-2 w-[25%] rounded-full" />
          </div>

          {/* Tasks completed */}
          <Skeleton className="mt-2 h-4 w-1/2 rounded" />

          {/* Timeline */}
          <Skeleton className="mt-2 h-4 w-3/4 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};
