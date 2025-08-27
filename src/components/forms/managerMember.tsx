import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";
import ScreeningModal from "@/components/forms/screeningResponses";

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: any;
  reportsTo: string;
  coins?: number;
  status?: string;
}

interface ExpandedRowProps {
  user: User;
  campaignId: string;
  onApprove: (id: string) => void;
}

export default function ExpandedRow({ user, campaignId, onApprove }: ExpandedRowProps) {
  const [hasResponse, setHasResponse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<{ [key: string]: string }>({});
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!user?.id || !campaignId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        // Fetch campaign questions
        const questionsRef = doc(db, "campaignScreening", campaignId);
        const questionsSnap = await getDoc(questionsRef);

        if (questionsSnap.exists()) {
          setQuestions(questionsSnap.data() as { [key: string]: string });
        } else {
          // Load default questions
          const defaultRef = doc(db, "campaignScreening", "DEFAULT");
          const defaultSnap = await getDoc(defaultRef);
          if (defaultSnap.exists()) {
            setQuestions(defaultSnap.data() as { [key: string]: string });
          } else {
            setQuestions({});
          }
        }
        // Fetch user responses
        const respRef = doc(db, "campaignScreeningResponses", user.id); // <- use correct ID
        const respSnap = await getDoc(respRef);
        if (respSnap.exists()) {
          setHasResponse(true);
          setAnswers(respSnap.data().answers || {});
        }
      } catch (err) {
        console.error("Error fetching screening data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, campaignId]);

  const handleApprove = async () => {
    const db = getFirestore(app);
    try {
      await setDoc(
        doc(db, "campaignUsers", user.id),
        { ...user, status: "Approved" },
        { merge: true }
      );
      onApprove(user.id);
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

    const handleDispprove = async () => {
    const db = getFirestore(app);
    try {
      await setDoc(
        doc(db, "campaignUsers", user.id),
        { ...user, status: "Screening" },
        { merge: true }
      );
      onApprove(user.id);
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };




  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-2 space-y-2">
      {hasResponse ? (
        <>
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Approve User
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-2"
          >
            View Screening
          </button>

          <button
            onClick={handleDispprove}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 ml-2"
          >
            Dispprove User
          </button>




          <ScreeningModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            questions={questions}
            answers={answers}
          />
        </>
      ) : (
        <p>No screening response yet.</p>
      )}
    </div>
  );
}
