"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/lib/firebase"; // Your Firebase client config
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
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
import { useAuth } from "@/context/auth-context";

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: any;
  reportsTo: string;
  coins?: number;
  status?: string;
}

interface Invite {
  createdAt: any;
  expiresAt: any;
  email: string;
  used: boolean;
  usedAt?: any;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [email, setEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const authUser = useAuth().user;
  const { selectedCampaignId } = useAuth(); 

  // Fetch data when logged in
  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        // Fetch users
        const usersQuery = query(
          collection(db, "users"),
          where("reportsTo", "==", user.uid)
        );
        const userDocs = await getDocs(usersQuery);
        setUsers(
          userDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as User[]
        );

        // Fetch invites
        const invitesQuery = query(
          collection(db, "invites"),
          where("createdBy", "==", user.uid)
        );
        const inviteDocs = await getDocs(invitesQuery);
        setInvites(
          inviteDocs.docs.map((doc) => ({
            email: doc.id,
            ...doc.data(),
          })) as Invite[]
        );
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    });

    return () => unsubscribe();
  }, []);

  // Send invite
  const handleSendInvite = async () => {
    setError("");
    setInviteLink("");
    setLoading(true);

    try {
      const functions = getFunctions(app);
      //const createInvite = httpsCallable(functions, "createInvite"); V1
      const createInvitev2 = httpsCallable(functions, "createInvitev2");

      //const result: any = await createInvite({ email }); v1
      const result: any = await createInvitev2({ 
        email: email, 
        campaign: selectedCampaignId,// "OU9kEiBzEjHHtLMzPdIC" 
      });

      setInviteLink(result.data.inviteLink);
    } catch (err: any) {
      console.error("Invite error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Table columns for Users
  const userColumns: ColumnDef<User>[] = [
    { accessorKey: "status", header: "Status" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "coins", header: "Coins" },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        row.original.createdAt?.toDate
          ? row.original.createdAt.toDate().toLocaleString()
          : "-",
    },
  ];

  // Table columns for Invites
  const inviteColumns: ColumnDef<Invite>[] = [
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        row.original.createdAt?.toDate
          ? row.original.createdAt.toDate().toLocaleString()
          : "-",
    },
    {
      accessorKey: "expiresAt",
      header: "Expires At",
      cell: ({ row }) =>
        row.original.expiresAt?.toDate
          ? row.original.expiresAt.toDate().toLocaleString()
          : "-",
    },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "used",
      header: "Used",
      cell: ({ row }) => (row.original.used ? "✅" : "❌"),
    },
    {
      accessorKey: "usedAt",
      header: "Used At",
      cell: ({ row }) =>
        row.original.usedAt
          ? row.original.usedAt.toDate().toLocaleString()
          : "-",
    },
  ];

  // Reusable DataTable component
  function DataTable<TData, TValue>({
    columns,
    data,
  }: {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  }) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onPaginationChange: setPagination,
      state: { sorting, pagination },
    });

    return (
      <div className="rounded border mt-4">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
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

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Send Invite</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter user email"
        className="w-full px-4 py-2 mb-4 border rounded-md"
      />
      <button
        onClick={handleSendInvite}
        disabled={loading || !email}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Create Invite"}
      </button>
      {inviteLink && (
        <div className="mt-4 text-green-700">
          Invite Link:{" "}
          <a
            href={inviteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700"
          >
            {inviteLink}
          </a>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-600 font-medium">⚠️ {error}</div>
      )}

      <h3 className="mt-10 text-lg font-bold">My Team</h3>
      <DataTable columns={userColumns} data={users} />

      <h3 className="mt-10 text-lg font-bold">Invites</h3>
      <DataTable columns={inviteColumns} data={invites} />
    </div>
  );
}
