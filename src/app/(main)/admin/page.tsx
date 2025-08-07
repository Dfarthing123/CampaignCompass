"use client";

import React, {useState,useEffect,} from "react";
import {getFunctions, httpsCallable } from "firebase/functions";
import {getAuth}  from "firebase/auth";
import {app} from "@/lib/firebase"; // your initialized Firebase app
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: any;
  reportsTo: string;
  coins?: number;
}

const Admin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const auth = getAuth(app);
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setError("You must be logged in.");
          setLoading(false);
          return;
        }

        const db = getFirestore(app);
        const q = query(
          collection(db, "users"),
          where("reportsTo", "==", currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const usersList: User[] = [];

        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() } as User);
        });

        setUsers(usersList);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users.");
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);




  const handleSendInvite = async () => {
    setError("");
    setInviteLink("");
    setLoading(true);

    try {
      const functions = getFunctions(app);
      const createInvite = httpsCallable(functions, "createInvite");
      const result: any = await createInvite({ email });

      setInviteLink(result.data.inviteLink);
    } catch (err: any) {
      console.error("Invite error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
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
        <div className="mt-4 text-red-600 font-medium">
          ⚠️ {error}
        </div>
      )}
    </div>
    My Team
    <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Coins</th>
            <th className="px-4 py-2 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center border-t">
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">{user.coins ?? "-"}</td>
              <td className="px-4 py-2 border">
                {user.createdAt?.toDate
                  ? user.createdAt.toDate().toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin