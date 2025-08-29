"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type TeamMember = {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: any;
  reportsTo: string;
  coins?: number;
  status?: string;
};

export const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      row.original.createdAt?.toDate
        ? row.original.createdAt.toDate().toLocaleString()
        : "-",
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "coins", header: "KPP" },
  { accessorKey: "status", header: "Status" },
  {
    id: "expander",
    header: "Approval",
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <Button
          variant="outline"
          size="sm"
          onClick={row.getToggleExpandedHandler()}
        >
          {row.getIsExpanded() ? "Close" : "Actions"}
        </Button>
      ) : null,
  },
];
