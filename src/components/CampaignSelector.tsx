import React, { useContext } from "react";
import { useAuth } from "../context/auth-context";
import { useUserCampaigns } from "../hooks/useUserCampaigns";

export const CampaignSelector = () => {
  const { selectedCampaignId, setSelectedCampaignId } = useAuth();
  const { campaigns, loading } = useUserCampaigns();

  if (loading) return <span>Loading campaigns...</span>;
  if (campaigns.length === 0) return <span>No campaigns assigned</span>;

  return (
    <select
      aria-label="Select Campaign"
      value={selectedCampaignId || ""}
      onChange={(e) => setSelectedCampaignId(e.target.value)}
      className="border rounded p-1 w-full"
    >
      <option value="" disabled>
        Select a campaign
      </option>
      {campaigns.map((c) => (
        <option key={c.id} value={c.id}>
          {c.Name || `Campaign ${c.id}`} {c.role ? `(${c.role})` : ""}
        </option>
      ))}
    </select>
  );
};
