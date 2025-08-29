"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app, db } from "@/lib/firebase"; // your initialized Firebase app
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PartyPopper } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";

type Campaign = {
  id: string;
  name?: string; // add other fields your campaign has
  [key: string]: any;
};

const AcceptInvite: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { selectedCampaignId } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        // Get all campaignUsers docs for this user
        const docRef = doc(db, "campaigns", selectedCampaignId as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCampaign(docSnap.data() as Campaign);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        //setLoading(false);
      }
    };
    loadCampaign();
  }, []);

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
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // 2. Send verification email
        await sendEmailVerification(userCredential.user);

        await auth.signOut(); // Sign out after sending verification email --needs to be changed to perfrom logic serverside in accept function

        setStatus("success");
        setMessage(
          "Account created! please check your inbox for your email verification link"
        );
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
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl bg-white">
      {status === "success" ? (
        <div className="flex flex-row items-center justify-center gap-2 mt-5">
          <PartyPopper size={32} />
          <p className="font-medium text-2xl">All done</p>
        </div>
      ) : (
        <div>
          <p className="font-medium text-xl">
            You have been invited to join {campaign?.Candidate}'s campaign.
          </p>
          <p className="my-5">
            To accept your invitation, please enter the email address where you
            received the invite and create a password.
          </p>
          <form onSubmit={handleAcceptInvite} className="space-y-4">
            <Input
              type="email"
              placeholder="Your invited email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full"
            >
              {status === "submitting" ? "Processing..." : "Accept Invite"}
            </Button>
            {message && <p className="text-destructive">ERROR: {message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default AcceptInvite;
