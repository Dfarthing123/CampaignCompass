"use client";

import React, {useState} from "react";
import {getFunctions, httpsCallable } from "firebase/functions";
import {getAuth}  from "firebase/auth";
import {app} from "@/lib/firebase"; // your initialized Firebase app

const Admin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Send Admin Invite</h2>

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
  );
};

export default Admin