import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export const DataTableSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-6">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-7 w-16" />
        </div>
        <Skeleton className="h-7 w-20" />
      </div>
      <div className="rounded-md border">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b bg-muted/50">
              <TableCell className="p-4 text-left">
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell className="p-4 text-left">
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="p-4 text-left">
                <Skeleton className="ml-4 h-4 w-16" />
              </TableCell>
              <TableCell className="p-4 text-left">
                <Skeleton className="ml-4 h-4 w-12" />
              </TableCell>
              <TableCell className="p-4 text-left">
                <Skeleton className="ml-2 h-4 w-12" />
              </TableCell>
              <TableCell className="w-12 p-4" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow
                key={index}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell className="p-4">
                  <Skeleton className="h-4 w-[11rem]" />
                </TableCell>
                <TableCell className="p-4">
                  <Skeleton className="h-4 w-[24rem]" />
                </TableCell>
                <TableCell className="p-4">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="p-4">
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell className="p-4">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="p-4">
                  <Skeleton className="h-4 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between gap-6">
        <Skeleton className="h-7 w-64" />
        <div className="flex w-full justify-end gap-6">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-7 w-16" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
};
