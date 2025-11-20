import { Skeleton } from "@/components/ui/skeleton";

export function ProjectPageSkeleton() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-12 w-full" />
      <div className="grid md:grid-cols-3 gap-2">
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  );
}
