import { useEffect, useState } from "react";
import { db } from '@/lib/firebase';
import { useAuth } from "@/context/auth-context";
import {  collection, getDocs, query, where,  doc, getDoc } from "firebase/firestore";

type Campaign = {
  id: string;
  name?: string; // add other fields your campaign has
  [key: string]: any;
};

console.log("useUserCampaigns hook loaded");

export function useUserCampaigns() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadCampaigns = async () => {
      setLoading(true);

      try {
        // Get all campaignUsers docs for this user
        const q = query(
          collection(db, "campaignUsers"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setCampaigns([]);
          setLoading(false);
          return;
        }

        // Fetch campaign details for each campaignId
        const campaignDocs = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data(); // this is from campaignUsers
          if (!data.campaignId) return null;

          const campaignRef = doc(db, "campaigns", data.campaignId);
          const campaignSnap = await getDoc(campaignRef);

          return campaignSnap.exists()
            ? { 
                id: campaignSnap.id, 
                name: campaignSnap.data().name, // campaign name
                role: data.role || null,        // user role from campaignUsers
                ...campaignSnap.data()          // include other campaign fields if needed
              }
            : null;
        })
      );

        
        setCampaigns(campaignDocs.filter(Boolean) as Campaign[]);
      } catch (error) {
        console.error("Error loading campaigns:", error);
        setCampaigns([]);
      }

      setLoading(false);
    };

    loadCampaigns();
  }, [user]);

  return { campaigns, loading };
}