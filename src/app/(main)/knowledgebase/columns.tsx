"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type KnowledgeItem = {
  id: string;
};

export const columns: ColumnDef<KnowledgeItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title");
      return <span className="uppercase"> {title as string} </span>;
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const title = row.getValue("id");
      return (
        <Link href={"/knowledgebase/" + title} className="rounded border p-2">
          Read
        </Link>
      );
    },
  },
];
