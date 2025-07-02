import { useEffect, useState } from "react";

import { Main } from "@/components/layouts/main";

import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/columns";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Task } from "@/types/task";
import { getTasks } from "@/services/task";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      if (response.success) {
        setTasks(response.data);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Main fixed>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks!
        </p>
      </div>

      <div>
        {isLoading ? (
          <DataTableSkeleton />
        ) : (
          <DataTable columns={columns} data={tasks} />
        )}
      </div>
    </Main>
  );
}
