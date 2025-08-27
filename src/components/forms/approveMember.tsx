
import { useState, useEffect, use } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, collection, getDocs, query, where, getDoc, setDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/lib/firebase"; // Your Firebase client config





interface User {
  id: string;
  email: string;
  role: string;
  createdAt: any;
  reportsTo: string;
  coins?: number;
  status?: string;
}



function ExpandedRow({ user, campaignId , onApprove}: { user: User; campaignId: string; onApprove: (id: string) => void }) {
  const [hasResponse, setHasResponse] = useState(false);
  const [loading, setLoading] = useState(true);

    console.log(`expanded row ${user.id}`);

  useEffect(() => {
    const checkResponse = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        const respRef = doc(db, "campaignScreeningResponses", `${user.id}`);
        const respSnap = await getDoc(respRef);
        setHasResponse(respSnap.exists());
      } catch (err) {
        console.error("Error checking screening response:", err);
      } finally {
        setLoading(false);
      }
    };
    checkResponse();
  }, [user.id, campaignId]);

  const handleApprove = async () => {
    const db = getFirestore(app);
    try {
      await setDoc(doc(db, "campaignUsers", `${user.id}`), {
        ...user,
        status: "approved",
      }, { merge: true });
      //alert("User approved!");

      //window.location.reload();
      onApprove(user.id);
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  if (loading) return <div>Checking responses...</div>;

  return (
    <div className="p-2">
      {hasResponse ? (
        <button
          onClick={handleApprove}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Approve User
        </button>
      ) : (
        <p>No screening response yet.</p>
      )}
    </div>
  );
}

export default ExpandedRow;