"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Timestamp } from "firebase/firestore";

export type KnowledgeItem = {
  id: string;
};

export const columns: ColumnDef<KnowledgeItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const title = row.getValue("id");
      return <Link href={"/knowledgebase/" + title}> {title as string} </Link>;
    },
  },
  {
    accessorKey: "title",
    header: "Knowledge Item",
  },
];
