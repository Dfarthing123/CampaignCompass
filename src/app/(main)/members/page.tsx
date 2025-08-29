"use client";

import { DataTable } from "./datatable";
import { columns, TeamMember } from "./columns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/auth-context";
import { BookUser } from "lucide-react";
//import { onAuthStateChanged } from "firebase/auth";

const page = () => {
  const { user, selectedCampaignId } = useAuth();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //const unsubscribe = onAuthStateChanged(useAuth, async (user) => {
    if (!user || !selectedCampaignId) return;

    const fetchTeam = async () => {
      try {
        const teamQuery = query(
          collection(db, "campaignUsers"),
          where("reportsTo", "==", user?.uid),
          where("campaignId", "==", selectedCampaignId)
        );
        const userDocs = await getDocs(teamQuery);
        setTeam(
          userDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as TeamMember[]
        );
        setLoading(false);
      } catch (err) {
        console.error("Error fetching team:", err);
        setLoading(false);
      }
    };

    fetchTeam();
    //});
    //return () => unsubscribe();
  }, [selectedCampaignId]);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-start gap-3">
          <BookUser />
          <h1 className="font-medium">Team Members</h1>
        </div>
      </div>
      {team.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <DataTable columns={columns} data={team} />
      )}
    </div>
  );
};

export default page;
