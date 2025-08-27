"use client";

import { useState, useEffect, Fragment,memo } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/lib/firebase";
import { QRCodeSVG } from "qrcode.react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
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
import ExpandedRow from "@/components/forms/approveMember";
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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [expanded, setExpanded] = useState({});

  const authUser = useAuth().user;
  const { selectedCampaignId } = useAuth();

  // Fetch data
  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || !selectedCampaignId) return;

      try {
        // Users
        const usersQuery = query(
          collection(db, "campaignUsers"),
          where("reportsTo", "==", user.uid),
          where("campaignId", "==", selectedCampaignId)
        );
        const userDocs = await getDocs(usersQuery);
        setUsers(userDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as User[]);
      } catch (err) {
        console.error("Error fetching team:", err);
      }

      try {
        // Invites
        const invitesQuery = query(
          collection(db, "invites"),
          where("createdBy", "==", user.uid),
          where("campaign", "==", selectedCampaignId)
        );
        const inviteDocs = await getDocs(invitesQuery);
        setInvites(inviteDocs.docs.map((doc) => ({ email: doc.id, ...doc.data() })) as Invite[]);
      } catch (err) {
        console.error("Error fetching invites:", err);
      }
    });

    return () => unsubscribe();
  }, [selectedCampaignId]);

  // Send invite
  const handleSendInvite = async () => {
    setError("");
    setInviteLink("");
    setLoading(true);

    try {
      const functions = getFunctions(app);
      const createInvitev2 = httpsCallable(functions, "createInvitev2");

      const result: any = await createInvitev2({
        email,
        campaign: selectedCampaignId,
      });

      setInviteLink(result.data.inviteLink);
    } catch (err: any) {
      console.error("Invite error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  function handleUserApproved(userId: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "approved" } : u))
    );
  }



  // Users table columns
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
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) =>
        row.getCanExpand() ? (
          <button onClick={row.getToggleExpandedHandler()} className="text-blue-600 underline">
            {row.getIsExpanded() ? "▼" : "▶"}
          </button>
        ) : null,
    },
  ];

  // Invites table columns
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

  // Generic DataTable
  function DataTable<TData, TValue>({ columns, data }: { columns: ColumnDef<TData, TValue>[]; data: TData[] }) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      state: { sorting, pagination, expanded },
      onSortingChange: setSorting,
      onPaginationChange: setPagination,
      onExpandedChange: setExpanded,
      getRowCanExpand: () => true,
    });

    return (
      <div className="rounded border mt-4">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && selectedCampaignId && (
                    <TableRow key={row.id + "-expanded"}>
                      <TableCell colSpan={columns.length}>
                        <ExpandedRow user={row.original as User} campaignId={selectedCampaignId} onApprove={handleUserApproved} />
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

  return (
    <div className="p-6">
      {/* Invite section */}
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
        <div className="mt-4">
          <div className="text-green-700 mb-2">
            Invite Link:{" "}
            <a href={inviteLink} target="_blank" rel="noopener noreferrer" className="underline text-blue-700">
              {inviteLink}
            </a>
          </div>
          <QRCodeSVG value={inviteLink} size={300} />
        </div>
      )}
      {error && <div className="mt-4 text-red-600 font-medium">⚠️ {error}</div>}

      {/* Users table */}
      <h3 className="mt-10 text-lg font-bold">My Team</h3>
      <DataTable columns={userColumns} data={users} />

      {/* Invites table */}
      <h3 className="mt-10 text-lg font-bold">Invites</h3>
      <DataTable columns={inviteColumns} data={invites} />
    </div>
  );
}
