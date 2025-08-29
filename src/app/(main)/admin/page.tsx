"use client";

import { useState, useEffect, Fragment } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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
  //getExpandedRowModel,
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
//import ExpandedRow from "@/components/forms/managerMember";
import { DataTablePagination } from "@/components/tablepagination";
import { useAuth } from "@/context/auth-context";
import { BookUser, Check, Mail, Mailbox, Plus, Send, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import InviteForm from "@/components/forms/invite";

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
  //const [expanded, setExpanded] = useState({});
  // const [expandedUsers, setExpandedUsers] = useState({});
  // const [expandedInvites, setExpandedInvites] = useState({});

  //const authUser = useAuth().user;
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
        setUsers(
          userDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as User[]
        );
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
        setInvites(
          inviteDocs.docs.map((doc) => ({
            email: doc.id,
            ...doc.data(),
          })) as Invite[]
        );
      } catch (err) {
        console.error("Error fetching invites:", err);
      }
    });

    return () => unsubscribe();
  }, [selectedCampaignId]);

  // //Send invite
  // const handleSendInvite = async () => {
  //   setError("");
  //   setInviteLink("");
  //   setLoading(true);

  //   try {
  //     const functions = getFunctions(app);
  //     const createInvitev2 = httpsCallable(functions, "createInvitev2");

  //     const result: any = await createInvitev2({
  //       email,
  //       campaign: selectedCampaignId,
  //     });

  //     setInviteLink(result.data.inviteLink);
  //   } catch (err: any) {
  //     console.error("Invite error:", err);
  //     setError(err.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // function handleUserApproved(userId: string) {
  //   const value =
  //     users.find((u) => u.id === userId)?.status === "Approved"
  //       ? "Screening"
  //       : "Approved";
  //   setUsers((prev) =>
  //     prev.map((u) => (u.id === userId ? { ...u, status: value } : u))
  //   );
  // }

  // Users table columns
  // const userColumns: ColumnDef<User>[] = [
  //   { accessorKey: "status", header: "Status" },
  //   { accessorKey: "email", header: "Email" },
  //   { accessorKey: "role", header: "Role" },
  //   { accessorKey: "coins", header: "Coins" },
  //   {
  //     accessorKey: "createdAt",
  //     header: "Created At",
  //     cell: ({ row }) =>
  //       row.original.createdAt?.toDate
  //         ? row.original.createdAt.toDate().toLocaleString()
  //         : "-",
  //   },
  //   {
  //     id: "expander",
  //     header: () => null,
  //     cell: ({ row }) =>
  //       row.getCanExpand() ? (
  //         <button onClick={row.getToggleExpandedHandler()} className="text-blue-600 underline">
  //           {row.getIsExpanded() ? "▼" : "▶"}
  //         </button>
  //       ) : null,
  //   },
  // ];

  // Invites table columns
  const inviteColumns: ColumnDef<Invite>[] = [
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) =>
        row.original.createdAt?.toDate
          ? row.original.createdAt.toDate().toLocaleString()
          : "-",
    },
    {
      accessorKey: "expiresAt",
      header: "Expires",
      cell: ({ row }) =>
        row.original.expiresAt?.toDate
          ? row.original.expiresAt.toDate().toLocaleString()
          : "-",
    },
    { accessorKey: "email", header: "Sent to" },
    {
      accessorKey: "used",
      header: "Used",
      cell: ({ row }) => (row.original.used ? <Check /> : <X />),
    },
    {
      accessorKey: "usedAt",
      header: "Clicked",
      cell: ({ row }) =>
        row.original.usedAt
          ? row.original.usedAt.toDate().toLocaleString()
          : "-",
    },
  ];

  // Generic DataTable
  function DataTable<TData, TValue>({
    columns,
    data,
    name,
  }: {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    name?: string;
  }) {
    //const isUsersTable = name === "userstbl";
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      //getExpandedRowModel: getExpandedRowModel(),
      state: {
        sorting,
        pagination,
        //expanded: isUsersTable ? expandedUsers : expandedInvites,
      },
      onSortingChange: setSorting,
      onPaginationChange: setPagination,
      //onExpandedChange: isUsersTable ? setExpandedUsers : setExpandedInvites,
      //getRowCanExpand: () => true,
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* {name == "userstbl" &&
                    row.getIsExpanded() &&
                    selectedCampaignId && (
                      <TableRow key={row.id + "-expanded"}>
                        <TableCell colSpan={columns.length}>
                          <ExpandedRow
                            user={row.original as User}
                            campaignId={selectedCampaignId}
                            onApprove={handleUserApproved}
                          />
                        </TableCell>
                      </TableRow>
                    )} */}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-start gap-3">
          <Send />
          <h1 className="font-medium">Campaign Invites</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm">
              <Send /> New Invite
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mb-4">Campaign</SheetTitle>
              <SheetDescription asChild>
                <InviteForm />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      {/* Invite section */}
      {/* <h2 className="text-xl font-semibold mb-4">Send Invite</h2>
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
            <a
              href={inviteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-700"
            >
              {inviteLink}
            </a>
          </div>
          <QRCodeSVG value={inviteLink} size={300} />
        </div>
      )}
      {error && <div className="mt-4 text-red-600 font-medium">⚠️ {error}</div>} */}

      {/* Users table
      <h3 className="mt-10 text-lg font-bold">My Team</h3>
      <DataTable columns={userColumns} data={users} name="userstbl"/> */}

      {/* Invites table */}
      <DataTable columns={inviteColumns} data={invites} />
    </div>
  );
}
