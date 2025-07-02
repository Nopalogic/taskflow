import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/format";
import { Task } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { Link } from "react-router";
import { CustomBadge } from "../badge";
import { Button } from "../ui/button";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Task",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "due_date",
    header: () => <div className="ml-3">Due Date</div>,
    cell: ({ row }) => (
      <div className="font-normal">{formatDate(row.getValue("due_date"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="ml-5">Status</div>,
    cell: ({ row }) => <CustomBadge label={row.getValue("status")} />,
  },
  {
    accessorKey: "priority",
    header: () => <div className="ml-5">Priority</div>,
    cell: ({ row }) => <CustomBadge label={row.getValue("priority")} />,
  },
  {
    accessorKey: "id",
    header: "",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              document.body.focus();
            }}
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={`/u/tasks/${row.getValue("id")}`}>
              <DropdownMenuItem>
                <SquarePen />
                Details
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
