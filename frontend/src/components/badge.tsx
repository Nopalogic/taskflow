import { formatLabel } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export const CustomBadge = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => (
  <Badge
    className={cn(
      "flex max-h-fit w-[85px] justify-center rounded-full capitalize shadow-none",
      {
        "border-emerald-600/60 bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600/10 dark:bg-emerald-600/20":
          label === "completed" || label === "low",
        "rounded-full border-amber-600/60 bg-amber-600/10 text-amber-500 hover:bg-amber-600/10 dark:bg-amber-600/20":
          label === "in_progress" || label === "medium",
        "rounded-full border-red-600/60 bg-red-600/10 text-red-500 hover:bg-red-600/10 dark:bg-red-600/20":
          label === "high",
        "rounded-full border-blue-600/60 bg-blue-600/10 text-blue-500 hover:bg-blue-600/10 dark:bg-blue-600/20":
          label === "todo",
      },
      className,
    )}
  >
    {formatLabel(label)}
  </Badge>
);
