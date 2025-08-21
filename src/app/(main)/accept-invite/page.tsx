"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getFunctions, httpsCallable } from "firebase/functions";
import {app} from "@/lib/firebase"; // your initialized Firebase app
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { useAuth } from "@/context/auth-context";

const AcceptInvite: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { selectedCampaignId } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid invite link. No token provided.");
    }
  }, [token]);

  const handleAcceptInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !token) {
      setStatus("error");
      setMessage("All fields are required.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const functions = getFunctions(app);
      //const acceptInvite = httpsCallable(functions, "acceptInvite"); // V1
      const acceptInviteV2 = httpsCallable(functions, "acceptInviteV2");
      //const result: any = await acceptInvite({ email, token, password }); // V1
      const result: any = await acceptInviteV2({ email, token, password }); 

      if (result.data?.success) {
        // 1. Sign in the user to get auth context
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // 2. Send verification email
        await sendEmailVerification(userCredential.user);

        await auth.signOut(); // Sign out after sending verification email --needs to be changed to perfrom logic serverside in accept function

        setStatus("success");
        setMessage("Account created! please check your inbox for your email verification link");
      } else {
        throw new Error("Unknown error.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "Failed to accept invite.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Accept Your Invite</h2>

      {status === "success" ? (
        <p className="text-green-600">{message}</p>
      ) : (
        <form onSubmit={handleAcceptInvite} className="space-y-4">
          <input
            type="email"
            placeholder="Your invited email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Choose a password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {status === "submitting" ? "Processing..." : "Accept Invite"}
          </button>
          {message && <p className="text-red-600">{message}</p>}
        </form>
      )}
    </div>
  );
};

export default AcceptInvite;