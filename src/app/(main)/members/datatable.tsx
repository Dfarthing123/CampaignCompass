"use client";
import { Fragment, useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/tablepagination";
import ExpandedRow from "@/components/forms/managerMember";
import { useAuth } from "@/context/auth-context";
import { TeamMember } from "./columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20, // ✅ Default to 20 rows per page
  });

  const [expandedUsers, setExpandedUsers] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onExpandedChange: setExpandedUsers,
    getRowCanExpand: () => true,
    state: {
      sorting,
      rowSelection,
      pagination,
      expanded: expandedUsers,
    },
  });

  //
  const { selectedCampaignId } = useAuth();
  const [team, setTeam] = useState<TeamMember[]>([]);

  function handleUserApproved(userId: string) {
    const value =
      team.find((u) => u.id === userId)?.status === "Approved"
        ? "Screening"
        : "Approved";
    setTeam((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: value } : u))
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>

                {row.getIsExpanded() && selectedCampaignId && (
                  <TableRow key={row.id + "-expanded"}>
                    <TableCell colSpan={columns.length}>
                      <ExpandedRow
                        user={row.original as TeamMember}
                        campaignId={selectedCampaignId}
                        onApprove={handleUserApproved}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
