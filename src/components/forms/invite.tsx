"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { app } from "@/lib/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useAuth } from "@/context/auth-context";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "../ui/button";
import { PartyPopper, TriangleAlert } from "lucide-react";
import { Input } from "../ui/input";

function InviteForm() {
  const [email, setEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { selectedCampaignId } = useAuth();

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
      console.error("Invite error:", err.message);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm animate-in fade-in-90">
      <CardHeader>
        <CardTitle className="text-2xl">Invite</CardTitle>
        <CardDescription>
          Send an invite email to the prospective campaign volunteer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter a valid email"
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <Button
          className="w-full"
          onClick={handleSendInvite}
          disabled={loading || !email || inviteLink.length > 0}
        >
          {loading ? "Sending..." : "Send Invite Email"}
        </Button>
        {inviteLink && (
          <div className="flex flex-col gap-5 my-5 border p-4 rounded-xl">
            <p className="flex flex-row gap-3">
              <PartyPopper /> Invite sent
            </p>
            <div>
              <a
                className="underline font-medium text-blue-600"
                href={inviteLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Invite Link
              </a>
            </div>
            <p>Scanable QR Code</p>
            <QRCodeSVG value={inviteLink} className="w-full" size={300} />
          </div>
        )}
        {error && (
          <div className="mt-4 text-destructive font-medium">
            <TriangleAlert /> {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default InviteForm;
